import React from "react";
import { Link } from "react-router-dom";

const DepartmentList = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-2xl">
    <div className="mb-6">
      <h3 className="text-2xl font-bold text-gray-800">Manage Department</h3>
    </div>

    <div className="flex flex-col sm:flex-row items-center gap-4">
      <input
        type="text"
        placeholder="Search by department name"
        className="w-full sm:w-auto flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <Link
        to="/admin-dashboard/add-department"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg text-center"
      >
        Add New Department
      </Link>
    </div>
  </div>
  );
};

export default DepartmentList;
