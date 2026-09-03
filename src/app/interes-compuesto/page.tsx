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
    <main className="flex-1 bg-zinc-50 px-4 py-12 dark:bg-zinc-900">
      <div className="mx-auto max-w-4xl space-y-12">
        <CalculadoraInteresCompuesto />

        <article className="mx-auto max-w-2xl space-y-8 border-t border-zinc-200 pt-10 pb-4 dark:border-zinc-800">
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
