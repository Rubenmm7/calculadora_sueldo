import type { Metadata } from "next";
import Link from "next/link";
import BlogSearch from "@/components/BlogSearch";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog de Nóminas, IRPF y Finanzas Personales",
  description:
    "Guías claras para entender tu nómina, calcular el sueldo neto, conocer el IRPF y tomar mejores decisiones financieras en España.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog de Nóminas, IRPF y Finanzas Personales",
    description:
      "Guías claras para entender tu nómina, calcular el sueldo neto, conocer el IRPF y tomar mejores decisiones financieras en España.",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de Nóminas, IRPF y Finanzas Personales",
    description:
      "Guías claras para entender tu nómina, calcular el sueldo neto, conocer el IRPF y tomar mejores decisiones financieras en España.",
  },
};

export default function BlogPage() {
  const latestPosts = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 bg-gradient-to-b from-zinc-50 via-emerald-50/40 to-zinc-50 px-4 py-8 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-6xl space-y-8">

        <header className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-7">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              Explicaciones claras sobre nóminas, IRPF y finanzas personales
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Artículos prácticos para entender tu sueldo, tu retención y tus decisiones financieras sin complicarte la vida.
            </p>
          </div>
        </header>

        <BlogSearch
          posts={latestPosts.map(({ slug, title, excerpt, category, publishedAt, readingTime }) => ({
            slug,
            title,
            excerpt,
            category,
            publishedAt,
            readingTime,
          }))}
        />

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/30">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                Herramienta útil
              </p>
              <h2 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                Calcula tu nómina con una referencia realista
              </h2>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Ir a la calculadora
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
