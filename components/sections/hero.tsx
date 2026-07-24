"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
import { HeroCanvas } from "@/components/hero-canvas";
import { TypingRole } from "@/components/typing-role";
import { Magnetic } from "@/components/magnetic";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden pt-24"
    >
      <HeroCanvas />
      <div className="grid-bg pointer-events-none absolute inset-0" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border/80 bg-muted/30 px-3 py-1.5 font-mono text-xs text-muted-foreground"
        >
          <MapPin className="size-3 text-primary" />
          {SITE.location} · Open to remote, on-site &amp; freelance work
        </motion.div>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl md:text-8xl"
          >
            {SITE.name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-4 h-6"
          >
            <TypingRole words={SITE.taglines} />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          {SITE.pitch}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.52 }}
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
            {/* TODO: Point this at your real resume PDF in /public/resume.pdf */}
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

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        data-cursor-hover
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
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
