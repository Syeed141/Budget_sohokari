type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
};

export default function Input({
  label,
  helperText,
  className = "",
  ...props
}: InputProps) {
  return (
    <div>
      {label ? (
        <label className="typewriter-label mb-2 block text-[color:var(--secondary)]">
          {label}
        </label>
      ) : null}

      <input
        {...props}
        className={`w-full rounded-none border border-[color:var(--border-soft)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition placeholder:text-[color:var(--secondary)] focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[rgba(168,39,30,0.18)] ${className}`}
      />

      {helperText ? (
        <p className="mt-2 text-xs text-[color:var(--secondary)]">{helperText}</p>
      ) : null}
    </div>
  );
}

