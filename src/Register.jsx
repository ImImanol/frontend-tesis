import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "./apiService";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (username.length < 6) {
      setError("El usuario debe tener al menos 6 caracteres.");
      return false;
    }
    if (!email.includes("@")) {
      setError("El email debe contener un '@'.");
      return false;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await registerUser(username, email, password);
      setError("");
      navigate("/auth/login");
    } catch (error) {
      setError("Error al registrar: " + error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="register-container">
        <div className="register-form-container">
          <h1>Registro</h1>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuario"
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password-visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <FiEyeOff className="icon-password" />
                  ) : (
                    <FiEye className="icon-password" />
                  )}
                </button>
              </div>
            </div>
            <button className="register-button" type="submit">
              Registrarse
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          <p>
            ¿Ya tienes cuenta? <Link to="/auth/login">Inicia sesión aquí</Link>
          </p>
        </div>
        <div className="register-image">
          <img src="/imgs/registro-img.jpg" alt="Register" />
        </div>
      </div>
    </div>
  );
};

export default Register;
