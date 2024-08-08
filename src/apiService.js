import axios from "axios";

// Configura la instancia de axios con la URL base desde la variable de entorno
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginUser = async (identifier, password) => {
  try {
    const response = await api.post(
      "https://backend-tesis-one.vercel.app/auth/login",
      { identifier, password }
    );
    return {
      token: response.data.token,
      role: response.data.role,
      username: response.data.username,
      email: response.data.email,
    };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    await api.post("https://backend-tesis-one.vercel.app/auth/register", {
      username,
      email,
      password,
    });
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const getProvinces = async () => {
  try {
    const response = await api.get(
      "https://backend-tesis-one.vercel.app/provinces"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
};

export const getCities = async (provinceId) => {
  try {
    const response = await api.get(
      `https://backend-tesis-one.vercel.app/provinces/${provinceId}/cities`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};

export const getCityDetails = async (cityId) => {
  try {
    const response = await api.get(
      `https://backend-tesis-one.vercel.app/cities/${cityId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching city details:", error.message);
    throw error;
  }
};

export const getTouristZones = async (cityId, filter) => {
  try {
    const response = await api.get(
      `https://backend-tesis-one.vercel.app/tourist-zones/city/${cityId}`,
      {
        params: filter ? { category: filter } : {},
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tourist zones:", error);
    throw error;
  }
};

export const getWeatherByCityName = async (cityName) => {
  const apiKey = "ab8db89984956d3087a7123b0a86eba1";
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=es`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const getTouristZoneDetail = async (zoneId) => {
  try {
    const response = await api.get(
      `https://backend-tesis-one.vercel.app/tourist-zones/${zoneId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tourist zone detail:", error);
    throw error;
  }
};

export const getUserFavorites = async () => {
  try {
    const response = await api.get(
      "https://backend-tesis-one.vercel.app/user/favorites"
    );
    return response.data.favorites;
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    throw error;
  }
};

export const addFavorite = async (zoneId) => {
  try {
    const response = await api.post(
      "https://backend-tesis-one.vercel.app/user/favorites",
      { zoneId }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

export const removeFavorite = async (zoneId) => {
  try {
    const response = await api.delete(
      `https://backend-tesis-one.vercel.app/user/favorites/${zoneId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};

export const createProvince = async (province) => {
  try {
    const response = await api.post(
      "https://backend-tesis-one.vercel.app/admin/provinces",
      province
    );
    return response.data;
  } catch (error) {
    console.error("Error creating province:", error);
    throw error;
  }
};

export const updateProvince = async (id, province) => {
  try {
    const response = await api.put(
      `https://backend-tesis-one.vercel.app/admin/provinces/${id}`,
      province
    );
    return response.data;
  } catch (error) {
    console.error("Error updating province:", error);
    throw error;
  }
};

export const deleteProvince = async (id) => {
  try {
    await api.delete(
      `https://backend-tesis-one.vercel.app/admin/provinces/${id}`
    );
  } catch (error) {
    console.error("Error deleting province:", error);
    throw error;
  }
};

export const createCity = async (city) => {
  try {
    const response = await api.post(
      "https://backend-tesis-one.vercel.app/admin/cities",
      city
    );
    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Error creating city:", error);
    throw error;
  }
};

export const getAdminCities = async () => {
  try {
    const response = await api.get(
      "https://backend-tesis-one.vercel.app/admin/cities"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};

export const updateCity = async (id, city) => {
  try {
    const response = await api.put(
      `https://backend-tesis-one.vercel.app/admin/cities/${id}`,
      city
    );
    return response.data;
  } catch (error) {
    console.error("Error updating city:", error);
    throw error;
  }
};

export const deleteCity = async (id) => {
  try {
    await api.delete(`https://backend-tesis-one.vercel.app/admin/cities/${id}`);
  } catch (error) {
    console.error("Error deleting city:", error);
    throw error;
  }
};

export const createTouristZone = async (touristZone) => {
  try {
    const response = await api.post(
      "https://backend-tesis-one.vercel.app/admin/tourist-zones",
      touristZone
    );
    return response.data;
  } catch (error) {
    console.error("Error creating tourist zone:", error);
    throw error;
  }
};

export const getAdminTouristZones = async () => {
  try {
    const response = await api.get(
      "https://backend-tesis-one.vercel.app/admin/tourist-zones"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tourist zones:", error);
    throw error;
  }
};

export const updateTouristZone = async (id, touristZone) => {
  try {
    const response = await api.put(
      `https://backend-tesis-one.vercel.app/admin/tourist-zones/${id}`,
      touristZone
    );
    return response.data;
  } catch (error) {
    console.error("Error updating tourist zone:", error);
    throw error;
  }
};

export const deleteTouristZone = async (id) => {
  try {
    await api.delete(
      `https://backend-tesis-one.vercel.app/admin/tourist-zones/${id}`
    );
  } catch (error) {
    console.error("Error deleting tourist zone:", error);
    throw error;
  }
};

// Actualizar perfil de usuario
export const updateUserProfile = async (data) => {
  try {
    const response = await api.put(
      "https://backend-tesis-one.vercel.app/user/profile",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const getComments = async (zoneId) => {
  try {
    const response = await api.get(
      `https://backend-tesis-one.vercel.app/tourist-zones/${zoneId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const addComment = async (zoneId, content) => {
  try {
    const response = await api.post(
      `https://backend-tesis-one.vercel.app/tourist-zones/${zoneId}/comments`,
      {
        content,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await api.post(
      "https://backend-tesis-one.vercel.app/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.filePath;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Actualizar contraseña de usuario
export const updatePassword = async ({ currentPassword, newPassword }) => {
  try {
    const response = await api.put(
      "https://backend-tesis-one.vercel.app/user/update-password",
      {
        currentPassword,
        newPassword,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

export default api;
