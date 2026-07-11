import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const SECTIONS = [
  "home",
  "projects",
  "about-me",
  "experience",
  "extracurriculars",
  "certifications",
  "skills",
  "contacts",
] as const;

const NAV_LINKS: { id: (typeof SECTIONS)[number]; label: string }[] = [
  { id: "home", label: "home" },
  { id: "projects", label: "works" },
  { id: "about-me", label: "about-me" },
  { id: "experience", label: "experience" },
  { id: "extracurriculars", label: "extracurriculars" },
  { id: "certifications", label: "certifications" },
  { id: "skills", label: "skills" },
  { id: "contacts", label: "contacts" },
];

type HeaderProps = {
  introComplete?: boolean;
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header({ introComplete = true }: HeaderProps) {
  const activeId = useActiveSection(SECTIONS, { enabled: introComplete });
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);

  // Detect scroll position for header shrink
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Calculate pill position relative to nav container
  useEffect(() => {
    const activeEl = itemRefs.current[activeId];
    const nav = navRef.current;
    if (!activeEl || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();

    setPillStyle({
      left: elRect.left - navRect.left + nav.scrollLeft,
      width: elRect.width,
    });
  }, [activeId]);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-portfolio-gray/30 bg-portfolio-bg/90 backdrop-blur-md shadow-[0_4px_32px_rgba(0,0,0,0.35)]"
          : "border-portfolio-gray/20 bg-portfolio-bg/80 backdrop-blur-md"
      )}
      animate={scrolled ? { paddingTop: 0, paddingBottom: 0 } : {}}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 transition-all duration-300",
          scrolled ? "py-3 sm:py-4" : "py-6 sm:py-8"
        )}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
            window.history.replaceState(null, "", "#home");
          }}
          className="flex shrink-0 items-center gap-2 transition hover:opacity-90"
        >
          <Logo size={16} className="text-portfolio-primary" />
          <span className="text-sm font-bold text-white">Gautham</span>
        </Link>

        {/* Nav links with sliding pill */}
        <div
          ref={navRef}
          className="hide-scrollbar relative flex items-center gap-x-1 overflow-x-auto sm:gap-x-2"
        >
          {/* Sliding pill */}
          <AnimatePresence>
            {pillStyle && (
              <motion.span
                layoutId="nav-pill"
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-sm bg-portfolio-primary/12 border border-portfolio-primary/25"
                style={{
                  left: pillStyle.left,
                  width: pillStyle.width,
                  height: "calc(100% - 4px)",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
              />
            )}
          </AnimatePresence>

          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              ref={(el) => { itemRefs.current[id] = el; }}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
                window.history.replaceState(null, "", `#${id}`);
              }}
              className={cn(
                "relative z-10 px-3 py-1.5 text-sm font-medium transition-colors duration-200",
                activeId === id ? "text-portfolio-primary" : "text-portfolio-gray hover:text-white"
              )}
            >
              <span className="text-portfolio-primary">#</span>
              <span>{label}</span>
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
