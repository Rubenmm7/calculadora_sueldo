import type { ReactNode } from "react";

export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="flex-1 bg-zinc-50 px-4 py-12 dark:bg-zinc-900">
      <article className="mx-auto max-w-xl space-y-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h1>
        {children}
      </article>
    </main>
  );
}
