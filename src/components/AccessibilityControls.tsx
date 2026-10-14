"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, PersonStanding, Sun } from "lucide-react";

type Theme = "dark" | "light";
type TextSize = "small" | "normal" | "large";

const STORAGE_KEYS = {
  theme: "numeros-claritos-theme",
  textSize: "numeros-claritos-text-size",
  contrast: "numeros-claritos-high-contrast",
};

const textSizeValues: TextSize[] = ["small", "normal", "large"];

function applyPreferences(theme: Theme, textSize: TextSize, highContrast: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.classList.toggle("a11y-high-contrast", highContrast);
  root.dataset.textSize = textSize;
  root.style.colorScheme = theme;
}

function savePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // La preferencia sigue aplicándose durante esta visita aunque el almacenamiento no esté disponible.
  }
}

function readPreferences() {
  try {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
    const savedTextSize = localStorage.getItem(STORAGE_KEYS.textSize);
    return {
      theme: savedTheme === "light" ? "light" as const : "dark" as const,
      textSize: textSizeValues.includes(savedTextSize as TextSize)
        ? (savedTextSize as TextSize)
        : "normal" as const,
      highContrast: localStorage.getItem(STORAGE_KEYS.contrast) === "true",
    };
  } catch {
    return { theme: "dark" as const, textSize: "normal" as const, highContrast: false };
  }
}

function Icon({ name }: { name: "accessibility" | "sun" | "moon" }) {
  const IconComponent = {
    accessibility: PersonStanding,
    sun: Sun,
    moon: Moon,
  }[name];

  return (
    <IconComponent
      aria-hidden="true"
      className={name === "accessibility" ? "h-6 w-6" : "h-5 w-5"}
      strokeWidth={name === "accessibility" ? 2.2 : 1.8}
    />
  );
}

export default function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [textSize, setTextSize] = useState<TextSize>("normal");
  const [highContrast, setHighContrast] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const preferences = readPreferences();
    applyPreferences(preferences.theme, preferences.textSize, preferences.highContrast);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const updateTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    savePreference(STORAGE_KEYS.theme, nextTheme);
    applyPreferences(nextTheme, textSize, highContrast);
  };

  const updateTextSize = (nextTextSize: TextSize) => {
    setTextSize(nextTextSize);
    savePreference(STORAGE_KEYS.textSize, nextTextSize);
    applyPreferences(theme, nextTextSize, highContrast);
  };

  const updateContrast = (nextHighContrast: boolean) => {
    setHighContrast(nextHighContrast);
    savePreference(STORAGE_KEYS.contrast, String(nextHighContrast));
    applyPreferences(theme, textSize, nextHighContrast);
  };

  const resetAll = () => {
    setTheme("dark");
    setTextSize("normal");
    setHighContrast(false);
    for (const key of Object.values(STORAGE_KEYS)) {
      try {
        localStorage.removeItem(key);
      } catch {
        break;
      }
    }
    applyPreferences("dark", "normal", false);
  };

  const currentSizeIndex = textSizeValues.indexOf(textSize);

  return (
    <div
      className="fixed left-5 z-[60]"
      style={{ bottom: "calc(var(--cookie-banner-height, 14rem) + 5rem)" }}
    >
      {isOpen && (
        <section
          id="accessibility-panel"
          aria-labelledby="accessibility-title"
          className="mb-3 w-[min(21rem,calc(100vw-2.5rem))] overflow-y-auto overscroll-contain rounded-xl border border-zinc-300 bg-white p-4 text-zinc-900 shadow-xl dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          style={{ maxHeight: "calc(100dvh - var(--cookie-banner-height, 14rem) - 15rem)" }}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 id="accessibility-title" className="text-base font-semibold">Accesibilidad</h2>
            <button
              type="button"
              aria-label="Cerrar ajustes de accesibilidad"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 text-xl hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-600 dark:hover:bg-zinc-800"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="space-y-4">
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">Apariencia</legend>
              <button
                type="button"
                aria-pressed={theme === "light"}
                onClick={() => updateTheme(theme === "dark" ? "light" : "dark")}
                className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-zinc-300 px-3 text-sm hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <span className="flex items-center gap-2">
                  <Icon name={theme === "dark" ? "sun" : "moon"} />
                  {theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                </span>
                <span className="text-xs text-zinc-600 dark:text-zinc-300">{theme === "dark" ? "Oscuro" : "Claro"}</span>
              </button>
              <button
                type="button"
                onClick={() => updateTheme("dark")}
                disabled={theme === "dark"}
                className="text-sm font-medium text-emerald-800 underline underline-offset-2 disabled:cursor-default disabled:text-zinc-500 disabled:no-underline dark:text-emerald-300 dark:disabled:text-zinc-500"
              >
                Restablecer modo oscuro
              </button>
            </fieldset>

            <fieldset className="space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-700">
              <legend className="text-sm font-medium">Tamaño del texto</legend>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Disminuir tamaño del texto"
                  onClick={() => updateTextSize(textSizeValues[currentSizeIndex - 1])}
                  disabled={currentSizeIndex === 0}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-300 text-sm font-semibold hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >A−</button>
                <span aria-live="polite" className="flex-1 text-center text-sm">
                  {textSize === "small" ? "Pequeño" : textSize === "large" ? "Grande" : "Normal"}
                </span>
                <button
                  type="button"
                  aria-label="Aumentar tamaño del texto"
                  onClick={() => updateTextSize(textSizeValues[currentSizeIndex + 1])}
                  disabled={currentSizeIndex === textSizeValues.length - 1}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-300 text-base font-semibold hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >A+</button>
              </div>
              <button
                type="button"
                onClick={() => updateTextSize("normal")}
                disabled={textSize === "normal"}
                className="text-sm font-medium text-emerald-800 underline underline-offset-2 disabled:cursor-default disabled:text-zinc-500 disabled:no-underline dark:text-emerald-300 dark:disabled:text-zinc-500"
              >
                Restablecer tamaño
              </button>
            </fieldset>

            <fieldset className="space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-700">
              <legend className="text-sm font-medium">Contraste</legend>
              <label className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg border border-zinc-300 px-3 text-sm dark:border-zinc-700">
                <span>Aumentar contraste</span>
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(event) => updateContrast(event.target.checked)}
                  className="h-5 w-5 accent-emerald-700"
                />
              </label>
              <button
                type="button"
                onClick={() => updateContrast(false)}
                disabled={!highContrast}
                className="text-sm font-medium text-emerald-800 underline underline-offset-2 disabled:cursor-default disabled:text-zinc-500 disabled:no-underline dark:text-emerald-300 dark:disabled:text-zinc-500"
              >
                Restablecer contraste
              </button>
            </fieldset>

            <button
              type="button"
              onClick={resetAll}
              className="min-h-11 w-full rounded-lg bg-zinc-900 px-3 text-sm font-semibold text-white hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Restablecer todas las preferencias
            </button>
          </div>
        </section>
      )}

      <button
        ref={triggerRef}
        type="button"
        aria-label="Abrir ajustes de accesibilidad"
        aria-expanded={isOpen}
        aria-controls={isOpen ? "accessibility-panel" : undefined}
        onClick={() => {
          if (!isOpen) {
            const preferences = readPreferences();
            setTheme(preferences.theme);
            setTextSize(preferences.textSize);
            setHighContrast(preferences.highContrast);
          }
          setIsOpen((open) => !open);
        }}
        title="Ajustes de accesibilidad"
        className="mr-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-800 bg-emerald-700 text-white shadow-lg transition-[background-color,transform,box-shadow] duration-200 hover:scale-105 hover:bg-emerald-800 hover:shadow-xl active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-emerald-200 dark:bg-emerald-300 dark:text-zinc-950 dark:hover:bg-emerald-200"
      >
        <Icon name="accessibility" />
      </button>
    </div>
  );
}
