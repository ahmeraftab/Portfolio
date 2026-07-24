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
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="ABOUT"
          title="I build the AI layer, then wrap it in a product people enjoy using."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I&apos;m a full stack developer who spends most of my time in the AI layer of
                modern products: RAG pipelines, LLM orchestration, and the plumbing that turns a
                language model into something reliable enough to ship. My final year project was
                a production-deployed multimodal RAG assistant handling document, voice, and image
                queries in one pipeline, and I&apos;ve since shipped AI WhatsApp assistants,
                branded chat concierges, and resume-analysis tools built the same way: grounded,
                fast, and genuinely usable.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I pair that with strong full-stack fundamentals from building production features
                for a multi-role service marketplace across web and mobile. I care about the
                details that separate a prototype from a product: latency, cost per request,
                graceful failure states, and interfaces that feel considered. Based in Karachi,
                Pakistan, and a CS graduate of Bahria University, I work with teams and founders
                worldwide, on-site or remote.
              </p>
            </Reveal>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((stat, i) => (
                <Reveal key={stat.label} delay={0.1 + i * 0.08}>
                  <div className="rounded-2xl border border-border/70 bg-muted/20 px-3 py-5 text-center">
                    <div className="flex h-8 items-center justify-center sm:h-10">
                      <div
                        className={cn(
                          "font-mono font-semibold text-primary",
                          stat.isText ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl"
                        )}
                      >
                        {stat.isText ? (
                          stat.isText
                        ) : (
                          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        )}
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2} className="mx-auto w-full max-w-sm">
            <TiltCard className="rounded-3xl border border-border/70 bg-muted/20 p-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[linear-gradient(160deg,color-mix(in_oklch,var(--brand-teal),transparent_85%),color-mix(in_oklch,var(--brand-blue),transparent_90%))]">
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
