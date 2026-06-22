import { useEffect, useState } from "react";

type Options = {
  enabled?: boolean;
  /** Offset from top of viewport (px) — typically fixed header height */
  offset?: number;
};

export function useActiveSection(sectionIds: readonly string[], options?: Options) {
  const enabled = options?.enabled ?? true;
  const offset = options?.offset ?? 140;
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    if (!enabled) return;

    const resolveActive = () => {
      const scrollY = window.scrollY + offset;
      let current = sectionIds[0] ?? "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollY) current = id;
      }

      setActiveId(current);
    };

    resolveActive();
    window.addEventListener("scroll", resolveActive, { passive: true });
    window.addEventListener("resize", resolveActive, { passive: true });
    return () => {
      window.removeEventListener("scroll", resolveActive);
      window.removeEventListener("resize", resolveActive);
    };
  }, [sectionIds, offset, enabled]);

  return activeId;
}
