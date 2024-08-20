import ClientForm from "@/app/components/ClientForm";
import Link from "next/link";

export default function NewClient() {
  return (
    <div className="w-full bg-blue-900 bg-opacity-70 rounded-lg">
      <div className="container flex justify-center text-center p-10">
        <Link className="boton-volver font-bold text-2xl w-2/4" href="/user">
          Volver
        </Link>
      </div>
      <div className="page-p p-2 m-4">
        <ClientForm />
      </div>
    </div>
  );
}
