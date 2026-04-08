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
        <label className="mb-2 block text-sm font-medium text-[#285A48]">
          {label}
        </label>
      ) : null}

      <input
        {...props}
        className={`w-full rounded-2xl border border-[#78b79d] bg-[#ecf8f1] px-4 py-3 text-sm text-[#091413] outline-none transition placeholder:text-[#5e8d7c] focus:border-[#408A71] focus:ring-2 focus:ring-[#408A71]/35 ${className}`}
      />

      {helperText ? (
        <p className="mt-2 text-xs text-[#285A48]">{helperText}</p>
      ) : null}
    </div>
  );
}

