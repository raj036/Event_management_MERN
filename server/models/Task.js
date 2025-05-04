import { response } from "express";
import mongoose from "mongoose";
import { Schema } from "mongoose";
import { userSchema } from "./User.js";

const ResponseSchema = new mongoose.Schema({
  user_id: { type: String, },
  response: { type: Boolean, },
})
const taskSchema = new mongoose.Schema({
  task_name: { type: String, required: true },
  task_date: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  response: [{
    user_id: { type: String },
    response: { type: Boolean, },
  }]
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
