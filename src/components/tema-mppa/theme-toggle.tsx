"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme, type Theme } from "./theme-provider";

const sequence: Theme[] = ["light", "dark", "system"];
const labels: Record<Theme, string> = { light: "Claro", dark: "Escuro", system: "Sistema" };

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;
  const next = sequence[(sequence.indexOf(theme) + 1) % sequence.length];

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(next)}
      aria-label={`Tema: ${labels[theme]}. Alterar para ${labels[next]}`}
      title={`Tema: ${labels[theme]}`}
    >
      <Icon />
    </Button>
  );
}
