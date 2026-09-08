import Script from "next/script";
import Link from "next/link";
import Calculadora from "@/components/Calculadora";

const faqItems = [
  {
    question: "¿Qué diferencia hay entre sueldo bruto y sueldo neto?",
    answer:
      "El bruto es la cantidad pactada antes de deducciones. El neto es lo que realmente llega a tu cuenta después de aplicar Seguridad Social e IRPF, por lo que suele ser menor que el bruto.",
  },
  {
    question: "¿La calculadora sirve para cualquier comunidad autónoma?",
    answer:
      "Ofrece una estimación orientativa para España. El resultado exacto puede variar según la comunidad autónoma, el contrato, la situación familiar y las circunstancias personales.",
  },
  {
    question: "¿Qué se descuenta de la nómina en España?",
    answer:
      "Los conceptos más habituales son Seguridad Social, IRPF, cotizaciones por desempleo y contingencias comunes, además de otros conceptos concretos que puedan aparecer según el convenio o el tipo de contrato.",
  },
  {
    question: "¿Cuándo me conviene cobrar en 12 o 14 pagas?",
    answer:
      "Si necesitas más estabilidad mensual, 12 pagas suele ser más cómodo. Si prefieres dos pagas extra y una mejor gestión del flujo anual, 14 pagas puede encajar mejor con tu estilo de vida.",
  },
  {
    question: "¿La retención del IRPF es igual al impuesto que pagaré al final?",
    answer:
      "No. La retención es un pago a cuenta que se aplica a lo largo del año. La declaración final puede hacerte devolver dinero o darte un resultado distinto según tu situación fiscal real.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="flex-1 bg-zinc-50 px-4 py-12 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl space-y-12">
          <Calculadora />

          <article className="mx-auto max-w-2xl space-y-8 border-t border-zinc-200 pt-10 pb-4 dark:border-zinc-800">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                ¿Cómo se calcula el salario neto en España?
              </h2>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                El sueldo neto se obtiene restando del salario bruto anual dos deducciones clave: las aportaciones a la
                <strong> Seguridad Social</strong> (desempleo, contingencias comunes y formación) y las retenciones a cuenta del
                <strong> IRPF</strong>.
              </p>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Diferencia entre 12 y 14 pagas
                </h3>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Cobrar en 12 o 14 pagas no altera la retribución bruta total al año ni la cantidad global de impuestos pagados.
                  Con 14 pagas se perciben dos pagas extraordinarias, lo que reduce la mensualidad ordinaria.
                </p>
              </div>
            </section>

            <section className="space-y-5 border-t border-zinc-200 pt-8 dark:border-zinc-800">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  Preguntas frecuentes sobre el sueldo neto
                </h2>
                <Link href="/blog" className="text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-300">
                  Ver blog →
                </Link>
              </div>

              <div className="space-y-3">
                {faqItems.map((item) => (
                  <details key={item.question} className="group rounded-xl border border-zinc-200 bg-white p-4 text-left dark:border-zinc-800 dark:bg-zinc-950">
                    <summary className="cursor-pointer list-none text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.question}
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>

              <p className="border-t border-zinc-200 pt-4 text-xs leading-5 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                Números Claritos no sustituye una nómina oficial ni el asesoramiento de un profesional fiscal.
              </p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}