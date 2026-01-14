import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/chatStore";
import MessageForm from "./MessageForm";
import { formatChatDate } from "../utils/date";
import { ChatMessage } from "./ChatMessage";
import styles from "../widget.module.css";
import { getMessages } from "../api/chat";
import { getSocket } from "../lib/socket";
import clsx from "clsx";
import type { ChattingRoomStatus } from "../types/common";

export default function ChattingRoom() {
  const {
    roomId,
    messages,
    setMessages,
    isLoadingPrev,
    hasMore,
    nextCursor,
    addMessage,
    setIsLoadingPrev,
    prependMessages,
    setChattingroomStatus,
  } = useChatStore();

  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      const result = await getMessages(roomId);
      if (result.success) {
        setMessages(result.data.messageCursorResult);
        setChattingroomStatus(
          result.data.conversationStatus as ChattingRoomStatus
        );
      }
    };

    fetchMessages();
  }, [roomId, setMessages]);

  // ---- 여기서부터 스크롤 관련
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    const distanceFromTop =
      target.scrollHeight - target.scrollTop - target.clientHeight;

    // 과거 메시지 쪽에 가까워지면
    if (distanceFromTop < 100 && hasMore && !isLoadingPrev) {
      setIsLoadingPrev(true);

      const result = await getMessages(roomId!, nextCursor!);

      if (result.success) {
        prependMessages(
          result.data.messageCursorResult.messages,
          result.data.messageCursorResult.hasMore,
          result.data.messageCursorResult.nextCursor
        );
      }

      setIsLoadingPrev(false);
    }
  };

  const scrollToLatest = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = 0;
  };

  useEffect(() => {
    scrollToLatest();
  }, []);

  const hasMessages = messages && messages.length > 0;

  // ----  소켓 관련
  useEffect(() => {
    if (!roomId) return;

    const socket = getSocket();

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join_chattingroom", roomId);

    socket.on("message_received", (newMessage) => {
      addMessage(newMessage);
    });

    socket.on("update_conversation_status", ({ status }) => {
      setChattingroomStatus(status);
    });

    return () => {
      socket.off("message_received");
      socket.off("update_conversation_status");
    };
  }, [roomId, addMessage, setChattingroomStatus]);

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={clsx(styles.chatList, styles.chatListReverse)}
      >
        {hasMessages &&
          messages.map((item) => {
            return (
              <ChatMessage
                key={item.id}
                content={item.content}
                time={formatChatDate(item.createdAt)}
                senderType={item.senderType}
              />
            );
          })}

        {isLoadingPrev && (
          <div className={styles.loadingArea}>
            <p>이전 메시지를 불러오는 중…</p>
          </div>
        )}
      </div>
      <MessageForm onSendSuccess={scrollToLatest} />
    </>
  );
}
