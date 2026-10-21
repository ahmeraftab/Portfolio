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
    <section id="experience" className="relative py-28 sm:py-36 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-1/4 -z-10 h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--brand-teal), transparent 50%), transparent)" }}
      />

      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="EXPERIENCE" title="Where I've worked" />

        <div ref={containerRef} className="relative mt-16 pl-8 sm:pl-10">
          {/* Timeline track */}
          <div className="absolute left-[3px] top-0 h-full w-px bg-border/60 sm:left-[5px]" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[3px] top-0 h-full w-px origin-top bg-gradient-to-b from-brand-teal to-brand-blue sm:left-[5px]"
          />

          <div className="flex flex-col gap-14">
            {EXPERIENCE.map((entry, i) => (
              <Reveal key={`${entry.company}-${entry.role}`} delay={i * 0.05} className="relative">
                {/* Timeline dot */}
                <span className="absolute -left-8 top-2 flex size-[11px] -translate-x-1/2 items-center justify-center rounded-full bg-background ring-2 ring-primary sm:-left-10">
                  <span className="size-1.5 rounded-full bg-primary" />
                </span>

                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {entry.role}
                    </h3>
                    <p className="font-mono text-sm text-primary/80">{entry.company}</p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                    {entry.start} – {entry.end}
                  </span>
                </div>

                <ul className="mt-4 flex flex-col gap-2.5">
                  {entry.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-primary/50" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Education */}
        <Reveal delay={0.1} className="mt-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-6 bg-primary shrink-0" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
              Education
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {EDUCATION.map((entry) => (
              <div
                key={entry.degree}
                className="flex flex-col gap-3 rounded-2xl border border-border/50 bg-muted/10 p-5 transition-colors hover:border-primary/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{entry.degree}</p>
                    <p className="font-mono text-sm text-muted-foreground">{entry.school}</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
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
