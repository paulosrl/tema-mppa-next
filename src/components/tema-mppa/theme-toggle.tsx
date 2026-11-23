"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme, type Theme } from "./theme-provider";

const labels: Record<Theme, string> = { light: "Claro", dark: "Escuro" };

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const Icon = theme === "dark" ? Moon : Sun;
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <Button
      variant="chrome"
      size="icon"
      className="group text-theme-icon"
      onClick={() => setTheme(next)}
      aria-label={`Tema: ${labels[theme]}. Alterar para ${labels[next]}`}
      title={`Tema: ${labels[theme]}`}
    >
      <Icon className="fill-current/20 transition-transform duration-300 group-hover:rotate-12" />
    </Button>
  );
}
