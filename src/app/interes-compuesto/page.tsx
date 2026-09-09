import type { Metadata } from "next";
import Link from "next/link";
import CalculadoraInteresCompuesto from "@/components/CalculadoraInteresCompuesto";

export const metadata: Metadata = {
  title: "Calculadora de interés compuesto",
  description:
    "Calcula el crecimiento de tus ahorros con interés compuesto, aportaciones periódicas, inflación e impuestos estimados.",
  alternates: { canonical: "/interes-compuesto" },
};

export default function InteresCompuestoPage() {
  return (
    <main className="flex-1 bg-gradient-to-b from-zinc-50 via-emerald-50/40 to-zinc-50 px-4 py-8 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-6xl space-y-10 lg:space-y-12">
        <section className="mx-auto min-h-0 w-full max-w-6xl rounded-[32px] border border-zinc-200 bg-white p-5 shadow-sm ring-1 ring-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-zinc-800 sm:min-h-[620px] sm:p-7 lg:p-8">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
                Números Claritos
              </span>
              <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
                Calculadora de interés compuesto
              </h1>
              <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg">
                Simula cómo puede crecer tu capital con aportaciones periódicas, rentabilidad anual y el efecto del tiempo sobre cada euro invertido.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
              <span className="font-semibold">Visualiza el crecimiento:</span> capital final, intereses, inflación e impacto anual.
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                Objetivo
              </p>
              <p className="mt-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">Aumentar capital</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">Estima el crecimiento de tus ahorros y la rentabilidad acumulada con el tiempo.</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                frecuencia
              </p>
              <p className="mt-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">Mensual o anual</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">Ajusta la periodicidad de las aportaciones para reflejar tu estrategia real.</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                resultado útil
              </p>
              <p className="mt-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">Saldo neto</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">Consulta el valor final tras impuestos e inflación para comparar escenarios.</p>
            </div>
          </div>
        </section>

        <CalculadoraInteresCompuesto />

        <article className="mx-auto flex min-h-0 w-full max-w-6xl flex-col justify-between space-y-8 rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:min-h-[620px] sm:p-7">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              ¿Qué es el interés compuesto?
            </h2>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              El interés compuesto hace que los intereses obtenidos se sumen al capital y puedan generar nuevos intereses. Con el tiempo, el crecimiento puede acelerarse, especialmente cuando mantienes aportaciones periódicas.
            </p>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Esta simulación es orientativa. La rentabilidad real no está garantizada y puede variar según el producto financiero, las comisiones, los impuestos y la evolución del mercado.
            </p>
          </section>
          <section className="space-y-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Cómo usar la calculadora
            </h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              <li>Indica cuánto invertirías al principio y cuánto aportarías después.</li>
              <li>Elige una rentabilidad anual estimada y el plazo de inversión.</li>
              <li>Ajusta la frecuencia de tus aportaciones, la inflación y los impuestos.</li>
              <li>Revisa el capital final, los intereses y la tabla de evolución anual.</li>
            </ol>
          </section>
          <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            La información de esta página no constituye asesoramiento financiero. Consulta a un profesional antes de tomar decisiones de inversión.
          </p>
          <Link href="/" className="inline-flex text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-300">
            ← Volver a la calculadora de sueldo
          </Link>
        </article>
      </div>
    </main>
  );
}
