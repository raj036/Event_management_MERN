import React, { useEffect, useState } from "react";
import axios from "axios";

const UserSummary = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState({}); // Store taskId: "yes" or "no"

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/task", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setTasks(response.data.employees || []);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAttendanceChange = (taskId, value) => {
    setAttendance((prev) => ({ ...prev, [taskId]: value }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Tasks Summary</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading tasks...</div>
      ) : tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white shadow-md rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-gray-800">{task.task_name}</h3>
              <p className="text-sm text-gray-600 mt-2">
                Task Date:{" "}
                {task.task_date && task.task_date.length > 0
                  ? new Date(task.task_date[0]).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Created At: {new Date(task.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Are you attending?
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`attendance-${task._id}`}
                      value="yes"
                      checked={attendance[task._id] === "yes"}
                      onChange={() => handleAttendanceChange(task._id, "yes")}
                      className="mr-1"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`attendance-${task._id}`}
                      value="no"
                      checked={attendance[task._id] === "no"}
                      onChange={() => handleAttendanceChange(task._id, "no")}
                      className="mr-1"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500">No tasks found.</div>
      )}
    </div>
  );
};

export default UserSummary;
