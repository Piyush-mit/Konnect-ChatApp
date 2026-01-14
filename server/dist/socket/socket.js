"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReceiverSocketId = exports.initSocket = exports.io = void 0;
const socket_io_1 = require("socket.io");
const userSocketMap = new Map();
const initSocket = (server) => {
    exports.io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true,
        },
    });
    exports.io.on("connection", (socket) => {
        const userId = socket.handshake.auth.userId;
        if (!userId) {
            socket.disconnect();
            return;
        }
        userSocketMap.set(userId, socket.id);
        exports.io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
        socket.on("disconnect", () => {
            userSocketMap.delete(userId);
            exports.io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
        });
    });
};
exports.initSocket = initSocket;
const getReceiverSocketId = (receiverId) => {
    return userSocketMap.get(receiverId);
};
exports.getReceiverSocketId = getReceiverSocketId;
//# sourceMappingURL=socket.js.map