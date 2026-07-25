// Core site identity. Update freely — everything here flows into metadata,
// the hero, the footer, and structured data.
export const SITE = {
  name: "Ahmer Aftab",
  role: "AI-Focused Full Stack Developer",
  taglines: [
    "AI-Focused Full Stack Developer",
    "Building AI Products That Ship",
    "RAG Pipelines. LLM Integrations. Real Products.",
  ],
  location: "Karachi, Pakistan",
  pitch:
    "I design and ship production AI products: multimodal RAG pipelines, LLM-powered chatbots, and agentic tools, all wrapped in full-stack web and mobile experiences that feel fast, considered, and built to last.",
  email: "ahmeraftab02@gmail.com",
  whatsapp: "https://wa.me/923150022499",
  resumeUrl: "/resume.pdf",
  url: "https://ahmeraftab.vercel.app",
} as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/ahmeraftab", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ahmer-aftab-945885115", icon: "linkedin" },
] as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

type Stat = {
  label: string;
  value: number;
  suffix: string;
  isText?: string;
};

export const STATS: Stat[] = [
  { label: "Projects Shipped", value: 7, suffix: "+" },
  { label: "Technologies", value: 30, suffix: "+" },
  { label: "Years Building", value: 1, suffix: "+" },
  { label: "Remote & On-site", value: 100, suffix: "%", isText: "Available" },
];
