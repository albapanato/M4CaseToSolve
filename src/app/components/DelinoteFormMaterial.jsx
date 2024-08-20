"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { newDeliverynote } from "../utils/user";

export default function DelinoteFormMaterial() {
  const [token, setToken] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      clientId: "",
      projectId: "",
      format: "material",
      material: "",
      description: "",
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      const storedClientID = localStorage.getItem("clientId");
      const storedProjectID = localStorage.getItem("projectId");
      setToken(storedToken);
      console.log("token :", storedToken);
      console.log("token :", typeof storedToken);

      reset({
        clientId: storedClientID,
        projectId: storedProjectID,
        format: "material",
        material: "",
        description: "",
      });
      console.log("token:", storedToken);
      console.log("client ID:", storedClientID);
      console.log("project ID:", storedProjectID);
    }
  }, []);

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("data", data);
    console.log(token);
    console.log("token", typeof token);
    try {
      const res = await newDeliverynote(token, data);
      alert("Tu albaran ha sido registrado con éxito");
      router.push("/user/deliverynotes");
      if (res.token) {
        localStorage.setItem("jwt", res.token); // Guarda el token en el almacenamiento local
      } else {
        throw new Error("Failed to register user.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full">
        <div className="p-4">
          <h1 className="mb-10 text-4xl font-extrabold p-1 text-center text-blue-500">
            Nuevo Albaran de material
          </h1>

          <div className="text-xl">
            <label htmlFor="material">Tipo de material</label>
            <input
              className="mt-3 peer block w-full rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
              type="text"
              id="material"
              {...register("material", { required: true, maxLength: 9 })}
            />
            {errors.material && <p>{errors.material.message}</p>}
          </div>
        </div>

        <div className="mt-8 text-xl">
          <label htmlFor="description">Descripcion</label>
          <input
            className="mt-3 peer block w-full rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
            type="text"
            id="description"
            {...register("description", { required: true, maxLength: 50 })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div className="w-full text-center mt-10">
          <button
            type="submit"
            className="mt-12 p-4 w-5/12 bg-blue-500 text-white text-2xl font-extrabold rounded"
          >
            Agregar
          </button>
        </div>
      </form>
    </>
  );
}
