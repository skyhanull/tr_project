// models/User.ts

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String },
  name: { type: String },
  image: { type: String },
  code: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
