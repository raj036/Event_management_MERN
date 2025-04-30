import express from "express";
import authMiddleware from '../middleware/authMiddleware.js';
import { getTasks ,addTask} from "../controllers/taskController.js";

const router = express.Router()

router.get("/", authMiddleware, getTasks)
router.post("/add", authMiddleware, addTask)
// router.get("/:id", authMiddleware, getDepartment)

export default router