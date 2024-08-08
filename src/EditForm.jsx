import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  createProvince,
  updateProvince,
  createCity,
  updateCity,
  createTouristZone,
  updateTouristZone,
  getProvinces,
  uploadImage, // Asegúrate de importar la función correcta
} from "./apiService";
import "./EditForm.css";

const EditForm = () => {
  const { type, id } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    province: "",
    category: [],
    longDescription: "",
    address: "",
    ...location.state,
  });

  const [provinces, setProvinces] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const cityId = location.state?.cityId;

  useEffect(() => {
    async function fetchProvinces() {
      try {
        const provincesList = await getProvinces();
        setProvinces(provincesList);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    }

    fetchProvinces();

    if (id && location.state) {
      setFormData(location.state);
    }
  }, [id, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (imageFile) {
        const imageUrl = await uploadImage(imageFile);
        formData.image = imageUrl;
      }

      if (id) {
        if (type === "province") await updateProvince(id, formData);
        if (type === "city") await updateCity(id, formData);
        if (type === "touristZone") await updateTouristZone(id, formData);
      } else {
        if (type === "province") await createProvince(formData);
        if (type === "city") await createCity(formData);
        if (type === "touristZone")
          await createTouristZone({ ...formData, city: cityId });
      }
      navigate("/admin");
    } catch (error) {
      console.error("Error saving item", error);
      if (error.response) {
        console.error("Error details:", error.response.data);
      }
    }
  };

  return (
    <div className="container">
      <div className="edit-form-container">
        <h1>
          {id ? "Actualizar" : "Crear"}{" "}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </h1>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label>
            Descripción:
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="textarea"
            />
          </label>
          <label>
            Imagen:
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="input"
            />
          </label>
          {type !== "province" && (
            <label>
              Provincia:
              <select
                name="province"
                value={formData.province || ""}
                onChange={handleChange}
                className="input"
              >
                <option value="" disabled>
                  Seleccione una provincia
                </option>
                {provinces.map((province) => (
                  <option key={province._id} value={province._id}>
                    {province.name}
                  </option>
                ))}
              </select>
            </label>
          )}
          {type === "touristZone" && (
            <>
              <label>
                Descripción extensa:
                <textarea
                  name="longDescription"
                  value={formData.longDescription || ""}
                  onChange={handleChange}
                  className="textarea"
                />
              </label>
              <label>
                Dirección:
                <input
                  type="text"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  className="input"
                />
              </label>
              <label>
                Categoría:
                <div className="checkbox-group">
                  {[
                    "Verano",
                    "Invierno",
                    "Lagos",
                    "Cerros",
                    "Mar",
                    "Playas",
                  ].map((category) => (
                    <label key={category}>
                      <input
                        type="checkbox"
                        name="category"
                        value={category}
                        checked={formData.category?.includes(category) || false}
                        onChange={(e) => {
                          const { value, checked } = e.target;
                          if (checked) {
                            setFormData((prev) => ({
                              ...prev,
                              category: [...new Set([...prev.category, value])],
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              category: prev.category.filter(
                                (cat) => cat !== value
                              ),
                            }));
                          }
                        }}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </label>
            </>
          )}
          <div className="button-group">
            <button type="submit" className="button">
              Guardar
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="button cancel"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
