
import mongoose, { Schema, model, models } from "mongoose";

// 1. Define the Schema including the 'role' field
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    employeeNo: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true },
    phone: String, // Store phone number for OTP
    otp: String, // Hashed or raw OTP string
    otpExpiresAt: Date,
    role: {
      type: String,
      enum: ["employee", "admin"],
      default: "employee",
    }, // 👈 THIS FIELD WAS MISSING FROM YOUR SCHEMA!
  },
  { timestamps: true }
);

// 2. IMPORTANT: Delete cached model in development to force Next.js to reload the schema
if (process.env.NODE_ENV === "development" && models.User) {
  delete models.User;
}

const User = models.User || model("User", UserSchema);
export default User;