import { useState } from "react";
import styles from "./form.module.css";
import FormInput from "./FormInput";
import clsx from "clsx";

export default function MessageForm() {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    setText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
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
        <button type="submit">전송</button>
      </div>
    </form>
  );
}
