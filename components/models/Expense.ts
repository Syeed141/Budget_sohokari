import mongoose, { Model, Schema, Types } from "mongoose";

export interface IExpense {
  userId: Types.ObjectId;
  title: string;
  amount: number;
  category: string;
  note?: string;
  date: Date;
  isFixed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
      validate: {
        validator: (value: string) => /^[\p{L}\s]+$/u.test(value),
        message: "Title must contain letters only",
      },
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Food",
        "Transport",
        "Rent",
        "Internet",
        "Bills",
        "Shopping",
        "Health",
        "Education",
        "Entertainment",
        "Other",
      ],
    },
    note: {
      type: String,
      default: "",
      trim: true,
      maxlength: 300,
    },
    date: {
      type: Date,
      required: true,
    },
    isFixed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Expense: Model<IExpense> =
  mongoose.models.Expense ||
  mongoose.model<IExpense>("Expense", ExpenseSchema);

export default Expense;
