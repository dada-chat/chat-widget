import { useState } from "react";
import styles from "./widget.module.css";

export function WidgetApp() {
  console.log("WidgetApp render");

  const [open, setOpen] = useState(false);
  const [available, setAvailable] = useState<boolean>(false);

  const handleClick = () => {
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
        </div>
      )}

      <button className={styles.floatingButton} onClick={handleClick}>
        <img src="/images/ico_symbol.svg" alt="다다챗" />
      </button>
    </div>
  );
}
