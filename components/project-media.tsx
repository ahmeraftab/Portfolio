import Image from "next/image";
import type { Project } from "@/lib/data";

function hostnameOf(url?: string) {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

/**
 * Renders a project's screenshot in one of two frames:
 * - "app": a browser-chrome mockup (traffic-light dots + real URL when known)
 * - "diagram": a light, padded card that suits architecture/workflow diagrams
 */
export function ProjectMedia({ project }: { project: Project }) {
  if (!project.image) return null;

  if (project.imageKind === "diagram") {
    return (
      <div className="h-full w-full bg-[linear-gradient(160deg,color-mix(in_oklch,var(--brand-teal),transparent_88%),color-mix(in_oklch,var(--brand-blue),transparent_92%))] p-5">
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-white shadow-[0_1px_0_rgba(255,255,255,0.6)_inset]">
          <Image
            src={project.image}
            alt={`${project.name} architecture diagram`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </div>
    );
  }

  const url = hostnameOf(project.liveUrl);

  return (
    <div className="flex h-full w-full flex-col bg-[#0d1117]">
      <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-[#161b22] px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        {url && (
          <span className="truncate rounded-full bg-white/[0.06] px-3 py-0.5 font-mono text-[11px] text-white/50">
            {url}
          </span>
        )}
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>
    </div>
  );
}
