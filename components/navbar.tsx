"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "flex w-full max-w-5xl items-center justify-between rounded-full border border-transparent px-5 py-2.5 transition-all duration-300",
            scrolled && "glass border-border/60 shadow-[0_8px_32px_-16px_rgba(0,0,0,0.6)]"
          )}
        >
          {/* Logo */}
          <Link
            href="#top"
            className="font-display text-sm font-bold tracking-tight text-foreground"
            data-cursor-hover
          >
            AA<span className="text-primary">.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                data-cursor-hover
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden items-center gap-2 md:flex">
            <Button
              size="lg"
              nativeButton={false}
              className="h-9 rounded-full px-4 font-mono text-xs uppercase tracking-wider"
              render={<a href="#contact" data-cursor-hover />}
            >
              Let&apos;s Talk
              <ArrowUpRight className="size-3.5" />
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="flex size-9 items-center justify-center rounded-full border border-border/70 text-foreground transition-colors hover:border-primary/50"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-background/98 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="px-6 py-3 font-display text-4xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * NAV_LINKS.length + 0.1, duration: 0.5 }}
                className="mt-6 rounded-full bg-primary px-8 py-3 font-mono text-sm uppercase tracking-widest text-primary-foreground"
              >
                Let&apos;s Talk
              </motion.a>
            </div>
            <p className="pb-8 text-center font-mono text-xs text-muted-foreground">
              {SITE.location}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
