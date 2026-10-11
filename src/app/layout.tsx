import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Bati Jano — Full-stack development & UI/UX", template: "%s | Bati Jano" },
  description: "Bati Jano is a Computer Science student learning full-stack development and UI/UX design through practical projects.",
  openGraph: { title: "Bati Jano — Full-stack development & UI/UX", description: "Practical web projects and thoughtful interface design.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Navbar />{children}</body></html>;
}
