import { type ReactNode, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt angle in degrees. Default: 7 */
  maxTilt?: number;
};

export function TiltCard({ children, className, maxTilt = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });

  // Raw motion values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Springy motion values for smooth interpolation
  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-maxTilt, maxTilt]), springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    // Normalise cursor to [-1, 1] relative to card center
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    rawX.set(nx);
    rawY.set(ny);

    // Spotlight position (px from card top-left)
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Spotlight gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit] transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: spotlight.x,
            top: spotlight.y,
            width: 280,
            height: 280,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 75%)",
          }}
        />
      </div>
    </motion.div>
  );
}
