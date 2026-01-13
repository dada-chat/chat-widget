import clsx from "clsx";
import styles from "./message.module.css";

interface ChatMessageProps {
  content: string;
  senderType: "USER" | "VISITOR" | "SYSTEM";
  time?: string;
}

export function ChatMessage({
  content,
  time,
  senderType = "VISITOR",
}: ChatMessageProps) {
  return (
    <div
      className={clsx(
        styles.messageItem,
        senderType === "USER" && styles.messageItemLeft,
        senderType === "VISITOR" && styles.messageItemRight,
        senderType === "SYSTEM" && styles.messageItemCenter
      )}
    >
      <div
        className={clsx(
          styles.message,
          senderType === "USER" && styles.messageLeft,
          senderType === "VISITOR" && styles.messageRight,
          senderType === "SYSTEM" && styles.messageCenter
        )}
      >
        <p>{content}</p>
      </div>
      {time && <span className={styles.messageTime}>{time}</span>}
    </div>
  );
}
