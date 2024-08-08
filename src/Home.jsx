import React, { useEffect, useState } from "react";
import { getProvinces } from "./apiService";
import Card from "./components/Card";
import "./components/Card.css";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTachometerAlt,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [provinces, setProvinces] = useState([]);
  const featuredProvincesIds = [
    "669ac61e479386c9f85fa81f",
    "66a71eaf2547591f3b591ed3",
    "668f5dc977d2dcfb5fbc0392",
  ];

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

  const featuredProvinces = provinces.filter((province) =>
    featuredProvincesIds.includes(province._id)
  );

  return (
    <div>
      <header>
        <section className="title">
          <h1>
            ¡Descubre Sur360! <br />
            Tu guía completa para explorar las mejores zonas turísticas de la
            Patagonia Argentina.
          </h1>
        </section>
        <button className="button-title">
          <a href="#explore-id">Quiero saber más</a>
        </button>
      </header>
      <main id="explore-id">
        <div className="container">
          <section className="intro">
            <h2>Explora la Patagonia como nunca antes</h2>
            <p>
              En Sur360, te ofrecemos una guía completa para explorar los
              rincones más bellos y desconocidos de la Patagonia Argentina.
              Descubre las mejores provincias, ciudades y atracciones turísticas
              en un solo lugar.
            </p>
          </section>
          <section className="gallery">
            <div className="box">
              <div className="image-container">
                <img
                  src="../imgs/gallery/img1.webp"
                  alt="Descripción de la imagen"
                  className="image"
                />
                <div className="overlay">
                  <div className="text">Fitz Roy, Santa Cruz</div>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="image-container">
                <img
                  src="../imgs/gallery/img2.webp"
                  alt="Descripción de la imagen"
                  className="image"
                />
                <div className="overlay">
                  <div className="text">Glaciar Perito Moreno, Santa Cruz</div>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="image-container">
                <img
                  src="../imgs/gallery/img3.webp"
                  alt="Descripción de la imagen"
                  className="image"
                />
                <div className="overlay">
                  <div className="text">Hotel Llao Llao, Bariloche</div>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="image-container">
                <img
                  src="../imgs/gallery/img4.webp"
                  alt="Descripción de la imagen"
                  className="image"
                />
                <div className="overlay">
                  <div className="text">San Carlos de Bariloche, Río Negro</div>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="image-container">
                <img
                  src="../imgs/gallery/img5.webp"
                  alt="Descripción de la imagen"
                  className="image"
                />
                <div className="overlay">
                  <div className="text">Villa Pehuenia, Neuquén</div>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="image-container">
                <img
                  src="../imgs/gallery/img6.webp"
                  alt="Descripción de la imagen"
                  className="image"
                />
                <div className="overlay">
                  <div className="text">Laguna de los Tres, Santa Cruz</div>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="image-container">
                <img
                  src="../imgs/gallery/img7.webp"
                  alt="Descripción de la imagen"
                  className="image"
                />
                <div className="overlay">
                  <div className="text">Puerto Madryn, Chubut</div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="card-container">
          <div className="intro-zones">
            <h2>Provincias más visitadas</h2>
          </div>
          <div className="cards-container">
            {featuredProvinces.map((province) => (
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
        </section>
        <section className="what-we-offer">
          <div className="container">
            <h2>Lo que ofrecemos</h2>
            <div className="offerings">
              <div className="offering">
                <FontAwesomeIcon icon={faCheckCircle} size="3x" />
                <h3>Sencillez</h3>
                <p>
                  Navega fácilmente y encuentra la información que necesitas sin
                  complicaciones.
                </p>
              </div>

              <div className="offering">
                <FontAwesomeIcon icon={faMapMarkedAlt} size="3x" />
                <h3>Mucha Información</h3>
                <p>
                  Obtén detalles completos sobre las provincias y ciudades de la
                  Patagonia.
                </p>
              </div>
              <div className="offering">
                <FontAwesomeIcon icon={faTachometerAlt} size="3x" />
                <h3>Velocidad</h3>
                <p>
                  Accede rápidamente a todos los datos y recursos que ofrecemos.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
