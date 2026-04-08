type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-[#B0E4CC] px-3 py-1 text-xs font-semibold text-[#285A48] ring-1 ring-[#78b79d] ${className}`}
    >
      {children}
    </span>
  );
}

