import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { USER_TYPES } from "../lib/constants/enumConstants";
import { UserType } from "../lib/types/types";

interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: UserType;
  wallet: Schema.Types.ObjectId;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(USER_TYPES),
    default: "user",
    required: true,
  },
  wallet: { type: Schema.Types.ObjectId, ref: "Wallet" },
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const User = model<IUser>("User", userSchema);
