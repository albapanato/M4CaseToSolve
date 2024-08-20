import Link from "next/link";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <ul className="md:text-left">
        <li>
          <Link className="" href="/user">
            Clientes
          </Link>
        </li>
        <li>
          <Link className="" href="/user/projects">
            Proyectos
          </Link>
        </li>
        <li>
          <Link className="" href="/user/deliverynotes">
            Albaranes
          </Link>
        </li>
        <li className="hover:text-white hover:bg-black ">
          <Link className="" href="/">
            Sing out
          </Link>
        </li>
      </ul>
    </div>
  );
}
