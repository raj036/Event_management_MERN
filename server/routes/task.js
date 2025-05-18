import express from "express";
import authMiddleware from '../middleware/authMiddleware.js';
import { getTasks, addTask, taskResponse, getTaskData } from "../controllers/taskController.js";

const router = express.Router()

router.get("/", getTasks)
router.post("/add", authMiddleware, addTask)
router.post("/:taskId/response/:userId", authMiddleware, taskResponse)
router.get("/data", authMiddleware, getTaskData)

export default router