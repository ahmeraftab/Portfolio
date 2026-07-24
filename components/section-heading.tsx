import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

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
        <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/40 px-3 py-1 font-mono text-xs tracking-wide text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className={cn("max-w-2xl text-base text-muted-foreground sm:text-lg", align === "center" && "mx-auto")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
