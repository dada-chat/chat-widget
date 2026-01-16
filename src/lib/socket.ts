// src/lib/socket.ts
import { io, Socket } from "socket.io-client";
import { getRuntimeConfig } from "../config/runtimeConfig";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    const { socketUrl } = getRuntimeConfig();
    socket = io(socketUrl!, {
      transports: ["websocket"],
      autoConnect: false,
    });
  }
  return socket;
};
