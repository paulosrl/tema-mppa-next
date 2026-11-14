import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TemaMppaProvider, ThemeScript } from "@/components/tema-mppa";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Template visual",
  description: "Shell visual reutilizável para aplicações Next.js",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <head><ThemeScript /></head>
      <body><TemaMppaProvider>{children}</TemaMppaProvider></body>
    </html>
  );
}
