import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { getUserFavorites } from "./apiService";
import Card from "./components/Card";
import "./Favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesData = await getUserFavorites();
        setFavorites(favoritesData);
      } catch (err) {
        console.error("Error fetching user favorites:", err);
      }
    };

    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="full-height-container">
          <div className="favorites-container">
            <p>Tienes que tener una cuenta creada para agregar favoritos.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="full-height-container">
        <h1 className="centered-heading">Tus zonas favoritas</h1>
        {favorites.length > 0 ? (
          <div className="cards-container">
            {favorites.map((favorite) => (
              <Card
                key={favorite._id}
                id={favorite._id}
                title={favorite.name}
                description={favorite.description}
                image={favorite.image}
                buttonLabel="Ver más información"
                buttonLink={`/tourist-zones/${favorite._id}`}
              />
            ))}
          </div>
        ) : (
          <div className="favorites-container">
            <p>
              No tienes favoritos aun. Busca zonas turísticas que te gusten.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
