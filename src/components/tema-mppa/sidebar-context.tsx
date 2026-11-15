"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
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
  // Ao fechar o menu móvel, o foco volta ao botão que o abriu ("Abrir menu lateral"), se ficou na barra.
  useRestoreFocus(mobileOpen, (element) => Boolean(element.closest("aside")));

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

/**
 * Devolve o foco a quem o tinha quando `open` passou a verdadeiro (o botão que abriu o menu ou a busca), quando
 * `open` volta a falso. Só devolve se esse elemento ainda está na página e se o foco ficou solto (no corpo da
 * página) ou dentro do que fechou (`isInside`): quem levou o foco a outro lugar de propósito fica onde está.
 */
export function useRestoreFocus(open: boolean, isInside?: (element: Element) => boolean) {
  const opener = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open && !wasOpen.current) {
      const active = document.activeElement;
      opener.current = active instanceof HTMLElement && active !== document.body ? active : null;
    }
    if (!open && wasOpen.current) {
      const target = opener.current;
      opener.current = null;
      const label = target?.getAttribute("aria-label");
      const restore = () => {
        // Se a troca de página montou o cabeçalho de novo, o botão é outro: acha-o pelo mesmo nome acessível.
        const button = target?.isConnected
          ? target
          : label
            ? document.querySelector<HTMLElement>(`[aria-label="${CSS.escape(label)}"]`)
            : null;
        const active = document.activeElement;
        const loose = !active || active === document.body || Boolean(isInside?.(active));
        if (button && loose && active !== button) button.focus();
      };
      // Logo e de novo por um instante: escolher um item troca de página, e a troca de página do Next solta o foco
      // no corpo da página depois que ele já tinha voltado ao botão.
      requestAnimationFrame(restore);
      for (const delay of [120, 300, 600, 1000]) window.setTimeout(restore, delay);
    }
    wasOpen.current = open;
  }, [open, isInside]);
}
