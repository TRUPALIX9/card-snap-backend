import express, { Request, Response } from "express";
import Contact from "../models/Contact";

const router = express.Router();

// GET all contacts (no user filter)
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find(); // ← no userId filter
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve contacts" });
  }
});

// POST create contact
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(400).json({ message: "Failed to create contact" });
  }
});

// DELETE contact by ID
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete contact" });
  }
});

export default router;
