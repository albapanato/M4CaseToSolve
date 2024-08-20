"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { newDeliverynote } from "../utils/user";

export default function DelinoteHorsForm() {
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
      format: "hours",
      hours: "",
      description: "",
      workdate: "",
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      const storedClientID = localStorage.getItem("clientId");
      const storedProjectID = localStorage.getItem("projectId");

      setToken(storedToken);

      reset({
        clientId: storedClientID,
        projectId: storedProjectID,
        format: "hours",
        hours: "",
        description: "",
        workdate: "",
      });

      console.log("token:", storedToken);
      console.log("client ID:", storedClientID);
      console.log("project ID:", storedProjectID);
    }
  }, [reset]);

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("data", data);
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-p pt-1 pb-5 text-center pl-3 pr-3"
      >
        <div className="p-4">
          <h1 className="mb-10 text-4xl font-extrabold p-1 text-center text-orange-600">
            Nuevo Albaran de Horas
          </h1>

          <div className="color-texto">
            <label htmlFor="hours">Total de horas</label>
            <input
              className="mt-3 peer block w-full rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
              type="number"
              id="hours"
              {...register("hours", { required: true, maxLength: 9 })}
            />
            {errors.hours && <p>{errors.hours.message}</p>}
          </div>

          <div className="color-texto">
            <label htmlFor="description">Descripcion</label>
            <input
              className="mt-3 peer block w-full rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
              type="text"
              id="description"
              {...register("description", { required: true, maxLength: 50 })}
            />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div className="color-texto">
            <label htmlFor="workdate">Fecha de trabajo </label>
            <input
              className=" text-center mt-3 peer block w-full rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
              type="date"
              id="workdate"
              {...register("workdate", { required: true })}
            />
            {errors.workdate && <p>{errors.workdate.message}</p>}
          </div>
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
