"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { THEME_STORAGE_KEY } from "./theme-script";

export type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};


const DARK_MEDIA = "(prefers-color-scheme: dark)";
const listeners = new Set<() => void>();
const ThemeContext = createContext<ThemeContextValue | null>(null);

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const media = window.matchMedia(DARK_MEDIA);
  media.addEventListener("change", listener);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", listener);
  };
}

// Tema da aba quando o sessionStorage falha (bloqueado ou cheio): vale até recarregar a página, que volta
// ao claro, como o THEME_BOOT_SCRIPT.
let fallbackTheme: Theme | null = null;

function readStoredTheme(): Theme {
  if (fallbackTheme) return fallbackTheme;
  try {
    const stored = sessionStorage.getItem(THEME_STORAGE_KEY);
    return stored === "dark" || stored === "system" ? stored : "light";
  } catch {
    return "light";
  }
}

function readSystemTheme(): ResolvedTheme {
  return window.matchMedia(DARK_MEDIA).matches ? "dark" : "light";
}

const serverTheme = (): Theme => "light";
const serverSystemTheme = (): ResolvedTheme => "light";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readStoredTheme, serverTheme);
  const systemTheme = useSyncExternalStore(subscribe, readSystemTheme, serverSystemTheme);
  const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;

  // Lê o tema guardado, e não o `resolvedTheme` da renderização: na hidratação ele ainda é o do servidor
  // ("light"), e aplicá-lo trocaria o escuro do ThemeScript pelo claro por um instante. Uma casca montada
  // nesse instante (por exemplo, depois de a sessão chegar) nasceria com as cores do claro e faria a
  // transição até as do escuro.
  useEffect(() => {
    const stored = readStoredTheme();
    const current = stored === "system" ? readSystemTheme() : stored;
    document.documentElement.classList.remove(current === "dark" ? "light" : "dark");
    document.documentElement.classList.add(current);
  }, [resolvedTheme]);

  function setTheme(next: Theme) {
    try {
      sessionStorage.setItem(THEME_STORAGE_KEY, next);
      fallbackTheme = null;
    } catch {
      fallbackTheme = next;
    }
    notify();
  }

  return <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  return value;
}
