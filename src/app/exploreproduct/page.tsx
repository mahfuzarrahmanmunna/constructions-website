import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  FileText,
  Gauge,
  Mail,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import SectionNav from "./SectionNav";

type ProductFamily = {
  name: string;
  image: string;
  description: string;
  metrics: {
    power: string;
    use: string;
  };
  highlights: string[];
};

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const productFamilies: ProductFamily[] = [
  {
    name: "Earthmoving Machinery",
    image: "/images/Nav-Photos/p1.png",
    description:
      "Excavators, loaders, and site-prep machines built for high-output ground work.",
    metrics: {
      power: "74-298 kW",
      use: "Digging and loading",
    },
    highlights: [
      "High-flow hydraulic systems",
      "Reinforced frames for rough sites",
      "Cabins designed for long shifts",
    ],
  },
  {
    name: "MEWPs",
    image: "/images/Nav-Photos/p2.png",
    description:
      "Mobile elevated work platforms for maintenance, steel work, and facade access.",
    metrics: {
      power: "6-48 m",
      use: "Access and lift",
    },
    highlights: [
      "Stable electric drive options",
      "Compact turning radius",
      "Platform controls with smooth response",
    ],
  },
  {
    name: "Mobile Crane Machinery",
    image: "/images/Nav-Photos/p3.png",
    description:
      "Road-ready cranes for structural lifts, logistics yards, and heavy installation.",
    metrics: {
      power: "25-220 t",
      use: "Heavy lifting",
    },
    highlights: [
      "Load moment protection",
      "Fast setup outriggers",
      "Telescopic boom configurations",
    ],
  },
  {
    name: "Construction Hoisting Machinery",
    image: "/images/Nav-Photos/p4.png",
    description:
      "Tower cranes and hoists that keep vertical projects supplied and moving.",
    metrics: {
      power: "1-25 t",
      use: "Vertical transport",
    },
    highlights: [
      "Precise hoisting control",
      "Modular mast sections",
      "Operator visibility packages",
    ],
  },
  {
    name: "Concrete Machinery",
    image: "/images/Nav-Photos/p5.png",
    description:
      "Batching, pumping, and placing equipment for reliable concrete delivery.",
    metrics: {
      power: "50-180 m3/h",
      use: "Concrete placement",
    },
    highlights: [
      "Steady pump pressure",
      "Wear-resistant delivery parts",
      "Easy access maintenance points",
    ],
  },
  {
    name: "Agricultural Machinery",
    image: "/images/Nav-Photos/p6.png",
    description:
      "Field machinery for land preparation, harvesting, transport, and support work.",
    metrics: {
      power: "70-240 hp",
      use: "Field operations",
    },
    highlights: [
      "Efficient drivetrain mapping",
      "Comfort-focused operator cabins",
      "Attachment-ready platforms",
    ],
  },
];

const features: Feature[] = [
  {
    title: "Matched To Site Conditions",
    description:
      "Shortlist equipment by lift height, cycle load, terrain, transport limits, and operating window.",
    icon: ClipboardCheck,
  },
  {
    title: "Durable Power Systems",
    description:
      "Select hydraulic, electric, or diesel platforms with the reserve capacity your crews need.",
    icon: Gauge,
  },
  {
    title: "Fleet Support Ready",
    description:
      "Maintenance access, parts planning, operator training, and commissioning are considered from day one.",
    icon: Wrench,
  },
  {
    title: "Safer Daily Operation",
    description:
      "Built-in protection systems and visibility details help crews work with control in demanding environments.",
    icon: ShieldCheck,
  },
];

const comparisonRows = [
  {
    label: "Primary role",
    compact: "Targeted daily site work",
    heavyDuty: "Long-cycle, high-load production",
  },
  {
    label: "Best fit",
    compact: "Urban projects, rental fleets, restricted access",
    heavyDuty: "Infrastructure, industrial yards, large civil sites",
  },
  {
    label: "Planning focus",
    compact: "Maneuverability, transport, fast deployment",
    heavyDuty: "Capacity, uptime, attachments, fuel strategy",
  },
  {
    label: "Support package",
    compact: "Operator onboarding and routine service kits",
    heavyDuty: "Preventive service plans and parts forecasting",
  },
];

const galleryItems = [
  {
    image: "/images/image1.png",
    title: "Urban Build Support",
    description:
      "Equipment packages for high-rise sites, access routes, and staged material movement.",
  },
  {
    image: "/images/image2.png",
    title: "Renovation And Retrofit",
    description:
      "Compact lifting, access, and concrete solutions for active properties.",
  },
  {
    image: "/images/image3.png",
    title: "Infrastructure Delivery",
    description:
      "Heavy-duty fleets for bridges, highways, utilities, and industrial construction.",
  },
];

const inputClass =
  "min-h-12 w-full border border-white/20 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/60 focus:border-primary-light focus:bg-white/20";

export default function ExploreProductPage() {
  return (
    <main className="min-h-screen bg-white text-secondary">
      <section className="relative isolate overflow-hidden bg-secondary pt-8 text-white md:pt-16">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/image3.png"
            alt=""
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
              Zoomlion Product Fleet
            </p>
            <h1 className="text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Explore machinery for every build stage.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:mt-6 md:text-xl md:leading-8">
              Compare construction equipment by job type, capacity, site access,
              and support needs before you commit a machine to the project.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 md:mt-9">
              <a
                href="#features"
                className="inline-flex min-h-12 items-center gap-2 bg-primary px-4 text-sm font-bold text-white shadow-[0_10px_28px_rgba(229,85,3,0.32)] transition hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-secondary sm:px-6"
              >
                View Equipment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#quote"
                className="inline-flex min-h-12 items-center gap-2 border border-white/25 bg-white/10 px-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-secondary sm:px-6"
              >
                Request Quote
                <FileText className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <dl className="mt-9 grid max-w-2xl grid-cols-3 gap-3 border-y border-white/20 py-5 md:mt-12 md:gap-4 md:py-6">
              {[
                ["6", "Product families"],
                ["24/7", "Service planning"],
                ["3", "Project scopes"],
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

      <section
        id="features"
        className="scroll-mt-20 bg-white py-20 md:scroll-mt-24 md:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
          <div className="grid gap-10 lg:grid-cols-[0.74fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                Product Families
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-secondary md:text-5xl">
                Choose by task, terrain, and capacity.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-secondary-light md:text-lg">
              Each category is organized around practical project decisions: how
              the machine moves, what it lifts or places, how quickly it
              deploys, and what kind of service package keeps it productive.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {productFamilies.map((product) => (
              <article
                key={product.name}
                className="group border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary-light hover:shadow-[0_18px_46px_rgba(15,23,42,0.12)]"
              >
                <div className="flex min-h-[170px] items-center justify-center bg-slate-50 p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={420}
                    height={240}
                    sizes="(min-width: 1280px) 29vw, (min-width: 768px) 45vw, 90vw"
                    className="h-20 w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-bold text-secondary">
                    {product.name}
                  </h3>
                  <p className="mt-3 min-h-16 text-sm leading-6 text-secondary-light">
                    {product.description}
                  </p>
                </div>
                <dl className="mt-5 grid grid-cols-2 border-y border-slate-200 py-4 text-sm">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-secondary-light">
                      Range
                    </dt>
                    <dd className="mt-1 font-bold text-secondary">
                      {product.metrics.power}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-secondary-light">
                      Use
                    </dt>
                    <dd className="mt-1 font-bold text-secondary">
                      {product.metrics.use}
                    </dd>
                  </div>
                </dl>
                <ul className="mt-5 space-y-3">
                  {product.highlights.map((highlight) => (
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

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center bg-secondary text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-secondary-light">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="compare"
        className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-20 md:scroll-mt-24 md:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
              Scope And Compare
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-secondary md:text-5xl">
              Match the machine class to the work package.
            </h2>
            <p className="mt-5 text-base leading-7 text-secondary-light md:text-lg">
              A productive fleet is not just bigger. It is sized correctly for
              access, duty cycle, crew capability, and the cost of idle time.
            </p>
          </div>

          <div className="mt-12 overflow-hidden border border-slate-200 bg-white">
            <div className="grid bg-secondary text-sm font-bold uppercase tracking-[0.16em] text-white md:grid-cols-[0.7fr_1fr_1fr]">
              <div className="border-b border-white/20 px-5 py-4 md:border-b-0 md:border-r">
                Factor
              </div>
              <div className="border-b border-white/20 px-5 py-4 md:border-b-0 md:border-r">
                Compact Fleet
              </div>
              <div className="px-5 py-4">Heavy-Duty Fleet</div>
            </div>

            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid border-t border-slate-200 text-sm leading-6 text-secondary-light md:grid-cols-[0.7fr_1fr_1fr]"
              >
                <div className="bg-secondary/5 px-5 py-5 font-bold text-secondary md:border-r md:border-slate-200">
                  {row.label}
                </div>
                <div className="border-t border-slate-200 px-5 py-5 md:border-r md:border-t-0 md:border-slate-200">
                  {row.compact}
                </div>
                <div className="border-t border-slate-200 px-5 py-5 md:border-t-0">
                  {row.heavyDuty}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="gallery"
        className="scroll-mt-20 bg-white py-20 md:scroll-mt-24 md:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
          <div className="grid gap-10 lg:grid-cols-[0.74fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                Gallery
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-secondary md:text-5xl">
                See where each fleet earns its place.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-secondary-light md:text-lg">
              Product selection changes from dense city construction to
              industrial work. Start with the project setting, then narrow the
              configuration around production targets.
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

      <section
        id="quote"
        className="scroll-mt-20 bg-secondary py-20 text-white md:scroll-mt-24 md:py-24"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 md:px-12 lg:grid-cols-[0.86fr_1fr] lg:px-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-light">
              Request A Quote
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Send the scope. Get a fleet recommendation.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/70 md:text-lg">
              Share the project type, target date, lift or production range, and
              jobsite constraints. The team can prepare a practical equipment
              shortlist for your review.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <a
                href="tel:+80096665466"
                className="flex min-h-20 items-center gap-4 border border-white/20 bg-white/10 p-4 transition hover:bg-white/20"
              >
                <Phone
                  className="h-5 w-5 flex-none text-primary-light"
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/50">
                    Hotline
                  </span>
                  <span className="mt-1 block font-bold text-white">
                    800-9666-5466
                  </span>
                </span>
              </a>
              <a
                href="mailto:sales@example.com"
                className="flex min-h-20 items-center gap-4 border border-white/20 bg-white/10 p-4 transition hover:bg-white/20"
              >
                <Mail
                  className="h-5 w-5 flex-none text-primary-light"
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/50">
                    Email
                  </span>
                  <span className="mt-1 block font-bold text-white">
                    sales@example.com
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
                placeholder="Project contact"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-white/80">
              Company
              <input
                className={inputClass}
                name="company"
                placeholder="Company name"
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
              Product Family
              <select className={inputClass} name="product">
                {productFamilies.map((product) => (
                  <option
                    key={product.name}
                    value={product.name}
                    className="text-secondary"
                  >
                    {product.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-white/80 md:col-span-2">
              Project Details
              <textarea
                className={`${inputClass} min-h-32 resize-y py-3`}
                name="details"
                placeholder="Capacity, location, timeline, and site constraints"
              />
            </label>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-6 text-sm font-bold text-white transition hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-secondary md:col-span-2"
            >
              Send Request
              <Factory className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
