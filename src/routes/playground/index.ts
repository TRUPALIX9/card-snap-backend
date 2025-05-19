import express from "express";
import {
  getApiStatus,
  getSystemInfo,
  getDatabaseInfo,
  getEnvironmentVariables,
  simulateEnvUpdate,
} from "../../controllers/playgroundController";

const router = express.Router();

router.get("/status", getApiStatus); // GET /api/playground/status
router.get("/system", getSystemInfo); // GET /api/playground/system
router.get("/db", getDatabaseInfo); // GET /api/playground/db
router.get("/env", getEnvironmentVariables); // GET /api/playground/env
router.put("/env", simulateEnvUpdate); // PUT /api/playground/env

export default router;
