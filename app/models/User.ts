
import mongoose, { Schema, model, models } from "mongoose";

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
    collection: "register", // 👈 Forces Mongoose to save data inside the 'register' collection
  }
);

// If the model already exists, use it; otherwise, create a new one.
const User = models.User || model("User", UserSchema);

export default User;