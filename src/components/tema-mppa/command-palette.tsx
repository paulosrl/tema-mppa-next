"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./button";
import type { SearchItem, ShellConfig, ShellSession } from "./types";
import { normalizeSearch } from "./utils";

function configuredItems(config: ShellConfig, session: ShellSession): SearchItem[] {
  const navigation = session.is_admin
    ? [...config.platformNavigation, ...(config.administrationNavigation ?? [])]
    : config.platformNavigation;
  return [
    ...navigation.map((item) => ({
      id: `nav-${item.id}`,
      label: item.label,
      href: item.href,
      icon: item.icon,
      keywords: item.keywords,
    })),
    ...(config.searchItems ?? []),
  ];
}

export function CommandPalette({ config, session }: { config: ShellConfig; session: ShellSession }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

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
      <Button
        variant="outline"
        size="sm"
        className="hidden w-56 justify-start gap-2 text-muted-foreground sm:inline-flex"
        onClick={() => setOpen(true)}
        aria-label="Abrir busca"
        aria-keyshortcuts="Control+K Meta+K"
      >
        <Search />
        <span className="flex-1 truncate text-left">{config.header?.searchPlaceholder ?? "Buscar ou executar…"}</span>
        <kbd className="border bg-muted px-1.5 py-0.5 text-[10px]">Ctrl K</kbd>
      </Button>
      <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setOpen(true)} aria-label="Abrir busca">
        <Search />
      </Button>
      {open ? (
        <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/65 px-4 pt-[12vh]" role="presentation" onMouseDown={() => setOpen(false)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Busca e navegação"
            className="w-full max-w-xl border bg-popover text-popover-foreground shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b px-3">
              <Search className="size-4 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={config.header?.searchPlaceholder ?? "Buscar ou executar…"}
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
                      key={item.id}
                      onClick={() => navigate(item)}
                      className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-accent focus:bg-accent focus:outline-none"
                    >
                      {Icon ? <Icon className="size-4 shrink-0" /> : <span className="size-4" />}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{item.label}</span>
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
