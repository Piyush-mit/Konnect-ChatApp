import { Server, Socket } from "socket.io";
import type { Server as HttpServer } from "http";

const userSocketMap = new Map<string, string>();

export let io: Server;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    const userId = socket.handshake.auth.userId as string | undefined;

    if (!userId) {
      socket.disconnect();
      return;
    }
    userSocketMap.set(userId, socket.id);
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

    socket.on("disconnect", () => {
      userSocketMap.delete(userId);
      io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    });
  });
};

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap.get(receiverId);
};
