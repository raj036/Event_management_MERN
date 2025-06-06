import Task from "../models/Task.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const jwt = require("jsonwebtoken");

const getTasks = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) {
      return res.status(401).json({ success: false, error: "Token not provided" });
    }
    let user;
    try {
      user = jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }
    const employees = await Task.find();
    const headers = {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    };
    res.writeHead(200, headers);
    const intervalId = setInterval(() => {
      res.write("data: " + JSON.stringify({ employees }) + "\n\n");
    }, 1000);

    req.on("close", () => {
      clearInterval(intervalId);
      res.end();
    });

  } catch (error) {
    // return res
    //   .status(500)
    //   .json({ success: false, error: "get tasks server error" });
  }
};

const addTask = async (req, res) => {
  try {
    // console.log(req.user, "role");
    const roleBasedAccess = req.user?.role === "admin";
    // console.log(roleBasedAccess, "roleBasedAccess");
    if (!roleBasedAccess) {
      return res.status(403).json({ success: false, error: "Access denied" });
    }

    const { task_name, task_date } = req.body;
    const newTask = new Task({
      task_name,
      task_date,
    });
    console.log(newTask, "newTask");
    await newTask.save();
    return res.status(200).json({ success: true, task: newTask });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "add task server error" });
  }
};

const getTaskData = async (req, res) => {
  console.log(res, 'data')
  try {
    const employees = await Task.find();
    // if (!task) {
    //   return res.status(404).json({ success: false, error: "Task not found" });
    // }
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employees server error" });
  }
}

const taskResponse = async (req, res) => {
  try {
    const { taskId, userId } = req.params;
    const { response } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    // Check if the user already responded
    const existingResponseIndex = task.response.findIndex(
      (resp) => resp.user_id === userId
    );

    if (existingResponseIndex !== -1) {
      // Update the existing response
      task.response[existingResponseIndex].response = response;
    } else {
      // Add a new response
      task.response.push({ user_id: userId, response });
    }

    task.updatedAt = new Date(); // Update the timestamp
    await task.save();

    return res.status(200).json({ success: true, task });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update task response" });
  }
};

export { getTasks, addTask, taskResponse, getTaskData };
