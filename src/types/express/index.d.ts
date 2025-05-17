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
