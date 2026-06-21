"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import {
  Home,
  Ruler,
  MapPin,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Shield,
  Wrench,
  Calculator,
  Mail,
  Phone,
  Loader2,
  CircleCheck,
  CircleX,
} from "lucide-react";

const COLORS = {
  navy: "#002253",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

export default function CostEstimatorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const inputsRef = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<(HTMLSpanElement | null)[]>([]);
  const step2Ref = useRef<HTMLDivElement>(null);

  // Step state: 1 = project config, 2 = contact info, 3 = success/error
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State — Step 1
  const [formData, setFormData] = useState({
    type: "",
    size: "",
    location: "",
  });

  // Form State — Step 2
  const [contactData, setContactData] = useState({
    email: "",
    phone: "",
  });

  const [focused, setFocused] = useState("");
  const [focusedContact, setFocusedContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState<"success" | "error" | null>(
    null,
  );

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
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

      counterRef.current.forEach((ref) => {
        if (ref) {
          gsap.to(ref, {
            innerText: () => Math.floor(Math.random() * (300 - 250) + 250),
            duration: 2,
            snap: { innerText: 1 },
            repeat: -1,
            yoyo: true,
            ease: "none",
            delay: Math.random() * 1,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate step 2 entrance
  useEffect(() => {
    if (step === 2 && step2Ref.current) {
      gsap.fromTo(
        step2Ref.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        },
      );
    }
    if (step === 3 && step2Ref.current) {
      gsap.fromTo(
        step2Ref.current.children,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(2)",
        },
      );
    }
  }, [step]);

  const handleFocus = (field: string) => setFocused(field);
  const handleBlur = () => setFocused("");
  const handleFocusContact = (field: string) => setFocusedContact(field);
  const handleBlurContact = () => setFocusedContact("");

  // Validate Step 1
  const validateStep1 = (): boolean => {
    return !!(formData.type && formData.size && formData.location);
  };

  // Validate Step 2
  const validateStep2 = (): boolean => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return !!(
      contactData.email &&
      emailRegex.test(contactData.email) &&
      contactData.phone.trim().length >= 7
    );
  };

  // Go to Step 2
  const goToStep2 = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  // Go back to Step 1
  const goToStep1 = () => {
    setStep(1);
    setSubmitResult(null);
  };

  // Final Submit
  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setLoading(true);
    setSubmitResult(null);

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType: formData.type,
          area: formData.size,
          location: formData.location,
          email: contactData.email,
          phone: contactData.phone,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitResult("success");
        setStep(3);
      } else {
        setSubmitResult("error");
        setStep(3);
      }
    } catch {
      setSubmitResult("error");
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  // Reset everything
  const handleReset = () => {
    setStep(1);
    setSubmitResult(null);
    setFormData({ type: "", size: "", location: "" });
    setContactData({ email: "", phone: "" });
  };

  const step1Fields = [
    {
      id: "type",
      label: "Project Category",
      icon: Home,
      type: "select" as const,
      options: ["Residential", "Commercial", "Industrial"],
    },
    {
      id: "size",
      label: "Total Area (sq.ft)",
      icon: Ruler,
      type: "number" as const,
      placeholder: "0",
    },
    {
      id: "location",
      label: "Project Location",
      icon: MapPin,
      type: "text" as const,
      placeholder: "City, Region",
    },
  ];

  const step2Fields = [
    {
      id: "email",
      label: "Email Address",
      icon: Mail,
      type: "email" as const,
      placeholder: "you@example.com",
      key: "email" as const,
    },
    {
      id: "phone",
      label: "Phone Number",
      icon: Phone,
      type: "tel" as const,
      placeholder: "+880 1XXX XXXXXX",
      key: "phone" as const,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="estimator-wrapper py-8 relative bg-[#0B1120] text-white overflow-hidden font-sans"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#E55503] rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#224B88] rounded-full blur-[100px] mix-blend-screen opacity-60" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 lg:px-12 flex flex-col justify-center">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-5 h-5 text-[#E55503]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#E55503] uppercase">
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
          {/* LEFT COLUMN: The Form */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div
              ref={formRef}
              className="form-card relative bg-[#151F32] border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl backdrop-blur-xl overflow-hidden"
            >
              {/* Top Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E55503] to-transparent opacity-80" />

              {/* Step Indicator */}
              <div className="relative z-10 flex items-center gap-3 mb-8">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-400 ${
                        step >= s
                          ? "bg-[#E55503] text-white shadow-[0_0_15px_rgba(229,85,3,0.4)]"
                          : "bg-white/5 text-slate-500 border border-white/10"
                      }`}
                    >
                      {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                    </div>
                    <span
                      className={`text-xs font-medium transition-colors duration-300 ${
                        step >= s ? "text-white" : "text-slate-500"
                      }`}
                    >
                      {s === 1 ? "Configure" : "Contact"}
                    </span>
                    {s < 2 && (
                      <div
                        className={`w-8 h-px transition-colors duration-400 ${
                          step > 1 ? "bg-[#E55503]" : "bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* ═══════════ STEP 1: Project Config ═══════════ */}
              {step === 1 && (
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
                    onSubmit={(e) => {
                      e.preventDefault();
                      goToStep2();
                    }}
                  >
                    {step1Fields.map((field, index) => (
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
                              ? "-top-3 left-10 text-xs text-[#E55503] bg-[#151F32] px-1"
                              : "top-4 text-slate-500"
                          }`}
                        >
                          {field.label}
                        </label>

                        <div className="relative">
                          {field.type === "select" ? (
                            <select
                              className="w-full appearance-none bg-[#0B1120] border border-white/10 rounded-2xl py-4 pl-12 pr-10 text-white focus:outline-none focus:border-[#E55503]/50 focus:shadow-[0_0_20px_rgba(229,85,3,0.1)] transition-all font-medium"
                              onFocus={() => handleFocus(field.id)}
                              onBlur={handleBlur}
                              value={
                                formData[field.id as keyof typeof formData]
                              }
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [field.id]: e.target.value,
                                })
                              }
                            >
                              <option
                                value=""
                                className="bg-[#151F32]"
                                disabled
                              >
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
                              className="w-full bg-[#0B1120] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#E55503]/50 focus:shadow-[0_0_20px_rgba(229,85,3,0.1)] transition-all font-medium placeholder:text-slate-700"
                              onFocus={() => handleFocus(field.id)}
                              onBlur={handleBlur}
                              value={
                                formData[field.id as keyof typeof formData]
                              }
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
                                ? "text-[#E55503] scale-110"
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

                    {/* CTA — Go to Step 2 */}
                    <div className="pt-4 input-anim">
                      <button
                        type="submit"
                        className="group relative w-full overflow-hidden rounded-2xl bg-white text-[#002253] font-bold py-4 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] transition-all"
                      >
                        <div className="absolute inset-0 bg-[#E55503] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-300">
                          Continue
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </button>
                      <p className="text-center text-[10px] text-slate-500 mt-3 font-mono">
                        STEP 1 OF 2 • PROJECT CONFIGURATION
                      </p>
                    </div>
                  </form>
                </div>
              )}

              {/* ═══════════ STEP 2: Contact Info ═══════════ */}
              {step === 2 && (
                <div ref={step2Ref} className="relative z-10 space-y-8">
                  <div>
                    <button
                      onClick={goToStep1}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-4"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      Back to Project Config
                    </button>
                    <h3 className="text-2xl font-semibold mb-2">
                      Your Contact Details
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      We&apos;ll send your personalized estimate to this email
                      and follow up via phone if needed.
                    </p>
                  </div>

                  {/* Project Summary Pill */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E55503]/10 border border-[#E55503]/20 text-xs font-medium text-[#E55503]">
                      <Home className="w-3 h-3" />
                      {formData.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
                      <Ruler className="w-3 h-3" />
                      {formData.size} sq.ft
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
                      <MapPin className="w-3 h-3" />
                      {formData.location}
                    </span>
                  </div>

                  <form
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    {step2Fields.map((field) => (
                      <div key={field.id} className="relative group">
                        <label
                          className={`absolute left-12 transition-all duration-300 pointer-events-none text-sm ${
                            focusedContact === field.id ||
                            contactData[field.key]
                              ? "-top-3 left-10 text-xs text-[#E55503] bg-[#151F32] px-1"
                              : "top-4 text-slate-500"
                          }`}
                        >
                          {field.label}
                        </label>

                        <div className="relative">
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            className="w-full bg-[#0B1120] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#E55503]/50 focus:shadow-[0_0_20px_rgba(229,85,3,0.1)] transition-all font-medium placeholder:text-slate-700"
                            onFocus={() => handleFocusContact(field.id)}
                            onBlur={handleBlurContact}
                            value={contactData[field.key]}
                            onChange={(e) =>
                              setContactData({
                                ...contactData,
                                [field.key]: e.target.value,
                              })
                            }
                          />

                          <field.icon
                            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                              focusedContact === field.id
                                ? "text-[#E55503] scale-110"
                                : "text-slate-600"
                            }`}
                          />
                        </div>
                      </div>
                    ))}

                    {/* CTA — Submit */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full overflow-hidden rounded-2xl bg-[#E55503] text-white font-bold py-4 shadow-[0_0_40px_-10px_rgba(229,85,3,0.3)] hover:shadow-[0_0_40px_-10px_rgba(229,85,3,0.5)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          {loading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              Calculate Estimate
                              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </span>
                      </button>
                      <p className="text-center text-[10px] text-slate-500 mt-3 font-mono">
                        SECURE CONNECTION • ENCRYPTED • STEP 2 OF 2
                      </p>
                    </div>
                  </form>
                </div>
              )}

              {/* ═══════════ STEP 3: Result ═══════════ */}
              {step === 3 && (
                <div
                  ref={step2Ref}
                  className="relative z-10 flex flex-col items-center justify-center text-center py-8"
                >
                  {submitResult === "success" ? (
                    <>
                      <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                        <CircleCheck className="w-10 h-10 text-green-400" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">
                        Estimate Requested!
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-8">
                        Your personalized cost estimate will be sent to{" "}
                        <span className="text-white font-medium">
                          {contactData.email}
                        </span>{" "}
                        within 24 hours.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                        <CircleX className="w-10 h-10 text-red-400" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">
                        Something Went Wrong
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-8">
                        We couldn&apos;t process your request. Please try again
                        or contact us directly.
                      </p>
                    </>
                  )}

                  <button
                    onClick={handleReset}
                    className="group flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/5 hover:border-white/20 transition-all"
                  >
                    Start New Estimate
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Bento Grid */}
          <div className="lg:col-span-7 grid grid-rows-2 grid-cols-2 gap-4 h-full min-h-[600px]">
            {/* ITEM 1: Large Visual */}
            <div className="bento-item col-span-2 row-span-1 relative rounded-3xl overflow-hidden group border border-white/10">
              <div className="absolute inset-0 bg-slate-800">
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

            {/* ITEM 2: Live Stats */}
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
              <div className="h-12 flex items-center gap-2 text-xs font-mono text-[#E55503] bg-[#E55503]/10 rounded-lg px-3 w-fit">
                <div className="w-2 h-2 rounded-full bg-[#E55503] animate-pulse" />
                UPDATING...
              </div>
            </div>

            {/* ITEM 3: Trust Features */}
            <div className="bento-item col-span-1 row-span-1 bg-[#151F32] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-[#E55503]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
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
                    <div className="mt-1 w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover/item:border-[#E55503]/50 group-hover/item:bg-[#E55503]/20 transition-all">
                      <item.icon className="w-3 h-3 text-[#E55503] opacity-0 group-hover/item:opacity-100 transition-all" />
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

// Chevron Down Icon
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
