import type { ChattingRoom, Message } from "./chat";
import type { ChattingRoomStatus } from "./common";

export interface BaseResponse {
  success: boolean;
  message?: string;
}

export interface WidgetInitResponse extends BaseResponse {
  data: {
    organizationId: string;
  };
}

export interface ChattingRoomResponse extends BaseResponse {
  data: ChattingRoom | null;
}

export interface MessagesResponse extends BaseResponse {
  data: {
    conversationStatus: ChattingRoomStatus;
    messageCursorResult: {
      messages: Message[];
      hasMore: boolean;
      nextCursor: Date | null;
    };
  };
}
export interface MessageResponse extends BaseResponse {
  data: Message;
}
