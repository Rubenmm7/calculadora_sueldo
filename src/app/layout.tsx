import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import "./globals.css";

const siteUrl = "https://numerosclaritos.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Números Claritos | Calculadora de nóminas y sueldo neto en España",
    template: "%s | Números Claritos",
  },
  description:
    "Calcula tu sueldo neto en España, entiende cómo funciona tu nómina y consulta guías sobre IRPF, Seguridad Social e interés compuesto en Números Claritos.",
  applicationName: "Números Claritos",
  keywords: [
    "sueldo neto España",
    "calculadora nómina",
    "IRPF 2026",
    "qué se descuenta de la nómina",
    "12 o 14 pagas",
    "interés compuesto",
    "nómina en España",
    "desempleo nómina",
  ],
  authors: [{ name: "Números Claritos" }],
  creator: "Números Claritos",
  publisher: "Números Claritos",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "Números Claritos",
    title: "Números Claritos | Nóminas, IRPF y finanzas personales",
    description:
      "Herramientas y guías para entender tu nómina, el sueldo neto y la fiscalidad laboral en España.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Números Claritos | Nóminas, IRPF y finanzas personales",
    description:
      "Calculadora de sueldo neto y artículos de SEO sobre nóminas e IRPF en España.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-16 sm:pt-20">
        <Navbar />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
