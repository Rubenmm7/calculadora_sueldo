import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de Cookies",
};

export default function CookiesPage() {
  return (
    <LegalPage title="Política de Cookies">
      <p>
        Esta política informa sobre el uso de cookies y tecnologías similares en
        este sitio, de acuerdo con el RGPD y la LSSI-CE. Google exige un banner
        de consentimiento adaptado a la normativa europea antes de usar cookies
        publicitarias.
      </p>
      <h2 className="pt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        Qué es una cookie
      </h2>
      <p>
        Una cookie es un pequeño archivo que se almacena en tu dispositivo para
        recordar preferencias o medir y personalizar contenidos y anuncios.
      </p>
      <h2 className="pt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        Cookies que utilizamos
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Necesarias:</strong> recuerdan tu decisión de consentimiento
          de cookies (almacenamiento local en el navegador). No requieren
          consentimiento adicional.
        </li>
        <li>
          <strong>Publicitarias de terceros (Google AdSense):</strong> si
          aceptas, Google y sus socios pueden usar cookies para servir anuncios
          basados en tus visitas previas a este sitio y a otros sitios web,
          personalizar publicidad, medir campañas y limitar la repetición de
          anuncios.
        </li>
      </ul>
      <h2 className="pt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        Consentimiento
      </h2>
      <p>
        Al entrar en el sitio verás un banner. Puedes aceptar o rechazar las
        cookies no necesarias. Si rechazas, no se activarán las cookies de
        publicidad personalizada de AdSense. Puedes cambiar de opinión
        eliminando los datos de este sitio en la configuración de tu navegador
        para que el banner vuelva a mostrarse.
      </p>
      <h2 className="pt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        Cómo desactivar cookies
      </h2>
      <p>
        También puedes bloquear o borrar cookies desde la configuración de tu
        navegador. La inhabilitación puede afectar a la publicidad y a algunas
        funciones de terceros.
      </p>
      <p>
        Más información sobre publicidad de Google:{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          className="underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          tecnologías de publicidad de Google
        </a>
        .
      </p>
    </LegalPage>
  );
}
