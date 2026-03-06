/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const socket = io(await import.meta.env.VITE_WEBSOCKET_URL, {
  auth: {
    token: sessionStorage.getItem("TOKEN"),
  },
});
export const WebSocketContext = createContext<Socket>(socket);

export const WebSocketProvider = WebSocketContext.Provider;
