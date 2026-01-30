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
  title: "Runa Academy | Ingeniería Asistida por IA",
  description: "Aprende a construir productos con IA. Curso intensivo de Next.js, Supabase y herramientas de inteligencia artificial para ingenieros.",
  keywords: ["cursos IA", "Next.js", "Supabase", "automatización", "ingeniería", "programación", "inteligencia artificial"],
  authors: [{ name: "Runa Academy" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Runa Academy | Ingeniería Asistida por IA",
    description: "Aprende a construir productos con IA. Curso intensivo de Next.js, Supabase y herramientas de inteligencia artificial.",
    url: "https://academy.appcreatorbr.com",
    siteName: "Runa Academy",
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
