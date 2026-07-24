"use client";

import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="font-mono text-sm text-foreground">{SITE.name}</span>
          <span className="text-xs text-muted-foreground">© {year} · {SITE.location}</span>
        </div>

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map((link) => {
            const Icon = ICONS[link.icon as keyof typeof ICONS];
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                data-cursor-hover
                className="flex size-9 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            );
          })}

          <button
            type="button"
            aria-label="Back to top"
            data-cursor-hover
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex size-9 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
