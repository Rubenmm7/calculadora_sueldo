import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog de nóminas, IRPF y finanzas en España",
  description:
    "Guías y análisis sobre nóminas, sueldo neto, IRPF, Seguridad Social e interés compuesto para entender mejor tus finanzas en España.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="flex-1 bg-gradient-to-b from-zinc-50 via-emerald-50/40 to-zinc-50 px-4 py-8 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

        <header className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-7">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              Números Claritos / Blog
            </p>
            <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              Explicaciones claras sobre nóminas, IRPF y finanzas personales
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Artículos prácticos para entender tu sueldo, tu retención y tus decisiones financieras sin complicarte la vida.
            </p>
          </div>
        </header>

        <section aria-label="Artículos del blog" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex items-center justify-between gap-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <span>{post.category}</span>
                <span>{post.readingTime}</span>
              </div>

              <h2 className="mt-4 text-xl font-bold leading-tight text-zinc-900 dark:text-zinc-50">
                <Link href={`/blog/${post.slug}`} className="hover:text-emerald-700 dark:hover:text-emerald-300">
                  {post.title}
                </Link>
              </h2>

              <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {post.excerpt}
              </p>

              <div className="mt-5 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <time dateTime={post.publishedAt}>Actualizado {post.publishedAt}</time>
                <Link href={`/blog/${post.slug}`} className="font-semibold text-emerald-700 hover:underline dark:text-emerald-300">
                  Leer artículo →
                </Link>
              </div>
            </article>
          ))}
        </section>

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
