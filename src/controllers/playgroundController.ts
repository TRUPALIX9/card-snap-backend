import os from "os";
import mongoose from "mongoose";
import { ExpressHandler } from "../@types/express";

// GET /status
export const getApiStatus: ExpressHandler = async (_req, res) => {
  return res.json({
    name: "Card Vault API",
    status: "🟢 running",
    timestamp: new Date().toISOString(),
    port: process.env.PORT || "unknown",
    env: process.env.NODE_ENV || "development",
  });
};

// GET /system
export const getSystemInfo: ExpressHandler = async (_req, res) => {
  return res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: os.uptime(),
    memory: {
      total: `${Math.round(os.totalmem() / 1024 / 1024)} MB`,
      free: `${Math.round(os.freemem() / 1024 / 1024)} MB`,
    },
    timestamp: new Date().toISOString(),
  });
};

// GET /db
export const getDatabaseInfo: ExpressHandler = async (_req, res) => {
  const db = mongoose.connection.db;

  if (!db) {
    return res.status(503).json({ message: "Database not connected" });
  }

  try {
    const collections = await db.listCollections().toArray();

    const info = await Promise.all(
      collections.map(async (col) => {
        const collection = db.collection(col.name);
        const count = await collection.estimatedDocumentCount();
        const sample = await collection.findOne();
        return {
          name: col.name,
          count,
          sample,
          fields: sample ? Object.keys(sample) : [],
        };
      })
    );

    return res.json({
      name: db.databaseName,
      totalCollections: info.length,
      collections: info,
    });
  } catch (err) {
    console.error("DB Info Error:", err);
    return res.status(500).json({ message: "Failed to fetch database info" });
  }
};

// GET /env
export const getEnvironmentVariables: ExpressHandler = async (_req, res) => {
  return res.json({
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || "Not set",
    MONGO_URI: process.env.MONGO_URI || "Not set",
    EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL || "Not set",
  });
};

// PUT /env (simulate)
export const simulateEnvUpdate: ExpressHandler = async (req, res) => {
  const updates = req.body;
  const applied: Record<string, string> = {};

  for (const key in updates) {
    if (typeof updates[key] === "string") {
      process.env[key] = updates[key]; // applies in-memory only
      applied[key] = updates[key];
    }
  }

  return res.json({
    message: "Environment variables updated in memory only.",
    applied,
    note: "To persist, update .env file and restart the server.",
  });
};
