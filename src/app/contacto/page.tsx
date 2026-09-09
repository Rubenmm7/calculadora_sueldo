import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contacto y atención al usuario",
  description: "Contacta con Números Claritos para resolver dudas, comunicar errores o enviar sugerencias sobre nóminas e IRPF.",
};

export default function ContactoPage() {
  const emailContacto = "soportecalculadorasueldo@gmail.com";

  return (
    <main className="flex-1 bg-gradient-to-b from-zinc-50 via-emerald-50/40 to-zinc-50 px-4 py-8 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 sm:py-10 lg:py-12">
      <article className="mx-auto w-full max-w-3xl rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-7">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contacto" }]} />

        <header className="space-y-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Contacto y Atención al Usuario
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            ¿Tienes alguna duda sobre los cálculos, alguna sugerencia de mejora o has detectado algún error? Estamos a tu disposición.
          </p>
        </header>

        <section className="mt-6 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Correo Electrónico de Soporte
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Puedes escribirnos directamente a nuestra dirección de correo electrónico oficial de atención:
          </p>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <a
              href={`mailto:${emailContacto}`}
              className="break-all text-base font-semibold text-zinc-900 hover:underline dark:text-zinc-100"
            >
              {emailContacto}
            </a>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-amber-200/60 bg-amber-50/50 p-4 text-xs text-zinc-600 dark:border-amber-900/30 dark:bg-amber-950/20 dark:text-zinc-400">
          <p className="font-semibold text-amber-900 dark:text-amber-200">
            💡 Nota sobre el enlace de contacto:
          </p>
          <p className="mt-2 leading-relaxed">
            Al hacer clic en el enlace de correo superior, tu navegador intentará abrir la aplicación de correo que tengas configurada por defecto en tu dispositivo (como Mail, Outlook o Gmail).
          </p>
          <p className="mt-2 leading-relaxed">
            Si no se abre ninguna aplicación automáticamente, puedes copiar la dirección manualmente (<code>soportecalculadorasueldo@gmail.com</code>) y pegarla en el campo &quot;Para:&quot; desde tu cuenta habitual.
          </p>
        </section>

        <section className="mt-6 space-y-2 border-t border-zinc-100 pt-4 text-xs text-zinc-500 dark:border-zinc-800">
          <h3 className="font-medium text-zinc-700 dark:text-zinc-300">
            Tratamiento de tus datos de contacto
          </h3>
          <p className="leading-relaxed">
            Los datos que nos facilites al enviarnos un correo electrónico serán utilizados exclusivamente para responder a tu consulta o sugerencia. No cederemos tus datos a terceros ni los utilizaremos para enviar publicidad no solicitada. Consulta nuestra{" "}
            <Link href="/privacidad" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">
              Política de Privacidad
            </Link>{" "}
            para más información sobre tus derechos de protección de datos.
          </p>
        </section>

        <footer className="mt-6 pt-2">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-100"
          >
            ← Volver a la calculadora
          </Link>
        </footer>
      </article>
    </main>
  );
}
