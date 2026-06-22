import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ROLES = [
  "a full stack developer",
  "an AI/ML enthusiast",
  "an innovator",
] as const;

type Phase = "typing" | "hold" | "deleting";

const TYPE_MS = 55;
const DELETE_MS = 35;
const HOLD_MS = 2200;

export function RotatingTypewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    const target = ROLES[roleIndex];
    let t: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (display.length < target.length) {
        t = setTimeout(() => {
          setDisplay(target.slice(0, display.length + 1));
        }, TYPE_MS);
      } else {
        t = setTimeout(() => setPhase("hold"), 120);
      }
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("deleting"), HOLD_MS);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        t = setTimeout(() => {
          setDisplay((d) => d.slice(0, -1));
        }, DELETE_MS);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(t);
  }, [display, phase, roleIndex]);

  return (
    <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
      <span className="text-portfolio-gray/90">Gautham is </span>
      <motion.span
        className="relative inline-block bg-gradient-to-r from-portfolio-primary via-fuchsia-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(199,120,221,0.35)]"
        layout
      >
        {display}
        <motion.span
          className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 bg-portfolio-primary align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
          aria-hidden
        />
      </motion.span>
    </h1>
  );
}
