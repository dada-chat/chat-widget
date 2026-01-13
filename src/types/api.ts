import type { ChattingRoom } from "./chat";

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
