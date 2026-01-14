import { useState } from "react";
import styles from "./form.module.css";
import FormInput from "./FormInput";
import clsx from "clsx";
import { useChatStore } from "../store/chatStore";
import { sendMessage } from "../api/chat";

interface MessageFormProps {
  onSendSuccess?: () => void;
}

export default function MessageForm({ onSendSuccess }: MessageFormProps) {
  const [text, setText] = useState("");
  const { roomId, visitor, chattingroomStatus } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId || !visitor || !text.trim()) return;

    try {
      const result = await sendMessage(roomId, visitor?.id, text);

      if (result.success) {
        setText("");
        onSendSuccess?.();
      }
    } catch (err) {
      console.error(err);
    }
    setText("");
  };

  console.log("chattingroomStatus:", chattingroomStatus);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-20 right-4 p-4 bg-white shadow-lg rounded w-64 flex flex-col gap-2"
    >
      <div className={clsx(styles.formWrap, styles.massageWrap)}>
        <FormInput
          type="text"
          required
          placeholder={
            chattingroomStatus === "CLOSED"
              ? "상담이 종료되었습니다."
              : "메시지를 입력하세요"
          }
          value={text}
          onChange={setText}
          onKeyDown={(e) => handleKeyPress(e)}
          disabled={chattingroomStatus === "CLOSED" ? true : false}
        />
        <button
          type="submit"
          disabled={chattingroomStatus === "CLOSED" ? true : false}
        >
          <img src="/images/ico_send.svg" />
        </button>
      </div>
    </form>
  );
}
