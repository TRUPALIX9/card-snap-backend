import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import os from "os";

import contactRoutes from "./routes/contacts";
import userRoutes from "./routes/user";
import statusRoutes from "./routes/status";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5091;
const MONGO_URI = process.env.MONGO_URI || "";

app.use(cors());

// 🟡 Log incoming requests
app.use((req, _res, next) => {
  console.log(`[${req.method}] ${req.originalUrl} from ${req.ip}`);
  next();
});

// ✅ Full CORS allow
app.use(express.json());

// Routes
app.use("/api/status", statusRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/user", userRoutes);

// 🔍 Get local IP
function getLocalIP() {
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

// Connect and launch
mongoose
  .connect(MONGO_URI)
  .then(() => {
    const localIP = getLocalIP();
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running:`);
      console.log(`   → Local:   http://localhost:${PORT}/api/status`);
      console.log(`   → Network: http://${localIP}:${PORT}/api/status`);
    });
    console.log("exited");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
