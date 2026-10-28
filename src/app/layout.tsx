import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Bati Jano — Full-stack developer & UI/UX designer", template: "%s | Bati Jano" },
  description: "Bati Jano is a Computer Science and Engineering student, full-stack developer, and UI/UX designer continuously advancing his skills through practical projects.",
  openGraph: { title: "Bati Jano — Full-stack developer & UI/UX designer", description: "Practical full-stack projects and thoughtful user-centered design.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Navbar />{children}</body></html>;
}
