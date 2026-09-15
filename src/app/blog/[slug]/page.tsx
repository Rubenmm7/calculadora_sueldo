import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";

function renderInlineLinks(paragraph: string) {
  return paragraph.split(/(\[[^\]]+\]\(\/[^)]+\))/g).map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\((\/[^)]+)\)$/);

    return match ? (
      <Link key={`${match[2]}-${index}`} href={match[2]} className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200">
        {match[1]}
      </Link>
    ) : (
      part
    );
  });
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) return {};

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `https://numerosclaritos.com/blog/${post.slug}`,
      title: post.seoTitle,
      description: post.seoDescription,
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      siteName: "Números Claritos",
      locale: "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = posts.filter((item) => item.slug !== post.slug && post.relatedSlugs.includes(item.slug));

  return (
    <main className="flex-1 bg-gradient-to-b from-zinc-50 via-emerald-50/40 to-zinc-50 px-4 py-8 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 sm:py-10 lg:py-12">
      <article className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:p-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
              {post.category}
            </span>
            <span>{post.readingTime}</span>
            <time dateTime={post.publishedAt}>Actualizado {post.publishedAt}</time>
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            {post.title}
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {post.excerpt}
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
                Tabla de contenidos
              </h2>
              <nav aria-label="Tabla de contenidos" className="mt-4 space-y-2 text-sm">
                {post.toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block rounded-lg px-2 py-1.5 text-zinc-600 transition hover:bg-emerald-50 hover:text-emerald-700 dark:text-zinc-300 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="space-y-8">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:p-8">
              {post.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24 pt-6 first:pt-0">
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-8 text-zinc-700 dark:text-zinc-300">
                    {section.content.map((paragraph) => (
                      <p key={paragraph}>{renderInlineLinks(paragraph)}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {post.cta && (
              <aside className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/30">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Haz tus números</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                  Convierte esta información en una estimación práctica para tu caso.
                </p>
                <Link
                  href={post.cta.href}
                  className="mt-4 inline-flex min-h-[44px] items-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white no-underline transition hover:bg-emerald-800"
                >
                  {post.cta.label}
                </Link>
              </aside>
            )}

            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Artículos relacionados</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {relatedPosts.map((related) => (
                  <article key={related.slug} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-300">
                      {related.category}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-zinc-900 dark:text-zinc-50">
                      <Link href={`/blog/${related.slug}`} className="inline-block transition-colors duration-200 hover:text-emerald-300 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] no-underline dark:hover:text-emerald-300">
                        {related.title}
                      </Link>
                    </h3>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>

        <nav className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-zinc-700 no-underline transition-colors duration-200 hover:text-emerald-300 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] dark:text-zinc-300 dark:hover:text-emerald-300">
            ← Volver al blog
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 font-semibold text-emerald-700 no-underline transition-colors duration-200 hover:text-emerald-300 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] dark:text-emerald-300 dark:hover:text-emerald-300">
            Calcular mi nómina
          </Link>
        </nav>
      </article>
    </main>
  );
}
