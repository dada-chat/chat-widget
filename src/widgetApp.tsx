import { useState } from "react";
import styles from "./widget.module.css";
import VisitorForm from "./components/VisitorForm";
import { checkWidgetInit } from "./api/chat";
import { ChatMessage } from "./components/ChatMessage";
import { useChatStore } from "./store/chatStore";
import ChattingRoom from "./components/ChattingRoom";
import { getSocket } from "./lib/socket";

export function WidgetApp() {
  console.log("WidgetApp render");

  const [open, setOpen] = useState(false);
  const [available, setAvailable] = useState<boolean>(false);

  const { roomId, reset } = useChatStore();

  const handleClose = () => {
    const socket = getSocket(); // 소켓 종료
    socket.disconnect();

    reset(); // store 초기화
    setOpen(false);
  };

  const handleClick = async () => {
    try {
      const result = await checkWidgetInit();
      if (result.success) setAvailable(true);
    } catch (err) {
      console.error(err);
      setAvailable(false);
      //alert("위젯 상태를 확인할 수 없습니다.");
    }
    setOpen(true);
  };

  return (
    <div className={styles.widgetRoot}>
      {open && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            상담 채팅
            <button className={styles.closeButton} onClick={handleClose}>
              <img src="/images/ico_close.svg" alt="닫기" />
            </button>
          </div>
          {open && available && (
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
          {open && available === false && (
            <div className={styles.widgetNodata}>
              <img src="/images/ico_message_off.svg" alt="메세지 아이콘" />
              <p>
                현재 채팅 위젯 사용이 불가합니다.
                <br />
                관리자에게 문의하세요.
              </p>
            </div>
          )}
        </div>
      )}

      <button className={styles.floatingButton} onClick={handleClick}>
        <img src="/images/ico_symbol.svg" alt="다다챗" />
      </button>
    </div>
  );
}
