import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return [{ url: base, lastModified: new Date() }, ...projects.map((project) => ({ url: `${base}/projects/${project.slug}`, lastModified: new Date() }))];
}
