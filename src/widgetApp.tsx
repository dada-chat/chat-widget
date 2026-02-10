import { useEffect, useState } from "react";
import styles from "./widget.module.css";
import VisitorForm from "./components/VisitorForm";
import { checkWidgetInit } from "./api/chat";
import { ChatMessage } from "./components/ChatMessage";
import { useChatStore } from "./store/chatStore";
import ChattingRoom from "./components/ChattingRoom";
import { getSocket } from "./lib/socket";
import { getRuntimeConfig } from "./config/runtimeConfig";

type WidgetStatus = "IDLE" | "LOADING" | "AVAILABLE" | "ERROR";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

const ICONS = {
  widget: `${BASE_URL}/images/ico_widget.svg`,
  close: `${BASE_URL}/images/ico_close.svg`,
  messageOff: `${BASE_URL}/images/ico_message_off.svg`,
  symbol: `${BASE_URL}/images/ico_symbol.svg`,
};
export function WidgetApp() {
  console.log("WidgetApp render");

  const [isVisible, setIsVisible] = useState(
    !!document.querySelector("script[data-dadachat-site-key]")
  );
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<WidgetStatus>("IDLE");

  const { roomId, reset } = useChatStore();
  const { apiBaseUrl } = getRuntimeConfig();

  const handleClose = () => {
    const socket = getSocket(); // 소켓 종료
    socket.disconnect();

    reset(); // store 초기화
    setOpen(false);
  };

  const handleClick = async () => {
    setOpen(true);
    setStatus("LOADING");
    try {
      const result = await checkWidgetInit();
      if (result.success) {
        setStatus("AVAILABLE");
      } else {
        setStatus("ERROR");
      }
    } catch (err) {
      console.error(err);
      setStatus("ERROR");
    }
  };

  useEffect(() => {
    // 서버 깨우기
    const wakeUpServer = async () => {
      try {
        await fetch(`${apiBaseUrl}/health`);
      } catch {}
    };
    wakeUpServer();

    let timerId: ReturnType<typeof setTimeout>;
    const checkScriptAndPath = () => {
      if (timerId) clearTimeout(timerId);

      // 0.1초 뒤에 체크 (DOM 변화 대기)
      timerId = setTimeout(() => {
        const scriptTag = document.querySelector(
          "script[data-dadachat-site-key]"
        );

        if (!scriptTag) {
          console.log("위젯 해제");
          const socket = getSocket();
          if (socket) socket.disconnect();
          setIsVisible(false);
          setOpen(false);
        } else {
          setIsVisible(true);
        }
      }, 100);
    };

    // SPA 라우팅 감지 로직
    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      checkScriptAndPath();
    };
    window.addEventListener("popstate", checkScriptAndPath);

    return () => {
      if (timerId) clearTimeout(timerId);
      history.pushState = originalPushState;
      window.removeEventListener("popstate", checkScriptAndPath);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.widgetRoot}>
      {open && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            상담 채팅
            <button className={styles.closeButton} onClick={handleClose}>
              <img src={ICONS.close} alt="닫기" />
            </button>
          </div>
          {open && status === "LOADING" && (
            <div className={styles.widgetNodata}>
              <img src={ICONS.symbol} alt="다다챗" />
              <p>현재 위젯 서비스를 연결 중...</p>
            </div>
          )}
          {open && status === "AVAILABLE" && (
            <div className={styles.widgetContent}>
              {!roomId ? (
                <div className={styles.chatList}>
                  <div className={styles.bubble}>
                    <ChatMessage
                      content={`안녕하세요 :)
상담을 시작하기 전에, 간단한 기본 정보를 입력해 주세요.`}
                      senderType="USER"
                    />
                  </div>
                  <div className={styles.bubble}>
                    <VisitorForm />
                  </div>
                </div>
              ) : (
                <ChattingRoom />
              )}
            </div>
          )}
          {open && status === "ERROR" && (
            <div className={styles.widgetNodata}>
              <img src={ICONS.messageOff} alt="메세지 아이콘" />
              <p>
                현재 채팅 위젯 사용이 불가합니다.
                <br />
                잠시 후 다시 시도해주세요.
              </p>
            </div>
          )}
        </div>
      )}

      <button className={styles.floatingButton} onClick={handleClick}>
        <img src={ICONS.widget} alt="다다챗" />
      </button>
    </div>
  );
}
