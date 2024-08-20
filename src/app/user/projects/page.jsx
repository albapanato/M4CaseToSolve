"use client";
import Link from "next/link";
import ShowProject from "@/app/components/ShowProject";

export default function PortalProject() {
  return (
    <div className=" bg-blue-900 rounded-lg p-4 max-md:mt-14">
      <div className="container flex justify-center text-center p-10">
        <Link
          className="boton-volver font-bold text-2xl w-2/3"
          href="/user/projects/new"
        >
          {" "}
          Crear un nuevo proyecto
        </Link>
      </div>
      <div className="caja1  page-p ">
        <ShowProject />
      </div>
    </div>
  );
}
