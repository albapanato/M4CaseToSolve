import { infoDeliverynote } from "../utils/user";
import { useEffect, useState } from "react";
import Link from "next/link";
//para geberar un archivo descragable en pdf necesario instalar npm install jspdf html2canvas
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DeliverynoteID({ id }) {
  console.log("id del albaran: ", id);
  const [token, setToken] = useState(null);
  const [recordDeliverynote, setRecordDeliverynote] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      setToken(storedToken);
      localStorage.setItem("deliverynoteId", id); // Guardamos el ID del albaran en localStorage
      console.log("id en DeliverynoteID", id);
    }
  }, [id]);

  useEffect(() => {
    if (token) {
      const fetchDeliverynoteByID = async () => {
        try {
          const recordDeliverynote = await infoDeliverynote(id, token); // Cambiar storedToken por token
          setRecordDeliverynote(recordDeliverynote);
          console.log("recordDeliverynote:", recordDeliverynote);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchDeliverynoteByID();
    }
  }, [token, id]);

  const infoPDF = () => {
    // funcion que generará un archivo PDF a partir del contenido HTML de la pagina.
    const doc = document.getElementById("para-PDF"); // obtenemos el elemento HTML y lo almacenamos en doc
    // NOTA: la constante doc sera el contenedor HTML que se va a capturar como una imagen para el PDF.
    html2canvas(doc) //utilizamos la biblioteca "html2canvas" para crear un 'lienzo' (`canvas`) a partir del contenido de doc.
      .then((canvas) => {
        // accedemos al lienzo generado
        const imgData = canvas.toDataURL("image/png"); //cogemos el lienzo y lo pasamo a formato png.
        // NOTA: El método toDataURL("image/png") genera una URL de datos que representa la imagen codificada en base64.

        const pdf = new jsPDF(); //Crea una nueva instancia del objeto jsPDF.
        // NOTA: Este objeto es el que se utiliza para generar y manipular un documento PDF.

        // Tamaño estandar de una hoja A4:
        const imgWidth = 210; // Ancho del PDF en mm.
        const pageHeight = 295; // Altura del PDF en mm.

        //Calculo para ajustar la captura de pantalla del HTML y agregar mas paginas si la info no cupiera en solo una pagina del PDF:
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("deliverynote.pdf"); // guardamos el pdf con el nombre 'deliverynote.pdf' y lo guardamos
      });
  };

  if (error) {
    return <div> Error: {error}</div>;
  }

  return (
    <div>
      <div className="">
        <h1>Information del albaran seleccionado con id:</h1>
        <h2>{recordDeliverynote._id}</h2>
      </div>
      <div className="flex justify-end">
        <button className="boton-3" onClick={infoPDF}>
          Descargar albaran{" "}
        </button>
      </div>
      <div className="fondo" id="para-PDF">
        <pre>{JSON.stringify(recordDeliverynote, null, 2)}</pre>
      </div>
    </div>
  );
}
