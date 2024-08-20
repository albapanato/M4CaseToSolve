import { infoProject } from "../utils/user";
import { useEffect, useState } from "react";
import ModifyProjectById from "./ModifyProjectById";
import Link from "next/link";

// import DelinoteFormMaterial from "./DelinoteFormMaterial";
// import DelinoteHorsForm from "./DelinoteFormHours";

export default function ProjectID({ id }) {
  const [token, setToken] = useState(null);
  const [recordProject, setRecordProject] = useState({});
  const [error, setError] = useState(null);
  const [showModifyForm, setShowModifyForm] = useState(false); // mostrar/ocultar el formulario de modificación

  const [storeProjectID, setProjectID] = useState(null);
  const [storeClientID, setClientID] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      setToken(storedToken);
      localStorage.setItem("projectId", id); // Guardamos el ID del proyecto en localStorage
      console.log("id del proyecto", id);
    }
  }, [id]);

  //
  useEffect(() => {
    if (token) {
      const fetchClientDataByID = async () => {
        try {
          const recordProject = await infoProject(id, token); // Cambiar storedToken por token
          setRecordProject(recordProject);
          setClientID(recordProject.clientId);
          setProjectID(recordProject._id);
          console.log("recordProject:", recordProject);
          console.log("recordProject.clientId:", recordProject.clientId);
          console.log("recordProject.projectId:", recordProject._id);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchClientDataByID();
    }
  }, [token, id, storeClientID, storeProjectID]);

  const updateProjectData = async () => {
    if (token) {
      try {
        const updatedProject = await infoProject(id, token);
        setRecordProject(updatedProject);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (error) {
    return <div> Error: {error}</div>;
  }

  return (
    <div className="w-full bg-white text-black p-4 rounded-lg shadow-lg">
      <div className="flex justify-evenly text-xs text-center">
        <Link className="boton-3" href="/user/deliverynotes/new/hour">
          Pincha para agregar a este cliente un albaran de horas
        </Link>
        <Link className=" boton-3 " href="/user/deliverynotes/new/material">
          Pincha para agregar a este proyecto un albaran de materiales
        </Link>
      </div>
      <div className="p-2">
        <h1 className="text-2xl">Client Information</h1>
        <pre className="text-white bg-slate-950 ">
          {JSON.stringify(recordProject, null, 2)}
        </pre>
        <div className="text-right">
          <button
            className="mt-4 border p-5 bg-blue-500 rounded-lg text-white text-center"
            onClick={() => setShowModifyForm(!showModifyForm)}
          >
            Modificar Información
          </button>
        </div>
      </div>
      {showModifyForm && (
        <ModifyProjectById
          projectId={id}
          projectData={recordProject}
          updateProjectData={updateProjectData}
        />
      )}{" "}
    </div>
  );
}
