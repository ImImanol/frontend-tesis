// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Provinces from "./Provinces";
import Cities from "./Cities";
import TouristZones from "./TouristZones";
import TouristZoneDetail from "./TouristZoneDetail";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Navbar from "./components/Navbar";
import AdminPanel from "./AdminPanel";
import Favorites from "./Favorites";
import Footer from "./components/Footer";
import EditForm from "./EditForm";
import { AuthProvider, AuthContext } from "./AuthContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/provinces" element={<Provinces />} />
        <Route path="/provinces/:provinceId/cities" element={<Cities />} />
        <Route
          path="/cities/:cityId/tourist-zones"
          element={<TouristZones />}
        />
        <Route path="/tourist-zones/:zoneId" element={<TouristZoneDetail />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route
          path="/profile"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route path="/about" element={<div>Sobre Nosotros</div>} />
        <Route path="/favorites" element={<Favorites />} />
        <Route
          path="/admin"
          element={<AdminProtectedRoute component={AdminPanel} />}
        />
        <Route
          path="/create/:type"
          element={<AdminProtectedRoute component={EditForm} />}
        />
        <Route
          path="/edit/:type/:id"
          element={<AdminProtectedRoute component={EditForm} />}
        />
      </Routes>
      <Footer />
    </AuthProvider>
  );
};

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? <Component /> : <Navigate to="/auth/login" />;
};

const AdminProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated, userRole } = React.useContext(AuthContext);
  return isAuthenticated && userRole === "admin" ? (
    <Component />
  ) : (
    <Navigate to="/auth/login" />
  );
};

library.add(fas);

export default App;
