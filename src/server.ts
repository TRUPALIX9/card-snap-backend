import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import os from "os";
import axios from "axios";

// Route imports
import userRoutes from "./routes/user";
import contactsRoutes from "./routes/contacts/index";
import contactIdRoutes from "./routes/contacts/[id]";
import playgroundRoutes from "./routes/playground/index";
import ocrRoutes from "./routes/ocr/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5091;
const MONGO_URI = process.env.MONGO_URI || "";

// Enable CORS
app.use(cors());

// Parse incoming JSON
app.use(express.json());

// ✅ Request + Response Logger Middleware
app.use((req, res, next) => {
  const chunks: any[] = [];
  const originalJson = res.json;
  const shouldLogResponse = process.env.LOG_RESPONSE === "true";
  const start = Date.now();

  res.json = function (body: any) {
    if (shouldLogResponse) {
      chunks.push(body); // Capture response body if enabled
    }
    res.json = originalJson;
    return res.json(body);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;

    console.log("──────────────────────────────");
    console.log(
      `[${req.method}] ${req.originalUrl} → ${res.statusCode} (${duration}ms)`
    );
    console.log("From:", req.ip);
    if (shouldLogResponse) {
      console.log("Request Body:", req.body);

      console.log("Response Body:", chunks[0]);
    }
    console.log("──────────────────────────────");
  });

  next();
});

// ✅ Mount Routes
app.use("/api/contacts", contactsRoutes); // GET, POST
app.use("/api/contacts", contactIdRoutes); // GET /:id, PUT, DELETE
app.use("/api/user", userRoutes);
app.use("/api/playground", playgroundRoutes); // /status, /env, /system, /db
app.use("/api/ocr", ocrRoutes);

// 🔍 Get local IP for network URL
function getLocalIP(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]!) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

// 🧪 Call playground APIs on startup
const callPlaygroundAPIs = async (port: string | number) => {
  const base = `http://localhost:${port}/api/playground`;
  const routes = ["/status", "/env", "/system", "/db"];

  for (const route of routes) {
    try {
      const res = await axios.get(`${base}${route}`);
      console.log(`✅ [Playground GET ${route}]`, res.data);
    } catch (err: any) {
      console.error(`❌ Failed to GET ${route}`, err.message);
    }
  }
};

// 🚀 Connect and launch server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    const localIP = getLocalIP();
    console.log("✅ MongoDB connected");

    app.listen(PORT, async () => {
      console.log(`🚀 Server running:`);
      console.log(
        `   → Local:   http://localhost:${PORT}/api/playground/status`
      );
      console.log(
        `   → Network: http://${localIP}:${PORT}/api/playground/status`
      );

      // Trigger playground route calls
      await callPlaygroundAPIs(PORT);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
