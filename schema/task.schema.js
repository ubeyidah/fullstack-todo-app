import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "must provide name"],
      trim: true,
      maxLength: [20, "can not exceed 20 characters"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const UserModel = model("Task", taskSchema);
