import React from "react";
import { useAuth } from "../context/authContext";
import UserSidebar from "../components/UserDashboard/UserSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";

const EmployeeDashboard = () => {
  const { user , loading} = useAuth();
  const navigate = useNavigate();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    navigate("/login");
  }
  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-1  bg-gray-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
