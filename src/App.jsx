import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./page/LandingPage";
import DashboardStore from "./page/DashboardStore";
import "./App.css";
import ProductDetail from "./components/Store/ProductDetail/ProductDetail";
import { produkInovasi } from "./data/ProdukInovasi";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/DashboardStore" element={<DashboardStore />} />
          <Route
            path="/product/:id"
            element={<ProductDetail products={produkInovasi} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
