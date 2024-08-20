"use client";
import Link from "next/link";

export default function NewDeliverynote() {
  return (
    <div className="form-p mt-8 p-2 rounded-lg">
      <div className="flex justify-center text-center m-10">
        <Link
          className="boton-volver font-bold text-white bg-orange-300 w-44 rounded-md"
          href="/user/deliverynotes"
        >
          Volver
        </Link>
      </div>
      <div className=" flex  justify-center">
        <h1 className="text-white font-bold m-5 text-4xl text-center">
          Indica en que formato deseas registrar tu albaran
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-30 mt-6 text-center">
        <Link
          className="boton-2 font-bold text-white bg-orange-300 rounded-md"
          href="/user/deliverynotes/new/hour"
        >
          Horas
        </Link>
        <Link
          className="boton-2 font-bold text-white bg-orange-300 rounded-md"
          href="/user/deliverynotes/new/material"
        >
          Material
        </Link>
      </div>
    </div>
  );
}
