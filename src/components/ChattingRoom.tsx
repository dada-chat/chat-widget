import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/chatStore";
import MessageForm from "./MessageForm";
import { formatChatDate } from "../utils/date";
import { ChatMessage } from "./ChatMessage";
import styles from "../widget.module.css";

export default function ChattingRoom() {
  const { roomId, messages, addMessage } = useChatStore();

  useEffect(() => {
    if (!roomId) return;
  }, [roomId, addMessage]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  const hasMessages = messages && messages.length > 0;
  const displayMessages = hasMessages ? [...messages].reverse() : [];

  return (
    <>
      <div ref={scrollRef} className={styles.chatList}>
        {hasMessages &&
          displayMessages.map((item) => {
            return (
              <ChatMessage
                key={item.id}
                content={item.content}
                time={formatChatDate(item.createdAt)}
                senderType={item.senderType}
              />
            );
          })}
      </div>
      <MessageForm />
    </>
  );
}
