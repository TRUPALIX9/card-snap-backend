export interface IContact {
  _id: string;
  fullName: string;
  email: string;
  company: string;
  jobTitle?: string;
  phone?: string;
  address?: string;
  website?: string;
  linkedin?: string;
  department?: string;
  industry?: string;
  notes?: string;
  imageUri?: string;
  scannedAt?: Date;
  userId?: string;
}
