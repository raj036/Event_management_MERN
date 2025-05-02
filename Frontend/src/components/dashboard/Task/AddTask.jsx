import React, { useState } from "react";
import axios from "axios";

const AddTask = () => {
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState({
    task_name: "",
    task_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
    console.log(task, "task");
  };

  const handleSubmit = async (e) => {
    console.log(task, "task");
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/task/add",
        task,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        setShowModal(false);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response);
      }
    }
    // Add your API call here to submit the department data
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-80">
            <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  Task Name
                </label>
                <input
                  type="text"
                  name="task_name"
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Task Date
                </label>
                <input
                  type="date"
                  name="task_date"
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-red-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
