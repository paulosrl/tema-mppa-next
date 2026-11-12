"use client";

import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { SIDEBAR_STORAGE_KEY } from "./theme-script";

type SidebarContextValue = {
  /**
   * Barra recolhida no desktop, para rótulos e `aria-expanded`. A aparência não depende dele: vem da variante
   * `tm-collapsed`, que o script de boot já aplica antes da hidratação. O menu móvel abre sempre expandido.
   */
  collapsed: boolean;
  mobileOpen: boolean;
  toggleCollapsed: () => void;
  setMobileOpen: (open: boolean) => void;
};

export { SIDEBAR_STORAGE_KEY };

/** Atributo do <html> que desenha a barra recolhida (variante `tm-collapsed` do `tema-mppa.css`). */
const SIDEBAR_ATTRIBUTE = "data-tm-sidebar";

function applyCollapsed(value: boolean) {
  document.documentElement.setAttribute(SIDEBAR_ATTRIBUTE, value ? "collapsed" : "expanded");
}

/* Preferência guardada no localStorage; sem armazenamento, vale só na memória da página. */
let memoryCollapsed = false;
const listeners = new Set<() => void>();

function readCollapsed() {
  try {
    const stored = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored !== null) return stored === "1";
  } catch {
    // Armazenamento bloqueado.
  }
  return memoryCollapsed;
}

function writeCollapsed(value: boolean) {
  memoryCollapsed = value;
  applyCollapsed(value);
  try {
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, value ? "1" : "0");
  } catch {
    // Armazenamento bloqueado: fica na memória.
  }
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === SIDEBAR_STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const serverCollapsed = () => false;

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const collapsed = useSyncExternalStore(subscribe, readCollapsed, serverCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sem o script de boot (ou com outra aba mudando a preferência), o atributo segue o estado guardado. Lê o
  // guardado, e não o `collapsed` da renderização: na hidratação ele ainda é o do servidor (expandida), e
  // aplicá-lo abriria a barra por um instante.
  useEffect(() => {
    applyCollapsed(readCollapsed());
  }, [collapsed]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "b" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        writeCollapsed(!readCollapsed());
      }
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const value = useMemo(
    () => ({
      collapsed,
      mobileOpen,
      toggleCollapsed: () => writeCollapsed(!readCollapsed()),
      setMobileOpen,
    }),
    [collapsed, mobileOpen],
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

/**
 * Barra recolhida lida direto da preferência guardada, para atributos que dependem dela (`title`, rótulos).
 * Numa fronteira de `<Suspense>` que hidrata depois do resto, o contexto já traz o valor do navegador, e o
 * atributo divergiria do HTML servido (o React não corrige atributo na hidratação). Aqui a hidratação usa o
 * valor do servidor e atualiza logo depois.
 */
export function useCollapsedAttribute() {
  return useSyncExternalStore(subscribe, readCollapsed, serverCollapsed);
}

export function useSidebar() {
  const value = useContext(SidebarContext);
  if (!value) throw new Error("useSidebar deve ser usado dentro de SidebarProvider");
  return value;
}
