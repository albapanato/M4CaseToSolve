"use client";
import Link from "next/link";
import ProjectForm from "@/app/components/ProjectForm";
import { useEffect, useState } from "react";

export default function NewProject() {
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    const storedClientId = localStorage.getItem("clientId");
    setClientId(storedClientId);
    console.log("Client ID:", storedClientId);
  }, []);

  return (
    <div className=" container flex w-full flex-col justify-center p-10">
      <div className="text-center p-4">
        <Link
          className="border font-bold text-white text-2xl p-6 bg-orange-300 w-2/4 rounded-md"
          href="/user/projects"
        >
          {" "}
          Volver a proyectos
        </Link>
      </div>
      <div className="container flex col-auto  h-56 ">
        <div className="mt-10">
          {clientId && <ProjectForm clientId={clientId} />}
        </div>
      </div>
    </div>
  );
}
