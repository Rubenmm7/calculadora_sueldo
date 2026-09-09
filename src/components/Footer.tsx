import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white px-4 py-6 dark:border-zinc-800 dark:bg-zinc-950">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400"
      >
        <Link href="/" className="hover:text-emerald-700 hover:underline dark:hover:text-emerald-300">
          Home
        </Link>
        <Link href="/blog" className="hover:text-emerald-700 hover:underline dark:hover:text-emerald-300">
          Blog
        </Link>
        <Link href="/" className="hover:text-emerald-700 hover:underline dark:hover:text-emerald-300">
          Calculadora de Sueldo
        </Link>
        <Link href="/interes-compuesto" className="hover:text-emerald-700 hover:underline dark:hover:text-emerald-300">
          Interés Compuesto
        </Link>
        <Link href="/privacidad" className="hover:text-emerald-700 hover:underline dark:hover:text-emerald-300">
          Privacidad
        </Link>
        <Link href="/aviso-legal" className="hover:text-emerald-700 hover:underline dark:hover:text-emerald-300">
          Aviso Legal
        </Link>
        <Link href="/cookies" className="hover:text-emerald-700 hover:underline dark:hover:text-emerald-300">
          Cookies
        </Link>
        <Link href="/contacto" className="hover:text-emerald-700 hover:underline dark:hover:text-emerald-300">
          Contacto
        </Link>
      </nav>
      <p className="mt-3 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Números claritos. Datos orientativos y contenidos editoriales.
      </p>
    </footer>
  );
}
