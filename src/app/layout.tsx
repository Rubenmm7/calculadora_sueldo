import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
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
    default: "Calculadora Sueldo Neto 2026 | Números Claritos",
    template: "%s | Números Claritos",
  },
  description:
    "Calcula con precisión tu sueldo neto, IRPF y cotizaciones en España. Revisa tu nómina y toma decisiones laborales con datos claros y actualizados.",
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
    title: "Calculadora Sueldo Neto 2026 | Números Claritos",
    description:
      "Calcula tu sueldo neto, IRPF y cotizaciones en España con datos claros para entender mejor tu nómina.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora Sueldo Neto 2026 | Números Claritos",
    description:
      "Calcula tu sueldo neto, IRPF y cotizaciones en España con datos claros para entender mejor tu nómina.",
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
        <GoogleAnalytics gaId="G-G65LRV4G7W" />
      </body>
    </html>
  );
}
