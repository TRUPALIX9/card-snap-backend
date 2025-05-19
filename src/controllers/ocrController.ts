import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { createWorker } from "tesseract.js";
import { PdfConverter } from "pdf-poppler"; // ✅ correct import

export const handleOCR = async (req: Request, res: Response): Promise<void> => {
  const file = req.file;

  if (!file) {
    res.status(400).json({ error: "File is required" });
    return;
  }

  const ext = path.extname(file.originalname).toLowerCase();
  const isImage = [".jpg", ".jpeg", ".png", ".bmp", ".tiff"].includes(ext);
  const isPDF = ext === ".pdf";

  const worker = await createWorker("eng");

  try {
    let ocrText = "";

    if (isImage) {
      const {
        data: { text },
      } = await worker.recognize(file.path);
      ocrText = text;
    } else if (isPDF) {
      const outputDir = "uploads";
      const outputPath = path.join(outputDir, `${file.filename}-1.png`);

      const converter = new PdfConverter(file.path); // ✅ use class correctly
      await converter.convert({
        format: "png",
        out_dir: outputDir,
        out_prefix: file.filename,
        page: 1,
        resolution: 150,
      });

      const {
        data: { text },
      } = await worker.recognize(outputPath);
      ocrText = text;

      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    } else {
      res.status(400).json({ error: "Unsupported file type" });
      return;
    }

    await worker.terminate();
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

    res.json({
      message: "OCR completed",
      fileType: isImage ? "image" : "pdf",
      text: ocrText.trim(),
    });
  } catch (err) {
    await worker.terminate();
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    res.status(500).json({ error: "OCR failed", details: String(err) });
  }
};
