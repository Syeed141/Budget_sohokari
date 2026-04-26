type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`typewriter-label inline-flex items-center border border-[color:var(--border-soft)] bg-[color:var(--surface)] px-3 py-1 text-[color:var(--secondary)] ${className}`}
    >
      {children}
    </span>
  );
}

