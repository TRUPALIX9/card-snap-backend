import express from "express";
import {
  getContactById,
  updateContactById,
  deleteContactById,
} from "../../controllers/contactController";

const router = express.Router();

router.get("/:id", getContactById);
router.put("/:id", updateContactById);
router.delete("/:id", deleteContactById);

export default router;
