import { type ReactNode } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Override stagger delay between children (seconds). Default: 0.1 */
  stagger?: number;
  /** Fraction of element that must be visible before animation fires. Default: 0.1 */
  amount?: number;
};

/**
 * Wraps children in a Framer Motion container.
 * Each direct child animates in from y:20 → y:0 with a stagger.
 * Wrap individual items in <ScrollRevealItem> to participate in the stagger.
 */
export function ScrollReveal({
  children,
  className,
  stagger = 0.1,
  amount = 0.1,
}: ScrollRevealProps) {
  const variants = {
    ...containerVariants,
    visible: {
      transition: { staggerChildren: stagger },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

/** Wrap each direct child of ScrollReveal in this to opt into the stagger animation. */
export function ScrollRevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={childVariants}>
      {children}
    </motion.div>
  );
}
