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
        <section className="overflow-hidden rounded-[32px] border border-zinc-700 bg-[#050b10] p-5 shadow-sm sm:p-7 lg:p-8">
          <div className="mb-6 border-b border-zinc-700 pb-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              NÚMEROS CLARITOS / INTERÉS COMPUESTO
            </p>
          </div>

          <div className="max-w-5xl space-y-5">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Calculadora de interés compuesto
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-zinc-300">
              Simula cómo puede crecer tu capital con aportaciones periódicas, rentabilidad anual y el efecto del tiempo sobre cada euro invertido.
            </p>
          </div>

          <div className="mt-7 rounded-2xl border border-emerald-500/70 bg-emerald-500/10 px-4 py-4 text-sm text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.12)]">
            <span className="font-semibold text-emerald-300">Visualiza el crecimiento:</span> capital final, intereses, inflación e impacto anual.
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-700 bg-zinc-900/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Objetivo
              </p>
              <p className="mt-3 text-lg font-bold text-white">Aumentar capital</p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">Estima el crecimiento de tus ahorros y la rentabilidad acumulada con el tiempo.</p>
            </div>
            <div className="rounded-2xl border border-zinc-700 bg-zinc-900/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                frecuencia
              </p>
              <p className="mt-3 text-lg font-bold text-white">Mensual o anual</p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">Ajusta la periodicidad de las aportaciones para reflejar tu estrategia real.</p>
            </div>
            <div className="rounded-2xl border border-zinc-700 bg-zinc-900/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                resultado útil
              </p>
              <p className="mt-3 text-lg font-bold text-white">Saldo neto</p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">Consulta el valor final tras impuestos e inflación para comparar escenarios.</p>
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
