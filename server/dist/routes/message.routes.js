"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const express_1 = require("express");
const user_middleware_1 = require("../middlewares/user.middleware");
const message_controller_1 = require("../controllers/message.controller");
exports.messageRouter = (0, express_1.Router)();
exports.messageRouter.post("/send/:id", user_middleware_1.requireAuth, message_controller_1.sendMessage);
exports.messageRouter.get("/:id", user_middleware_1.requireAuth, message_controller_1.getMessage);
//# sourceMappingURL=message.routes.js.map