import React from 'react'
import { Link } from 'react-router-dom'

const List = () => {
  return (
    <div>
        <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Manage Employees
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Search by department name"
              className="w-full sm:w-auto flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            //   onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-employee"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg text-center"
            >
              Add New Employee
            </Link>
          </div>
    </div>
  )
}

export default List