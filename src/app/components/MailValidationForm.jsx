"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import InputsValidation from "./InputsValidation";
import Image from "next/image";

import { validateUser } from "@/app/utils/user";

export default function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      code: Array(6).fill(""),
    },
  });
  const [code, setCode] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    const token = localStorage.getItem("jwt");
    const fullCode = code; // Convertimos el array de códigos a una cadena
    const res = await validateUser(token, { code: fullCode });

    if (res.acknowledged) {
      router.push("/user");
    } else {
      throw new Error("Failed to match code.");
    }
  };

  return (
    <div className="flex-1 rounded-lg bg-white p-2">
      <div className="p-2 pt-3">
        <Image
          src="/img/ZoSale.png"
          alt="Logo ZoSale"
          width={100}
          height={80}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 px-6 pb-4">
        <h1 className="mb-4 text-xs text-black font-bold text-shadow-none">
          Introduce el código enviado a tu correo electrónico
        </h1>
        <div className="">
          <InputsValidation
            register={register}
            errors={errors}
            setCode={setCode}
          />
          {errors.code && (
            <p className="text-red-500 mt-2">Código es requerido</p>
          )}
        </div>
        <div className="pt-3">
          <input
            className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600"
            type="submit"
            value="Enviar"
          />
        </div>
      </form>
    </div>
  );
}
