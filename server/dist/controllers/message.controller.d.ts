import { Response } from "express";
import { AuthRequest } from "../middlewares/user.middleware";
export declare const sendMessage: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMessage: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=message.controller.d.ts.map