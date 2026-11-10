"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

export type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

export const THEME_STORAGE_KEY = "tema-mppa-theme";
export const THEME_BOOT_SCRIPT = `(function(){try{var t=sessionStorage.getItem('${THEME_STORAGE_KEY}')||'light';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(d?'dark':'light');}catch(e){document.documentElement.classList.add('light')}})();`;

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

function readStoredTheme(): Theme {
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

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  function setTheme(next: Theme) {
    try {
      sessionStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Armazenamento bloqueado: mantém a interface operacional nesta renderização.
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
