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
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="TECH STACK"
          title="Tools I build with"
          description="A stack chosen for shipping fast without cutting corners, from LLM orchestration down to the database."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILLS.map((group) => (
            <Reveal key={group.category} className="h-full">
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-muted/20 p-6 transition-colors hover:border-primary/40">
                <h3 className="font-mono text-sm tracking-wide text-primary">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-sm text-foreground/85 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_16px_-4px_var(--brand-teal)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </motion.div>

        <Reveal delay={0.2} className="mt-14">
          <Marquee items={allSkills} />
        </Reveal>
      </div>
    </section>
  );
}
