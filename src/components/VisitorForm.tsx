import React, { useMemo, useState } from "react";
import { joinChattingRoom } from "../api/chat";
import { useChatStore } from "../store/chatStore";
import FormInput from "./FormInput";
import styles from "./form.module.css";
import clsx from "clsx";
import { validateEmail } from "../utils/validation";

export default function VisitorForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setSession } = useChatStore();

  const isFormValid = useMemo(() => {
    return name.trim().length > 0 && validateEmail(email);
  }, [name, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      const result = await joinChattingRoom({ name, email });
      if (result.success && result.data) {
        setSession(
          result.data.conversation.id,
          {
            id: result.data.visitor.id,
            name,
            email,
          },
          result.data.conversation.status
        );

        // setMessages(result.data.conversation.messages);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("현재 채팅방 생성/접속 이용이 불가능합니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={clsx(styles.formWrap, styles.formRowWrap)}>
        <div className={styles.formRowWrap}>
          <FormInput
            label="이메일"
            type="email"
            required
            placeholder="email@example.com"
            value={email}
            onChange={setEmail}
            error={
              email && !validateEmail(email)
                ? "유효한 이메일을 입력해주세요"
                : undefined
            }
          />
          <FormInput
            label="이름"
            type="text"
            required
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={setName}
          />
        </div>
        {errorMessage && (
          <p className={clsx(styles.helper, styles.helperError)}>
            {errorMessage}
          </p>
        )}
        <button type="submit" disabled={errorMessage ? true : false}>
          작성 완료
        </button>
      </div>
    </form>
  );
}
