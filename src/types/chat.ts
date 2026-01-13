import type { UserRole, SenderType, ChattingRoomStatus } from "./common";

export interface Domain {
  id: string;
  domainUrl: string;
  siteKey: string;
  isActive: boolean;
  organizationId: string;
  createdAt: string;
}

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

export interface AssignedUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  lastAnsweredAt?: Date;
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
