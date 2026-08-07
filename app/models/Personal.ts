

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPersonal extends Document {
  employeeNo: string;
  surname?: string;
  fullName?: string;
  nicNo?: string;
  dateOfBirth?: string;
  gender?: string;
  maritalStatus?: string;
  civilStatus?: string;
  address?: string;
  mobileNo?: string;
  email?: string;
}

const PersonalSchema = new Schema<IPersonal>(
  {
    // Adding userId to the schema resolves strict mode errors
    employeeNo: { type: String, required: true, unique: true, index: true },
    surname: { type: String, default: "" },
    fullName: { type: String, default: "" },
    nicNo: { type: String, default: "" },
    dateOfBirth: { type: String, default: "" },
    gender: { type: String, default: "" },
    maritalStatus: { type: String, default: "" },
    civilStatus: { type: String, default: "" },
    address: { type: String, default: "" },
    mobileNo: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  { timestamps: true }
);

// Delete the model from memory if registered previously with old schema
if (mongoose.models.Personal) {
  delete mongoose.models.Personal;
}

const PersonalModel: Model<IPersonal> =
  mongoose.models.Personal ||
  mongoose.model<IPersonal>("Personal", PersonalSchema, "personal-details");

export default PersonalModel;