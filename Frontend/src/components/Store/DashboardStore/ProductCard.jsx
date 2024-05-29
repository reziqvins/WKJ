import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ id, name, desc, price, img }) {
  return (
    <Link
      to={`/DashboardStore/product/${id}`}
      className="w-64 mx-auto my-4 md:mx-2 md:my-2 rounded overflow-hidden shadow-lg"
    >
      <img src={img} alt={name} className="w-full h-52 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">Rp.{price}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
