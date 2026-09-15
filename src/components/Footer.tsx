import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white px-4 py-6 dark:border-zinc-800 dark:bg-zinc-950">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-zinc-700 dark:text-zinc-300"
      >
        <Link href="/" className="inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-emerald-300 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] no-underline dark:hover:text-emerald-300">
          Inicio
        </Link>
        <Link href="/blog" className="inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-emerald-300 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] no-underline dark:hover:text-emerald-300">
          Blog
        </Link>
        <Link href="/" className="inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-emerald-300 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] no-underline dark:hover:text-emerald-300">
          Calculadora de Sueldo
        </Link>
        <Link href="/interes-compuesto" className="inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-emerald-300 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] no-underline dark:hover:text-emerald-300">
          Interés Compuesto
        </Link>
        <Link href="/privacidad" className="inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-emerald-300 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] no-underline dark:hover:text-emerald-300">
          Privacidad
        </Link>
        <Link href="/aviso-legal" className="inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-emerald-300 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] no-underline dark:hover:text-emerald-300">
          Aviso Legal
        </Link>
        <Link href="/cookies" className="inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-emerald-300 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] no-underline dark:hover:text-emerald-300">
          Cookies
        </Link>
        <Link href="/contacto" className="inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-emerald-300 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] no-underline dark:hover:text-emerald-300">
          Contacto
        </Link>
      </nav>
      <p className="mt-3 text-center text-xs text-zinc-700 dark:text-zinc-300">
        © {new Date().getFullYear()} Números claritos. Datos orientativos y contenidos editoriales.
      </p>
    </footer>
  );
}
