import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/lib/projects";

export function ProjectCard({ project }: { project: PortfolioProject }) {
  const projectUrl = `/projects/${project.slug}`;

  return (
    <article className="project-card">
      <Link
        className="project-cover"
        href={projectUrl}
        aria-label={`View ${project.title} case study`}
      >
        <Image
          src={project.cover}
          alt=""
          fill
          sizes="(max-width: 800px) 100vw, 50vw"
        />
      </Link>
      <div className="project-body">
        <div className="project-meta">
          <span>{project.kind === "design" ? "UI/UX concept" : "Software project"}</span>
          <span>{project.technologies.slice(0, 2).join(" · ")}</span>
        </div>
        <h3>
          <Link href={projectUrl}>{project.title}</Link>
        </h3>
        <p>{project.description}</p>
        <div className="tag-row">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        <div className="card-actions">
          <Link className="text-link" href={projectUrl}>
            View case study <ArrowUpRight size={16} />
          </Link>
          {project.github && (
            <a
              className="text-link"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
