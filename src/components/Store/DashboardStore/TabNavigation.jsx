import React from "react";

function TabNavigation({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="flex justify-center mb-4 mt-10 ">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 mr-4 rounded ${
            activeCategory === category
              ? "bg-green-400 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default TabNavigation;
