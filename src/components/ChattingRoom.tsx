import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/chatStore";
import MessageForm from "./MessageForm";
import { formatChatDate } from "../utils/date";
import { ChatMessage } from "./ChatMessage";
import styles from "../widget.module.css";
import { getMessages } from "../api/chat";

export default function ChattingRoom() {
  const { roomId, messages, setMessages, addMessage } = useChatStore();

  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      const result = await getMessages(roomId);
      setMessages(result.data);
    };

    fetchMessages();
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
