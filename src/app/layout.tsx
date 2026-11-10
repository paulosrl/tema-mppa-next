import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { TemaMppaProvider, THEME_BOOT_SCRIPT } from "@/components/tema-mppa";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Template visual",
  description: "Shell visual reutilizável para aplicações Next.js",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={outfit.variable} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} /></head>
      <body><TemaMppaProvider>{children}</TemaMppaProvider></body>
    </html>
  );
}
