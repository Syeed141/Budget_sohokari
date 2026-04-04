import mongoose, { Model, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  city?: string;
  profession?: string;
  monthlyIncome?: number;
  monthlySavingsGoal?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      default: "Dhaka",
      trim: true,
    },
    profession: {
      type: String,
      default: "",
      trim: true,
    },
    monthlyIncome: {
      type: Number,
      default: 0,
      min: 0,
    },
    monthlySavingsGoal: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;