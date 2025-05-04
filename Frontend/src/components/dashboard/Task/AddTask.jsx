import React, { useState, useEffect } from "react";
import axios from "axios";

const AddTask = () => {
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState({
    task_name: "",
    task_date: "",
  });

  const [tasksData, setTasksData] = useState([]); // To hold the tasks data
  const [yesCount, setYesCount] = useState(0);  // To store the 'yes' responses count
  const [noCount, setNoCount] = useState(0);   // To store the 'no' responses count

  // Function to count the 'yes' and 'no' responses
  const countResponses = (responses) => {
    let yes = 0;
    let no = 0;
    responses.forEach((response) => {
      if (response.response === true) {
        yes += 1;
      } else {
        no += 1;
      }
    });
    setYesCount(yes);
    setNoCount(no);
  };

  // Fetch the task data when the component mounts
  useEffect(() => {
    // setInterval(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/task", {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response, "response.data.tasks");

        const taskData = response.data.employees; // Assuming the 'employees' array contains tasks
        setTasksData(taskData);

        // Map through each task and count the responses
        taskData.forEach(task => {
          if (task.response) {
            countResponses(task.response); // Count the 'yes' and 'no' responses for each task
          }
        });
      } catch (error) {
        console.log("Error fetching task data:", error);
      }
    };

    fetchTaskData();
    // }, 1000); // This line seems unnecessary and can be removed

  }, []);  // Only fetch once on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
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
        <div className="fixed inset-0 bg-blue-100 bg-opacity-50 flex items-center justify-center z-50">
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

      <div className="mt-4 p-4 border rounded-md bg-gray-100">
        <h3 className="text-lg font-semibold">Tasks List</h3>
        {tasksData.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          tasksData.map((task, index) => (
            <div key={index} className="mb-4">
              <p><strong>Task Name:</strong> {task.task_name}</p>
              <p><strong>Task Date:</strong> {task.task_date}</p>
              <p><strong>Yes Responses:</strong> {yesCount}</p>
              <p><strong>No Responses:</strong> {noCount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddTask;
