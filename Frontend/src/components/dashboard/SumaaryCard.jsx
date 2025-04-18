import React from "react";

const SumaaryCard = ({ icon, text, number }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition">
      <div className="text-4xl text-blue-500">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{text}</p>
        <p className="text-xl font-bold text-gray-800">{number}</p>
      </div>
    </div>
  );
};

export default SumaaryCard;
