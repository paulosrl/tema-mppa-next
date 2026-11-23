"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { THEME_STORAGE_KEY } from "./theme-script";

/** Só claro e escuro: o tema não acompanha o sistema operacional. */
export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  /** Igual a `theme`; mantido para quem já o lia. */
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
};

const listeners = new Set<() => void>();
const ThemeContext = createContext<ThemeContextValue | null>(null);

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Tema da aba quando o sessionStorage falha (bloqueado ou cheio): vale até recarregar a página, que volta
// ao claro, como o THEME_BOOT_SCRIPT.
let fallbackTheme: Theme | null = null;

function readStoredTheme(): Theme {
  if (fallbackTheme) return fallbackTheme;
  try {
    const stored = sessionStorage.getItem(THEME_STORAGE_KEY);
    return stored === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

const serverTheme = (): Theme => "light";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readStoredTheme, serverTheme);

  // Lê o tema guardado, e não o `theme` da renderização: na hidratação ele ainda é o do servidor
  // ("light"), e aplicá-lo trocaria o escuro do ThemeScript pelo claro por um instante. Uma casca montada
  // nesse instante (por exemplo, depois de a sessão chegar) nasceria com as cores do claro e faria a
  // transição até as do escuro.
  useEffect(() => {
    const current = readStoredTheme();
    document.documentElement.classList.remove(current === "dark" ? "light" : "dark");
    document.documentElement.classList.add(current);
  }, [theme]);

  function setTheme(next: Theme) {
    try {
      sessionStorage.setItem(THEME_STORAGE_KEY, next);
      fallbackTheme = null;
    } catch {
      fallbackTheme = next;
    }
    notify();
  }

  return <ThemeContext.Provider value={{ theme, resolvedTheme: theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  return value;
}
