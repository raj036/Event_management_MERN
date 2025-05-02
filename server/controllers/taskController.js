import Task from "../models/Task.js";

const getTasks = async (req, res) => {
  try {
    const employees = await Task.find()
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employees server error" });
  }
};

const addTask = async (req, res) => {
  try {
    console.log(req.user, 'role')
    const roleBasedAccess = req.user?.role === "admin";
    console.log(roleBasedAccess, 'roleBasedAccess')
    if (!roleBasedAccess) {
      return res.status(403).json({ success: false, error: "Access denied" });
    }

    const { task_name, task_date } = req.body;
    const newTask = new Task({
      task_name, task_date
    });
    await newTask.save();
    return res.status(200).json({ success: true, task: newTask });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add task server error" });
  }
};


export { getTasks, addTask }