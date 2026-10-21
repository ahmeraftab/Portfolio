"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
import { HeroCanvas } from "@/components/hero-canvas";
import { Magnetic } from "@/components/magnetic";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

const nameWords = SITE.name.split(" ");
const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden pt-24 grain"
    >
      <HeroCanvas />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, color-mix(in oklch, var(--brand-teal), transparent 88%), transparent 70%)",
        }}
      />
      <div className="grid-bg pointer-events-none absolute inset-0" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6">

        {/* Location pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-muted/30 px-3 py-1.5 font-mono text-xs text-muted-foreground"
        >
          <MapPin className="size-3 text-primary" />
          {SITE.location} · Open to remote, on-site &amp; freelance
        </motion.div>

        {/* Editorial name — each word slides up independently */}
        <div>
          <div className="flex flex-wrap gap-x-[0.22em] overflow-hidden">
            {nameWords.map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.85, delay: 0.1 + i * 0.12, ease }}
                  className="editorial block font-display text-[clamp(3.8rem,11vw,8.5rem)] text-foreground leading-[0.9]"
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Role line */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            className="mt-5 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-primary/70 shrink-0" />
            <span className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
              {SITE.role}
            </span>
          </motion.div>
        </div>

        {/* Pitch */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease }}
          className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {SITE.pitch}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease }}
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
