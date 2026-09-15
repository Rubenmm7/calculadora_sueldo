"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent";

export type CookieConsent = "accepted" | "rejected";

function applyConsent(value: CookieConsent) {
  if (typeof window === "undefined") return;

  const granted = value === "accepted";
  window.gtag?.("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
  });
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved !== "accepted" && saved !== "rejected") return;

    applyConsent(saved);
    const frame = window.requestAnimationFrame(() => setIsVisible(false));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function save(value: CookieConsent) {
    window.localStorage.setItem(STORAGE_KEY, value);
    applyConsent(value);
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-4xl space-y-3">
        <h2
          id="cookie-title"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Consentimiento de cookies (RGPD)
        </h2>
        <p
          id="cookie-desc"
          className="text-sm text-zinc-700 dark:text-zinc-300"
        >
          Usamos cookies propias necesarias para el funcionamiento del sitio y,
          si lo aceptas, cookies de proveedores de terceros como{" "}
          <strong>Google AdSense</strong> para servir anuncios basados en tus
          visitas previas a este y otros sitios web. Puedes aceptarlas,
          rechazarlas o consultar la{" "}
          <Link href="/cookies" className="inline-flex min-h-[44px] items-center underline">
            Política de Cookies
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => save("accepted")}
            className="min-h-[44px] min-w-[44px] rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Aceptar
          </button>
          <button
            type="button"
            onClick={() => save("rejected")}
            className="min-h-[44px] min-w-[44px] rounded-lg border border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:text-zinc-200"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
