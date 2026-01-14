import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/user.middleware";
export declare const signup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const signin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const logout: (req: AuthRequest, res: Response) => Response<any, Record<string, any>>;
export declare const findOtherUsers: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const auth: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=user.controller.d.ts.map