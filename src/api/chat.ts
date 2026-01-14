import type {
  ChattingRoomResponse,
  WidgetInitResponse,
  MessagesResponse,
  MessageResponse,
} from "../types/api";
import { widgetApi } from "./axios";

// 위젯 사용 가능 여부 확인
export const checkWidgetInit = async () => {
  try {
    const response = await widgetApi.get<WidgetInitResponse>(
      "/api/widget/config"
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      data: {},
    };
  }
};

// 채팅방 생성/접속
export const joinChattingRoom = async (data: {
  name: string;
  email: string;
}) => {
  try {
    const response = await widgetApi.post<ChattingRoomResponse>(
      "/api/widget/init",
      {
        name: data.name,
        email: data.email,
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
};

// 메세지 조회
export const getMessages = async (
  conversationId: string,
  cursor?: Date,
  limit: number = 30
) => {
  try {
    const response = await widgetApi.get<MessagesResponse>(
      `/api/widget/${conversationId}`,
      {
        params: {
          ...(cursor && { cursor }),
          limit,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      data: {
        conversationStatus: "OPEN",
        messageCursorResult: {
          messages: [],
          hasMore: false,
          nextCursor: null,
        },
      },
    };
  }
};

// 메세지 전송
export const sendMessage = async (
  conversationId: string,
  visitorId: string,
  content: string
) => {
  try {
    const response = await widgetApi.post<MessageResponse>(
      `/api/widget/${conversationId}/message`,
      {
        visitorId,
        content,
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      data: [],
    };
  }
};
