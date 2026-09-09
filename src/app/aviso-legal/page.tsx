import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Aviso Legal y Contacto",
};

export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso Legal y Contacto">
      <p>
        En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la
        Información y de Comercio Electrónico (LSSI-CE), se facilita la
        información identificativa del titular de este sitio web.
      </p>
      <h2 className="pt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        Titular
      </h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Nombre comercial / sitio: Números claritos</li>
        <li>Actividad: portal editorial y herramienta informativa sobre nóminas, IRPF y finanzas personales en España</li>
        <li>Contacto: <a href="mailto:soportecalculadorasueldo@gmail.com" className="underline">soportecalculadorasueldo@gmail.com</a></li>
      </ul>
      <h2 className="pt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        Objeto
      </h2>
      <p>
        El sitio ofrece estimaciones orientativas de sueldo neto, explicaciones sobre nóminas, IRPF y seguridad social, así como contenido editorial para ayudar a entender finanzas personales en España. No constituye asesoramiento fiscal, laboral ni jurídico, ni sustituye una nómina o un cálculo profesional.
      </p>
      <h2 className="pt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        Propiedad intelectual
      </h2>
      <p>
        Los contenidos, diseño y código de este sitio pertenecen a su titular o
        se usan con licencia. Queda prohibida su reproducción no autorizada.
      </p>
      <h2 className="pt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        Responsabilidad
      </h2>
      <p>
        El titular no responde de decisiones tomadas a partir de los resultados
        de la calculadora ni de la disponibilidad ininterrumpida del servicio.
      </p>
    </LegalPage>
  );
}
