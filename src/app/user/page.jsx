"use client";
import Link from "next/link";
import ShowClient from "@/app/components/ShowClient";

export default function PortalVirtual() {
  return (
    <div className="w-full bg-blue-900 bg-opacity-70 rounded-lg p-4 max-md:mt-14">
      <div className=" container flex justify-center text-center p-10">
        <Link
          className="boton-volver font-bold text-2xl w-2/4"
          href="/user/client"
        >
          {" "}
          Crear nuevo cliente
        </Link>
      </div>
      <div className="page-p">
        <ShowClient />
      </div>
    </div>
  );
}
