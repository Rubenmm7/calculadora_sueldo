import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contacto y atención al usuario",
  description: "Contacta con Números claritos para resolver dudas, comunicar errores o enviar sugerencias sobre nóminas e IRPF.",
};

export default function ContactoPage() {
  const emailContacto = "soportecalculadorasueldo@gmail.com";

  return (
    <main className="flex-1 bg-gradient-to-b from-zinc-50 via-emerald-50/40 to-zinc-50 px-4 py-8 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-7">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              Contacto y atención al usuario
            </h1>
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              ¿Tienes alguna duda sobre los cálculos, una sugerencia de mejora o has detectado un error? Estamos a tu disposición para ayudarte.
            </p>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-7">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Correo electrónico de soporte</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Puedes escribirnos directamente a nuestra dirección oficial de atención al usuario.
            </p>

            <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <a
                href={`mailto:${emailContacto}`}
                className="inline-block break-all text-base font-semibold text-zinc-900 transition-colors duration-200 hover:text-emerald-300 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] no-underline dark:text-zinc-100 dark:hover:text-emerald-300"
              >
                {emailContacto}
              </a>
            </div>

            <div className="mt-5 rounded-2xl border border-amber-200/60 bg-amber-50/50 p-4 text-sm text-zinc-600 dark:border-amber-900/30 dark:bg-amber-950/20 dark:text-zinc-400">
              <p className="font-semibold text-amber-900 dark:text-amber-200">Nota importante</p>
              <p className="mt-2 leading-6">
                Al hacer clic en el enlace de correo, tu navegador intentará abrir la aplicación de correo configurada en tu dispositivo. Si no se abre ninguna, puedes copiar la dirección y enviarla desde tu cuenta habitual.
              </p>
            </div>
          </article>

          <aside className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-5 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              Privacidad
            </p>
            <h2 className="mt-3 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Tratamiento de tus datos
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              Los datos que nos facilites en tu correo se utilizarán exclusivamente para responder a tu consulta o sugerencia. No los compartiremos con terceros ni los usaremos para enviar publicidad no solicitada.
            </p>

            <div className="mt-5 rounded-2xl bg-white/70 p-4 text-sm text-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300">
              Consulta nuestra{' '}
              <Link href="/privacidad" className="inline-block font-semibold text-emerald-700 no-underline transition-colors duration-200 hover:text-emerald-300 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] dark:text-emerald-300 dark:hover:text-emerald-300">
                Política de Privacidad
              </Link>{' '}
              para más información sobre tus derechos.
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
