// src/lib/socket.ts
import { io, Socket } from "socket.io-client";
import { getWidgetConfig } from "../config/widgetConfig";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    const { socketUrl } = getWidgetConfig();
    socket = io(socketUrl!, {
      transports: ["websocket"],
      autoConnect: false,
    });
  }
  return socket;
};
