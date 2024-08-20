import { infoClient } from "../utils/user";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ClientID({ id }) {
  const [token, setToken] = useState(null);
  const [recordClient, setRecordClient] = useState({});
  const [error, setError] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    const fetchRandomLogo = async () => {
      try {
        const randomText = Math.random().toString(36).substring(7); // Genera un texto aleatorio
        const url = `https://robohash.org/${randomText}`;
        setLogoUrl(url);
      } catch (error) {
        console.error("Error fetching the logo:", error);
      }
    };

    fetchRandomLogo();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      setToken(storedToken);
      localStorage.setItem("clientId", id); // Guardamos el ID del cliente en localStorage
      console.log("id en ClientID", id);
    }
  }, [id]);

  useEffect(() => {
    if (token) {
      const fetchClientDataByID = async () => {
        try {
          const recordClient = await infoClient(id, token); // Cambiar storedToken por token
          setRecordClient(recordClient);
          console.log("recordClient:", recordClient);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchClientDataByID();
    }
  }, [token, id]);

  if (error) {
    return <div> Error: {error}</div>;
  }

  return (
    <div className="container border w-full">
      <h1>{recordClient.name}</h1>
      <h2>{recordClient._id}</h2>
      <div className="flex">
        <div
          className="logo-container"
          style={{ textAlign: "center", margin: "20px" }}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Random Logo"
              style={{ width: "auto", height: "auto" }}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>Calle:</strong> {recordClient.address?.street}
        </p>
        <p>
          <strong>Número:</strong> {recordClient.address?.number}
        </p>
        <p>
          <strong>Código Postal:</strong> {recordClient.address?.postal}
        </p>
        <p>
          <strong>Ciudad:</strong> {recordClient.address?.city}
        </p>
        <p>
          <strong>Provincia:</strong> {recordClient.address?.province}
        </p>
      </div>
      <div className=" text-white text-xl font-bold w-56 bg-cyan-500 p-3 mb-4 text-center mx-auto rounded-lg">
        <Link href="/user/projects/new ">
          Asignar un proyecto a este cliente
        </Link>
      </div>
    </div>
  );
}
