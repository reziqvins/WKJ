import React from "react";
import { MdCheckCircle, MdError, MdPerson, MdShoppingCart, MdStore } from "react-icons/md";

const StatusComponent = ({ title, value, icon, onClick }) => {
  const getIcon = (icon) => {
    switch (icon) {
      case "success":
        return <MdCheckCircle className="text-green-500" />;
      case "error":
        return <MdError className="text-red-500" />;
      case "order":
        return <MdShoppingCart className="text-blue-500" />;
      case "user":
        return <MdPerson className="text-purple-500" />;
      case "product":
        return <MdStore className="text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex  md:flex-row justify-betweensti gap-6 items-center space-y-2 md:space-y-0 md:space-x-2 rounded-lg shadow-lg bg-white p-4"onClick={onClick}>
      <div className="text-xl md:text-3xl">
        {getIcon(icon)}
      </div>
      <div className="flex md:flex-col gap-6 ml-8">
        <p className="text-lg md:text-xl font-bold">{title}</p>
        <p className="text-gray-500 text-sm md:text-base">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatusComponent;
