
import React from "react";

import TopBar from "../../../components/Admin/TopBar";
import ProductTable from "../../../components/Admin/Product/ProductTable";

function ProductPage() {


  return (
    <div className="px-4">
      <TopBar title="Halaman Produk"/>
      <ProductTable/>
    </div>
  );
}

export default ProductPage;
