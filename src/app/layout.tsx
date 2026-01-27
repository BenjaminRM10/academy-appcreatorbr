import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
