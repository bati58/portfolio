"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [["About", "about"], ["Skills", "skills"], ["Projects", "projects"], ["Designs", "designs"], ["Services", "services"], ["Contact", "contact"]];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="navbar"><div className="nav-inner"><Link href="/" className="brand" onClick={() => setOpen(false)}><Image src="/logo.png" alt="" width={36} height={36} /><span>Bati Jano</span></Link><nav className={open ? "nav-links open" : "nav-links"} aria-label="Primary">{links.map(([label, id]) => <Link key={id} href={`/#${id}`} onClick={() => setOpen(false)}>{label}</Link>)}</nav><div className="nav-actions"><ThemeToggle /><button className="icon-button menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X size={20} /> : <Menu size={20} />}</button></div></div></header>;
}
