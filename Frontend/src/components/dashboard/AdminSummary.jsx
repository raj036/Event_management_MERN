import React from "react";
import SumaaryCard from "./SumaaryCard";
import { FaUser } from "react-icons/fa";

const AdminSummary = () => {
  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-6">Dashboard Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <SumaaryCard icon={<FaUser />} text="Total Yuvak" number={100} />
        <SumaaryCard icon={<FaUser />} text="Total Departments" number={80} />
        {/* <SumaaryCard icon={<FaUser />} text="Monthly Salary" number={20} /> */}
      </div>

      {/* <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Leave Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SumaaryCard icon={<FaUser />} text="Leave Applied" number={5} />
          <SumaaryCard icon={<FaUser />} text="Leave Approved" number={2} />
          <SumaaryCard icon={<FaUser />} text="Leave Pending" number={4} />
          <SumaaryCard icon={<FaUser />} text="Leave Rejected" number={1} />
        </div>
      </div> */}
    </div>
  );
};

export default AdminSummary;
