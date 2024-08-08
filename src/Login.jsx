import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./apiService";
import { AuthContext } from "./AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Login.css";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { token, role, username, email } = await loginUser(
        identifier,
        password
      );
      login(token, role, username, email);
      setError("");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes("password")) {
          setError("Contraseña incorrecta. Por favor, intenta de nuevo.");
        } else if (errorMessage.includes("identifier")) {
          setError("Usuario o email incorrecto. Por favor, intenta de nuevo.");
        } else {
          setError("Error al iniciar sesión: " + errorMessage);
        }
      } else {
        setError(
          "Error al iniciar sesión. Por favor, intenta de nuevo más tarde."
        );
      }
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="login-image">
          <img src="/imgs/login-img.jpg" alt="Login" />
        </div>
        <div className="login-form-container">
          <h1>Iniciar sesión</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="identifier">Usuario o email</label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Usuario o email"
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password-visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <button className="login-button" type="submit">
              Iniciar sesión
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          <p>
            ¿No tienes cuenta? <Link to="/auth/register">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
