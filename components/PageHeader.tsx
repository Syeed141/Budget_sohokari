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
        <span className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
          {badgeText}
        </span>
      ) : null}

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        {description}
      </p>
    </div>
  );
}