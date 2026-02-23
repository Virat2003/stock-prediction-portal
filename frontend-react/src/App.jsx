import "./assets/css/style.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import AuthProvider from "./AuthProvider";
import DashBoard from "./components/dashboard/DashBoard";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const App = () => {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<PublicRoutes><Register /></PublicRoutes>} />
          <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
          <Route path="/dashboard" element={ <PrivateRoutes> <DashBoard/> </PrivateRoutes>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
