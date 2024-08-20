"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"; // npm install react-hook-form
import { createUser } from "../utils/user";
import Link from "next/link";

export default function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("data", data);
    const res = await createUser(data);
    console.log("res", res);
    console.log(res.token);
    if (res.token) {
      localStorage.setItem("jwt", res.token); // esto lo guarda en el almacenamiento local
      router.push("/validation"); // esto se va a ir a /validation/page.js
    } else {
      throw new Error("Failed to register user.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <h1 className="mb-5 text-center text-4xl text-shadow-xl text-blue-900 font-bold">
        Crea tu cuenta
      </h1>
      <div className="flex-1 rounded-lg bg-orange-400 bg-opacity-75 px-6 pb-8 pt-4">
        <div className="w-full mt-4">
          <div>
            <label htmlFor="name"></label>
            <input
              className="peer block w-full rounded-md border border-gray-200 p-3 text-lg outline-2 text-scale-600"
              type="text"
              id="name"
              placeholder="Nombre"
              {...register("name", { maxLength: 20 })} // Aqui se mete si es requerido
            />
          </div>

          <div className="relative mt-4">
            <label htmlFor="surnames"></label>
            <input
              className="peer block w-full rounded-md border border-gray-200 p-3 text-lg outline-2 text-scale-600"
              type="text"
              id="surnames"
              placeholder="Apellidos"
              {...register("surnames", { maxLength: 40 })}
            />
          </div>

          <div className="relative mt-4">
            <label htmlFor="email"></label>
            <input
              className="peer block w-full rounded-md border border-gray-200 p-3 text-lg outline-2 text-scale-600"
              type="email" // type=email valida que sea de tipo email
              id="email"
              placeholder=" Email"
              {...register("email", { required: true, maxLength: 30 })}
            />
            {errors.email?.type === "required" && "Email es requerido"}{" "}
            {/*  manejamos los errores */}
          </div>

          <div className="relative mt-4">
            <label htmlFor="password"></label>
            <input
              className="peer block w-full rounded-md border border-gray-200 p-3 text-lg outline-2 text-slate-700"
              type="password"
              id="password"
              placeholder=" Contraseña"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password?.type === "required" && "Contraseña es requerida"}
          </div>
        </div>
      </div>
      <input
        className="mt-4 w-full text-3xl pt-3 cursor-pointer text-blue-900 text-shadow-xl font-bold"
        type="submit"
      />

      <div className="flex justify-center items-center p-2 rounded-lg mx-auto w-3/4 bg-orange-400 bg-opacity-75 text-xl text-shadow-xl text-black text-center font-bold">
        ¿Ya tienes cuenta?
        <Link href="/login">
          <span className=" ml-3 text-blue-900 text-3xl text-shadow-xl font-bold">
            Accede
          </span>
        </Link>
      </div>
    </form>
  );
}
