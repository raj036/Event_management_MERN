import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { EmployeeButtons, columns } from '../../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import axios from 'axios'

const List = () => {

  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data, 'api response')
        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => (console.log(emp), {
            _id: emp._id,
            dep_name: emp.department.dep_name,
            sno: sno++,
            name: emp.userId?.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: emp.userId?.profileImage ? (
              <img className='rounded-lg h-9 w-9' src={`http://localhost:5000${emp.userId.profileImage}`} alt='phot' />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                {emp.userId?.name?.charAt(0).toUpperCase()}
              </div>
            ),
            action: (<EmployeeButtons Id={emp._id} />),
          }));
          console.log(data)
          setEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className='p-6 bg-white shadow-md rounded-2xl'>
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
      <div>
        <DataTable columns={columns} data={employees} pagination />
      </div>
    </div>
  )
}

export default List