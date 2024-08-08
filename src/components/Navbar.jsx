import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/imgs/LOGO-FINAL.png" alt="Logo" />
          </Link>
        </div>
        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/provinces">Explorar</Link>
            </li>
            <li>
              <Link to="/favorites">Favoritos</Link>
            </li>
            {isAuthenticated ? (
              <>
                {userRole === "admin" && (
                  <li>
                    <Link to="/admin">Panel de administrador</Link>
                  </li>
                )}
                <li>
                  <Link to="/profile">Perfil</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/auth/login">Iniciar sesión</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-toggle" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
