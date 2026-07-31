import { cn } from "@/lib/utils";

type GlassPanelProps = {
  children: React.ReactNode;
  className?: string;
  glow?: "blue" | "purple" | "none";
};

export function GlassPanel({
  children,
  className,
  glow = "none",
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-xl",
        glow === "blue" &&
          "shadow-[0_0_40px_rgb(47_107_255_/_0.2),inset_0_1px_0_rgb(255_255_255_/_0.08)]",
        glow === "purple" &&
          "shadow-[0_0_40px_rgb(155_92_255_/_0.22),inset_0_1px_0_rgb(255_255_255_/_0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
