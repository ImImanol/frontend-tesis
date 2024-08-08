import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { updateUserProfile, updatePassword } from "./apiService";
import "./Profile.css";

const icons = [
  "/icons/icon1.png",
  "/icons/icon2.png",
  "/icons/icon3.png",
  "/icons/icon4.png",
  "/icons/icon5.png",
];

const Profile = () => {
  const { logout } = useContext(AuthContext);

  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [profileIcon, setProfileIcon] = useState(
    localStorage.getItem("profileIcon") || icons[0]
  );
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isIconChanged, setIsIconChanged] = useState(false);

  const handleSave = async () => {
    try {
      const updatedUser = await updateUserProfile({
        username,
        email,
        profileIcon,
      });
      localStorage.setItem("username", updatedUser.user.username);
      localStorage.setItem("email", updatedUser.user.email);
      localStorage.setItem("profileIcon", updatedUser.user.profileIcon);
      setMessage("Perfil actualizado correctamente.");
      setError("");
      setIsEditingUsername(false);
      setIsEditingEmail(false);
      setIsIconChanged(false);
    } catch (err) {
      setError("Error al actualizar el perfil.");
      setMessage("");
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      await updatePassword({ currentPassword, newPassword });
      setMessage("Contraseña actualizada correctamente.");
      setError("");
      setCurrentPassword("");
      setNewPassword("");
      setIsEditingPassword(false);
    } catch (err) {
      setError("Error al actualizar la contraseña.");
      setMessage("");
    }
  };

  const handleIconClick = (icon) => {
    setProfileIcon(icon);
    setIsIconChanged(true);
  };

  return (
    <div className="profile-container">
      <h1>Perfil</h1>
      <img
        src={profileIcon}
        alt="Profile Icon"
        className="current-profile-icon"
      />
      <div>
        <label>Icono de perfil:</label>
        <div className="icon-selection">
          {icons.map((icon) => (
            <img
              key={icon}
              src={icon}
              alt="Icon"
              className={`profile-icon ${
                profileIcon === icon ? "selected" : ""
              }`}
              onClick={() => handleIconClick(icon)}
            />
          ))}
        </div>
        {isIconChanged && (
          <button className="save-button" onClick={handleSave}>
            Guardar
          </button>
        )}
      </div>
      <div>
        <label>Nombre de usuario:</label>
        {isEditingUsername ? (
          <>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="button-container">
              <button className="save-button" onClick={handleSave}>
                Guardar
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsEditingUsername(false)}
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <span>{username}</span>
            <button
              className="edit-button"
              onClick={() => setIsEditingUsername(true)}
            >
              Editar
            </button>
          </>
        )}
      </div>
      <div>
        <label>Email:</label>
        {isEditingEmail ? (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="button-container">
              <button className="save-button" onClick={handleSave}>
                Guardar
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsEditingEmail(false)}
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <span>{email}</span>
            <button
              className="edit-button"
              onClick={() => setIsEditingEmail(true)}
            >
              Editar
            </button>
          </>
        )}
      </div>
      <div>
        <label>Cambiar contraseña:</label>
        {isEditingPassword ? (
          <>
            <input
              type="password"
              placeholder="Contraseña actual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="button-container">
              <button className="save-button" onClick={handlePasswordChange}>
                Guardar
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsEditingPassword(false)}
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              className="edit-button"
              onClick={() => setIsEditingPassword(true)}
            >
              Cambiar contraseña
            </button>
          </>
        )}
      </div>
      <button className="logout-button" onClick={logout}>
        Cerrar Sesión
      </button>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Profile;
