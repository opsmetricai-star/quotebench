import type { MetadataRoute } from "next";
import { CATEGORIES, SOLUTIONS, slugify } from "@/lib/content";
import { SUPPLIERS } from "@/lib/suppliers";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const paths = [
    "/", "/quinn", "/how-it-works", "/solutions", "/marketplace", "/categories", "/pricing", "/enablement", "/about",
    "/legal/terms", "/legal/privacy", "/legal/security", "/login", "/signup",
    ...Object.keys(SOLUTIONS).map((s) => `/solutions/${s}`),
    ...CATEGORIES.map((c) => `/categories/${slugify(c)}`),
    ...SUPPLIERS.map(([n]) => `/marketplace/${slugify(n)}`),
  ];
  return paths.map((p) => ({ url: base + p }));
}
