"use client";

interface BookSizeButtonProps {
  size: number;
  label: string;
}

export function BookSizeButton({ size, label }: BookSizeButtonProps) {
  return (
    <a
      href="#quote-form"
      className="flex items-center justify-center w-full bg-primary-600 text-white text-center py-3.5 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors min-h-[48px] touch-manipulation active:scale-[0.98]"
      onClick={() => {
        sessionStorage.setItem("preselect-dumpster-size", String(size));
      }}
    >
      {label}
    </a>
  );
}
