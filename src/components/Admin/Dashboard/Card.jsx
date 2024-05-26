import React from "react";
import { MdCheckCircle, MdError } from "react-icons/md";

const StatusComponent = ({ title, value, change, icon }) => {
  return (
    <div className="flex items-center space-x-2 rounded-lg shadow-lg bg-white">
      <div
        className={`text-xl ${
          icon === "success" ? "text-green-500" : "text-red-500"
        }`}
      >
        {icon === "success" ? <MdCheckCircle /> : <MdError />}
      </div>
      <div>
        <p className="text-lg font-bold">{title}</p>
        <p className="text-gray-500">
          {value} {change}
        </p>
      </div>
    </div>
  );
};

export default StatusComponent;
