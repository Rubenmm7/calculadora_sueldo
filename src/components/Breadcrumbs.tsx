import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="transition hover:text-emerald-700 hover:underline dark:hover:text-emerald-300">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-medium text-zinc-700 dark:text-zinc-200" : ""}>{item.label}</span>
            )}

            {!isLast && <span aria-hidden="true">/</span>}
          </div>
        );
      })}
    </nav>
  );
}
