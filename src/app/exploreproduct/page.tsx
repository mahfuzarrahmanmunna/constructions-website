import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  HardHat,
  MapPin,
  ShieldCheck,
  Timer,
  UserCheck,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import SectionNav from "./SectionNav";

type ProjectCase = {
  name: string;
  location: string;
  image: string;
  description: string;
  metrics: {
    duration: string;
    area: string;
  };
  highlights: string[];
};

type Expertise = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const projectCases: ProjectCase[] = [
  {
    name: "Marina Bay Commercial Complex",
    location: "Dubai, UAE",
    image: "/images/works-urban.png",
    description:
      "A mixed-use development featuring high-rise towers and retail podiums, utilizing our fleet of tower cranes and hoisting machinery.",
    metrics: {
      duration: "24 Months",
      area: "120,000 m²",
    },
    highlights: [
      "Zero-accident safety record",
      "On-time concrete delivery",
      "Complex steel erection",
    ],
  },
  {
    name: "National Highway Expansion",
    location: "Jakarta, Indonesia",
    image: "/images/works-infra.png",
    description:
      "Large-scale civil engineering project for road widening and bridge construction, deployed with earthmoving and mobile cranes.",
    metrics: {
      duration: "36 Months",
      area: "85 km",
    },
    highlights: [
      "Rough terrain mobility",
      "High-volume earthmoving",
      "Sustainable drainage systems",
    ],
  },
  {
    name: "Solar Field Installation",
    location: "Riyadh, Saudi Arabia",
    image: "/images/works-energy.png",
    description:
      "Renewable energy project requiring precise placement of solar panels using MEWPs and compact machinery for rough terrain.",
    metrics: {
      duration: "14 Months",
      area: "50 Hectares",
    },
    highlights: [
      "Electric drive efficiency",
      "Desert environment durability",
      "Modular assembly",
    ],
  },
  {
    name: "Deep Water Port Logistics",
    location: "Ho Chi Minh City, Vietnam",
    image: "/images/works-port.png",
    description:
      "Port construction involving heavy piling work and warehousing structures, supported by heavy-duty crawler cranes.",
    metrics: {
      duration: "18 Months",
      area: "40,000 m²",
    },
    highlights: [
      "Heavy lift logistics",
      "Corrosion resistant specs",
      "24/7 operation cycles",
    ],
  },
  {
    name: "Urban Metro Rail System",
    location: "Bangkok, Thailand",
    image: "/images/works-metro.png",
    description:
      "Underground station excavation and structural support using specialized concrete machinery and hoists.",
    metrics: {
      duration: "48 Months",
      area: "15 Stations",
    },
    highlights: [
      "Confined space expertise",
      "Low-noise concrete pumps",
      "High-precision hoisting",
    ],
  },
  {
    name: "Luxury Residential Estate",
    location: "Moscow, Russia",
    image: "/images/works-residential.png",
    description:
      "Gated community development with landscaping and villa construction, managed with a fleet of compact loaders.",
    metrics: {
      duration: "20 Months",
      area: "35,000 m²",
    },
    highlights: [
      "Minimal site disturbance",
      "Rapid deployment",
      "Winter operation capability",
    ],
  },
];

const expertise: Expertise[] = [
  {
    title: "Global Execution",
    description:
      "Proven track record delivering complex projects across diverse terrains and regulatory environments in 5 key regions.",
    icon: MapPin,
  },
  {
    title: "Safety First Culture",
    description:
      "Rigorous training programs and ISO-certified safety protocols ensure crew welfare and project continuity.",
    icon: HardHat,
  },
  {
    title: "Precision Logistics",
    description:
      "Advanced planning for equipment transport, site setup, and parts supply to minimize downtime.",
    icon: Timer,
  },
  {
    title: "Technical Support",
    description:
      "On-site engineering support and fleet monitoring to optimize machine performance and fuel efficiency.",
    icon: Zap,
  },
];

const comparisonRows = [
  {
    label: "Project Scale",
    residential: "Single unit to Estate",
    commercial: "Office to Mixed-use",
    industrial: "Plant to Infrastructure",
  },
  {
    label: "Machinery Focus",
    residential: "Compact, low-noise",
    commercial: "High-reach, MEWPs",
    industrial: "Heavy-duty, high-cycle",
  },
  {
    label: "Timeline Sensitivity",
    residential: "Seasonal, occupancy",
    commercial: "Strict handover dates",
    industrial: "Continuous operation",
  },
  {
    label: "Key Challenge",
    residential: "Site access & neighborhood",
    commercial: "Urban logistics",
    industrial: "Harsh environments",
  },
];

const galleryItems = [
  {
    image: "/images/gallery-crane.png",
    title: "Heavy Lifting Operations",
    description:
      "Crawler cranes in action during the structural phase of a major industrial plant.",
  },
  {
    image: "/images/gallery-concrete.png",
    title: "Concrete Pouring",
    description:
      "High-capacity pumps ensuring continuous supply for high-rise foundation work.",
  },
  {
    image: "/images/gallery-team.png",
    title: "Site Management",
    description:
      "Expert site engineers coordinating logistics for a complex infrastructure project.",
  },
];

const inputClass =
  "min-h-12 w-full border border-white/20 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/60 focus:border-primary-light focus:bg-white/20";

export default function OurWorksPage() {
  return (
    <main className="min-h-screen bg-white text-secondary">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-secondary pt-8 text-white md:pt-16">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/image3.png" // Reusing hero image or replace with specific construction hero
            alt="Construction Site"
            fill
            preload
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,34,83,0.96)_0%,rgba(0,34,83,0.72)_48%,rgba(0,34,83,0.38)_100%)]" />
        </div>

        <div className="mx-auto flex min-h-[620px] w-full max-w-7xl items-center px-6 pb-8 md:min-h-[680px] md:px-12 md:pb-16 lg:px-20">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-primary-light">
              CPL Construction Cases
            </p>
            <h1 className="text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Building the future with precision and power.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:mt-6 md:text-xl md:leading-8">
              Explore our portfolio of completed projects across infrastructure,
              commercial, and energy sectors. See how our machinery fleet
              delivers results in demanding environments.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 md:mt-9">
              <a
                href="#projects"
                className="inline-flex min-h-12 items-center gap-2 bg-primary px-4 text-sm font-bold text-white shadow-[0_10px_28px_rgba(229,85,3,0.32)] transition hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-secondary sm:px-6"
              >
                View Projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center gap-2 border border-white/25 bg-white/10 px-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-secondary sm:px-6"
              >
                Start Your Project
                <HardHat className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <dl className="mt-9 grid max-w-2xl grid-cols-3 gap-3 border-y border-white/20 py-5 md:mt-12 md:gap-4 md:py-6">
              {[
                ["150+", "Projects Completed"],
                ["5", "Countries Active"],
                ["10+", "Years Experience"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-2xl font-bold text-white md:text-3xl">
                    {value}
                  </dt>
                  <dd className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60 md:text-xs">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <SectionNav />

      {/* Projects Grid Section */}
      <section
        id="projects"
        className="scroll-mt-20 bg-white py-20 md:scroll-mt-24 md:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
          <div className="grid gap-10 lg:grid-cols-[0.74fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                Featured Projects
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-secondary md:text-5xl">
                Proven success across diverse sectors.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-secondary-light md:text-lg">
              From urban high-rises to remote infrastructure, our fleet adapts
              to the specific demands of every site. Explore how we match
              equipment to engineering challenges.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projectCases.map((project) => (
              <article
                key={project.name}
                className="group border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary-light hover:shadow-[0_18px_46px_rgba(15,23,42,0.12)]"
              >
                <div className="flex min-h-[170px] items-center justify-center bg-slate-50 p-4">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={420}
                    height={240}
                    sizes="(min-width: 1280px) 29vw, (min-width: 768px) 45vw, 90vw"
                    className="h-20 w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold text-secondary">
                      {project.name}
                    </h3>
                    <MapPin className="mt-1 h-4 w-4 flex-none text-secondary-light" />
                  </div>
                  <p className="text-sm text-secondary-light">
                    {project.location}
                  </p>
                  <p className="mt-3 min-h-[3rem] text-sm leading-6 text-secondary-light">
                    {project.description}
                  </p>
                </div>
                <dl className="mt-5 grid grid-cols-2 border-y border-slate-200 py-4 text-sm">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-secondary-light">
                      Duration
                    </dt>
                    <dd className="mt-1 font-bold text-secondary">
                      {project.metrics.duration}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-secondary-light">
                      Scale
                    </dt>
                    <dd className="mt-1 font-bold text-secondary">
                      {project.metrics.area}
                    </dd>
                  </div>
                </dl>
                <ul className="mt-5 space-y-3">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-6 text-secondary"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 flex-none text-primary"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise/Features Section */}
      <section
        id="expertise"
        className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-20 md:scroll-mt-24 md:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
              Why CPL
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-secondary md:text-5xl">
              Expertise that drives every project forward.
            </h2>
            <p className="mt-5 text-base leading-7 text-secondary-light md:text-lg">
              We don't just supply machinery; we provide operational excellence.
              Our teams integrate with your engineering workflows to guarantee
              safety and efficiency.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {expertise.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center bg-secondary text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-secondary-light">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section
        id="scope"
        className="scroll-mt-20 bg-white py-20 md:scroll-mt-24 md:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
              Sector Capabilities
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-secondary md:text-5xl">
              Adapting fleet strategies by sector.
            </h2>
            <p className="mt-5 text-base leading-7 text-secondary-light md:text-lg">
              Different project types demand different equipment configurations.
              Here is how we approach residential, commercial, and industrial
              builds.
            </p>
          </div>

          <div className="mt-12 overflow-hidden border border-slate-200 bg-white">
            <div className="grid bg-secondary text-sm font-bold uppercase tracking-[0.16em] text-white md:grid-cols-[0.7fr_1fr_1fr_1fr]">
              <div className="border-b border-white/20 px-5 py-4 md:border-b-0 md:border-r">
                Factor
              </div>
              <div className="border-b border-white/20 px-5 py-4 md:border-b-0 md:border-r">
                Residential
              </div>
              <div className="border-b border-white/20 px-5 py-4 md:border-b-0 md:border-r">
                Commercial
              </div>
              <div className="px-5 py-4">Industrial</div>
            </div>

            {comparisonRows.map((row, index) => (
              <div
                key={row.label}
                className={[
                  "grid border-t border-slate-200 text-sm leading-6 text-secondary-light md:grid-cols-[0.7fr_1fr_1fr_1fr]",
                  index % 2 === 0 ? "bg-white" : "bg-slate-50",
                ].join(" ")}
              >
                <div className="bg-secondary/5 px-5 py-5 font-bold text-secondary md:border-r md:border-slate-200">
                  {row.label}
                </div>
                <div className="border-t border-slate-200 px-5 py-5 md:border-r md:border-t-0 md:border-slate-200">
                  {row.residential}
                </div>
                <div className="border-t border-slate-200 px-5 py-5 md:border-r md:border-t-0 md:border-slate-200">
                  {row.commercial}
                </div>
                <div className="border-t border-slate-200 px-5 py-5 md:border-t-0">
                  {row.industrial}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="scroll-mt-20 bg-slate-50 py-20 md:scroll-mt-24 md:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
          <div className="grid gap-10 lg:grid-cols-[0.74fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                Site Gallery
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-secondary md:text-5xl">
                Machines in their element.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-secondary-light md:text-lg">
              A visual tour of our active sites and completed milestones. See
              the power of our fleet up close.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden bg-secondary text-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, 90vw"
                    className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,34,83,0)_36%,rgba(0,34,83,0.78)_100%)]" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact"
        className="scroll-mt-20 bg-secondary py-20 text-white md:scroll-mt-24 md:py-24"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 md:px-12 lg:grid-cols-[0.86fr_1fr] lg:px-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-light">
              Start Your Project
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Ready to build? Let's discuss the machinery.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/70 md:text-lg">
              Tell us about your upcoming project, timeline, and site
              conditions. Our team will recommend the optimal fleet
              configuration for your needs.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <a
                href="tel:+80096665466"
                className="flex min-h-20 items-center gap-4 border border-white/20 bg-white/10 p-4 transition hover:bg-white/20"
              >
                <UserCheck
                  className="h-5 w-5 flex-none text-primary-light"
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/50">
                    Project Hotline
                  </span>
                  <span className="mt-1 block font-bold text-white">
                    800-9666-5466
                  </span>
                </span>
              </a>
              <a
                href="mailto:projects@example.com"
                className="flex min-h-20 items-center gap-4 border border-white/20 bg-white/10 p-4 transition hover:bg-white/20"
              >
                <ClipboardCheck
                  className="h-5 w-5 flex-none text-primary-light"
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/50">
                    Email Projects
                  </span>
                  <span className="mt-1 block font-bold text-white">
                    projects@example.com
                  </span>
                </span>
              </a>
            </div>
          </div>

          <form className="grid gap-4 border border-white/20 bg-white/10 p-5 md:grid-cols-2 md:p-8">
            <label className="grid gap-2 text-sm font-bold text-white/80">
              Name
              <input
                className={inputClass}
                name="name"
                placeholder="Project manager name"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-white/80">
              Company
              <input
                className={inputClass}
                name="company"
                placeholder="Construction firm"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-white/80">
              Email
              <input
                className={inputClass}
                name="email"
                type="email"
                placeholder="name@company.com"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-white/80">
              Project Type
              <select className={inputClass} name="type">
                <option value="residential" className="text-secondary">
                  Residential
                </option>
                <option value="commercial" className="text-secondary">
                  Commercial
                </option>
                <option value="industrial" className="text-secondary">
                  Industrial
                </option>
                <option value="infrastructure" className="text-secondary">
                  Infrastructure
                </option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-white/80 md:col-span-2">
              Project Details
              <textarea
                className={`${inputClass} min-h-32 resize-y py-3`}
                name="details"
                placeholder="Location, timeline, equipment requirements..."
              />
            </label>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-6 text-sm font-bold text-white transition hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-secondary md:col-span-2"
            >
              Submit Inquiry
              <Zap className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
