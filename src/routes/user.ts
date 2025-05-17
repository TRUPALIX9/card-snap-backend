import express, { Request, Response } from "express";
import User from "../models/User";

const router = express.Router();

// GET single user (example: just returns the first one)
router.get("/me", async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne().select("fullName email");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
