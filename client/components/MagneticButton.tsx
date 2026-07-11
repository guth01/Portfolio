import { type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  /** Maximum displacement in px. Default: 12 */
  strength?: number;
};

export function MagneticButton({
  children,
  className,
  strength = 12,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 18, mass: 0.6 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Offset from center, normalised then scaled to strength
    const dx = ((e.clientX - cx) / (rect.width / 2)) * strength;
    const dy = ((e.clientY - cy) / (rect.height / 2)) * strength;

    rawX.set(dx);
    rawY.set(dy);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
