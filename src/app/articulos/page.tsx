import type { Metadata } from "next";
import Link from "next/link";
import { articulos } from "./articulos";

export const metadata: Metadata = {
  title: "Artículos sobre finanzas y nóminas",
  description:
    "Guías sencillas sobre sueldo neto, nóminas, IRPF, Seguridad Social y finanzas personales en España.",
  alternates: { canonical: "/articulos" },
};

export default function ArticulosPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12 dark:bg-zinc-900">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="max-w-2xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            CalculaSueldo / Artículos
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Finanzas personales y nóminas, explicadas sin rodeos
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Guías prácticas para entender tu sueldo, calcular el neto y tomar mejores decisiones con tu dinero.
          </p>
        </header>

        <section aria-labelledby="ultimos-articulos" className="grid gap-4 md:grid-cols-3">
          <h2 id="ultimos-articulos" className="sr-only">Últimos artículos</h2>
          {articulos.map((articulo) => (
            <article
              key={articulo.slug}
              className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <span>{articulo.category}</span>
                <span>{articulo.readTime}</span>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                <Link href={`/articulos/${articulo.slug}`} className="hover:underline">
                  {articulo.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {articulo.description}
              </p>
              <p className="mt-5 text-xs text-zinc-500 dark:text-zinc-400">
                Actualizado el {articulo.updatedAt}
              </p>
            </article>
          ))}
        </section>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            ¿Quieres calcular tu caso?
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Introduce tu salario bruto, complementos y número de pagas en nuestra calculadora gratuita.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Ir a la calculadora
          </Link>
        </div>
      </div>
    </main>
  );
}
