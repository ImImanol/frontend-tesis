import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createProvince,
  getProvinces,
  updateProvince,
  deleteProvince,
  createCity,
  getCities,
  getAdminCities,
  updateCity,
  deleteCity,
  createTouristZone,
  getTouristZones,
  getAdminTouristZones,
  updateTouristZone,
  deleteTouristZone,
} from "./apiService";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [touristZones, setTouristZones] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetchCities(selectedProvince._id);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity) {
      fetchTouristZones(selectedCity._id);
    }
  }, [selectedCity]);

  const fetchProvinces = async () => {
    try {
      const response = await getProvinces();
      setProvinces(response);
    } catch (error) {
      console.error("Error fetching provinces", error);
    }
  };

  const fetchCities = async (provinceId) => {
    try {
      const response = await getCities(provinceId);
      setCities(response);
    } catch (error) {
      console.error("Error fetching cities", error);
    }
  };

  const fetchAdminCities = async () => {
    try {
      const response = await getAdminCities();
      setCities(response);
    } catch (error) {
      console.error("Error fetching cities", error);
    }
  };

  const fetchTouristZones = async (cityId) => {
    try {
      const response = await getTouristZones(cityId);
      setTouristZones(response);
    } catch (error) {
      console.error("Error fetching tourist zones", error);
    }
  };

  const fetchAdminTouristZones = async () => {
    try {
      const response = await getAdminTouristZones();
      setTouristZones(response);
    } catch (error) {
      console.error("Error fetching tourist zones", error);
    }
  };

  const handleDeleteProvince = async (id) => {
    try {
      await deleteProvince(id);
      setProvinces(provinces.filter((province) => province._id !== id));
    } catch (error) {
      console.error("Error deleting province", error);
    }
  };

  const handleDeleteCity = async (id) => {
    try {
      await deleteCity(id);
      setCities(cities.filter((city) => city._id !== id));
    } catch (error) {
      console.error("Error deleting city", error);
    }
  };

  const handleDeleteTouristZone = async (id) => {
    try {
      await deleteTouristZone(id);
      setTouristZones(touristZones.filter((zone) => zone._id !== id));
    } catch (error) {
      console.error("Error deleting tourist zone", error);
    }
  };

  const handleCreate = (type) => {
    const state = type === "touristZone" ? { cityId: selectedCity._id } : {};
    navigate(`/create/${type}`, { state });
  };

  const handleEdit = (type, item) => {
    const state =
      type === "touristZone" ? { ...item, cityId: selectedCity._id } : item;
    navigate(`/edit/${type}/${item._id}`, { state });
  };

  return (
    <div className="container">
      <div className="admin-container">
        <h1>Panel de administrador</h1>
        <section className="section-container">
          <h2>Provincias</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {provinces.map((province) => (
                <tr key={province._id}>
                  <td>{province.name}</td>
                  <td className="accion-buttons">
                    <button onClick={() => setSelectedProvince(province)}>
                      Ver ciudades
                    </button>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit("province", province)}
                    >
                      <FaEdit /> Editar
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteProvince(province._id)}
                    >
                      <FaTrash /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => handleCreate("province")}>
            <FaPlus /> Crear Provincia
          </button>
        </section>
        {selectedProvince && (
          <section>
            <h2>Ciudades en {selectedProvince.name}</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cities.map((city) => (
                  <tr key={city._id}>
                    <td>{city.name}</td>
                    <td className="accion-buttons">
                      <button onClick={() => setSelectedCity(city)}>
                        Ver zonas turísticas
                      </button>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit("city", city)}
                      >
                        <FaEdit /> Editar
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteCity(city._id)}
                      >
                        <FaTrash /> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => handleCreate("city")}>
              <FaPlus /> Crear Ciudad
            </button>
          </section>
        )}
        {selectedCity && (
          <section>
            <h2>Zonas turísticas en {selectedCity.name}</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {touristZones.map((zone) => (
                  <tr key={zone._id}>
                    <td>{zone.name}</td>
                    <td className="accion-buttons">
                      <button
                        className="edit-button"
                        onClick={() => handleEdit("touristZone", zone)}
                      >
                        <FaEdit /> Editar
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteTouristZone(zone._id)}
                      >
                        <FaTrash /> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => handleCreate("touristZone")}>
              <FaPlus /> Crear Zona Turística
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
