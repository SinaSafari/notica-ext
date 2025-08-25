import { twMerge } from "tailwind-merge";

type GlassContainerProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function GlassContainer({
  children,
  className,
  onClick,
}: GlassContainerProps) {
  return (
    <div
      className={twMerge(
        "rounded-2xl bg-white/60   border-slate-300 backdrop-blur-sm p-4",
        className
      )}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
}
