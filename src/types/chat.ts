import type { UserRole, SenderType, ChattingRoomStatus } from "./common";

export interface Message {
  id: string;
  content: string;
  senderType: SenderType;
  senderId: string;
  conversationId: string;
  createdAt: Date;
}

export interface Visitor {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface ChattingRoom {
  visitor: Visitor;
  conversation: {
    id: string;
    status: ChattingRoomStatus;
    domainId: string;
    assignedUserId: string;
    firstMessageAt: Date;
    lastMessageAt: Date;
    visitorId: string;
    createdAt: Date;
    updatedAt: Date;
    messages: Message[];
  };
}
