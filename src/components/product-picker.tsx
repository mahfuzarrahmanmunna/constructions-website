import { ArrowDown } from "lucide-react";

export function ProductPicker() {
  return (
    <a
      href="#cases"
      className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/12 px-6 py-3 text-sm font-extrabold text-white backdrop-blur-sm transition hover:bg-white hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      Explore cases
      <ArrowDown className="size-4" />
    </a>
  );
}
