"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
import { HeroCanvas } from "@/components/hero-canvas";
import { TypingRole } from "@/components/typing-role";
import { Magnetic } from "@/components/magnetic";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;
const nameWords = SITE.name.split(" ");

export function Hero() {
  return (
    <section
      id="top"
      className="relative grain flex min-h-dvh flex-col justify-center overflow-hidden pt-24"
    >
      <HeroCanvas />
      <div className="grid-bg pointer-events-none absolute inset-0" />
      {/* Mobile readability scrim — darkens behind the stacked copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-b from-background/80 via-background/40 to-transparent sm:hidden"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-muted/30 px-3 py-1.5 font-mono text-xs text-muted-foreground"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          {SITE.location} · Available for work
        </motion.div>

        {/* Name — each word clips up */}
        <div>
          <h1
            className="flex flex-wrap gap-x-[0.26em]"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            {nameWords.map((word, i) => (
              <span key={word} className="block overflow-hidden py-[0.08em]">
                <motion.span
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
                  className="display-head block text-foreground"
                  style={{ fontWeight: 700 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
            className="mt-4 flex h-6 items-center gap-3"
          >
            <span className="h-px w-9 shrink-0 bg-primary/60" />
            <TypingRole words={SITE.taglines} />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72, ease }}
          className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {SITE.pitch}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.84, ease }}
          className="flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <Button
              size="lg"
              nativeButton={false}
              className="h-12 rounded-full px-6 text-base"
              render={<a href="#projects" data-cursor-hover />}
            >
              View Projects
              <ArrowUpRight className="size-4" />
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              className="h-12 rounded-full px-6 text-base"
              render={<a href={SITE.resumeUrl} download data-cursor-hover />}
            >
              Download Resume
              <Download className="size-4" />
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              variant="ghost"
              size="lg"
              nativeButton={false}
              className="h-12 rounded-full px-6 text-base"
              render={<a href="#contact" data-cursor-hover />}
            >
              Contact Me
            </Button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        data-cursor-hover
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
