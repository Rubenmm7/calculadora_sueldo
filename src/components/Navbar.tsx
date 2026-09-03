import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold text-zinc-900 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300"
        >
          CalculaSueldo
        </Link>
        <div className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400 sm:gap-6">
          <Link href="/interes-compuesto" className="hover:underline">
            Interés compuesto
          </Link>
          <Link href="/articulos" className="hover:underline">
            Artículos relacionados
          </Link>
        </div>
      </div>
    </nav>
  );
}
