import Navbar from "../components/Navbar";
import "../globals.css"; // Asegúrate de importar tus estilos globales

export const metadata = {
  title: "Mi cuenta en Bildy",
  description: "Gestiona tu cuenta",
};

export default function UserLayout({ children }) {
  return (
    <div className="layout-p flex ">
      <div className="flex flex-col">
        <nav className="w-1/4 mt-2">
          <Navbar />
        </nav>
      </div>

      <div className="mx-auto h-auto flex flex-col">
        <div>{children}</div>
      </div>
    </div>
  );
}
