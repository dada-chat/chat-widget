import {
  type ChattingRoomResponse,
  type WidgetInitResponse,
  type MessagesResponse,
  MessageResponse,
} from "../types/api";
import { widgetApi } from "./axios";

// 위젯 사용 가능 여부 확인
export const checkWidgetInit = async () => {
  try {
    const response = await widgetApi.get<WidgetInitResponse>("/widget/config");
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
      "/widget/init",
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
export const getMessages = async (conversationId: string) => {
  try {
    const response = await widgetApi.get<MessagesResponse>(
      `/widget/${conversationId}`
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      data: [],
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
      `/widget/${conversationId}/message`,
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
