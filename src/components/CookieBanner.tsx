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
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "accepted" || saved === "rejected") {
        setConsent(saved);
        applyConsent(saved);
      }
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function save(value: CookieConsent) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    applyConsent(value);
  }

  useEffect(() => {
    if (!ready || consent) {
      document.body.style.paddingBottom = "";
      return;
    }
    document.body.style.paddingBottom = "12rem";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [ready, consent]);

  if (!ready || consent) return null;

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
          className="text-sm text-zinc-600 dark:text-zinc-400"
        >
          Usamos cookies propias necesarias para el funcionamiento del sitio y,
          si lo aceptas, cookies de proveedores de terceros como{" "}
          <strong>Google AdSense</strong> para servir anuncios basados en tus
          visitas previas a este y otros sitios web. Puedes aceptarlas,
          rechazarlas o consultar la{" "}
          <Link href="/cookies" className="underline">
            Política de Cookies
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => save("accepted")}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Aceptar
          </button>
          <button
            type="button"
            onClick={() => save("rejected")}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:text-zinc-200"
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
