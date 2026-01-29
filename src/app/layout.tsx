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
  title: "Academy | Escuela de Ingeniería y Tecnología 4.0",
  description: "Cursos especializados en IA, automatización, desarrollo web y tecnología 4.0 para ingenieros y profesionistas en Saltillo, Coahuila.",
  keywords: ["cursos IA", "automatización", "ingeniería 4.0", "Saltillo", "programación", "inteligencia artificial"],
  authors: [{ name: "Ing. Benjamin Rodriguez" }],
  openGraph: {
    title: "Academy | Escuela de Ingeniería y Tecnología 4.0",
    description: "Cursos especializados en IA, automatización, desarrollo web y tecnología 4.0",
    url: "https://academy.appcreatorbr.com",
    siteName: "Academy AppCreatorBR",
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
