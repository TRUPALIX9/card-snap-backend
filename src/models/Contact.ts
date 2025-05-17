import mongoose from "mongoose";
import { IContact } from "../../../types/contact";

const ContactSchema = new mongoose.Schema<IContact>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true },
  jobTitle: String,
  phone: String,
  address: String,
  website: String,
  linkedin: String,
  department: String,
  industry: String,
  notes: String,
  imageUri: String,
  scannedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IContact>("Contact", ContactSchema);
