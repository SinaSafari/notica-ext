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
        "rounded-4xl bg-white/50 dark:bg-slate-800/80 dark:text-white border-slate-300 backdrop-blur-xs p-4",
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
