"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { newProject } from "../utils/user";
import { useEffect, useState } from "react";

// Por hacer... al crear un cliente y pinchar en la decripcion aparece la informacion del cliente, hacer la logica para que pase por parametro el id del cliente
export default function ProjectForm({ clientId }) {
  const [token, setToken] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      address: {
        street: "",
        number: "",
        postal: "",
        city: "",
        province: "",
      },
      code: "",
      client: "",
      clientId: clientId, // asignamos el valor del id del cliente a clientId
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      setToken(storedToken);
      console.log("token :", storedToken);
      console.log("idClient en ProjectForm", clientId);
    }
  }, []);

  const router = useRouter();

  const onSubmit = async (data) => {
    data.clientId = clientId; // asi agregamos el valos del id a los datos del proyecto
    console.log("data", data);
    console.log("id", clientId);
    console.log("token", typeof token);
    try {
      const res = await newProject(clientId, token, data);
      alert("El proyecto ha sido asignado al cliente con exito"); // cambiar esto por un modal si da tiempo
      router.push("/user/projects");
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        // localStorage.setItem("projectID", res._id); Esto sobraria ya?? ver componente ProjectID
      } else {
        throw new Error("Failed to register project.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-orange-300 w-full">
        <h1 className="pt-3 text-4xl font-extrabold text-center text-blue-500">
          Nuevo Proyecto
        </h1>
        <div className="p-5">
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="text-xl">
              <label className="p-2" htmlFor="name">
                Nombre del Proyecto
              </label>
              <input
                className="mt-3 peer block w-full rounded-md border border-gray-200 p-1 text-xl outline-2 text-scale-600"
                type="text"
                id="name"
                {...register("name", { maxLength: 20 })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className="text-xl">
              <label className="p-2" htmlFor="email">
                Email
              </label>
              <input
                className="mt-3 peer block w-full rounded-md border border-gray-200 p-1 text-xl outline-2 text-scale-600"
                type="email"
                id="email"
                {...register("email", { required: true })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="text-xl">
              <label className="p-2" htmlFor="code">
                Codigo interno del proyecto
              </label>
              <input
                className="mt-3 peer block w-full rounded-md border border-gray-200 p-1 text-xl outline-2 text-scale-600"
                type="text"
                id="code"
                {...register("code")}
              />
              {errors.code && <p>{errors.code.message}</p>}
            </div>
            <div className="text-xl">
              <label className="p-2" htmlFor="client">
                Mongo id
              </label>
              <input
                className="mt-3 peer block w-full rounded-md border border-gray-200 p-1 text-xl outline-2 text-scale-600"
                type="text"
                id="client"
                {...register("client", { maxLength: 20 })}
              />
              {errors.client && <p>{errors.client.message}</p>}
            </div>
          </div>{" "}
          <div className="m text-xl h-10">
            <label htmlFor="address">Domicilio Fiscal: </label>
          </div>{" "}
          <div className="flex gap-4">
            <div className="text-xl">
              <label className="p-2" htmlFor="address.street">
                Calle
              </label>
              <input
                className="peer block w-[300px] rounded-md border border-gray-200 p-1 text-xl outline-2 text-scale-600"
                type="text"
                id="address.street"
                {...register("address.street", {
                  required: "Street is required",
                })}
              />
              {errors.address?.street && <p>{errors.address.street.message}</p>}
            </div>
            <div className="text-xl">
              <label className="p-2" htmlFor="address.number">
                Número
              </label>
              <input
                className="peer block w-full rounded-md border border-gray-200 p-1 text-xl outline-2 text-scale-600"
                id="address.number"
                type="text"
                {...register("address.number", {
                  required: "Number is required",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Number must be greater than 0",
                  },
                })}
              />
              {errors.address?.number && <p>{errors.address.number.message}</p>}
            </div>
            <div className="text-xl">
              <label className="p-2" htmlFor="address.postal">
                Código Postal
              </label>
              <input
                className="peer block w-full rounded-md border border-gray-200 p-1 text-xl outline-2 text-scale-600"
                id="address.postal"
                type="text"
                {...register("address.postal", {
                  required: "Postal code is required",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Postal code must be greater than 0",
                  },
                })}
              />
              {errors.address?.postal && <p>{errors.address.postal.message}</p>}
            </div>
          </div>{" "}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-xl">
              <label className="p-2" htmlFor="address.city">
                Ciudad
              </label>
              <input
                className="peer block w-full rounded-md border border-gray-200 p-1 text-xl outline-2 text-scale-600"
                id="address.city"
                type="text"
                {...register("address.city", {
                  required: "City is required",
                })}
              />
              {errors.address?.city && <p>{errors.address.city.message}</p>}
            </div>
            <div className="text-xl">
              <label className="p-2" htmlFor="address.province">
                Provincia
              </label>
              <input
                className="peer block w-full rounded-md border border-gray-200 p-1 text-xl outline-2 text-scale-600"
                id="address.province"
                type="text"
                {...register("address.province", {
                  required: "Province is required",
                })}
              />
              {errors.address?.province && (
                <p>{errors.address.province.message}</p>
              )}
            </div>
          </div>{" "}
          <div className="button w-full text-center mt-10">
            <button
              type="submit"
              className="w-5/12 bg-blue-500 text-white text-2xl font-extrabold rounded"
            >
              Agregar proyecto
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
