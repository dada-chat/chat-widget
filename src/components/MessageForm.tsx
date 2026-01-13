import { useState } from "react";
import styles from "./form.module.css";
import FormInput from "./FormInput";
import clsx from "clsx";
import { useChatStore } from "../store/chatStore";
import { getMessages, sendMessage } from "../api/chat";

export default function MessageForm() {
  const [text, setText] = useState("");
  const { roomId, visitor, setMessages } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomId || !visitor || !text.trim()) return;

    try {
      const result = await sendMessage(roomId, visitor?.id, text);

      if (result.success) {
        setText("");

        const result = await getMessages(roomId);
        if (result.success) setMessages(result.data);
      }
    } catch (err) {
      console.error(err);
    }

    setText("");
  };

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
          placeholder="메세지를 입력해주세요."
          value={text}
          onChange={setText}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <button type="submit">
          <img src="/images/ico_send.svg" />
        </button>
      </div>
    </form>
  );
}
