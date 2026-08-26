import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white px-4 py-6 dark:border-zinc-800 dark:bg-zinc-950">
      <nav
        aria-label="Información legal"
        className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400"
      >
        <Link href="/privacidad" className="hover:underline">
          Política de Privacidad
        </Link>
        <Link href="/aviso-legal" className="hover:underline">
          Aviso Legal y Contacto
        </Link>
        <Link href="/cookies" className="hover:underline">
          Política de Cookies
        </Link>
        <a
          href="mailto:soportecalculadorasueldo@gmail.com"
          className="hover:underline text-zinc-700 dark:text-zinc-300 font-medium"
        >
          Contacto
        </a>
      </nav>
      <p className="mt-3 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Calculadora de sueldo. Datos orientativos.
      </p>
    </footer>
  );
}