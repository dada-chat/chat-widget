import { create } from "zustand";
import type { Message } from "../types/chat";

interface Visitor {
  id: string;
  name: string;
  email: string;
}

interface ChatState {
  roomId: string | null;
  visitor: Visitor | null;
  messages: Message[];

  setSession: (roomId: string, visitor: Visitor) => void;

  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;

  reset: () => void;
}
export const useChatStore = create<ChatState>((set) => ({
  roomId: null,
  visitor: null,
  messages: [],

  setSession: (roomId, visitor) =>
    set({
      roomId,
      visitor,
    }),

  setMessages: (messages) =>
    set({
      messages,
    }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  reset: () =>
    set({
      roomId: null,
      visitor: null,
    }),
}));
