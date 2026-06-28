/** Bottom padding clearing fixed Hub dock + iOS safe area */
export const HUB_DOCK_PAD = "pb-hub-dock";

type HubButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};

export function HubButton({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}: HubButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hub-color-primary,#4f46e5)]";
  const sizes = size === "md" ? "min-h-11 px-4 text-sm" : "min-h-9 px-3 text-xs";
  const variants = {
    primary:
      "bg-[var(--hub-color-primary,#4f46e5)] text-white shadow-sm hover:brightness-110 active:brightness-95",
    secondary:
      "border border-[var(--hub-color-border,#e2e8f0)] bg-[var(--hub-color-surface,#fff)] text-neutral-800 shadow-sm hover:bg-neutral-50",
    ghost: "text-neutral-700 hover:bg-neutral-100/80",
  };
  return (
    <button className={`${base} ${sizes} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function HubHeaderLink({
  href,
  children,
  variant = "ghost",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "ghost" | "primary" | "secondary";
}) {
  const styles = {
    ghost:
      "border border-transparent text-neutral-700 hover:border-[var(--hub-color-border,#e2e8f0)] hover:bg-white/90",
    secondary:
      "border border-[var(--hub-color-border,#e2e8f0)] bg-white text-neutral-800 shadow-sm hover:bg-neutral-50",
    primary:
      "border border-transparent bg-[var(--hub-color-primary,#4f46e5)] text-white shadow-sm hover:brightness-110",
  };
  return (
    <a
      href={href}
      className={`inline-flex min-h-10 items-center rounded-xl px-3 text-xs font-semibold transition sm:min-h-9 sm:px-3.5 sm:text-sm ${styles[variant]}`}
    >
      {children}
    </a>
  );
}

export const hubInputClass =
  "min-h-11 w-full rounded-xl border border-[var(--hub-color-border,#e2e8f0)] bg-white px-3 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--hub-color-primary,#4f46e5)]";

export const hubSelectClass =
  "min-h-11 rounded-xl border border-[var(--hub-color-border,#e2e8f0)] bg-white px-3 text-sm text-neutral-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--hub-color-primary,#4f46e5)]";

export const hubCardClass =
  "rounded-2xl border border-[var(--hub-color-border,#e2e8f0)] bg-[var(--hub-color-surface,#fff)] shadow-sm";

export const hubModuleShell = "min-h-screen bg-[var(--hub-color-bg,#eef1f6)]";
export const hubModuleShellCol = "flex min-h-screen flex-col bg-[var(--hub-color-bg,#eef1f6)]";
