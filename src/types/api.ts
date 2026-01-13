import type { ChattingRoom, Message } from "./chat";

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
  data: Message[];
}
export interface MessageResponse extends BaseResponse {
  data: Message;
}
