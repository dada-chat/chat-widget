import { widgetApi } from "./axios";

export interface WidgetInitResponse {
  success: boolean;
  data: {
    organizationId: string;
  };
  message?: string;
}

export interface VisitorInfo {
  name: string;
  email: string;
}

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
