import { model, Schema } from "mongoose";
import { USER_ROLE } from "./user.constants";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, required: true, enum: Object.keys(USER_ROLE) },
});
export const User = model<IUser>("User", userSchema);
