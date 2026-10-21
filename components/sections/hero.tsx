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

      {/* Cinematic radial spotlight behind the name */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 38%, color-mix(in oklch, var(--brand-teal), transparent 86%), transparent 70%)",
        }}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6">

        {/* Location pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-muted/30 px-3 py-1.5 font-mono text-xs text-muted-foreground"
        >
          <MapPin className="size-3 text-primary" />
          {SITE.location} · Open to remote, on-site &amp; freelance work
        </motion.div>

        {/* Name — each word clips up from below (the dramatic moment) */}
        <div>
          <div className="flex flex-wrap gap-x-[0.2em]">
            {nameWords.map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.span
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.08 + i * 0.13, ease }}
                  className="block font-display font-bold text-foreground"
                  style={{
                    fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Role — thin rule + typing animation */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease }}
            className="mt-5 h-6 flex items-center gap-3"
          >
            <span className="h-px w-10 shrink-0 bg-primary/60" />
            <TypingRole words={SITE.taglines} />
          </motion.div>
        </div>

        {/* Pitch */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.78, ease }}
          className="max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          {SITE.pitch}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease }}
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
        transition={{ delay: 1.3, duration: 0.8 }}
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
