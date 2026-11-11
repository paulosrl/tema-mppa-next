"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./button";
import type { AppShellProps, SearchItem, ShellConfig, ShellSession } from "./types";
import { canSeeAdministration, cn, normalizeSearch, visibleNavigation } from "./utils";

function configuredItems(config: ShellConfig, session: ShellSession | null): SearchItem[] {
  const navigation = [
    ...visibleNavigation(config.platformNavigation),
    ...(canSeeAdministration(config, session) ? visibleNavigation(config.administrationNavigation) : []),
  ];
  return [
    ...navigation.map((item) => ({
      id: `nav-${item.id}`,
      label: item.label,
      href: item.href,
      icon: item.icon,
      description: item.description,
      keywords: item.keywords,
    })),
    ...(config.searchItems ?? []),
  ];
}

/**
 * Botão "Abrir busca" e atalho `Ctrl+K`. O diálogo é a paleta do modelo (itens da configuração) ou, com
 * `renderSearch`, a busca própria do sistema, controlada por `open`/`setOpen`.
 */
export function CommandPalette({
  config,
  session,
  renderSearch,
}: {
  config: ShellConfig;
  session: ShellSession | null;
  renderSearch?: AppShellProps["renderSearch"];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const placeholder = config.header?.searchPlaceholder ?? "Buscar ou executar…";
  const customSearch = Boolean(renderSearch);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape" && !customSearch) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [customSearch]);

  useEffect(() => {
    if (open && !customSearch) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open, customSearch]);

  const items = useMemo(() => configuredItems(config, session), [config, session]);
  const filtered = useMemo(() => {
    const normalized = normalizeSearch(query.trim());
    if (!normalized) return items;
    return items.filter((item) =>
      normalizeSearch([item.label, item.description, ...(item.keywords ?? [])].filter(Boolean).join(" ")).includes(normalized),
    );
  }, [items, query]);

  function navigate(item: SearchItem) {
    setOpen(false);
    router.push(item.href);
  }

  return (
    <>
      <button
        type="button"
        className={cn(
          "inline-flex size-[34px] shrink-0 items-center justify-center gap-2 rounded-lg text-xs text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
          "sm:h-8 sm:w-56 sm:justify-start sm:border sm:bg-card sm:px-3",
        )}
        onClick={() => setOpen(true)}
        aria-label="Abrir busca"
        aria-keyshortcuts="Control+K Meta+K"
      >
        <Search className="size-4 shrink-0" aria-hidden />
        <span className="hidden flex-1 truncate text-left sm:inline">{placeholder}</span>
        <kbd className="hidden rounded-xs border bg-muted px-1.5 py-0.5 font-sans text-[10px] font-semibold sm:inline">Ctrl K</kbd>
      </button>
      {renderSearch ? renderSearch({ open, setOpen }) : null}
      {open && !renderSearch ? (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-overlay/60 px-4 pt-[12vh]"
          role="presentation"
          onMouseDown={() => setOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Busca e navegação"
            className="w-full max-w-xl overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-surface"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b px-3">
              <Search className="size-4 text-muted-foreground" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                aria-label={placeholder}
                className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Fechar busca"><X /></Button>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length ? (
                filtered.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => navigate(item)}
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-accent focus:bg-accent focus:outline-none"
                    >
                      {Icon ? <Icon className="size-4 shrink-0" aria-hidden /> : <span className="size-4" />}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold">{item.label}</span>
                        {item.description ? <span className="block truncate text-xs text-muted-foreground">{item.description}</span> : null}
                      </span>
                    </button>
                  );
                })
              ) : (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">Nenhum resultado.</p>
              )}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
