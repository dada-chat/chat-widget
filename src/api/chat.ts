import type { ChattingRoomResponse, WidgetInitResponse } from "../types/api";
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
  const response = await widgetApi.post<ChattingRoomResponse>("/widget/init", {
    name: data.name,
    email: data.email,
  });
  return response.data;
};
