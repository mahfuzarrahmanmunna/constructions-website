import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "warm";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.2em]",
        variant === "warm" ? "bg-[var(--color-accent)] text-white" : "bg-[var(--color-primary)] text-white",
        className,
      )}
      {...props}
    />
  );
}
