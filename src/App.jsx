import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./page/LandingPage";
import DashboardStore from "./page/DashboardStore";
import './App.css';

function App() {
  return (
    <Router> 
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/DashboardStore" element={<DashboardStore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
