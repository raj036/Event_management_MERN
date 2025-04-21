import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/department/add",
        department,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response)
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response.data);
      }
    }
    // Add your API call here to submit the department data
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-2xl max-w-xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Add Department</h3>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label
            htmlFor="departmentName"
            className="mb-1 text-gray-700 font-medium"
          >
            Department Name
          </label>
          <input
            type="text"
            id="departmentName"
            name="dep_name"
            placeholder="Enter Department Name"
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mb-1 text-gray-700 font-medium"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter Description"
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="mt-4 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
