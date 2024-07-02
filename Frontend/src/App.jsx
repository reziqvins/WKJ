import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./page/LandingPage";
import DashboardStore from "./page/DashboardStore";
import "./App.css";
import ProductDetail from "./components/Store/ProductDetail/ProductDetail";
import { produkInovasi } from "./data/ProdukInovasi";
import RegisterPage from "./page/RegisterPage";
// import Coba from "./components/Coba";
import LoginPage from "./page/LoginPage";
import KonsultasiPage from "./page/KonsultasiPage";
import { AuthContext } from "./Context/AuthContext";
import LoginPrompt from "./components/Auth/Login/LoginPrompt";
import { useContext } from "react";
import ForgotPassword from "./page/ForgotPasswordPage";
import Layout from "./components/Admin/Layout/Layout"; // Correct import here
import Coba from "./components/Coba";
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
import Inbox from "./page/Admin/Inbox";
import OrderPage from "./page/Admin/Order/OrderPage";
import AdminKonsultasi from "./page/Admin/AdminKonsultasi";
import OrderDetailPage from "./page/Admin/Order/OrderDetailPage";
import CheckOutSucces from "./components/Chekout/CheckOutSucces";
import EditGallery from "./page/Admin/LandingPage/Gallery/EditGallery";
import GalleryPage from "./page/Admin/LandingPage/Gallery/GalleryPage";
import Layanan2Page from "./page/Admin/LandingPage/Layanan2/Layanan2Page";
import FormAddGallery from "./components/Admin/LandingPage/Galery/FormAddGallery";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/DashboardStore" element={<DashboardStore />} />
        <Route path="/Coba" element={<Coba />} />
        <Route path="/SignUp" element={<RegisterPage />} />
        <Route path="/SignIn" element={<LoginPage />} />
        <Route path="/ResetPassword" element={<ForgotPassword />} />
        <Route path="/UserProfile" element={<UserProfilePage/>} />
        <Route path="/Cart" element={<CartPage/>} />
        <Route path="/Succes" element={<CheckOutSucces/>} />
        <Route path="/Konsultasi" element={currentUser ? <KonsultasiPage /> : <LoginPrompt />} />
        <Route path="/DashboardStore/product/:id" element={<ProductDetail products={produkInovasi} />} />

        {/* Nesting admin routes under Layout */}
        <Route element={<Layout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/addProduct" element={<AddProduct />} />
          <Route path="/admin/products" element={<ProductPage />} />
        <Route path="/admin/landingPage/gallery" element={<GalleryPage />} />
        <Route path="/admin/AddGallery" element={<FormAddGallery />} />
        <Route path="/admin/editGallery/:id" element={<EditGallery/>} />
        <Route path="/admin/landingPage/layanan2" element={<Layanan2Page />} />
        <Route path="/admin/editUser/:id" element={<EditUserPage/>}/>
        <Route path="/admin/konsultasi" element={<AdminKonsultasi />} />
        <Route path="/admin/setting" element={<SettingPage />} />
        <Route path="/admin/user" element={<UserPage />} />
        <Route path="/admin/orders" element={<OrderPage />} />
        <Route path="/admin/orders/:id" element={<OrderDetailPage/>} />
          <Route exact path="/admin/editProduct/:id" element={<EditProduct />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
