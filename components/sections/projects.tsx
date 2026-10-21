"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ProjectMedia } from "@/components/project-media";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import { PROJECTS } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="FEATURED WORK"
          title="Selected projects"
          description="A mix of production AI products and full-stack builds. Live links and source where available."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
          className="mt-16 grid gap-6 sm:grid-cols-2"
        >
          {PROJECTS.map((project) => (
            <Reveal key={project.slug} className="group h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-muted/20 transition-colors hover:border-primary/40">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <ProjectMedia project={project} />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="font-mono text-[11px] font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-4 pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
                      >
                        Live Demo <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <GithubIcon className="size-3.5" /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
