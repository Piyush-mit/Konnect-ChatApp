import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
export declare let io: Server;
export declare const initSocket: (server: HttpServer) => void;
export declare const getReceiverSocketId: (receiverId: string) => string | undefined;
//# sourceMappingURL=socket.d.ts.map