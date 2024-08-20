import Link from "next/link";

export default function PrincipalPage() {
  return (
    <>
      {/* <ImageBg /> */}
      <div className="grid grid-cols-3 mt-10  border h-full ">
        <div className="">{/* mantener este div */}</div>
        <div className="mx-auto self-center border ">
          <h1 className="text-white text-7xl text-center  text-shadow-lg font-bold leading-normal ">
            Genera albaranes digitales facilmente con bildyapp
          </h1>
        </div>

        <div className="relative bottom-48  right-20 m-10 border">
          <ul className="flex justify-end ">
            <li className="boton p-5 text-2xl text-white bg-indigo-600 rounded-xl shadow-2xl -rotate-6">
              <Link href="/register" className="">
                Sign Up
              </Link>
            </li>
            <li className="boton p-5 ml-5 text-2xl text-white bg-orange-400 rounded-xl rotate-6">
              <Link href="/login">Sign In</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
