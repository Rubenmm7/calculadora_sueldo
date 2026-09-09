import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="flex-1 bg-gradient-to-b from-zinc-50 via-emerald-50/40 to-zinc-50 px-4 py-8 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 sm:py-10 lg:py-12">
      <article className="mx-auto max-w-4xl rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-7 lg:p-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />

        <div className="space-y-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            {title}
          </h1>
          {children}
        </div>
      </article>
    </main>
  );
}
