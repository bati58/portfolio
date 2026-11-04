import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return [
    { url: baseUrl },
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
    })),
  ];
}
