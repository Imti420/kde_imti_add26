import type { University } from "@/data/types";
import { universityMark } from "@/lib/catalog";
import { cn } from "@/lib/cn";

/** House-style identity: logo from our origin, or typographic monogram. Never hotlinks. */
export function UniMark({
  uni,
  size = "md",
  className,
}: {
  uni: University;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  if (!uni) return null;
  const mark = universityMark(uni);
  const dim = size === "sm" ? "h-9 w-9 text-xs" : size === "lg" ? "h-16 w-16 text-xl" : "h-12 w-12 text-sm";
  const letters = String(uni.shortName || uni.id || "?").slice(0, 4).toUpperCase();

  if (mark?.kind === "logo" && mark.path) {
    return (
      <span
        className={cn(
          "uni-mark uni-mark-logo inline-flex shrink-0 items-center justify-center overflow-hidden border-[3px] border-ink bg-paper",
          dim,
          className,
        )}
      >
        <img
          src={mark.path}
          alt=""
          width={size === "lg" ? 64 : size === "sm" ? 36 : 48}
          height={size === "lg" ? 64 : size === "sm" ? 36 : 48}
          className="h-full w-full object-contain p-0.5"
          loading="lazy"
          decoding="async"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "uni-mark uni-mark-mono inline-flex shrink-0 items-center justify-center border-[3px] border-ink bg-ink font-display font-bold uppercase leading-none tracking-tight text-paper",
        dim,
        className,
      )}
      aria-hidden
    >
      {letters}
    </span>
  );
}
