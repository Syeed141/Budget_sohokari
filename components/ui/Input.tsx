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
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </label>
      ) : null}

      <input
        {...props}
        className={`w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 ${className}`}
      />

      {helperText ? (
        <p className="mt-2 text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}