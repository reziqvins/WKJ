import React from "react";

const GaleriCard = ({ item }) => {
  return (
    <div className="bg-white md:p-8 rounded-3xl shadow-xl my-8 mx-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-xl font-bold mb-2">{item.title}</h5>
          <p className="card-text text-gray-700 mb-4">{item.desc}</p>
          <div className="embed-responsive  embed-responsive-9by16 h-[300px]">
            {item.mediaType === 'image' ? (
              <img src={item.media} alt={item.title} className="embed-responsive-item rounded-xl h-full w-full object-fill bg-red-400 " />
            ) : (
              <video controls className=" rounded-xl">
                <source src={item.media} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GaleriCard;
