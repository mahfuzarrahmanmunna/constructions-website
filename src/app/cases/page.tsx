import Image from "next/image";
import {
  ArrowRight,
  Construction,
  Mail,
  MessageCircle,
  PhoneCall,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BuildCarousel } from "@/components/build-carousel";
import { ProductPicker } from "@/components/product-picker";
import {
  casesProductOptions,
  casesStudies,
  casesFooterColumns,
  buildSlides,
} from "@/lib/case-data";
import { cn } from "@/lib/utils";

const primaryCase = casesStudies[0];
const secondaryCases = casesStudies.slice(1, 3);
const overlayCases = casesStudies.slice(3, 5);
const splitCase = casesStudies[5];
const wideCase = casesStudies[6];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-page)] text-[var(--color-ink)]">
      <HeroSection />
      <IntroSection />
      <CasesSection />
      <BuildSection />
      <SiteFooter />
      <FloatingContactRail />
    </main>
  );
}

function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[var(--hero-height)] overflow-hidden"
    >
      <Image
        src="/images/cases-photos/case-hero.webp"
        alt="CPL excavator working across a large earthmoving site"
        fill
        priority
        sizes="100vw"
        className="hero-media object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,34,83,0.78),rgba(0,34,83,0.28)_48%,rgba(0,34,83,0.68))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,139,40,0.22),transparent_34%)]" />

      <div className="container-shell relative flex min-h-[var(--hero-height)] items-center justify-center py-[var(--space-12)] text-center text-white">
        <div className="max-w-[var(--content-narrow)]">
          <Badge variant="warm" className="mb-[var(--space-5)] shadow-none">
            Field-proven projects
          </Badge>
          <h1 className="text-balance text-[clamp(2.5rem,7vw,5.8rem)] font-black leading-[0.92] tracking-[-0.06em]">
            Construction Cases
          </h1>
          <p className="mx-auto mt-[var(--space-5)] max-w-[44rem] text-pretty text-base font-semibold leading-7 text-white/86 md:text-lg">
            Explore demanding excavation, earthmoving, infrastructure,
            quarrying, and industrial projects powered by CPL equipment.
          </p>

          <ProductPicker />
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section
      id="cases"
      className="relative isolate overflow-hidden bg-white scroll-mt-24"
    >
      <div className="relative min-h-[var(--intro-height)]">
        <Image
          src="/images/cases-photos/case-dutch.webp"
          alt="Excavator loading a heavy truck inside a quarry"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/72" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.95)_78%)]" />
        <div className="container-shell relative flex min-h-[var(--intro-height)] items-end justify-center pb-[var(--space-12)] pt-[var(--space-16)]">
          <Card className="motion-card w-full max-w-[var(--content-card)] border-white/70 bg-white/88 text-center shadow-[var(--shadow-panel)] backdrop-blur-xl">
            <CardContent className="px-[var(--space-6)] py-[var(--space-10)] md:px-[var(--space-12)] md:py-[var(--space-14)]">
              <div className="mx-auto mb-[var(--space-6)] grid size-16 place-items-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-primary)] shadow-[var(--shadow-soft)]">
                <Construction className="size-7" />
              </div>
              <p className="text-sm font-black uppercase tracking-[0.26em] text-[var(--color-accent)]">
                Excavator
              </p>
              <h2 className="mx-auto mt-[var(--space-4)] max-w-[46rem] text-balance text-[clamp(2rem,5vw,4.25rem)] font-black leading-[0.98] tracking-[-0.055em] text-[var(--color-ink)]">
                Excavator Construction Cases
              </h2>
              <p className="mx-auto mt-[var(--space-5)] max-w-[42rem] text-pretty text-base font-bold leading-7 text-[var(--color-ink-soft)] md:text-lg">
                CPL excavators are designed for excavation and earthmoving
                across building construction, mining, forestry, agriculture, and
                heavy infrastructure applications.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <ProductSelector />
    </section>
  );
}

function ProductSelector() {
  return (
    <div className="border-y border-[var(--color-border)] bg-[var(--color-surface-alt)]">
      <div className="container-shell py-[var(--space-8)]">
        <p className="mb-[var(--space-4)] text-xs font-black uppercase tracking-[0.24em] text-[var(--color-muted)]">
          Please choose product
        </p>
        <div className="grid gap-[var(--space-3)] sm:grid-cols-2 lg:grid-cols-6">
          {casesProductOptions.map((option) => (
            <a
              href="#case-grid"
              key={option.label}
              className={cn(
                "rounded-[var(--radius-pill)] border px-[var(--space-4)] py-[var(--space-3)] text-center text-sm font-extrabold transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2",
                option.active
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[var(--shadow-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow-panel)]"
                  : "border-[var(--color-border)] bg-white text-[var(--color-ink-soft)] hover:-translate-y-1 hover:border-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:shadow-[var(--shadow-soft)]",
              )}
            >
              {option.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function CasesSection() {
  return (
    <section
      id="case-grid"
      className="bg-white py-[var(--space-12)] md:py-[var(--space-16)] scroll-mt-24"
    >
      <div className="container-shell">
        <CaseHeroCard />

        <div className="mt-[var(--space-4)] grid gap-[var(--space-4)] md:grid-cols-2">
          {secondaryCases.map((caseStudy) => (
            <CompactCaseCard key={caseStudy.title} caseStudy={caseStudy} />
          ))}
        </div>

        <div className="mt-[var(--space-4)] grid gap-[var(--space-4)] md:grid-cols-2">
          {overlayCases.map((caseStudy, index) => (
            <OverlayCaseCard
              key={caseStudy.title}
              caseStudy={caseStudy}
              accent={index === 0 ? "navy" : "blue"}
            />
          ))}
        </div>

        <SplitCaseCard />
        <WideCaseCard />

        <div className="mt-[var(--space-8)] flex justify-center">
          <Button variant="ghost" className="group">
            View All{" "}
            <ArrowRight className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function CaseHeroCard() {
  return (
    <article className="motion-card group relative min-h-[32rem] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)] md:min-h-[43rem]">
      <Image
        src={primaryCase.image}
        alt={`${primaryCase.title} case study`}
        fill
        sizes="(min-width: 1080px) 1180px, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055]"
        loading="eager"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,34,83,0.08),rgba(0,34,83,0.72))]" />
      <div className="motion-panel absolute bottom-[var(--space-8)] left-[var(--space-6)] z-[3] max-w-[36rem] rounded-[var(--radius-card-sm)] bg-[var(--color-primary-alpha)] p-[var(--space-6)] text-white shadow-[var(--shadow-panel)] backdrop-blur-md md:left-[var(--space-10)] md:p-[var(--space-8)]">
        <p className="mb-[var(--space-3)] text-xs font-black uppercase tracking-[0.26em] text-[var(--color-accent-light)]">
          Featured case
        </p>
        <h3 className="text-balance text-2xl font-black leading-tight tracking-[-0.035em] md:text-4xl">
          {primaryCase.title}
        </h3>
        <dl className="mt-[var(--space-4)] grid gap-[var(--space-2)] text-sm font-semibold text-white/86">
          <div>
            <dt className="inline text-white/58">Country: </dt>
            <dd className="inline">{primaryCase.country}</dd>
          </div>
          <div>
            <dt className="inline text-white/58">Name of the project: </dt>
            <dd className="inline">{primaryCase.project}</dd>
          </div>
          <div>
            <dt className="inline text-white/58">CPL equipment: </dt>
            <dd className="inline">{primaryCase.equipment}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

function CompactCaseCard({
  caseStudy,
}: {
  caseStudy: (typeof casesStudies)[number];
}) {
  return (
    <article className="motion-card group overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]">
      <div className="relative aspect-[1.55] overflow-hidden">
        <Image
          src={caseStudy.image}
          alt={`${caseStudy.title} case study`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          loading="eager"
        />
      </div>
      <div className="motion-panel relative z-[3] bg-white p-[var(--space-6)]">
        <h3 className="text-xl font-black tracking-[-0.03em] text-[var(--color-ink)]">
          {caseStudy.title}
        </h3>
        <CaseMeta caseStudy={caseStudy} />
      </div>
    </article>
  );
}

function OverlayCaseCard({
  caseStudy,
  accent,
}: {
  caseStudy: (typeof casesStudies)[number];
  accent: "navy" | "blue";
}) {
  return (
    <article className="motion-card group relative min-h-[26rem] overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)] transition-transform duration-500 ease-out hover:scale-[1.015]">
      <Image
        src={caseStudy.image}
        alt={`${caseStudy.title} case study`}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        loading="eager"
      />
      <div
        className={cn(
          "motion-panel absolute inset-x-0 bottom-0 z-[3] p-[var(--space-7)] text-white backdrop-blur-sm",
          accent === "navy"
            ? "bg-[var(--color-primary-alpha)]"
            : "bg-[var(--color-secondary-alpha)]",
        )}
      >
        <h3 className="text-2xl font-black tracking-[-0.04em]">
          {caseStudy.title}
        </h3>
        <CaseMeta caseStudy={caseStudy} invert />
      </div>
    </article>
  );
}

function SplitCaseCard() {
  return (
    <article className="motion-card group mt-[var(--space-4)] grid overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)] lg:grid-cols-[1.9fr_1fr]">
      <div className="relative min-h-[30rem] lg:min-h-[40rem]">
        <Image
          src={splitCase.image}
          alt={`${splitCase.title} case study`}
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          loading="eager"
        />
      </div>
      <div className="motion-panel relative z-[3] flex items-center bg-white p-[var(--space-7)] md:p-[var(--space-10)]">
        <div>
          <p className="mb-[var(--space-4)] text-sm font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
            Quarry operation
          </p>
          <h3 className="text-balance text-3xl font-black leading-tight tracking-[-0.045em] text-[var(--color-ink)] md:text-5xl">
            {splitCase.title}
          </h3>
          <CaseMeta caseStudy={splitCase} className="mt-[var(--space-5)]" />
        </div>
      </div>
    </article>
  );
}

function WideCaseCard() {
  return (
    <article className="motion-card group relative mt-[var(--space-4)] min-h-[32rem] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)] md:min-h-[38rem]">
      <Image
        src={wideCase.image}
        alt={`${wideCase.title} case study`}
        fill
        sizes="(min-width: 1080px) 1180px, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        loading="eager"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,34,83,0.04),rgba(0,34,83,0.38))]" />
      <div className="motion-panel absolute right-[var(--space-5)] top-[var(--space-5)] z-[3] max-w-[28rem] rounded-[var(--radius-card-sm)] bg-[var(--color-accent-alpha)] p-[var(--space-6)] text-white shadow-[var(--shadow-panel)] backdrop-blur-md md:right-[var(--space-10)] md:top-[var(--space-10)] md:p-[var(--space-8)]">
        <h3 className="text-2xl font-black tracking-[-0.04em] md:text-4xl">
          {wideCase.title}
        </h3>
        <CaseMeta caseStudy={wideCase} invert />
      </div>
    </article>
  );
}

function CaseMeta({
  caseStudy,
  invert = false,
  className,
}: {
  caseStudy: (typeof casesStudies)[number];
  invert?: boolean;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "mt-[var(--space-3)] grid gap-[var(--space-1)] text-sm font-semibold",
        invert ? "text-white/82" : "text-[var(--color-muted)]",
        className,
      )}
    >
      <div>
        <dt
          className={cn(
            "inline",
            invert ? "text-white/56" : "text-[var(--color-muted-2)]",
          )}
        >
          Country:{" "}
        </dt>
        <dd className="inline">{caseStudy.country}</dd>
      </div>
      <div>
        <dt
          className={cn(
            "inline",
            invert ? "text-white/56" : "text-[var(--color-muted-2)]",
          )}
        >
          CPL equipment:{" "}
        </dt>
        <dd className="inline">{caseStudy.equipment}</dd>
      </div>
    </dl>
  );
}

function BuildSection() {
  return (
    <section
      id="solutions"
      className="overflow-hidden bg-[var(--color-ink)] py-[var(--space-14)] text-white md:py-[var(--space-16)]"
    >
      <div className="container-shell">
        <BuildCarousel />
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer
      id="about"
      className="bg-[var(--color-footer)] py-[var(--space-12)] text-white"
    >
      <div className="container-shell">
        <div className="grid gap-[var(--space-8)] md:grid-cols-2 lg:grid-cols-[repeat(5,1fr)_1.35fr]">
          {casesFooterColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-[var(--space-4)] text-sm font-black text-white">
                {column.title}
              </h3>
              <ul className="space-y-[var(--space-2)] text-xs font-semibold leading-5 text-white/52">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      className="rounded-[var(--radius-focus)] transition-colors duration-200 ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      href="#top"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-[var(--space-4)] text-sm font-black text-white">
              Discover more here
            </h3>
            <div className="flex gap-[var(--space-3)]">
              {["f", "in", "▶", "ig"].map((item) => (
                <a
                  href="#top"
                  key={item}
                  className="grid size-9 place-items-center rounded-[var(--radius-focus)] border border-white/18 text-xs font-black text-white/78 transition-[background-color,color,border-color] duration-200 ease-out hover:border-white hover:bg-white hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label={`CPL social ${item}`}
                >
                  {item}
                </a>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-[var(--space-6)]">
              Service Network
            </Button>
          </div>
        </div>

        <div className="mt-[var(--space-10)] flex flex-col gap-[var(--space-4)] border-t border-white/12 pt-[var(--space-6)] text-xs font-semibold text-white/46 md:flex-row md:items-center md:justify-between">
          <p>© CPL 2026. Heavy equipment project cases.</p>
          <div className="flex gap-[var(--space-5)]">
            <a
              href="#top"
              className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Privacy
            </a>
            <a
              href="#top"
              className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Site Map
            </a>
            <a
              href="#top"
              className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Feedback
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingContactRail() {
  const items = [
    { label: "Inquiry", icon: PhoneCall, active: true },
    { label: "WhatsApp", icon: MessageCircle },
    { label: "Chat", icon: MessageCircle },
    { label: "E-mail", icon: Mail },
  ];

  return (
    <aside
      className="fixed right-[var(--space-4)] top-1/2 z-40 hidden -translate-y-1/2 overflow-hidden rounded-[var(--radius-card-sm)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-panel)] xl:block"
      aria-label="Quick contact"
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <a
            href="#top"
            key={item.label}
            className={cn(
              "flex w-20 flex-col items-center gap-[var(--space-1)] border-b border-[var(--color-border)] px-[var(--space-2)] py-[var(--space-3)] text-[0.68rem] font-bold transition-[background-color,color] duration-200 ease-out last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]",
              item.active
                ? "bg-[var(--color-accent)] text-white"
                : "text-[var(--color-muted)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-primary)]",
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </a>
        );
      })}
    </aside>
  );
}
