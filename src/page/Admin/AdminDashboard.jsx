import React from "react";
import TopBar from "../../components/Admin/TopBar";
import StatusComponent from "../../components/Admin/Dashboard/StatusComponent";

function AdminDashboard() {
  const handleUser = () => {
    window.location.href = "/admin/user";
  };
  const handleOrder = () => {
    window.location.href = "/admin/order";
  };
  const handleProduct = () => {
    window.location.href = "/admin/product";
  };

  return (
    <div className="px-4">
      <TopBar title="Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatusComponent title="Pengguna" value="30"  icon="user" onClick={handleUser} />
        <StatusComponent title="Order" value="09"  icon="order" onClick={handleOrder}/>
        <StatusComponent title="Product" value="90" icon="product" onClick={handleProduct}/>
      
      </div>
      
    </div>
  );
}

export default AdminDashboard;
