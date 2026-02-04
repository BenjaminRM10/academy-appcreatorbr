import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saltillo Academy | Ingeniería Asistida por IA",
  description: "Aprende a usar IA para crear aplicaciones reales. Cursos prácticos de Google Antigravity, Claude Code, Python y más.",
  keywords: ["IA", "Inteligencia Artificial", "Programación", "Saltillo", "Cursos", "Ingeniería"],
  authors: [{ name: "Saltillo Academy" }],
  openGraph: {
    title: "Saltillo Academy | Ingeniería Asistida por IA",
    description: "Aprende a usar IA para crear aplicaciones reales. Cursos prácticos de Google Antigravity, Claude Code, Python y más.",
    url: "https://academy.appcreatorbr.com",
    siteName: "Saltillo Academy",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
