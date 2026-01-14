"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_middleware_1 = require("../middlewares/user.middleware");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/signup', user_controller_1.signup);
exports.userRouter.post('/signin', user_controller_1.signin);
exports.userRouter.post('/logout', user_middleware_1.requireAuth, user_controller_1.logout);
exports.userRouter.get('/otherusers', user_middleware_1.requireAuth, user_controller_1.findOtherUsers);
exports.userRouter.get("/me", user_middleware_1.requireAuth, user_controller_1.auth);
//# sourceMappingURL=user.routes.js.map