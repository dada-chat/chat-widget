import React, { useState } from "react";
import FormInput from "./FormInput";
import styles from "./form.module.css";
import clsx from "clsx";
import type { VisitorInfo } from "../api/chat";

export default function VisitorForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const visitor: VisitorInfo = { name, email };
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
        <button type="submit">작성 완료</button>
      </div>
    </form>
  );
}
