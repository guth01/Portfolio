import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { ArrowRight } from "lucide-react";

const STORAGE_KEY = "portfolio-intro-session";

function hasSeenIntroThisSession() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

type IntroTransitionProps = {
  onComplete: () => void;
};

export function IntroTransition({ onComplete }: IntroTransitionProps) {
  const [visible, setVisible] = useState(!hasSeenIntroThisSession());
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (hasSeenIntroThisSession()) onComplete();
  }, [onComplete]);

  const finish = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    markIntroSeen();
    window.setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 900);
  }, [exiting, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#0d0f14]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(199,120,221,0.08) 1px, transparent 1px),
                linear-gradient(rgba(199,120,221,0.06) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <motion.div
            className="pointer-events-none absolute -left-1/4 top-1/3 h-[min(80vw,520px)] w-[min(80vw,520px)] rounded-full bg-portfolio-primary/25 blur-[120px]"
            animate={{ x: [0, 40, 0], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-1/4 bottom-1/4 h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full bg-violet-500/20 blur-[100px]"
            animate={{ x: [0, -30, 0], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="relative z-10 flex max-w-lg flex-col items-center gap-10 px-6 text-center"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex items-center gap-3 text-white"
              animate={exiting ? { scale: 1.08, filter: "blur(4px)" } : { scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: [0, 6, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Logo size={40} className="text-portfolio-primary drop-shadow-[0_0_18px_rgba(199,120,221,0.65)]" />
              </motion.div>
              <span className="font-mono text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Gautham
              </span>
            </motion.div>

            <div className="space-y-3">
              <motion.p
                className="font-mono text-xs uppercase tracking-[0.35em] text-portfolio-gray"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Creative engineer · One scroll away
              </motion.p>
              <motion.div
                className="mx-auto h-px max-w-[200px] bg-gradient-to-r from-transparent via-portfolio-primary to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <motion.button
              type="button"
              onClick={finish}
              disabled={exiting}
              className="group relative flex items-center gap-3 overflow-hidden border-2 border-portfolio-primary bg-portfolio-primary/10 px-8 py-4 font-mono text-sm font-semibold uppercase tracking-widest text-white shadow-[0_0_40px_rgba(199,120,221,0.25)] transition hover:bg-portfolio-primary/20 disabled:pointer-events-none"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
            >
              <span className="relative z-10">Enter the workspace</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition group-hover:translate-x-1" />
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-portfolio-primary/40 via-transparent to-portfolio-primary/40"
                initial={{ x: "-100%" }}
                animate={{ x: exiting ? "100%" : ["-100%", "100%"] }}
                transition={
                  exiting
                    ? { duration: 0.5 }
                    : { duration: 2.2, repeat: Infinity, ease: "linear" }
                }
              />
            </motion.button>

            <button
              type="button"
              onClick={finish}
              className="font-mono text-xs text-portfolio-gray underline-offset-4 hover:text-white hover:underline"
            >
              Skip intro
            </button>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-portfolio-bg to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />

          <AnimatePresence>
            {exiting && (
              <motion.div
                className="absolute inset-0 z-20 bg-portfolio-bg"
                initial={{ clipPath: "circle(0% at 50% 50%)" }}
                animate={{ clipPath: "circle(150% at 50% 50%)" }}
                transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
