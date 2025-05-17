import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (_req: Request, res: Response): void => {
  res.json({
    status: "ok",
    message: "Card Vault API is live ✅",
    timestamp: new Date().toISOString(),
  });
});

export default router;
