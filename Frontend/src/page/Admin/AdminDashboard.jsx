import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import axios from "axios";
import TopBar from "../../components/Admin/TopBar";
import StatusComponent from "../../components/Admin/Dashboard/StatusComponent";
import RecentOrder from "../../components/Admin/Dashboard/RecentOrder";
import RecentProduct from "../../components/Admin/Dashboard/RecentProduct";

function AdminDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const productCollection = collection(db, "products");
        const productSnapshot = await getDocs(productCollection);
        console.log("Product count:", productSnapshot.size);
        setProductCount(productSnapshot.size);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchUserCount = async () => {
      try {
        const userCollection = collection(db, "users");
        const userSnapshot = await getDocs(userCollection);
        console.log("User count:", userSnapshot.size);
        setUserCount(userSnapshot.size);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchOrderCount = async () => {
      try {
        const response = await axios.get("https://wkj.vercel.app/orders");
        console.log("Order response data:", response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setOrderCount(response.data.data.length);
        } else {
          console.error("Invalid order data format:", response.data);
        }
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
      <div className="flex mt-5 gap-8">
      <RecentOrder/>
      <RecentProduct/>
      </div>
    </div>
  );
}

export default AdminDashboard;
