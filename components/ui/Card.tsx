type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-[#78b79d]/65 bg-[linear-gradient(145deg,#edf9f3_0%,#d9f1e4_55%,#c9ead9_100%)] shadow-[0_16px_36px_rgba(9,20,19,0.12)] ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

