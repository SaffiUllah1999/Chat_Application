import io from "socket.io-client";
import P2P from "socket.io-p2p";
const Socket_Url = "http://172.16.10.58:3000";
const socket = io(Socket_Url);

import React from "react";
import { initialUpdaterRun } from "react-native-reanimated/lib/types/lib/reanimated2/animation";

export default function Socket_Screen() {
  console.log("---------Socket Screen----------");
  const initializeSocket = () => {
    console.log("Initialize");
    try {
      const socket = io(Socket_Url, {
        transports: ["websocket"],
      });

      socket.on("connection", () => console.log("=== Socket Connected ==="));
      socket.on("disconnect", () => console.log("=== Socket Disconnected ==="));
    } catch (error) {
      console.log("Socket Not Initialized", error);
    }
  };

  return initializeSocket();
}
export { socket, io };
