import { useState } from "react";
import styles from "./widget.module.css";
import VisitorForm from "./components/VisitorForm";
import { ChatMessage } from "./components/ChatMessage";

export function WidgetApp() {
  console.log("WidgetApp render");

  const [open, setOpen] = useState(false);
  const [available, setAvailable] = useState<boolean>(false);

  const handleClick = async () => {
    setOpen(true);
  };

  return (
    <div className={styles.widgetRoot}>
      {open && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            상담 채팅
            <button
              className={styles.closeButton}
              onClick={() => setOpen(false)}
            >
              <img src="/images/ico_close.svg" alt="닫기" />
            </button>
          </div>
          {open && available && (
            <div className={styles.widgetContent}>
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
