// src/Cities.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCities } from "./apiService";
import Card from "./components/Card";
import "./components/Card.css";

const Cities = () => {
  const { provinceId } = useParams();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await getCities(provinceId);
        setCities(citiesData);
      } catch (err) {
        console.error("Error fetching cities", err.message);
      }
    };

    fetchCities();
  }, [provinceId]);

  return (
    <div className="container">
      <div className="page-container">
        <h1 className="centered-heading">Ciudades</h1>
        <div className="cards-container">
          {cities.map((city) => (
            <Card
              key={city._id}
              id={city._id}
              title={city.name}
              description={city.description}
              image={city.image}
              buttonLabel="Ver zonas turísticas"
              buttonLink={`/cities/${city._id}/tourist-zones`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cities;
