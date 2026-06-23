import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const SECTIONS = ["home", "projects", "about-me", "experience", "extracurriculars", "certifications", "skills", "contacts"] as const;

type HeaderProps = {
  introComplete?: boolean;
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header({ introComplete = true }: HeaderProps) {
  const activeId = useActiveSection(SECTIONS, { enabled: introComplete });

  const navLink = (id: (typeof SECTIONS)[number], label: string) => (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(id);
        window.history.replaceState(null, "", `#${id}`);
      }}
      className={cn(
        "text-sm font-medium transition-colors",
        activeId === id ? "text-portfolio-primary" : "text-portfolio-gray hover:text-white"
      )}
    >
      <span className="text-portfolio-primary">#</span>
      <span>{label}</span>
    </a>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-portfolio-gray/20 bg-portfolio-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-end justify-between gap-4 px-4 py-6 sm:py-8">
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

        <div className="hide-scrollbar flex items-center gap-x-5 overflow-x-auto sm:gap-x-8">
          {navLink("home", "home")}
          {navLink("projects", "works")}
          {navLink("about-me", "about-me")}
          {navLink("experience", "experience")}
          {navLink("extracurriculars", "extracurriculars")}
          {navLink("certifications", "certifications")}
          {navLink("skills", "skills")}
          {navLink("contacts", "contacts")}
        </div>
      </nav>
    </header>
  );
}
