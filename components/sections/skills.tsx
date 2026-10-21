"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import { SKILLS } from "@/lib/data";

export function Skills() {
  const allSkills = SKILLS.flatMap((c) => c.items);

  return (
    <section id="skills" className="relative py-28 sm:py-36 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 -z-10 h-96 w-64 -translate-y-1/2 blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--brand-teal), transparent 40%), transparent)" }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="TECH STACK"
          title="Tools I build with"
          description="A stack chosen for shipping fast without cutting corners — from LLM orchestration down to the database."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILLS.map((group, i) => (
            <Reveal key={group.category} className="h-full">
              <div className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-border/50 bg-muted/10 p-6 transition-all duration-300 hover:border-primary/35 hover:bg-muted/20">
                {/* Background index number */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-3 select-none font-display text-[5rem] font-bold leading-none opacity-[0.04] text-foreground"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                  {group.category}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border/60 bg-background/50 px-3 py-1 text-sm text-foreground/80 transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary hover:shadow-[0_0_14px_-4px_var(--brand-teal)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </motion.div>

        {/* Marquee strip */}
        <Reveal delay={0.2} className="mt-14">
          <Marquee items={allSkills} />
        </Reveal>
      </div>
    </section>
  );
}
