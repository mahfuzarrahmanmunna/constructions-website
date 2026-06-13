import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm";
};

export function Button({ className, variant = "default", size = "default", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-extrabold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]",
        size === "sm" ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm",
        variant === "default" && "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-light)]",
        variant === "ghost" && "bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)]",
        variant === "outline" && "border border-white/40 bg-transparent text-white hover:bg-white hover:text-[var(--color-primary)]",
        className,
      )}
      {...props}
    />
  );
}
