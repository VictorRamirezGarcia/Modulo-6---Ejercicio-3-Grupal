import React, { useRef, useEffect, useState } from "react";

const Camara = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const startCamara = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "Enviroment" },
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError("No se puede acceder a la camara");
        console.error(err);
      }
    };
    startCamara();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.strop());
      }
    };
  }, []);
  return (
    <div>
      <h2>Necesitamos verte para estar seguros que eres un humano.</h2>

      <video ref={videoRef} autoPlay playsInline style={{ width: "20%" }} />
    </div>
  );
};

export default Camara;
