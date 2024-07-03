import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "must provide name"],
      trim: true,
      maxLength: [20, "title can not exceed 20 characters"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Tasks = model("Task", taskSchema);
