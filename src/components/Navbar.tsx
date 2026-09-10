"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href) ?? false;
  };

  const navLinkClass = (href: string) => {
    const active = isActive(href);

    return [
      "rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200",
      active
        ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-200 dark:ring-emerald-900"
        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
    ].join(" ");
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY;
      const nearTop = currentScrollY < 40;

      if (isOpen) {
        setShowNav(true);
      } else {
        setShowNav(scrollingUp || nearTop);
      }
      setShowScrollTop(currentScrollY > 350);
      lastScrollY = currentScrollY;
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const menu = document.getElementById("mobile-menu");
      const toggle = document.getElementById("mobile-menu-toggle");
      if (isOpen && menu && !menu.contains(target) && (!toggle || !toggle.contains(target))) {
        setIsOpen(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/95 shadow-sm backdrop-blur-sm transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950/90 ${
          showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 py-5 sm:py-5">
          <div className="relative flex items-center justify-between gap-3">
            <Link
              href="/"
              className="text-left text-2xl font-black tracking-tight text-zinc-900 hover:text-emerald-700 dark:text-zinc-100 dark:hover:text-emerald-300 sm:text-[2rem]"
            >
              Números claritos
            </Link>

            <button
              id="mobile-menu-toggle"
              type="button"
              aria-label="Abrir menú"
              aria-expanded={isOpen}
              onClick={() => {
                setShowNav(true);
                setIsOpen((value) => !value);
              }}
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-3 py-2 text-zinc-700 transition hover:border-emerald-300 hover:text-emerald-700 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-700 dark:hover:text-emerald-300 sm:hidden"
            >
              <span className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-5 rounded-full bg-current" />
                <span className="block h-0.5 w-5 rounded-full bg-current" />
                <span className="block h-0.5 w-5 rounded-full bg-current" />
              </span>
            </button>

            <div className="hidden items-center gap-2 text-base sm:flex dark:text-zinc-400">
              <Link href="/" aria-current={isActive("/") ? "page" : undefined} className={navLinkClass("/")} onClick={() => setIsOpen(false)}>
                Calculadora de sueldo neto
              </Link>
              <Link href="/interes-compuesto" aria-current={isActive("/interes-compuesto") ? "page" : undefined} className={navLinkClass("/interes-compuesto")} onClick={() => setIsOpen(false)}>
                Interés compuesto
              </Link>
              <Link href="/blog" aria-current={isActive("/blog") ? "page" : undefined} className={navLinkClass("/blog")} onClick={() => setIsOpen(false)}>
                Blog
              </Link>
              <Link href="/contacto" aria-current={isActive("/contacto") ? "page" : undefined} className={navLinkClass("/contacto")} onClick={() => setIsOpen(false)}>
                Contacto
              </Link>
            </div>
          </div>

          <div
            id="mobile-menu"
            className={
              isOpen
                ? "absolute inset-x-4 top-full z-40 mt-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-600 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 sm:hidden"
                : "hidden"
            }
          >
            <div className="flex flex-col gap-2">
              <Link href="/" aria-current={isActive("/") ? "page" : undefined} className={navLinkClass("/")} onClick={() => setIsOpen(false)}>
                Calculadora de sueldo neto
              </Link>
              <Link href="/interes-compuesto" aria-current={isActive("/interes-compuesto") ? "page" : undefined} className={navLinkClass("/interes-compuesto")} onClick={() => setIsOpen(false)}>
                Interés compuesto
              </Link>
              <Link href="/blog" aria-current={isActive("/blog") ? "page" : undefined} className={navLinkClass("/blog")} onClick={() => setIsOpen(false)}>
                Blog
              </Link>
              <Link href="/contacto" aria-current={isActive("/contacto") ? "page" : undefined} className={navLinkClass("/contacto")} onClick={() => setIsOpen(false)}>
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <button
        type="button"
        aria-label="Volver arriba"
        onClick={scrollToTop}
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-black text-white shadow-lg transition-all duration-300 hover:scale-105 ${
          showScrollTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden="true">
          <path d="M12 3.5 4.5 11l1.4 1.4 5.1-5.1V20h2V7.3l5.1 5.1 1.4-1.4L12 3.5Z" />
        </svg>
      </button>
    </>
  );
}
