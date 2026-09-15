import type { Metadata } from "next";
import Link from "next/link";
import Calculadora from "@/components/Calculadora";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: {
    absolute: "Calculadora Sueldo Neto 2026: ¿Cuánto cobras en nómina? | Números Claritos",
  },
  description:
    "Calcula gratis tu salario neto mensual y anual según las retenciones de IRPF y normativa laboral en España. ¡Sin registros y al instante!",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Calculadora Sueldo Neto 2026: ¿Cuánto cobras en nómina? | Números Claritos",
    description:
      "Calcula gratis tu salario neto mensual y anual según las retenciones de IRPF y normativa laboral en España. ¡Sin registros y al instante!",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora Sueldo Neto 2026: ¿Cuánto cobras en nómina? | Números Claritos",
    description:
      "Calcula gratis tu salario neto mensual y anual según las retenciones de IRPF y normativa laboral en España. ¡Sin registros y al instante!",
  },
};

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
      "Si necesitas más estabilidad mensual, 12 pagas suele ser más cómodo. Si prefieres dos pagas extras y una mejor gestión del flujo anual, 14 pagas puede encajar mejor con tu estilo de vida.",
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
  const featuredPosts = posts.slice(0, 4);

  return (
    <>
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="flex-1 bg-gradient-to-b from-zinc-50 via-emerald-50/40 to-zinc-50 px-4 py-8 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-6xl space-y-10 lg:space-y-12">
          <section className="overflow-hidden rounded-[32px] border border-zinc-700 bg-[#050b10] p-5 shadow-sm sm:p-7 lg:p-8">
            

            <div className="max-w-5xl space-y-5">
              <h1 className="text-4xl font-black tracking-tight text-white ">
                Calculadora de Sueldo Neto e IRPF en España
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-zinc-300">
                Comprueba tu salario bruto, la cotización a la Seguridad Social, la retención del IRPF y el resultado real antes de aceptar una oferta o revisar tu nómina.
              </p>
            </div>

            <div className="mt-7 rounded-2xl border border-emerald-500/70 bg-emerald-500/10 px-4 py-4 text-sm text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.12)]">
              <span className="font-semibold text-emerald-300">Cálculo orientativo:</span> nómina, IRPF y Seguridad Social en España.
            </div>

            <div className="mt-8">
              <Calculadora />
            </div>
          </section>

          <section aria-labelledby="blog-section" className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-7">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                  Editorial
                </p>
                <h2 id="blog-section" className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  Últimos artículos del blog
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex min-h-[44px] items-center text-sm font-semibold text-emerald-700 no-underline transition-colors duration-200 hover:text-emerald-300 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] dark:text-emerald-300 dark:hover:text-emerald-300"
              >
                Ver todos los artículos en el Blog
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featuredPosts.map((post) => (
                <article key={post.slug} className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex items-center justify-between gap-3 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-700 dark:text-zinc-300">
                    <span>{post.category}</span>
                    <span>{post.readingTime}</span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold leading-tight text-zinc-900 dark:text-zinc-50">
                    <Link href={`/blog/${post.slug}`} className="inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-emerald-300 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] no-underline dark:hover:text-emerald-300">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{post.excerpt}</p>

                  <div className="mt-5 flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300">
                    <time dateTime={post.publishedAt}>Actualizado {post.publishedAt}</time>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center font-semibold text-emerald-700 no-underline transition-colors duration-200 hover:text-emerald-400 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] dark:text-emerald-300 dark:hover:text-emerald-400"
                    >
                      Leer
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                Información SEO y fiscal
              </p>
              <h2 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                Cómo entender la nómina y el cálculo del IRPF en España
              </h2>

              <div className="mt-5 space-y-5 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                <p>
                  En España, el sueldo bruto es la base sobre la que se calculan las cotizaciones a la Seguridad Social y la retención del IRPF. La diferencia entre ese importe y el neto se debe a dos factores clave: la carga social y el impuesto sobre la renta.
                </p>
                <p>
                  La normativa fiscal y laboral exige que la empresa aplique retenciones mensuales a cuenta del IRPF según la base imponible, la situación personal del trabajador y las reducciones o deducciones aplicables. Por eso, entender el cálculo del salario neto es útil no solo para revisar tu nómina, sino también para comparar ofertas, negociar mejor condiciones o detectar errores.
                </p>
                <p>
                  Nuestras herramientas ayudan a aproximar ese resultado de forma clara, con un enfoque práctico para que puedas revisar cuánto te queda efectivo, cómo cambia el neto al variar tu salario y cuál es el efecto del número de pagas, la Seguridad Social y la base imponible.
                </p>
              </div>

              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                <li className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Bruto</p>
                  <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Salario pactado antes de deducciones.</p>
                </li>
                <li className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Seguridad Social</p>
                  <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Cotizaciones obligatorias sobre la base de cotización.</p>
                </li>
                <li className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Neto</p>
                  <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Cantidad final que llega a tu cuenta cada mes.</p>
                </li>
              </ul>
            </article>

            <aside className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-5 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/40 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                Consejo práctico
              </p>
              <h3 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                Revisa antes de firmar
              </h3>
              <ul className="mt-5 space-y-4 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
                <li className="rounded-2xl bg-white/70 p-4 dark:bg-zinc-900/70">
                  Compara el salario bruto anual y el neto mensual para entender el impacto real de la oferta.
                </li>
                <li className="rounded-2xl bg-white/70 p-4 dark:bg-zinc-900/70">
                  Mira si te pagan en 12 o 14 pagas y cómo cambia la disponibilidad mensual de tu nómina.
                </li>
                <li className="rounded-2xl bg-white/70 p-4 dark:bg-zinc-900/70">
                  Consulta las retenciones del IRPF para valorar si la oferta fiscal encaja con tu perfil real.
                </li>
              </ul>
            </aside>
          </section>

          <section id="faq" className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-7">
            <div className="mb-6 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                FAQ
              </p>
              <h2 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                Preguntas frecuentes sobre nóminas, retenciones e IRPF
              </h2>
            </div>

            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <details
                  key={item.question}
                  open={index === 0}
                  className="group rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-left dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <summary className="flex min-h-[44px] cursor-pointer list-none items-center text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
