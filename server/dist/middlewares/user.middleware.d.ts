import { NextFunction, Request, Response } from "express";
export interface AuthRequest extends Request {
    userId?: string;
}
export declare const requireAuth: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=user.middleware.d.ts.map