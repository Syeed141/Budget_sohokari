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
      return "border border-[#408A71] bg-[#B0E4CC] text-[#091413] hover:bg-[#9edac0]";
    case "ghost":
      return "bg-transparent text-[#285A48] hover:bg-[#B0E4CC]";
    case "primary":
    default:
      return "bg-[#285A48] text-[#B0E4CC] hover:bg-[#1f483a]";
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
    inline-flex items-center justify-center rounded-xl font-semibold
    transition-all duration-200 shadow-sm
    focus:outline-none focus:ring-2 focus:ring-[#408A71]/45
    disabled:cursor-not-allowed disabled:opacity-60
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

