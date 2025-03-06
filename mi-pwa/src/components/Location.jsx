import React, { useState, useEffect } from "react";

const Location = () => {
  const [ubicacion, setUbicacion] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("La geolocalización no es compatible con tu navegador");
      return;
    }

    const obtenerUbicacion = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUbicacion({
            latitud: position.coords.latitude,
            longitud: position.coords.longitude,
          });
        },
        (err) => {
          setError("No se puede acceder a la ubicación");
          console.error(err);
        },
      );
    };

    obtenerUbicacion();
  }, []);

  return (
    <div>
      <h2>Ubicación Actual</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : ubicacion ? (
        <p>
          Latitud: {ubicacion.latitud}, Longitud: {ubicacion.longitud}
        </p>
      ) : (
        <p>Obteniendo ubicación...</p>
      )}
    </div>
  );
};

export default Location;
