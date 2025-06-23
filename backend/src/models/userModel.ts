import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isDeleted: boolean;
  comparePassword(userPassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  return bcrypt.compare(userPassword, this.password);
};

UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });

export default mongoose.model<IUser>("users", UserSchema);
