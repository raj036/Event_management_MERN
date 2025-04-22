import React, { act, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]); 

  const onDepartmentDelete =async (id) => {
    const data = departments.filter(dep => dep._id !== id);
    setDepartments(data);
  }
  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/department/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            dep_name: dep.dep_name,
            sno: sno++,
            action: <DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete}/>,
          }));
          setDepartments(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep)=> 
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setFilteredDepartments(records)
    console.log(records)
  }

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-6 bg-white shadow-md rounded-2xl">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Manage Department
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Search by department name"
              className="w-full sm:w-auto flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg text-center"
            >
              Add New Department
            </Link>
          </div>
          <div className="mt-6">
            <DataTable columns={columns} data={filteredDepartments} pagination/>
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
