"use server";
import Image from "next/image";

export default async function ImageBg() {
  return (
    <div className="background ">
      <Image
        className="rounded-full p-3"
        src="https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHw1fHxkaWdpdGFsJTIwaW52b2ljaW5nfGVufDB8fHx8MTcxODU2NTQ1NHww&ixlib=rb-4.0.3&auto=format&fit=crop&w=1920"
        alt="Descripción de la imagen"
        width={1620}
        height={700}
      />
    </div>
  );
}
