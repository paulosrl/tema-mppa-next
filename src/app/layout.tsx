import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { TemaMppaProvider, ThemeScript, type TemaVariant } from "@/components/tema-mppa";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Template visual",
  description: "Shell visual reutilizável para aplicações Next.js",
};

// Variante do tema: `NEXT_PUBLIC_TEMA=v2 npm run dev` para ver a v2; sem a variável, o padrão.
const tema: TemaVariant = process.env.NEXT_PUBLIC_TEMA === "v2" ? "v2" : "padrao";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-tema={tema} className={outfit.variable} suppressHydrationWarning>
      <head><ThemeScript /></head>
      <body><TemaMppaProvider tema={tema}>{children}</TemaMppaProvider></body>
    </html>
  );
}
