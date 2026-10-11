import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: project.title, description: project.description } : {};
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <main className="detail-page"><div className="container"><Link className="back-link" href={project.kind === "design" ? "/#designs" : "/#projects"}><ArrowLeft size={16} /> Back to work</Link><div className="detail-header"><p className="eyebrow">{project.kind === "design" ? "UI/UX CASE STUDY" : "SOFTWARE PROJECT"}</p><h1>{project.title}</h1><p className="detail-intro">{project.description}</p><div className="tag-row">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="button-row">{project.live && <a className="button button-primary" href={project.live} target="_blank" rel="noopener noreferrer">{project.kind === "design" ? "Open prototype" : "View live site"} <ArrowUpRight size={16} /></a>}{project.figma && <a className="button button-ghost" href={project.figma} target="_blank" rel="noopener noreferrer">View Figma file <ArrowUpRight size={16} /></a>}{project.github && <a className="button button-ghost" href={project.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16} /></a>}</div></div><div className="detail-gallery">{project.gallery.map((image) => <figure key={image.src}><div className="detail-image"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 800px) 100vw, 50vw" /></div><figcaption>{image.caption}</figcaption></figure>)}</div><div className="detail-notes"><h2>What this explores</h2><ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>{project.kind === "design" && <p className="notice">This is a UI/UX design concept and Figma prototype, not a deployed full-stack application.</p>}</div></div></main>;
}
