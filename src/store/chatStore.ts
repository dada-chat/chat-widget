import { create } from "zustand";
import type { Message } from "../types/chat";
import type { ChattingRoomStatus } from "../types/common";

interface Visitor {
  id: string;
  name: string;
  email: string;
}

interface ChatState {
  roomId: string | null;
  visitor: Visitor | null;
  messages: Message[];
  chattingroomStatus: ChattingRoomStatus;

  hasMore: boolean;
  nextCursor: Date | null;
  isLoadingPrev: boolean;

  setIsLoadingPrev: (value: boolean) => void;
  setChattingroomStatus: (value: ChattingRoomStatus) => void;

  setSession: (
    roomId: string,
    visitor: Visitor,
    chattingroomStatus: ChattingRoomStatus
  ) => void;

  setMessages: (payload: {
    messages: Message[];
    hasMore: boolean;
    nextCursor: Date | null;
  }) => void;
  addMessage: (message: Message) => void;

  prependMessages: (
    messages: Message[],
    hasMore: boolean,
    nextCursor: Date | null
  ) => void;

  reset: () => void;
}
export const useChatStore = create<ChatState>((set) => ({
  roomId: null,
  visitor: null,
  messages: [],
  chattingroomStatus: "OPEN",

  hasMore: true,
  nextCursor: null,
  isLoadingPrev: false,

  setChattingroomStatus: (value) =>
    set({
      chattingroomStatus: value,
    }),

  setIsLoadingPrev: (value) =>
    set({
      isLoadingPrev: value,
    }),

  setSession: (roomId, visitor, chattingroomStatus) =>
    set({
      roomId,
      visitor,
      chattingroomStatus,
    }),

  setMessages: ({ messages, hasMore, nextCursor }) =>
    set({ messages, hasMore, nextCursor }),
  addMessage: (message) =>
    set((state) => ({
      messages: [message, ...state.messages],
    })),

  prependMessages: (prev, hasMore, nextCursor) =>
    set((state) => ({
      messages: [...state.messages, ...prev],
      hasMore,
      nextCursor,
    })),

  reset: () =>
    set({
      roomId: null,
      visitor: null,
      messages: [],
      chattingroomStatus: "OPEN",
      hasMore: true,
      isLoadingPrev: false,
      nextCursor: null,
    }),
}));
