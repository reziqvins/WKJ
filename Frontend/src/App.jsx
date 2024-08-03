
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getToken } from "firebase/messaging";
import { messaging } from "./Firebase"; // Make sure you import the initialized messaging instance
import { AuthContext } from "./Context/AuthContext";
import LandingPage from "./page/LandingPage";
import DashboardStore from "./page/DashboardStore";
import "./App.css";
import ProductDetail from "./components/Store/ProductDetail/ProductDetail";
import { produkInovasi } from "./data/ProdukInovasi";
import RegisterPage from "./page/RegisterPage";
import LoginPage from "./page/LoginPage";
import KonsultasiPage from "./page/KonsultasiPage";
import LoginPrompt from "./components/Auth/Login/LoginPrompt";
import ForgotPassword from "./page/ForgotPasswordPage";
import Layout from "./components/Admin/Layout/Layout";
import AdminDashboard from "./page/Admin/AdminDashboard";
import AddProduct from "./page/Admin/Product/AddProduct";
import ProductPage from "./page/Admin/Product/ProductPage";
import EditProduct from "./page/Admin/Product/EditProduct";
import UserPage from "./page/Admin/User/UserPage";
import UserProfilePage from "./page/UserProfilePage";
import CartPage from "./page/CartPage";
import { ToastContainer } from "react-toastify";
import EditUserPage from "./page/Admin/User/EditUserPage";
import SettingPage from "./page/SettingPage";
import OrderPage from "./page/Admin/Order/OrderPage";
import AdminKonsultasi from "./page/Admin/AdminKonsultasi";
import OrderDetailPage from "./page/Admin/Order/OrderDetailPage";
import CheckOutSucces from "./components/Chekout/CheckOutSucces";
import EditGallery from "./page/Admin/LandingPage/Gallery/EditGallery";
import GalleryPage from "./page/Admin/LandingPage/Gallery/GalleryPage";
import Layanan2Page from "./page/Admin/LandingPage/Layanan2/Layanan2Page";
import FormAddGallery from "./components/Admin/LandingPage/Galery/FormAddGallery";
import Pemesanan from "./components/Profile/Pemesanan/Pemesanan";
import DetailPemesanan from "./components/Profile/Pemesanan/DetailPemesanan";
import CheckoutSuccesPage from "./page/CheckoutSuccesPage";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "./Firebase";
import EditKonsul from "./page/Admin/editKonsul";

import { Notifications } from "react-push-notification";
import addNotification from "react-push-notification";
import { ChatContext } from "./Context/ChatContext";
function App() {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.log("Notification permission denied.");
        }
      });
    }
  
    if (currentUser && data.chatId) {
      const chatDocRef = doc(db, "chats", data.chatId);
  
      const unsubscribe = onSnapshot(chatDocRef, (doc) => {
        const chatData = doc.data();
        if (chatData && chatData.messages && chatData.messages.length > 0) {
          const lastMessage = chatData.messages[chatData.messages.length - 1];
          if (lastMessage && lastMessage.senderId !== currentUser.uid) {
            console.log("New message received:", lastMessage.text);
            successNotification(lastMessage.text);
          }
        }
      });
  
      return () => unsubscribe();
    }
  }, [currentUser, data.chatId]);
  
  function successNotification(message) {
    addNotification({
      title: "New Message",
      subtitle: "You have a new message",
      message: message,
      theme: "light",
      closeButton: "X",
      backgroundTop: "green",
      backgroundBottom: "yellowgreen",
    });
  
    if (Notification.permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Konsultasi Wisata Kesehatan Jamu", {
          body: message,
          icon: "/icon.png",
          badge: "/badge.png",
          data: {
            url: "http://localhost:5174/Konsultasi"  // Add URL to notification data
          }
        });
      });
    }
  }

  return (
    <div>
      <Notifications />
      <Router>
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/DashboardStore" element={<DashboardStore />} />
          <Route path="/SignUp" element={<RegisterPage />} />
          <Route path="/SignIn" element={<LoginPage />} />
          <Route path="/ResetPassword" element={<ForgotPassword />} />
          <Route path="/UserProfile" element={<UserProfilePage />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route path="/Success" element={<CheckoutSuccesPage />} />
          <Route
            path="/Pemesanan"
            element={currentUser ? <Pemesanan /> : <LoginPrompt />}
          />
          <Route
            path="/Konsultasi"
            element={currentUser ? <KonsultasiPage /> : <LoginPrompt />}
          />
          <Route
            path="/DashboardStore/product/:id"
            element={<ProductDetail products={produkInovasi} />}
          />
          <Route
            path="/transaction/:id"
            element={currentUser ? <DetailPemesanan /> : <LoginPrompt />}
          />
          <Route element={<Layout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/addProduct" element={<AddProduct />} />
            <Route path="/admin/products" element={<ProductPage />} />
            <Route path="/admin/landingPage/gallery" element={<GalleryPage />} />
            <Route path="/admin/AddGallery" element={<FormAddGallery />} />
            <Route path="/admin/editGallery/:id" element={<EditGallery />} />
            <Route path="/admin/landingPage/layanan2" element={<Layanan2Page />} />
            <Route path="/admin/editUser/:id" element={<EditUserPage />} />
            <Route path="/admin/konsultasi" element={<AdminKonsultasi />} />
            <Route path="/admin/setting" element={<SettingPage />} />
            <Route path="/admin/user" element={<UserPage />} />
            <Route path="/admin/toKonsul" element={<EditKonsul />} />
            <Route path="/admin/orders" element={<OrderPage />} />
            <Route path="/admin/orders/:id" element={<OrderDetailPage />} />
            <Route path="/admin/editProduct/:id" element={<EditProduct />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
