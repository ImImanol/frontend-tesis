import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTouristZones,
  getCityDetails,
  getWeatherByCityName,
} from "./apiService";
import Card from "./components/Card";
import "./TouristZones.css";

const TouristZones = () => {
  const { cityId } = useParams();
  const [touristZones, setTouristZones] = useState([]);
  const [filter, setFilter] = useState("");
  const [weather, setWeather] = useState(null);
  const [cityName, setCityName] = useState("");
  const [showWeatherInfo, setShowWeatherInfo] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const city = await getCityDetails(cityId);
        if (city) {
          setCityName(city.name);
        } else {
          console.error("City not found for the provided cityId.");
        }
      } catch (err) {
        console.error("Error fetching city details", err.message);
      }
    };

    fetchCityDetails();
  }, [cityId]);

  useEffect(() => {
    const fetchTouristZones = async () => {
      try {
        const zones = await getTouristZones(cityId, filter);
        setTouristZones(zones);
      } catch (err) {
        console.error("Error fetching tourist zones", err);
      }
    };

    fetchTouristZones();
  }, [cityId, filter]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (cityName) {
        try {
          const weatherData = await getWeatherByCityName(cityName);
          setWeather(weatherData);
          setWeatherError(null);
        } catch (err) {
          setWeatherError("No se encontró el clima de esta zona.");
          console.error("Error fetching weather data", err);
        }
      }
    };

    fetchWeather();
  }, [cityName]);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const toggleWeatherInfo = () => {
    setShowWeatherInfo(!showWeatherInfo);
  };

  return (
    <div className="container">
      <div className="page-container">
        <div className="content-wrap">
          <div className="weather-container">
            <div className="weather-icon" onClick={toggleWeatherInfo}>
              ☀️
            </div>
            {showWeatherInfo &&
              (weather ? (
                <div className="weather-info">
                  <h2>Clima actual en {cityName}</h2>
                  <p>Temperatura: {weather.main.temp}°C</p>
                  <p>Condiciones: {weather.weather[0].description}</p>
                </div>
              ) : (
                <div className="weather-error">{weatherError}</div>
              ))}
          </div>
          <h1 className="centered-heading">Zonas Turísticas</h1>
          <div className="category-buttons">
            <button onClick={() => handleFilterChange("")}>Todos</button>
            <button onClick={() => handleFilterChange("Verano")}>Verano</button>
            <button onClick={() => handleFilterChange("Invierno")}>
              Invierno
            </button>
            <button onClick={() => handleFilterChange("Lagos")}>Lagos</button>
            <button onClick={() => handleFilterChange("Cerros")}>Cerros</button>
            <button onClick={() => handleFilterChange("Mar")}>Mar</button>
            <button onClick={() => handleFilterChange("Playas")}>Playas</button>
          </div>
          <div className="card-list">
            {touristZones.map((zone) => (
              <Card
                key={zone._id}
                id={zone._id}
                title={zone.name}
                description={zone.description}
                image={zone.image}
                buttonLabel="Ver más información"
                buttonLink={`/tourist-zones/${zone._id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristZones;
