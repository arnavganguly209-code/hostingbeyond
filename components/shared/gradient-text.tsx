import { cn } from "@/lib/utils";

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
};

export function GradientText({
  children,
  className,
  as: Component = "span",
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        "bg-[linear-gradient(105deg,#5eb7ff_0%,#4d8cff_28%,#7b4dff_62%,#b45cff_100%)] bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </Component>
  );
}
