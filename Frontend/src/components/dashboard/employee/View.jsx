import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const View = () => {
    const { id } = useParams()
    const [employee, setEmployee] = useState(null)

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
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.log(error.response);
                }
            }
        };
        if (id) {
            fetchEmployees();
        }
    }, [id]);
    return (
        <>{employee ? (
            <div className="max-w-3xl mx-auto mt-7 bg-white rounded-xl shadow-md p-8 space-y-8">
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Yuvak Details</h3>
                    <div className="flex justify-center">
                        {employee.userId?.profileImage ? (
                            <img
                                src={`http://localhost:5000/${employee.userId?.profileImage}`}
                                alt="Employee"
                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                            />
                        ) : (
                            <div className="w-32 h-32 text-[30px] rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                                {employee.userId?.name?.charAt(0).toUpperCase()}
                            </div>
                        )}

                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Name</p>
                        <p className="text-lg">{employee.userId?.name}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-500">Employee ID</p>
                        <p className="text-lg">{employee.employeeId}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-500">Department</p>
                        <p className="text-lg">{employee.department?.dep_name}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-500">Gender</p>
                        <p className="text-lg">{employee.gender}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-500">Marital Status</p>
                        <p className="text-lg">{employee.maritalStatus}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-500">Date of Birth</p>
                        <p className="text-lg">{new Date(employee.dob).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        ) : (<div>Loading...</div>)}</>
    )
}

export default View