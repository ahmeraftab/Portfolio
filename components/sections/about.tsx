"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { AnimatedCounter } from "@/components/animated-counter";
import { SITE, STATS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-80 w-80 rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--brand-blue), transparent 50%), transparent)" }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="ABOUT"
          title="I build the AI layer, then make it a product."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I&apos;m an AI-focused software engineer who spends most of my time in the AI layer of
                modern products: RAG pipelines, LLM orchestration, and the plumbing that turns a
                language model into something reliable enough to ship. My final year project was
                a production-deployed multimodal RAG assistant handling document, voice, and image
                queries in one pipeline, and I&apos;ve since shipped AI WhatsApp assistants,
                branded chat concierges, and resume-analysis tools built the same way — grounded,
                fast, and genuinely usable.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I pair that with strong full-stack fundamentals from building production features
                for a multi-role service marketplace across web and mobile. I care about the
                details that separate a prototype from a product: latency, cost per request,
                graceful failure states, and interfaces that feel considered. Based in Karachi,
                Pakistan, and a CS graduate of Bahria University — working with teams and founders
                worldwide, on-site or remote.
              </p>
            </Reveal>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((stat, i) => (
                <Reveal key={stat.label} delay={0.1 + i * 0.08}>
                  <div className="group rounded-2xl border border-border/60 bg-muted/15 px-3 py-5 text-center transition-colors hover:border-primary/30">
                    <div className="flex h-9 items-center justify-center">
                      <div
                        className={cn(
                          "font-display font-bold text-primary",
                          stat.isText ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl"
                        )}
                      >
                        {stat.isText ? (
                          stat.isText
                        ) : (
                          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        )}
                      </div>
                    </div>
                    <div className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Profile photo */}
          <Reveal delay={0.2} className="mx-auto w-full max-w-sm">
            <TiltCard className="rounded-3xl border border-border/60 bg-muted/15 p-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[linear-gradient(160deg,color-mix(in_oklch,var(--brand-teal),transparent_82%),color-mix(in_oklch,var(--brand-blue),transparent_88%))]">
                <Image
                  src="/profile.png"
                  alt={`${SITE.name}, ${SITE.role}`}
                  fill
                  sizes="(min-width: 1024px) 384px, 90vw"
                  className="object-cover"
                  priority
                />
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
