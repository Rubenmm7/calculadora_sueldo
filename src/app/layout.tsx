import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CalculaSueldo: Calculadora de sueldo bruto a neto",
    template: "%s | CalculaSueldo",
  },
  description:
    "Calcula tu sueldo neto en España desde el salario bruto. Estima IRPF, Seguridad Social, complementos y nómina mensual en 12 o 14 pagas.",
  metadataBase: new URL(siteUrl),
  applicationName: "CalculaSueldo",
  keywords: [
    "calculadora sueldo neto",
    "calculadora salario bruto a neto",
    "sueldo neto España",
    "calcular nómina",
    "IRPF nómina",
    "Seguridad Social sueldo",
  ],
  authors: [{ name: "CalculaSueldo" }],
  creator: "CalculaSueldo",
  publisher: "CalculaSueldo",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "CalculaSueldo",
    title: "CalculaSueldo: calcula tu sueldo neto",
    description:
      "Convierte tu salario bruto en una estimación de sueldo neto con IRPF y Seguridad Social.",
  },
  twitter: {
    card: "summary",
    title: "CalculaSueldo: calcula tu sueldo neto",
    description:
      "Calculadora de sueldo bruto a neto para España, con 12 o 14 pagas.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
