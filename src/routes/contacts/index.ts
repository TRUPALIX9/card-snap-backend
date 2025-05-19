import express from "express";
import {
  getAllContacts,
  createContact,
} from "../../controllers/contactController";

const router = express.Router();

router.get("/", getAllContacts);
router.post("/", createContact);

export default router;
