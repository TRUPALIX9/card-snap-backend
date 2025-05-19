// src/controllers/ocrController.ts
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { createWorker } from "tesseract.js";
import sharp from "sharp";

export const handleBase64OCR = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { base64 } = req.body;

  if (!base64) {
    res.status(400).json({ error: "Base64 image data is required" });
    return;
  }

  const imageBuffer = Buffer.from(base64, "base64");
  const tempPath = path.join("uploads", `temp-${Date.now()}.png`);
  const processedPath = path.join("uploads", `processed-${Date.now()}.png`);

  try {
    // Preprocess: Convert to grayscale, threshold, rotate if needed
    await sharp(imageBuffer)
      .rotate() // auto-orientation
      .grayscale()
      .resize({ width: 1000 }) // upscale if needed
      .sharpen()
      .toFile(processedPath);

    const worker = await createWorker("eng", 1, {
      logger: (m) => console.log("TESSERACT", m),
    });

    const {
      data: { text },
    } = await worker.recognize(processedPath, {
      rotateAuto: true,
    });

    await worker.terminate();
    // fs.unlinkSync(processedPath);

    res.json({
      message: "OCR completed",
      fileType: "image/png",
      text: text.trim(),
    });
  } catch (err) {
    console.error("OCR failed:", err);
    // if (fs.existsSync(processedPath)) fs.unlinkSync(processedPath);
    res.status(500).json({ error: "OCR failed", details: String(err) });
  }
};
