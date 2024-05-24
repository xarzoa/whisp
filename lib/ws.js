import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_WS, {
  path: process.env.NEXT_PUBLIC_WS_PATH,
});

socket.on("connect", () => {
  console.log("Connected.");
});

export { socket };
