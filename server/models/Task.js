import mongoose from "mongoose";
import { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
  task_name: { type: String, required: true },
  task_date: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
