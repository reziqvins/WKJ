import React from "react";

function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#2dd4bf] flex justify-between p-2 h-[2.5rem] w-full md:w-[6rem] rounded-lg md:mt-0"
    >
      {children}
    </button>
  );
}

export default Button;
