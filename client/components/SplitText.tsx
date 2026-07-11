import { motion } from "framer-motion";

type SplitTextProps = {
  text: string;
  className?: string;
  /** Stagger delay between words in seconds. Default: 0.04 */
  stagger?: number;
  /** Delay before animation starts. Default: 0 */
  delay?: number;
  /** Whether to use animate (for mount) or whileInView. Default: "inView" */
  trigger?: "mount" | "inView";
};

const containerVariants = (stagger: number, delay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const wordVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SplitText({
  text,
  className,
  stagger = 0.04,
  delay = 0,
  trigger = "inView",
}: SplitTextProps) {
  const words = text.split(" ");

  const motionProps =
    trigger === "mount"
      ? { animate: "visible" }
      : { whileInView: "visible", viewport: { once: true, amount: 0.3 } };

  return (
    <motion.p
      className={className}
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      {...motionProps}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.3em" }}
        >
          <motion.span className="inline-block" variants={wordVariants}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}
