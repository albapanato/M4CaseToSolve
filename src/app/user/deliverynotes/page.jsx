"use client";
import Link from "next/link";
import ShowDeliverynote from "@/app/components/ShowDeliverynote";

export default function PortalVirtual() {
  return (
    <div className="w-full bg-blue-900 rounded-lg p-8 max-md:mt-14">
      <div className=" container flex justify-center text-center p-10">
        <Link
          className="border font-bold text-white text-2xl p-3 bg-cyan-600 w-3/4 rounded-md"
          href="/user/deliverynotes/new"
        >
          {" "}
          Crear un nuevo albaran
        </Link>
      </div>
      <div className="caja1 page-p">
        <ShowDeliverynote />
      </div>
    </div>
  );
}
