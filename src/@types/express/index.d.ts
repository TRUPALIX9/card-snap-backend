// types/express/index.d.ts
import { ObjectId } from "mongoose";

declare global {
  namespace Express {
    interface UserPayload {
      _id: string | ObjectId;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

export {};

import { Request, Response } from "express";

// Generic Express handler that returns a Promise<void>
export type ExpressHandler = (req: any, res: any) => Promise<any>;
