"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = require("dotenv");
const database_1 = __importDefault(require("./config/database"));
const user_routes_1 = require("./routes/user.routes");
const message_routes_1 = require("./routes/message.routes");
const http_1 = __importDefault(require("http"));
const socket_1 = require("./socket/socket");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const clientURL = process.env.CLIENT_URL;
const REQUIRED_ENV_VARIABLES = ["MONGO_URL", "JWT_SECRET", "PORT", "CLIENT_URL", "NODE_ENV"];
for (const key of REQUIRED_ENV_VARIABLES) {
    if (!process.env[key]) {
        console.error(`Missing environment variable: ${key}`);
        process.exit(1);
    }
}
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: clientURL
}));
app.use("/user", user_routes_1.userRouter);
app.use("/message", message_routes_1.messageRouter);
const server = http_1.default.createServer(app);
(0, socket_1.initSocket)(server);
const startServer = async () => {
    try {
        await (0, database_1.default)();
        server.listen(PORT, () => {
            console.log("Socket server active");
        });
    }
    catch (error) {
        console.error("Failed to start server", error.message);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map