import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <div className="grid align-middle grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          rating={product.rating}
          price={product.price}
          linkImg={product.linkImg}
        />
      ))}
    </div>
  );
}

export default ProductList;
