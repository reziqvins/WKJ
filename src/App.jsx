import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./page/LandingPage";
import DashboardStore from "./page/DashboardStore";
import "./App.css";
import ProductDetail from "./components/Store/ProductDetail/ProductDetail";
import { produkInovasi } from "./data/ProdukInovasi";
import RegisterPage from "./page/RegisterPage";
import Coba from "./components/Coba";
import LoginPage from "./page/LoginPage";
import KonsultasiPage from "./page/KonsultasiPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/DashboardStore" element={<DashboardStore />} />
          <Route path="/Coba" element={<Coba />} />
          <Route path="/SignUp" element={<RegisterPage />} />
          <Route path="/SignIn" element={<LoginPage />} />
          {/* <Route path="/Konsultasi" element={<KonsultasiPage />} /> */}
          <Route
            path="/DashboardStore/product/:id"
            element={<ProductDetail products={produkInovasi} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
