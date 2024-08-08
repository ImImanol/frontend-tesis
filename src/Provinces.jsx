// src/Home.jsx
import React, { useEffect, useState } from "react";
import { getProvinces } from "./apiService";
import Card from "./components/Card";
import "./components/Card.css";

const Provinces = () => {
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const provincesData = await getProvinces();
        setProvinces(provincesData);
      } catch (err) {
        console.error("Error fetching provinces", err);
      }
    };

    fetchProvinces();
  }, []);

  return (
    <div className="container">
      <h1 className="centered-heading">Provincias</h1>
      <div className="cards-container">
        {provinces.map((province) => (
          <Card
            key={province._id}
            id={province._id}
            title={province.name}
            description={province.description}
            image={province.image}
            buttonLabel="Ver ciudades"
            buttonLink={`/provinces/${province._id}/cities`}
          />
        ))}
      </div>
    </div>
  );
};

export default Provinces;
