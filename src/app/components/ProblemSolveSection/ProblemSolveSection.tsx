import React from "react";

const PALETTE = {
  navy: "#002253",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

export default function ProblemSolveSection() {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Visual / Stats Card */}
          <div className="relative">
            {/* Background Card */}
            <div className="relative bg-gradient-to-br from-[#002253] to-[#224B88] rounded-2xl p-10 md:p-14 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#E55503]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FF8B28]/10 rounded-full blur-3xl"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Single Partner Icon */}
                <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF8B28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">3</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider font-medium">Services Combined</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-[#FF8B28] mb-1">0</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider font-medium">Project Delays</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">1</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider font-medium">Trusted Partner</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 my-8"></div>

                {/* Bottom Label */}
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FF8B28] animate-pulse"></div>
                  <span className="text-xs text-white/60 uppercase tracking-widest font-semibold">
                    One Partner. Total Solutions.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E55503]/20 bg-[#E55503]/5 px-4 py-2 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E55503]"></span>
              <span className="text-xs font-bold text-[#E55503] uppercase tracking-widest">
                The Main Problem We Solve
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002253] mb-6 leading-tight">
              One Trusted Partner with{" "}
              <span className="text-[#E55503]">Zero Project Delays.</span>
            </h2>

            {/* Orange Accent Bar */}
            <div className="w-16 h-1 bg-[#E55503] rounded-full mb-8"></div>

            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              Most construction projects in Bangladesh slow down because managers have to deal with too many different companies; one for materials, one for renting machines, and another for building. As our business is focused on the Construction Industry, Constructive Partners Limited (CPL) fixes this problem. We handle all three jobs together. By combining material supply, machinery rental, and expert engineering, we keep your project moving fast without any stress.
            </p>

            {/* Three Checkmarks */}
            <div className="space-y-4">
              {[
                "Material Supply",
                "Machinery Rental",
                "Expert Engineering",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E55503]/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E55503" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-[#002253]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
