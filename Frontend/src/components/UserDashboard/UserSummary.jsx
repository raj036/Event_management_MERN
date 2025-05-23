import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import "./UserSummary.css"; // Import your CSS file

const UserSummary = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState({}); // Store taskId: "yes" or "no"
  const { user } = useAuth();
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/task/data",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/task/68150499f553a9ca7e4291ee/response",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);

      // if (response.data.success) {
      //   navigate("/admin-dashboard/employees");
      // }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response.data);
      }
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  // Remove the hardcoded userId
  // const userId = "680cdf2c896f62f8fe69b120";

  const handleAttendanceChange = (taskId, value) => {
    setSelectedTask(taskId);
    setSelectedValue(value);
    setShowPopup(true);
  };

  const handlePopupConfirm = async () => {
    setShowPopup(false);
    setAttendance((prev) => ({ ...prev, [selectedTask]: selectedValue }));

    try {
      // Use user?._id from authContext and pass it in the query params
      const response = await axios.post(
        `http://localhost:5000/api/task/${selectedTask}/response/${user?._id}`,
        {
          response: selectedValue === "yes" ? true : false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      // Optionally show a success message or update UI
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response.data);
      }
    }
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
    setSelectedTask(null);
    setSelectedValue(null);
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
              <h3 className="text-lg font-bold text-gray-800">
                {task.task_name}
              </h3>
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
                <div className="container">
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      className="checkbox"
                      // name={label}
                      // id={label}
                    />
                    <label className="label">
                      <span className="inner" />
                      <span className="switch" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500">No tasks found.</div>
      )}

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4">
              Are you sure you want to submit your response as{" "}
              <span className="font-bold">
                {selectedValue === "yes" ? "Yes" : "No"}
              </span>
              ?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={handlePopupCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handlePopupConfirm}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSummary;
