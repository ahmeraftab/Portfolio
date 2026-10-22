"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A still portrait given cinematic life: it tilts in 3D toward the cursor,
 * breathes with a slow idle float, carries a teal duotone grade, a periodic
 * light sweep, film grain, and a spotlight halo behind it.
 */
export function CinematicPortrait({
  src,
  alt,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  // Pointer position, normalised to [-0.5, 0.5]
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), {
    stiffness: 150,
    damping: 18,
  });
  // Parallax of the inner image for depth
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 150,
    damping: 20,
  });
  const ty = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), {
    stiffness: 150,
    damping: 20,
  });

  function handleMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className={cn("relative", className)} style={{ perspective: 1100 }}>
      {/* Spotlight halo behind the portrait — tight, faint, diffuse */}
      <div
        aria-hidden="true"
        className="spotlight pointer-events-none absolute -inset-6 -z-10 opacity-60 blur-[60px]"
      />

      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div className="animate-floaty">
          <div className="group relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-muted/20 shadow-[0_30px_80px_-40px_color-mix(in_oklch,var(--brand-teal),transparent_55%)]">
            {/* The photo with duotone grade + cursor parallax */}
            <motion.div
              style={{ x: tx, y: ty, scale: 1.08 }}
              className="relative aspect-[4/5] w-full"
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 460px, 85vw"
                priority={priority}
                className="duotone object-cover object-top"
              />
              {/* Teal/blue grade wash */}
              <div
                aria-hidden="true"
                className="absolute inset-0 mix-blend-color opacity-40"
                style={{
                  background:
                    "linear-gradient(150deg, color-mix(in oklch, var(--brand-teal), transparent 55%), transparent 45%, color-mix(in oklch, var(--brand-blue), transparent 60%))",
                }}
              />
              {/* Bottom fade into the dark UI */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/3"
                style={{
                  background:
                    "linear-gradient(to top, color-mix(in oklch, var(--background), transparent 10%), transparent)",
                }}
              />
            </motion.div>

            {/* Light sweep */}
            <span aria-hidden="true" className="light-sweep" />

            {/* Grain */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            {/* Inner ring highlight */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
