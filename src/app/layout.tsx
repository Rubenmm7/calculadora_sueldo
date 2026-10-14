import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import AccessibilityControls from "@/components/AccessibilityControls";
import "./globals.css";

const siteUrl = "https://numerosclaritos.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const accessibilityBootstrap = `(function(){try{var r=document.documentElement;var t=localStorage.getItem("numeros-claritos-theme")==="light"?"light":"dark";var s=localStorage.getItem("numeros-claritos-text-size");if(s!=="small"&&s!=="normal"&&s!=="large")s="normal";var c=localStorage.getItem("numeros-claritos-high-contrast")==="true";r.classList.toggle("dark",t==="dark");r.classList.toggle("light",t==="light");r.classList.toggle("a11y-high-contrast",c);r.dataset.textSize=s;r.style.colorScheme=t}catch(e){document.documentElement.classList.add("dark")}})();`;

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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col pt-16 sm:pt-20">
        <script dangerouslySetInnerHTML={{ __html: accessibilityBootstrap }} />
        <a
          href="#main-content"
          className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-zinc-900 focus:shadow-lg"
        >
          Saltar al contenido principal
        </a>
        <Navbar />
        {children}
        <Footer />
        <CookieBanner />
        <AccessibilityControls />
      </body>
      <GoogleAnalytics gaId="G-G65LRV4G7W" />
    </html>
  );
}
