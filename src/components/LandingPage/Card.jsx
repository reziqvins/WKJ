import React from "react";
import StarRating from "./StarRating";

const Card = ({ produk }) => {
  return (
    <div className="z-10 bg-white drop-shadow-md overflow-hidden rounded-2xl mr-2  my-4">
      <img src={produk.linkImg} className="h-40 w-full object-cover" />
      <div className="p-5 border border-b">
        <h1 className="py-2 truncate">{produk.title}</h1>
        <StarRating rating={produk.rating} />
      </div>
      <h3 className="p-5 text-xl">{produk.price}</h3>

      <div className="absolute top-0 bg-white m-3 px-2 py-[2.5px] rounded font-bold">
        {produk.category}
      </div>
    </div>
  );
};

export default Card;
