// middleware/auth.ts
import { Request, Response, NextFunction } from "express";

const auth = (
  req: Request & { user?: { _id: string } },
  res: Response,
  next: NextFunction
): void => {
  req.user = {
    _id: "682421ddd10e833ffef6528e", // mock user ID
  };
  next();
};

export default auth;
