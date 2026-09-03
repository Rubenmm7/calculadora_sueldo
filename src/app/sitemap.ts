import type { MetadataRoute } from "next";
import { articulos } from "./articulos/articulos";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "interes-compuesto",
    "articulos",
    "contacto",
    "privacidad",
    "cookies",
    "aviso-legal",
  ];
  const articleRoutes = articulos.map((articulo) => `articulos/${articulo.slug}`);

  return [...staticRoutes, ...articleRoutes].map((path) => ({
    url: `${siteUrl}/${path}`,
    lastModified,
    changeFrequency: path === "" || path === "articulos" ? "weekly" : "yearly",
    priority: path === "" ? 1 : path === "articulos" ? 0.8 : 0.5,
  }));
}
