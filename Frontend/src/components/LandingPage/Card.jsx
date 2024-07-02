import React from "react";
import { Link } from "react-router-dom";

const Card = ({ produk }) => {
  return (
    <div className="z-10 bg-white drop-shadow-md overflow-hidden rounded-2xl mr-2 my-4">
      <Link to={`/DashboardStore/product/${produk.id}`}>
        <img src={produk.img} className="h-40 w-full object-cover" alt={produk.title} />
        <div className="p-5 border border-b">
          <h1 className="py-2 text-xl font-bold">{produk.name}</h1>
        </div>
        <h3 className="p-5 text-md">Rp. {produk.price}</h3>
        <div className="absolute top-0 bg-white m-3 px-2 py-[2.5px] rounded font-bold">
          {produk.category}
        </div>
      </Link>
    </div>
  );
};

export default Card;
