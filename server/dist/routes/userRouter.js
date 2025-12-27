"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userMiddleware_1 = require("../middlewares/userMiddleware");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/signup', userController_1.signup);
exports.userRouter.post('/signin', userController_1.signin);
exports.userRouter.post('/logout', userController_1.logout);
exports.userRouter.get('/users', userMiddleware_1.verifyToken, userController_1.findOtherUsers);
//# sourceMappingURL=userRouter.js.map