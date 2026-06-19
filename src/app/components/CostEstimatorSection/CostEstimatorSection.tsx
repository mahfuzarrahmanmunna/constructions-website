"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import {
  Home,
  Ruler,
  Layers,
  MapPin,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Shield,
  Wrench,
  Calculator,
} from "lucide-react";

export default function CostEstimatorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const inputsRef = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    type: "",
    size: "",
    floors: "",
    location: "",
  });
  const [focused, setFocused] = useState("");

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Timeline
      const tl = gsap.timeline();

      tl.from(".estimator-wrapper", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".form-card",
          {
            scale: 0.95,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          "-=0.6",
        )
        .from(
          ".bento-item",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .from(
          ".input-anim",
          {
            x: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.6",
        );

      // Simulate Live Counter Animation on Right Side
      // Fixed: Iterate manually to handle individual delays and avoid 'i is not defined'
      counterRef.current.forEach((ref) => {
        if (ref) {
          gsap.to(ref, {
            innerText: () => Math.floor(Math.random() * (300 - 250) + 250),
            duration: 2,
            snap: { innerText: 1 },
            repeat: -1,
            yoyo: true,
            ease: "none",
            delay: Math.random() * 1, // Random delay for natural feel
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleFocus = (field: string) => setFocused(field);
  const handleBlur = () => setFocused("");

  return (
    <section
      ref={sectionRef}
      className="estimator-wrapper relative bg-[#0B1120] text-white overflow-hidden font-sans"
    >
      {/* Abstract Background Mesh */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary rounded-full blur-[100px] mix-blend-screen opacity-60" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto min-h-[850px] py-12 px-6 lg:px-12 flex flex-col justify-center">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                CPL Engine v2.0
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
              Intelligent Cost Estimation
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-slate-400 text-sm">
              Powered by Global Market Data
            </p>
            <div className="flex items-center gap-2 justify-end mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-green-400">LIVE</span>
            </div>
          </div>
        </div>

        {/* SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          {/* LEFT COLUMN: The Form (Sticky/Centered) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div
              ref={formRef}
              className="form-card relative bg-[#151F32] border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl backdrop-blur-xl overflow-hidden"
            >
              {/* Top Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />

              <div className="relative z-10 space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    Configure Project
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Input your parameters to generate a comprehensive bill of
                    materials and labor estimate.
                  </p>
                </div>

                <form
                  className="space-y-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {/* Input Component Helper */}
                  {[
                    {
                      id: "type",
                      label: "Project Category",
                      icon: Home,
                      type: "select",
                      options: ["Residential", "Commercial", "Industrial"],
                    },
                    {
                      id: "size",
                      label: "Total Area (sq.ft)",
                      icon: Ruler,
                      type: "number",
                      placeholder: "0",
                    },
                    {
                      id: "floors",
                      label: "Total Floors",
                      icon: Layers,
                      type: "number",
                      placeholder: "0",
                    },
                    {
                      id: "location",
                      label: "Project Location",
                      icon: MapPin,
                      type: "text",
                      placeholder: "City, Region",
                    },
                  ].map((field, index) => (
                    <div
                      key={field.id}
                      ref={(el) => {
                        inputsRef.current[index] = el;
                      }}
                      className="input-anim relative group"
                    >
                      <label
                        className={`absolute left-12 transition-all duration-300 pointer-events-none text-sm ${
                          focused === field.id ||
                          formData[field.id as keyof typeof formData]
                            ? "-top-3 left-10 text-xs text-primary bg-[#151F32] px-1"
                            : "top-4 text-slate-500"
                        }`}
                      >
                        {field.label}
                      </label>

                      <div className="relative">
                        {field.type === "select" ? (
                          <select
                            className="w-full appearance-none bg-[#0B1120] border border-white/10 rounded-2xl py-4 pl-12 pr-10 text-white focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(229,85,3,0.1)] transition-all font-medium"
                            onFocus={() => handleFocus(field.id)}
                            onBlur={handleBlur}
                            value={formData[field.id as keyof typeof formData]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [field.id]: e.target.value,
                              })
                            }
                          >
                            <option value="" className="bg-[#151F32]" disabled>
                              Select Type
                            </option>
                            {field.options?.map((opt) => (
                              <option
                                key={opt}
                                value={opt.toLowerCase()}
                                className="bg-[#151F32]"
                              >
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            className="w-full bg-[#0B1120] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(229,85,3,0.1)] transition-all font-medium placeholder:text-slate-700"
                            onFocus={() => handleFocus(field.id)}
                            onBlur={handleBlur}
                            value={formData[field.id as keyof typeof formData]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [field.id]: e.target.value,
                              })
                            }
                          />
                        )}

                        <field.icon
                          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                            focused === field.id
                              ? "text-primary scale-110"
                              : "text-slate-600"
                          }`}
                        />

                        {field.type === "select" && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Complex CTA Button */}
                  <div className="pt-4 input-anim">
                    <button className="group relative w-full overflow-hidden rounded-2xl bg-white text-secondary font-bold py-4 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] transition-all">
                      <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                      <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-300">
                        Calculate Estimate
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </button>
                    <p className="text-center text-[10px] text-slate-500 mt-3 font-mono">
                      SECURE CONNECTION • ENCRYPTED
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Bento Grid (Fills Remaining Height) */}
          <div className="lg:col-span-7 grid grid-rows-2 grid-cols-2 gap-4 h-full min-h-[600px]">
            {/* ITEM 1: Large Visual (Top Left) */}
            <div className="bento-item col-span-2 row-span-1 relative rounded-3xl overflow-hidden group border border-white/10">
              <div className="absolute inset-0 bg-slate-800">
                {/* Replace with real image */}
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-8 left-8 z-10 max-w-md">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-green-400">
                    Market Trend
                  </span>
                </div>
                <h4 className="text-3xl font-bold text-white mb-2">
                  Global Steel Prices Stabilize
                </h4>
                <p className="text-slate-300 text-sm">
                  Recent tariffs have eased, allowing for more accurate
                  long-term project budgeting in Q3.
                </p>
              </div>
            </div>

            {/* ITEM 2: Live Stats (Bottom Left) */}
            <div className="bento-item col-span-1 row-span-1 bg-[#151F32] border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <h5 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Regional Rates
                </h5>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      Concrete (C30)
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">$</span>
                      <span
                        ref={(el) => {
                          counterRef.current[0] = el;
                        }}
                        className="text-2xl font-bold text-white font-mono"
                      >
                        125.00
                      </span>
                      <span className="text-xs text-slate-500">/m³</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      Rebar (Grade 60)
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">$</span>
                      <span
                        ref={(el) => {
                          counterRef.current[1] = el;
                        }}
                        className="text-2xl font-bold text-white font-mono"
                      >
                        0.85
                      </span>
                      <span className="text-xs text-slate-500">/kg</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-12 flex items-center gap-2 text-xs font-mono text-primary bg-primary/10 rounded-lg px-3 w-fit">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                UPDATING...
              </div>
            </div>

            {/* ITEM 3: Trust Features (Bottom Right) */}
            <div className="bento-item col-span-1 row-span-1 bg-[#151F32] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              <h5 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">
                Why Choose CPL
              </h5>
              <ul className="space-y-4">
                {[
                  { icon: Shield, text: "ISO 9001 Certified Estimates" },
                  { icon: Wrench, text: "Machine-Level Precision" },
                  { icon: CheckCircle2, text: "Zero Hidden Fees" },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 group/item cursor-default"
                  >
                    <div className="mt-1 w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover/item:border-primary/50 group-hover/item:bg-primary/20 transition-all">
                      <item.icon className="w-3 h-3 text-primary opacity-0 group-hover/item:opacity-100 transition-all" />
                    </div>
                    <span className="text-sm text-slate-300 group-hover/item:text-white transition-colors leading-snug">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Missing Icon import for Select Dropdown
const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
