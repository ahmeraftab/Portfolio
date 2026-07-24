"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variants?: Variants;
  as?: "div" | "span" | "li";
}) {
  const MotionTag = as === "span" ? motion.span : as === "li" ? motion.li : motion.div;
  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
