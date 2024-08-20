"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { newClient } from "@/app/utils/user";
import { useEffect, useState } from "react";

export default function ClientForm() {
  const [token, setToken] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      cif: "",
      address: {
        street: "",
        number: "",
        postal: "",
        city: "",
        province: "",
      },
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      setToken(storedToken);
      console.log("token :", storedToken);
      console.log("token :", typeof storedToken);
    }
  }, []);

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("data", data);
    console.log("token", typeof token);
    try {
      const res = await newClient(token, data);
      alert("Tu usuario ha sido registrado con éxito");
      router.push("/user");
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4 mx-auto">
          <h1 className=" bg-purple-700 mb-10 text-4xl font-bold p-2 text-center text-orange-400 rounded-lg">
            Nuevo Cliente
          </h1>

          <div className="relative mt-8 text-xl">
            <label htmlFor="name">Nombre del Cliente o Empresa</label>
            <input
              className="mt-3 peer block w-full rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
              type="text"
              id="name"
              {...register("name", { maxLength: 20 })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className="relative mt-8 text-xl">
            <label htmlFor="cif">CIF</label>
            <input
              className="mt-3 peer block w-full rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
              type="text"
              id="cif"
              {...register("cif", { maxLength: 9 })}
            />
            {errors.cif && <p>{errors.cif.message}</p>}
          </div>

          <div className="relative mt-8 text-xl">
            <label htmlFor="address">Domicilio Fiscal: </label>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative text-xl">
              <label htmlFor="address.street">Calle</label>
              <input
                className="mt-3 peer block w-[365px] rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
                type="text"
                id="address.street"
                {...register("address.street", {
                  required: "Street is required",
                })}
              />
              {errors.address?.street && <p>{errors.address.street.message}</p>}
            </div>
            <div className="relative text-xl">
              <label htmlFor="address.number">Número</label>
              <input
                className="mt-3 peer block w-32 rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
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
            <div className="relative text-xl">
              <label htmlFor="address.postal">Código Postal</label>
              <input
                className="mt-3 peer block  rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
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
          </div>
          <div className="flex items-center gap-5">
            <div className="relative text-xl">
              <label htmlFor="address.city">Ciudad</label>
              <input
                className=" peer block w-[365px] rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
                id="address.city"
                type="text"
                {...register("address.city", {
                  required: "City is required",
                })}
              />
              {errors.address?.city && <p>{errors.address.city.message}</p>}
            </div>

            <div className="relative text-xl">
              <label htmlFor="address.province">Provincia</label>
              <input
                className="peer block w-[365px] rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
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
          </div>

          <div className="w-full text-center mt-10">
            <button
              type="submit"
              className=" boton-2 mt-12 p-4 w-5/12 bg-blue-500 text-white text-2xl font-extrabold rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
