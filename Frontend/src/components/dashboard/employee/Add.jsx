import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../../utils/EmployeeHelper";
import axios from "axios";

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key])
    })
    try {
        const response = await axios.post(
          "http://localhost:5000/api/employee/add",
          formDataObj,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response)
        if (response.data.success) {
          navigate("/admin-dashboard/emplouyees");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data);
        }
      }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add New Employee
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block mb-1 text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              //   value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              //   value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Employee ID</label>
            <input
              type="tel"
              name="employeeID"
              //   value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              //   value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Gender</label>
            <select
              name="gender"
              // value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Marital status</label>
            <select
              name="maritalStatus"
              // value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              //   value={formData.joiningDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Department</label>
            <select
              name="department"
              // value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Salary</label>
            <input
              type="text"
              name="salary"
              //   value={formData.joiningDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              //   value={formData.joiningDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Role</label>
            <select
              name="role"
              // value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Upload Image</label>
            <input
              type="file"
              name="image"
              //   value={formData.joiningDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              accept="image/*"
            />
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
