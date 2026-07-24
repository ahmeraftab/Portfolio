import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]", className)}>
      <div className="flex w-max animate-marquee gap-3 py-1">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center rounded-full border border-border/80 bg-muted/30 px-4 py-2 font-mono text-sm text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
