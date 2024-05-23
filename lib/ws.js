import { io } from "socket.io-client";

const newLocal = io(process.env.NEXT_PUBLIC_WS, {
  path: process.env.NEXT_PUBLIC_WS_PATH,
});

const socket = newLocal;

socket.on("connect", () => {
  console.log("Connected.");
});

function sendMessage(message, room) {
  socket.emit("message", message, room);
}

function joinRoom(room) {
  socket.emit("join", room);
  console.log("Joined", room);
}

function getMessage() {
  const message = socket.on("message", (message) => message);
  return message;
}

export { sendMessage, joinRoom, getMessage, socket };
