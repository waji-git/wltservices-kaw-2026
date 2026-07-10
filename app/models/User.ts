
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Prevents duplicate email signups
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

// 🔑 Clean Next.js model validation check with explicit collection enforcement
const User =
  mongoose.models.User || mongoose.model("User", UserSchema, "register");

export default User;