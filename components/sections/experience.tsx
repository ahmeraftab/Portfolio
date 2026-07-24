"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { EXPERIENCE, EDUCATION } from "@/lib/data";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="EXPERIENCE" title="Where I've worked" />

        <div ref={containerRef} className="relative mt-16 pl-8 sm:pl-10">
          <div className="absolute left-[3px] top-0 h-full w-px bg-border sm:left-[5px]" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[3px] top-0 h-full w-px origin-top bg-gradient-to-b from-brand-teal to-brand-blue sm:left-[5px]"
          />

          <div className="flex flex-col gap-14">
            {EXPERIENCE.map((entry, i) => (
              <Reveal key={`${entry.company}-${entry.role}`} delay={i * 0.05} className="relative">
                <span className="absolute -left-8 top-1.5 flex size-[11px] -translate-x-1/2 items-center justify-center rounded-full bg-background ring-2 ring-primary sm:-left-10">
                  <span className="size-1.5 rounded-full bg-primary" />
                </span>

                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    {entry.role} <span className="text-muted-foreground">· {entry.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {entry.start} – {entry.end}
                  </span>
                </div>

                <ul className="mt-3 flex flex-col gap-2">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/60" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="mt-16">
          <h3 className="mb-4 font-mono text-xs tracking-wide text-muted-foreground">EDUCATION</h3>
          <div className="flex flex-col gap-3">
            {EDUCATION.map((entry) => (
              <div
                key={entry.degree}
                className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-muted/20 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="size-5" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{entry.degree}</p>
                    <p className="text-sm text-muted-foreground">{entry.school}</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {entry.start} – {entry.end}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
