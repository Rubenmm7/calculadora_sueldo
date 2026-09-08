import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <Link
          href="/"
          className="text-lg font-black tracking-tight text-zinc-900 hover:text-emerald-700 dark:text-zinc-100 dark:hover:text-emerald-300"
        >
          Números Claritos
        </Link>
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 sm:gap-6">
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/interes-compuesto" className="hover:underline">
            Interés compuesto
          </Link>
          <Link href="/contacto" className="hover:underline">
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}
