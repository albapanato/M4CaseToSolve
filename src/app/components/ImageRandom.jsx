import React, { useEffect, useState } from "react";

const ImageRandom = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Función para obtener la imagen aleatoria
    const fetchRandomImage = async () => {
      try {
        const response = await fetch("https://picsum.photos/100");
        if (response.ok) {
          setImageUrl(response.url);
        } else {
          console.error("Error fetching the image");
        }
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    };

    fetchRandomImage();
  }, []);

  return (
    <div
      className="image-container"
      style={{ textAlign: "center", margin: "20px" }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Random"
          style={{ width: "120px", height: "120px", borderRadius: "8px" }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ImageRandom;
