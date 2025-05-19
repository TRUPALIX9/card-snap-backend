import express from "express";
import { handleOcrExtract } from "../../controllers/ocrWirhExtractController";
const router = express.Router();

router.post("/", handleOcrExtract);

export default router;
