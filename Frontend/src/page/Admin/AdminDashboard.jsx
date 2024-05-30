import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import axios from "axios";
import TopBar from "../../components/Admin/TopBar";
import StatusComponent from "../../components/Admin/Dashboard/StatusComponent";

function AdminDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchProductCount = async () => {
      const productCollection = collection(db, "products");
      const productSnapshot = await getDocs(productCollection);
      setProductCount(productSnapshot.size);
    };

    const fetchUserCount = async () => {
      const userCollection = collection(db, "users");
      const userSnapshot = await getDocs(userCollection);
      setUserCount(userSnapshot.size);
    };

    const fetchOrderCount = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders");
        setOrderCount(response.data.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchProductCount();
    fetchUserCount();
    fetchOrderCount();
  }, []);

  const handleUser = () => {
    window.location.href = "/admin/user";
  };

  const handleOrder = () => {
    window.location.href = "/admin/orders";
  };

  const handleProduct = () => {
    window.location.href = "/admin/products";
  };

  return (
    <div className="px-4">
      <TopBar title="Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatusComponent title="Pengguna" value={userCount} icon="user" onClick={handleUser} />
        <StatusComponent title="Order" value={orderCount} icon="order" onClick={handleOrder} />
        <StatusComponent title="Product" value={productCount} icon="product" onClick={handleProduct} />
      </div>
    </div>
  );
}

export default AdminDashboard;
