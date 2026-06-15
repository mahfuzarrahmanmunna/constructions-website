"use client";

import { useRef } from "react";
import { ChevronDown, X } from "lucide-react";

import { productOptions } from "@/lib/case-data";
import { cn } from "@/lib/utils";

export function ProductPicker() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="group mx-auto mt-[var(--space-7)] flex h-14 min-w-56 items-center justify-center gap-[var(--space-3)] rounded-full border border-white/75 bg-white/12 px-[var(--space-7)] text-sm font-extrabold text-white shadow-[var(--shadow-glass)] backdrop-blur-md transition-[background-color,color,transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:bg-white hover:text-[var(--color-primary)] hover:shadow-[var(--shadow-panel)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)]"
        aria-haspopup="dialog"
      >
        Excavator <ChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="product-picker-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeDialog();
          }
        }}
        className="m-auto w-[calc(100%_-_2rem)] max-w-[44rem] rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-0 text-left text-[var(--color-ink)] shadow-[var(--shadow-panel)] backdrop:bg-[rgba(0,22,55,0.72)] backdrop:backdrop-blur-sm"
      >
        <div className="p-[var(--space-6)] md:p-[var(--space-8)]">
          <div className="flex items-start justify-between gap-[var(--space-5)]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                Construction cases
              </p>
              <h2
                id="product-picker-title"
                className="mt-[var(--space-2)] text-2xl font-black tracking-[-0.04em] text-[var(--color-primary)] md:text-3xl"
              >
                Choose a product
              </h2>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
              aria-label="Close product picker"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="mt-[var(--space-7)] grid gap-[var(--space-3)] sm:grid-cols-2">
            {productOptions.map((option) => (
              <a
                href="#case-grid"
                key={option.label}
                onClick={closeDialog}
                className={cn(
                  "rounded-[var(--radius-card-sm)] border px-[var(--space-5)] py-[var(--space-4)] text-sm font-extrabold transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-1 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2",
                  option.active
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[var(--shadow-soft)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-ink-soft)] hover:border-[var(--color-secondary)] hover:bg-white hover:text-[var(--color-primary)]",
                )}
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
