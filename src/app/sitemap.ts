import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://numerosclaritos.com";
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "blog",
    "interes-compuesto",
    "contacto",
    "privacidad",
    "cookies",
    "aviso-legal",
  ];

  const blogRoutes = posts.map((post) => `blog/${post.slug}`);

  return [...staticRoutes, ...blogRoutes].map((path) => ({
    url: path ? `${siteUrl}/${path}` : siteUrl,
    lastModified,
    changeFrequency: path === "" || path === "blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "blog" ? 0.9 : 0.7,
  }));
}
