"use client";

import { useEffect, useRef } from "react";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element?.classList.add("is-visible");
      return;
    }

    element.style.setProperty("--reveal-delay", `${delay}ms`);
    const observer = new IntersectionObserver(([entry]) => {
      element.classList.toggle("is-visible", entry.isIntersecting);
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={elementRef} className={`scroll-reveal ${className}`}>{children}</div>;
}
