import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;


    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already registered in emp" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? `/uploads/${req.file.filename}` : "",
    });
    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();
    return res
      .status(200)
      .json({ success: true, message: "Employee added successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "server error in adding employee" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('department')
      .populate('userId', { password: 0 });
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employees server error" });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  console.log(id, 'id');

  if (!id) {
    return res.status(400).json({ success: false, error: "id not found" });
  }

  try {
    const employee = await Employee.findById({ _id: id })
      .populate('userId', { password: 0 })
      .populate('department');

    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "get employee server error" });
  }
};

const updateEmployee = async (req, res) => {
  console.log(req.body, 'body')
  try {
    const { id } = req.params;
    const {
      name,
      maritalStatus,
      designation,
      department,
      salary,
    } = req.body;
    console.log(req.body, 'body')
    const employee = await Employee.findById(id)
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      {
        name,
      }
    );
    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
      maritalStatus,
      designation,
      department,
      salary: Number(salary),
    }, { new: true });

    if (!updatedEmployee || !updatedUser) {
      return res.status(404).json({ success: false, error: "document not found" });
    }

    return res.status(200).json({ success: true, message: "Employee updated successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, error: "update employee server error" });
  }
}

const attendanceMark = async (req, res) => {

  try {
    const { id } = req.params;
    console.log(id)
    const {
      presentDate
    } = req.body;
    console.log(req.body, 'body')

    const updatedUser = await Employee.findOne(
      { employeeId: id },
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, error: "document not found" });
    }

    if (!updatedUser.attendance.includes(presentDate)) {
      updatedUser.attendance.push(presentDate);
      await updatedUser.save();
      // return res.status(400).json({ success: false, error: "Attendance already marked" });
    }

    return res.status(200).json({ success: true, message: "Attendance mark successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, error: "update employee server error" });
  }
}



export { addEmployee, upload, getEmployees, getEmployee, updateEmployee, attendanceMark };
