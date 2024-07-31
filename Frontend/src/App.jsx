import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getToken } from "firebase/messaging";
import { messaging } from './Firebase'; // Make sure you import the initialized messaging instance
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
import "react-toastify/dist/ReactToastify.css";
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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";

function App() {
  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.register('/firebase-messaging-sw.js')
  //       .then((registration) => {
  //         console.log('Service worker registered:', registration);
  //       }).catch((error) => {
  //         console.error('Service worker registration failed:', error);
  //       });
  //   }

  //   const requestNotificationPermission = async () => {
  //     if (currentUser) {
  //       try {
  //         const token = await getToken(messaging, {
  //           vapidKey: 'BORs_oE8mGq7sShmBGZbDlk0xK7X0LbgxawICzzV2VLqx76a7hFV4vY_xg9G6qhxWwN3lUxJ2XKokTgKMQ9wXP8', // Your VAPID key
  //         });
  //         if (token) {
  //           console.log('FCM Token:', token);
  //           // Save the token to Firestore
  //           const userDocRef = doc(db, "users", currentUser.uid);
  //           await updateDoc(userDocRef, {
  //             fcmToken: token
  //           });
  //           console.log('Token successfully saved to Firestore');
  //         } else {
  //           console.log('No registration token available.');
  //         }
  //       } catch (error) {
  //         console.error('Error getting FCM token:', error);
  //       }
  //     }
  //   };

  //   requestNotificationPermission();
  // }, [currentUser]);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/DashboardStore" element={<DashboardStore />} />
        <Route path="/SignUp" element={<RegisterPage />} />
        <Route path="/SignIn" element={<LoginPage />} />
        <Route path="/ResetPassword" element={<ForgotPassword />} />
        <Route path="/UserProfile" element={<UserProfilePage />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/Success" element={<CheckoutSuccesPage />} />
        <Route path="/Pemesanan" element={<Pemesanan />} />
        <Route path="/Konsultasi" element={currentUser ? <KonsultasiPage /> : <LoginPrompt />} /> {/* Use the wrapper here */}
        <Route path="/DashboardStore/product/:id" element={<ProductDetail products={produkInovasi} />} />
        <Route path="/transaction/:id" element={<DetailPemesanan />} />

        {/* Nesting admin routes under Layout */}
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
          <Route path="/admin/orders" element={<OrderPage />} />
          <Route path="/admin/orders/:id" element={<OrderDetailPage />} />
          <Route path="/admin/editProduct/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
