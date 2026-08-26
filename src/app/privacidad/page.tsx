import Link from "next/link";
import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidad",
};

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de Privacidad">
      <p>
        Esta política describe cómo se tratan los datos personales en este sitio
        web de cálculo de salario bruto a neto en España.
      </p>
      <h2 className="pt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        Responsable
      </h2>
      <p>
        El responsable del tratamiento es el titular identificado en el{" "}
        <Link href="/aviso-legal" className="underline">
          Aviso Legal y Contacto
        </Link>
        .
      </p>
      <h2 className="pt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        Datos que se tratan
      </h2>
      <p>
        La calculadora funciona en el navegador: el salario bruto y el número de
        pagas no se envían a un servidor para el cálculo. Si nos escribes por
        correo, trataremos tu dirección y el contenido del mensaje para
        responderte.
      </p>
      <h2 className="pt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        Cookies y proveedores de terceros (Google AdSense)
      </h2>
      <p>
        Este sitio puede utilizar cookies propias necesarias y cookies de
        proveedores de terceros, en particular <strong>Google AdSense</strong>,
        para servir anuncios basados en las visitas previas del usuario a este
        sitio y a otros sitios web. Google y sus socios pueden recoger o recibir
        información del dispositivo, el navegador y la actividad de navegación
        para personalizar anuncios, medir su rendimiento y limitar la
        repetición de creatividades.
      </p>
      <p>
        Estas cookies de publicidad no se activan hasta que prestas tu
        consentimiento en el banner. Puedes aceptarlas o rechazarlas, y
        modificar tu elección borrando los datos del sitio en el navegador. Más
        detalle en la{" "}
        <Link href="/cookies" className="underline">
          Política de Cookies
        </Link>
        .
      </p>
      <p>
        Información de Google sobre cómo usa los datos:{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          className="underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          Cómo utiliza Google la información de los sitios que usan sus
          servicios
        </a>
        .
      </p>
      <h2 className="pt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        Derechos
      </h2>
      <p>
        Puedes solicitar acceso, rectificación, supresión, limitación,
        oposición y portabilidad, así como retirar el consentimiento, contactando
        con el titular. También puedes reclamar ante la Agencia Española de
        Protección de Datos (AEPD).
      </p>
    </LegalPage>
  );
}
