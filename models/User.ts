import { model, Schema } from "mongoose";

import { IUser } from "../types";

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  createdAt: String,
});

export const User = model<IUser>("User", userSchema);
