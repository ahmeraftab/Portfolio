"use client";

import { motion, type Variants } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const eyebrowV: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
};

const clipV: Variants = {
  hidden: { y: "105%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};

const descV: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1, ease: EASE } },
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}
    >
      <motion.div
        variants={eyebrowV}
        className={cn("flex items-center gap-3", align === "center" && "justify-center")}
      >
        <span className="h-px w-5 bg-primary shrink-0" />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
          {eyebrow}
        </span>
      </motion.div>

      <div className="overflow-hidden py-[0.1em]">
        <motion.h2
          variants={clipV}
          className={cn(
            "display-head text-balance text-3xl sm:text-4xl md:text-5xl",
            align === "center" && "mx-auto"
          )}
        >
          {title}
        </motion.h2>
      </div>

      {description && (
        <motion.p
          variants={descV}
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
