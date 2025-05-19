import mongoose from "mongoose";
import Contact from "../models/Contact";
import { ExpressHandler } from "../@types/express"; // ✅ your custom type

// GET /api/contacts
export const getAllContacts: ExpressHandler = async (_req, res) => {
  try {
    const contacts = await Contact.find();
    return res.json(contacts);
  } catch (err) {
    return res.status(500).json({ message: "Failed to retrieve contacts" });
  }
};

// POST /api/contacts
export const createContact: ExpressHandler = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    return res.status(201).json(savedContact);
  } catch (err) {
    return res.status(400).json({ message: "Failed to create contact" });
  }
};

// GET /api/contacts/:id
export const getContactById: ExpressHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID" });
  }

  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.json(contact);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch contact" });
  }
};

// PUT /api/contacts/:id
export const updateContactById: ExpressHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID" });
  }

  try {
    const updated = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: "Failed to update contact" });
  }
};

// DELETE /api/contacts/:id
export const deleteContactById: ExpressHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID" });
  }

  try {
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete contact" });
  }
};
