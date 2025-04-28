import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const [employee, setEmployee] = useState({
        name: "",
        maritalStatus: "",
        designation: "",
        salary: 0,
        department: "",
    });
    const [departments, setDepartments] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/employee/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                console.log(response.data, 'api response')
                if (response.data.success) {
                    const employeeData = response.data.employee;
                    setEmployee((prev) => ({
                        ...prev,
                        name: employeeData.userId.name,
                        maritalStatus: employeeData.maritalStatus,
                        designation: employeeData.designation,
                        salary: employeeData.salary,
                        department: employeeData.department,
                    }));
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.log(error.response);
                }
            }
        };
        fetchEmployees();

    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        setEmployee((prev) => ({ ...prev, [name]: value }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:5000/api/employee/${id}`,
                employee,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log(response)
            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                console.log(error.response.data);
            }
        }

    }

    return (
        <>{departments && employee ? (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                        Edit Employee
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
                                value={employee.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>


                        <div>
                            <label className="block mb-1 text-gray-700">Marital status</label>
                            <select
                                name="maritalStatus"
                                value={employee.maritalStatus}
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
                                value={employee.designation}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>



                        <div>
                            <label className="block mb-1 text-gray-700">Salary</label>
                            <input
                                type="number"
                                name="salary"
                                value={employee.salary}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block mb-1 text-gray-700">Department</label>
                            <select
                                name="department"
                                value={employee.department}
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

                        <div className="md:col-span-2 text-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
                            >
                                Edit Employee
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ) : (<div>Loading...</div >)
        }</>
    );
};

export default Edit;
