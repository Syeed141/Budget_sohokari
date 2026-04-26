type PageHeaderProps = {
  title: string;
  description: string;
  badgeText?: string;
};

export default function PageHeader({
  title,
  description,
  badgeText,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      {badgeText ? (
        <span className="typewriter-label mb-4 inline-flex border border-[color:var(--border-soft)] bg-[rgba(245,234,200,0.9)] px-3 py-1 text-[color:var(--secondary)]">
          {badgeText}
        </span>
      ) : null}

      <h1 className="typewriter-display text-3xl tracking-tight text-[color:var(--foreground)] sm:text-4xl">
        {title}
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--secondary)] sm:text-base">
        {description}
      </p>
    </div>
  );
}
