"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 py-4">
        <div className="flex items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex-1 text-center text-2xl font-black tracking-tight text-zinc-900 hover:text-emerald-700 dark:text-zinc-100 dark:hover:text-emerald-300 sm:flex-none sm:text-left sm:text-lg"
          >
            Números Claritos
          </Link>

          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-3 py-2 text-zinc-700 transition hover:border-emerald-300 hover:text-emerald-700 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-700 dark:hover:text-emerald-300 sm:hidden"
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>
        </div>

        <div
          className={
            isOpen
              ? "mt-3 block rounded-2xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 sm:hidden"
              : "hidden sm:hidden"
          }
        >
          <div className="flex flex-col gap-2">
            <Link href="/" className="hover:underline" onClick={() => setIsOpen(false)}>
              Calculadora de sueldo neto
            </Link>
            <Link href="/interes-compuesto" className="hover:underline" onClick={() => setIsOpen(false)}>
              Interés compuesto
            </Link>
            <Link href="/blog" className="hover:underline" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link href="/contacto" className="hover:underline" onClick={() => setIsOpen(false)}>
              Contacto
            </Link>
          </div>
        </div>

        <div className="hidden sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-4 sm:text-sm sm:text-zinc-600 dark:sm:text-zinc-400">
          <Link href="/" className="hover:underline" onClick={() => setIsOpen(false)}>
            Calculadora de sueldo neto
          </Link>
          <Link href="/interes-compuesto" className="hover:underline" onClick={() => setIsOpen(false)}>
            Interés compuesto
          </Link>
          <Link href="/blog" className="hover:underline" onClick={() => setIsOpen(false)}>
            Blog
          </Link>
          <Link href="/contacto" className="hover:underline" onClick={() => setIsOpen(false)}>
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}
