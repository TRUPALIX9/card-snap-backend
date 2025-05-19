// // OCR Business Card Extractor API Handler using NLP with TypeScript Types

// import express, { Request, Response } from "express";
// import multer from "multer";
// import fs from "fs";
// import path from "path";
// import { createWorker } from "tesseract.js";
// import { PdfConverter } from "pdf-poppler";
// import nlp from "compromise";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// interface BusinessCard {
//   name: string | null;
//   email: string | null;
//   phone: string[];
//   company: string | null;
//   website: string | null;
//   address: string | null;
//   description: string | null;
//   raw_text: string;
// }

// async function extractTextFromImage(imagePath: string): Promise<string> {
//   const worker = await createWorker("eng");
//   const {
//     data: { text },
//   } = await worker.recognize(imagePath);
//   await worker.terminate();
//   return text;
// }

// function parseBusinessCardData(text: string): BusinessCard {
//   const lines = text
//     .split("\n")
//     .map((l) => l.trim())
//     .filter(Boolean);
//   const doc = nlp(text);

//   const result: BusinessCard = {
//     name: null,
//     email: null,
//     phone: [],
//     company: null,
//     website: null,
//     address: null,
//     description: null,
//     raw_text: text,
//   };

//   const people = doc.people().out("array");
//   const orgs = doc.organizations().out("array");
//   const urls = doc.match("#Url").out("array");
//   const emails = doc.match("#Email").out("array");
//   const phones = doc.match("#PhoneNumber").out("array");
//   const addresses = doc.places().out("array");

//   result.name = people.length > 0 ? people[0] : null;
//   result.company = orgs.length > 0 ? orgs[0] : null;
//   result.website = urls.length > 0 ? urls[0] : null;
//   result.email = emails.length > 0 ? emails[0] : null;
//   result.phone = phones;
//   result.address = addresses.length > 0 ? addresses.join(", ") : null;

//   const known = [
//     result.name,
//     result.email,
//     result.company,
//     result.website,
//     result.address,
//     ...result.phone,
//   ];
//   const descriptionLines = lines.filter(
//     (line) => !known.some((k) => k && line.includes(k))
//   );
//   result.description = descriptionLines.slice(0, 3).join(". ");

//   return result;
// }

// async function handlePDF(pdfPath: string): Promise<BusinessCard[]> {
//   const imagesDir = "./tmp";
//   fs.mkdirSync(imagesDir, { recursive: true });

//   const converter = new PdfConverter();
//   await converter.convert(pdfPath, {
//     format: "jpeg",
//     out_dir: imagesDir,
//     out_prefix: "page",
//     scale: 300,
//   });

//   const pages = fs
//     .readdirSync(imagesDir)
//     .filter((f) => f.endsWith(".jpg"))
//     .sort();
//   const results: BusinessCard[] = [];

//   for (const img of pages) {
//     const imgPath = path.join(imagesDir, img);
//     const text = await extractTextFromImage(imgPath);
//     results.push(parseBusinessCardData(text));
//     fs.unlinkSync(imgPath);
//   }

//   return results;
// }

// // Route: POST /api/ocr/extract
// router.post(
//   "/api/ocr/extract",
//   upload.single("file"),
//   async (req: Request, res: Response): Promise<void> => {
//     try {
//       const filePath = req.file?.path;
//       const mimetype = req.file?.mimetype;
//       if (!filePath || !mimetype) {
//         res.status(400).json({ error: "No file uploaded" });
//         return;
//       }

//       let results: BusinessCard[] = [];

//       if (mimetype === "application/pdf") {
//         results = await handlePDF(filePath);
//       } else if (mimetype.startsWith("image/")) {
//         const text = await extractTextFromImage(filePath);
//         results = [parseBusinessCardData(text)];
//       } else {
//         res.status(400).json({ error: "Unsupported file type" });
//         return;
//       }

//       fs.unlinkSync(filePath);
//       res.json({ success: true, cards: results });
//     } catch (err: any) {
//       console.error(err);
//       res.status(500).json({ success: false, error: err.message });
//     }
//   }
// );

// export default router;
import express from "express";
import { handleBase64OCR } from "../../controllers/ocrController";

const router = express.Router();
router.post("/", handleBase64OCR);
export default router;
