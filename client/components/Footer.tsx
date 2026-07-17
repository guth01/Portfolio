import { Logo } from "./Logo";
import { Github, Linkedin, Code } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-portfolio-gray/20 bg-portfolio-bg">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-center gap-12">
          <div className="flex w-full flex-col gap-12">
            <div className="flex w-full flex-col justify-between gap-12 sm:flex-row">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Logo size={16} className="text-portfolio-primary" />
                  <span className="font-bold text-white">Gautham</span>
                </div>
                <div className="text-sm text-portfolio-gray">gauthampraveen76@gmail.com</div>
                <div className="text-sm text-portfolio-gray">
                  <a href="tel:+919400722621" className="transition hover:text-portfolio-primary">
                    +91 9400722621
                  </a>
                </div>
                <div className="text-sm text-white">
                  Full stack developer · AI/ML enthusiast · Innovator
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="text-sm font-semibold text-white">Media</div>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/guth01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ABB2BF] transition hover:text-portfolio-primary"
                  >
                    <Github size={32} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gautham-praveen-63109328b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ABB2BF] transition hover:text-portfolio-primary"
                  >
                    <Linkedin size={32} />
                  </a>
                  <a
                    href="https://leetcode.com/gauth_am"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ABB2BF] transition hover:text-portfolio-primary"
                  >
                    <Code size={32} />
                  </a>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-portfolio-gray/40 to-transparent" />

            <div className="text-center text-xs text-portfolio-gray">
              Crafted with curiosity.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
