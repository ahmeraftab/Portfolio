"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { ProjectMedia } from "@/components/project-media";
import { PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";

const TOTAL = PROJECTS.length;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ─── Intersection observer: track which panel crosses viewport center ─── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { rootMargin: "-38% 0px -38% 0px", threshold: 0 }
      );
      obs.observe(panel);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ─── GSAP ScrollTrigger: parallax on project images (desktop only) ─── */
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    let cleanup: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapMod, stMod]) => {
        const { gsap } = gsapMod;
        const { ScrollTrigger } = stMod;
        gsap.registerPlugin(ScrollTrigger);

        panelRefs.current.forEach((panel) => {
          if (!panel) return;
          const imgWrap = panel.querySelector<HTMLElement>(".parallax-img");
          if (!imgWrap) return;

          gsap.fromTo(
            imgWrap,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        });

        cleanup = () => ScrollTrigger.killAll();
      }
    );

    return () => cleanup?.();
  }, []);

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* ── Section header ── */}
        <div className="mb-20 flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-6 bg-primary shrink-0" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
              Featured Work
            </span>
          </motion.div>

          <div className="flex flex-col gap-0 overflow-hidden sm:flex-row sm:items-end sm:justify-between">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="editorial font-display text-[clamp(2.8rem,7vw,6.5rem)]"
            >
              Selected
              <br />
              Projects
            </motion.h2>

            {/* Live counter — large screen */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hidden sm:flex flex-col items-end gap-0.5 pb-2"
              aria-live="polite"
              aria-label={`Project ${activeIndex + 1} of ${TOTAL}`}
            >
              <span className="font-display editorial text-[clamp(2rem,5vw,4rem)] text-primary leading-none">
                {pad(activeIndex + 1)}
              </span>
              <span className="h-px w-10 bg-border self-end" />
              <span className="font-mono text-sm text-muted-foreground">{pad(TOTAL)}</span>
            </motion.div>
          </div>
        </div>

        {/* ── Project panels ── */}
        <div className="flex flex-col">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.slug}
                ref={(el) => { panelRefs.current[index] = el; }}
                className={cn(
                  "relative flex min-h-[90vh] items-center border-t border-border/30 py-16 sm:py-20",
                  index === PROJECTS.length - 1 && "border-b border-border/30"
                )}
              >
                {/* Background watermark number */}
                <span
                  aria-hidden="true"
                  className="watermark-num absolute select-none text-[clamp(7rem,22vw,18rem)]"
                  style={{
                    right: isEven ? "auto" : "0",
                    left: isEven ? "0" : "auto",
                    top: "50%",
                    transform: "translateY(-50%)",
                    opacity: 0.6,
                  }}
                >
                  {pad(index + 1)}
                </span>

                {/* Two-column grid */}
                <div
                  className={cn(
                    "relative z-10 grid w-full gap-10 lg:grid-cols-[55%_45%] lg:gap-16 lg:items-center",
                    !isEven && "lg:grid-cols-[45%_55%]"
                  )}
                >
                  {/* Text column */}
                  <motion.div
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "flex flex-col gap-6",
                      !isEven && "lg:order-2"
                    )}
                  >
                    {/* Index + category */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs tracking-[0.2em] text-primary/60">
                        {pad(index + 1)} / {pad(TOTAL)}
                      </span>
                      {project.featured && (
                        <>
                          <span className="h-px w-4 bg-border" />
                          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                            Featured
                          </span>
                        </>
                      )}
                    </div>

                    {/* Project name */}
                    <h3 className="font-display text-[clamp(1.6rem,3.5vw,3rem)] font-bold tracking-tight leading-tight text-foreground">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-base leading-relaxed text-muted-foreground max-w-prose">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border/70 bg-background/50 px-3 py-1 font-mono text-[11px] text-foreground/75 transition-colors hover:border-primary/50 hover:text-primary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6 pt-1">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-hover
                          className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-75"
                        >
                          Live Demo
                          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-hover
                          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <GithubIcon className="size-3.5" />
                          Source
                        </a>
                      )}
                      {!project.liveUrl && !project.githubUrl && (
                        <span className="text-sm text-muted-foreground/50 italic">
                          Links coming soon
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {/* Image column */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 24 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "group overflow-hidden rounded-2xl border border-border/50",
                      !isEven && "lg:order-1"
                    )}
                    style={{ aspectRatio: "16/10" }}
                  >
                    {/* parallax-img wrapper — GSAP targets this for scrub y */}
                    <div className="parallax-img h-[120%] w-full" style={{ marginTop: "-10%" }}>
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
