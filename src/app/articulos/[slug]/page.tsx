import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <main className="min-h-screen bg-zinc-50 px-4 py-12 dark:bg-zinc-900">
      <article className="mx-auto max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:p-10">
        <header className="space-y-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
            <span>{articulo.category}</span>
            <span>{articulo.readTime}</span>
            <time dateTime="2026-09-03">Actualizado el {articulo.updatedAt}</time>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {articulo.title}
          </h1>
          <p className="text-lg leading-7 text-zinc-600 dark:text-zinc-400">
            {articulo.description}
          </p>
        </header>

        <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
          {articulo.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {articulo.points && (
            <ul>
              {articulo.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          )}
        </div>

        <nav className="mt-8 flex flex-wrap justify-between gap-3 border-t border-zinc-200 pt-6 text-sm dark:border-zinc-800">
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
