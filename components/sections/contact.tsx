import { Mail, MessageCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";

const DIRECT_LINKS = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, icon: Mail },
  {
    label: "GitHub",
    value: "@ahmeraftab",
    href: SOCIAL_LINKS.find((s) => s.label === "GitHub")?.href ?? "#",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: "/in/ahmeraftab",
    href: SOCIAL_LINKS.find((s) => s.label === "LinkedIn")?.href ?? "#",
    icon: LinkedinIcon,
  },
  { label: "WhatsApp", value: "Message me", href: SITE.whatsapp, icon: MessageCircle },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="animate-blob absolute left-[10%] top-10 -z-10 size-72 rounded-full bg-brand-teal/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-blob absolute bottom-0 right-[8%] -z-10 size-80 rounded-full bg-brand-blue/20 blur-3xl [animation-delay:-6s]"
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="CONTACT"
          title="Let's build something worth shipping."
          description="Have a role, a product idea, or an AI feature that needs to actually work in production? I'd love to hear about it."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col gap-3">
              {DIRECT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-cursor-hover
                  className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-muted/20 p-5 transition-colors hover:border-primary/50"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                    <link.icon className="size-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm text-muted-foreground">{link.label}</span>
                    <span className="font-medium text-foreground">{link.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
