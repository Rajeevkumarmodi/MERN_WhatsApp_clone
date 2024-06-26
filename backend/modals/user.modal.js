import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    about: {
      type: String,
    },
    password: {
      type: String,
    },
    googleId: String,
    profilePic: String,
  },
  { timestamps: true }
);

const User = new mongoose.model("user", userSchema);

export default User;
