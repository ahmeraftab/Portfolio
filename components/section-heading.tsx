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
    <div className={cn("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
      <Reveal>
        <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
          <span className="h-px w-6 bg-primary shrink-0" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2
          className={cn(
            "font-display editorial text-[clamp(2.6rem,6vw,5.5rem)] text-balance",
            align === "center" && "mx-auto"
          )}
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
