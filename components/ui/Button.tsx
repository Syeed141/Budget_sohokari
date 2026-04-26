import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = BaseProps & {
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

function getVariantClasses(variant: ButtonVariant) {
  switch (variant) {
    case "secondary":
      return "border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--foreground)] hover:bg-[color:var(--surface-muted)]";
    case "ghost":
      return "bg-transparent text-[color:var(--secondary)] hover:bg-[rgba(107,91,62,0.08)] hover:text-[color:var(--foreground)]";
    case "primary":
    default:
      return "bg-[color:var(--primary)] text-[color:var(--surface)] hover:bg-[color:var(--primary-hover)]";
  }
}

function getSizeClasses(size: ButtonSize) {
  switch (size) {
    case "sm":
      return "px-3 py-2 text-sm";
    case "lg":
      return "px-6 py-3.5 text-base";
    case "md":
    default:
      return "px-4 py-2.5 text-sm";
  }
}

export default function Button(props: ButtonProps) {
  const {
    children,
    className = "",
    variant = "primary",
    size = "md",
  } = props;

  const classes = `
    inline-flex items-center justify-center rounded-none border font-semibold uppercase tracking-[0.04em]
    transition-all duration-200 shadow-sm
    focus:outline-none focus:ring-2 focus:ring-[rgba(168,39,30,0.28)]
    disabled:cursor-not-allowed disabled:opacity-60
    border-transparent
    ${getVariantClasses(variant)}
    ${getSizeClasses(size)}
    ${className}
  `;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}

