import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { articulos } from "../articulos";

export function generateStaticParams() {
  return articulos.map((articulo) => ({ slug: articulo.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articulo = articulos.find((item) => item.slug === slug);

  if (!articulo) return {};

  return {
    title: articulo.title,
    description: articulo.description,
    alternates: { canonical: `/articulos/${articulo.slug}` },
    openGraph: {
      type: "article",
      title: articulo.title,
      description: articulo.description,
      publishedTime: "2026-09-03",
      modifiedTime: "2026-09-03",
      section: articulo.category,
    },
  };
}

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articulo = articulos.find((item) => item.slug === slug);

  if (!articulo) notFound();

  return (
    <main className="flex-1 bg-gradient-to-b from-zinc-50 via-emerald-50/40 to-zinc-50 px-4 py-8 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 sm:py-10 lg:py-12">
      <article className="mx-auto max-w-4xl space-y-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Artículos", href: "/articulos" }, { label: articulo.title }]} />

        <header className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:p-10">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
            <span>{articulo.category}</span>
            <span>{articulo.readTime}</span>
            <time dateTime="2026-09-03">Actualizado el {articulo.updatedAt}</time>
          </div>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 md:text-5xl">
            {articulo.title}
          </h1>
          <p className="mt-4 text-lg leading-7 text-zinc-600 dark:text-zinc-400">
            {articulo.description}
          </p>
        </header>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:p-8">
          <div className="prose prose-zinc mt-2 max-w-none dark:prose-invert">
            {articulo.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {articulo.points && (
              <ul>
                {articulo.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            )}
          </div>
        </div>

        <nav className="mt-8 flex flex-wrap justify-between gap-3 rounded-2xl border border-zinc-200 bg-white p-5 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <Link href="/articulos" className="font-medium text-zinc-700 hover:underline dark:text-zinc-300">
            ← Todos los artículos
          </Link>
          <Link href="/" className="font-semibold text-emerald-700 hover:underline dark:text-emerald-300">
            Calcular mi sueldo neto →
          </Link>
        </nav>
      </article>
    </main>
  );
}
