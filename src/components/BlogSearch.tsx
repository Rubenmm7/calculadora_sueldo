"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Post } from "@/data/posts";

type SearchablePost = Pick<
  Post,
  "slug" | "title" | "excerpt" | "category" | "publishedAt" | "readingTime"
>;

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}

export default function BlogSearch({ posts }: { posts: SearchablePost[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeText(query.trim());
  const filteredPosts = posts.filter((post) =>
    normalizeText(`${post.title} ${post.excerpt} ${post.category}`).includes(normalizedQuery),
  );

  return (
    <section aria-labelledby="all-blog-title" className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="all-blog-title" className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Todos los artículos
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Busca por tema, título o categoría.
          </p>
        </div>

        <label className="relative block w-full sm:max-w-sm">
          <span className="sr-only">Buscar artículos del blog</span>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ej. vivienda, IRPF, ahorro"
            className="min-h-12 w-full rounded-lg border border-zinc-300 bg-white py-2 pl-10 pr-3 text-zinc-900 placeholder:text-zinc-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-400"
          />
        </label>
      </div>

      <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-zinc-600 dark:text-zinc-400">
        {filteredPosts.length === 1 ? "1 artículo" : `${filteredPosts.length} artículos`}
        {normalizedQuery ? ` para «${query.trim()}»` : " disponibles"}
      </p>

      {filteredPosts.length > 0 ? (
        <div id="blog-results" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex items-center justify-between gap-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <span>{post.category}</span>
                <span>{post.readingTime}</span>
              </div>

              <h3 className="mt-4 text-xl font-bold leading-tight text-zinc-900 dark:text-zinc-50">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block transition-colors duration-200 hover:text-emerald-800 no-underline dark:hover:text-emerald-300"
                >
                  {post.title}
                </Link>
              </h3>

              <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {post.excerpt}
              </p>

              <div className="mt-5 flex items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <time dateTime={post.publishedAt}>Publicado {post.publishedAt}</time>
                <Link
                  href={`/blog/${post.slug}`}
                  className="min-h-11 min-w-11 inline-flex items-center justify-center font-semibold text-emerald-800 no-underline dark:text-emerald-300"
                >
                  Leer artículo
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-zinc-200 bg-white p-6 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
          No encontramos artículos con ese texto. Prueba con otra palabra.
        </p>
      )}
    </section>
  );
}