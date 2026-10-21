import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      <Reveal>
        <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
          <span className="h-px w-5 bg-primary shrink-0" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2
          className={cn(
            "font-display font-bold tracking-tight text-balance text-3xl sm:text-4xl md:text-5xl",
            align === "center" && "mx-auto"
          )}
          style={{ lineHeight: 1.12, letterSpacing: "-0.025em" }}
        >
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.14}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
