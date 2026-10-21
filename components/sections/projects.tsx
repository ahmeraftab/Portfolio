"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { ProjectMedia } from "@/components/project-media";
import { Badge } from "@/components/ui/badge";
import { PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";

const TOTAL = PROJECTS.length;
const ease = [0.16, 1, 0.3, 1] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Update counter as each panel crosses viewport centre */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(panel);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* GSAP: subtle parallax on project images — desktop only */
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    let cleanup: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        panelRefs.current.forEach((panel) => {
          if (!panel) return;
          const img = panel.querySelector<HTMLElement>(".parallax-img");
          if (!img) return;
          gsap.fromTo(img, { yPercent: -6 }, {
            yPercent: 6, ease: "none",
            scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: 1.4 },
          });
        });
        cleanup = () => ScrollTrigger.killAll();
      }
    );
    return () => cleanup?.();
  }, []);

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header row: heading left, live counter right */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="FEATURED WORK"
            title="Selected projects"
            description="Production AI products and full-stack builds. Live links and source where available."
          />

          {/* Counter — updates as you scroll through panels */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            aria-live="polite"
            aria-label={`Viewing project ${activeIndex + 1} of ${TOTAL}`}
            className="hidden shrink-0 flex-col items-end gap-0 pb-1 sm:flex"
          >
            <span
              className="font-display font-bold leading-none text-primary"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}
            >
              {pad(activeIndex + 1)}
            </span>
            <span className="h-px w-8 bg-border self-end my-1" />
            <span className="font-mono text-sm text-muted-foreground">{pad(TOTAL)}</span>
          </motion.div>
        </div>

        {/* Project panels */}
        <div className="mt-20 flex flex-col">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.slug}
                ref={(el) => { panelRefs.current[index] = el; }}
                className="group relative flex min-h-[85vh] items-center border-t border-border/25 py-16 first:border-t-0"
              >
                <div
                  className={cn(
                    "grid w-full items-center gap-10 lg:gap-16",
                    /* Image gets ~55% on desktop, alternates sides */
                    isEven
                      ? "lg:grid-cols-[45%_55%]"
                      : "lg:grid-cols-[55%_45%]"
                  )}
                >
                  {/* ── Text column ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.75, ease }}
                    className={cn("flex flex-col gap-5", !isEven && "lg:order-2")}
                  >
                    {/* Index */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs tracking-[0.18em] text-primary/55">
                        {pad(index + 1)} / {pad(TOTAL)}
                      </span>
                      {project.featured && (
                        <>
                          <span className="h-px w-3 bg-border" />
                          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                            Featured
                          </span>
                        </>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <Badge key={t} variant="secondary" className="font-mono text-[11px] font-normal">
                          {t}
                        </Badge>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-5 pt-1">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-hover
                          className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-75"
                        >
                          Live Demo
                          <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-hover
                          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <GithubIcon className="size-3.5" /> GitHub
                        </a>
                      )}
                    </div>
                  </motion.div>

                  {/* ── Image column — visual star of each panel ── */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.85, delay: 0.1, ease }}
                    className={cn(
                      "overflow-hidden rounded-2xl border border-border/40 shadow-[0_0_60px_-20px_color-mix(in_oklch,var(--brand-teal),transparent_60%)]",
                      !isEven && "lg:order-1"
                    )}
                    style={{ aspectRatio: "16/10" }}
                  >
                    {/* GSAP parallax target */}
                    <div className="parallax-img h-[114%] w-full" style={{ marginTop: "-7%" }}>
                      <ProjectMedia project={project} />
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
