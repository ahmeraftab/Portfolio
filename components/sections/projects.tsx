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

const pad = (n: number) => String(n).padStart(2, "0");

export function Projects() {
  const [active, setActive] = useState(0);
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  /* Live counter — which panel owns the viewport centre */
  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    panels.current.forEach((p, i) => {
      if (!p) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(i); },
        { rootMargin: "-42% 0px -42% 0px" }
      );
      o.observe(p);
      obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  /* GSAP parallax on each project image (desktop only) */
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        panels.current.forEach((p) => {
          if (!p) return;
          const img = p.querySelector<HTMLElement>(".parallax-img");
          if (!img) return;
          gsap.fromTo(img, { yPercent: -7 }, {
            yPercent: 7, ease: "none",
            scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: 1.3 },
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
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="FEATURED WORK"
            title="Selected projects"
            description="Production AI products and full-stack builds. Live links and source where available."
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            aria-hidden="true"
            className="hidden shrink-0 flex-col items-end pb-1 sm:flex"
          >
            <span
              className="font-display font-bold leading-none text-primary"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)", letterSpacing: "-0.03em" }}
            >
              {pad(active + 1)}
            </span>
            <span className="my-1 h-px w-8 self-end bg-border" />
            <span className="font-mono text-sm text-muted-foreground">{pad(TOTAL)}</span>
          </motion.div>
        </div>

        {/* Panels */}
        <div className="mt-20 flex flex-col">
          {PROJECTS.map((project, i) => {
            const even = i % 2 === 0;
            return (
              <div
                key={project.slug}
                ref={(el) => { panels.current[i] = el; }}
                className="group relative flex min-h-[82vh] items-center border-t border-border/25 py-16 first:border-t-0"
              >
                <div
                  className={cn(
                    "grid w-full items-center gap-10 lg:gap-16",
                    even ? "lg:grid-cols-[45%_55%]" : "lg:grid-cols-[55%_45%]"
                  )}
                >
                  {/* Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.75, ease }}
                    className={cn("flex flex-col gap-5", !even && "lg:order-2")}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs tracking-[0.18em] text-primary/55">
                        {pad(i + 1)} / {pad(TOTAL)}
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

                    <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {project.name}
                    </h3>

                    <p className="text-base leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <Badge key={t} variant="secondary" className="font-mono text-[11px] font-normal">
                          {t}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-5 pt-1">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-hover
                          className="group/l inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-75"
                        >
                          Live Demo
                          <ArrowUpRight className="size-3.5 transition-transform group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
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

                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.85, delay: 0.1, ease }}
                    className={cn(
                      "overflow-hidden rounded-2xl border border-border/40 shadow-[0_0_60px_-24px_color-mix(in_oklch,var(--brand-teal),transparent_55%)]",
                      !even && "lg:order-1"
                    )}
                    style={{ aspectRatio: "16/10" }}
                  >
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
