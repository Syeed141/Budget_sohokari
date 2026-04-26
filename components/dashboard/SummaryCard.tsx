import { Card, CardContent } from "@/components/ui/Card";

type SummaryCardProps = {
  label: string;
  value: string;
  hint?: string;
  emphasis?: "default" | "positive" | "negative";
};

export default function SummaryCard({
  label,
  value,
  hint,
  emphasis = "default",
}: SummaryCardProps) {
  const valueClassName =
    emphasis === "positive"
      ? "text-[color:var(--primary)]"
      : emphasis === "negative"
      ? "text-red-600"
      : "text-[color:var(--foreground)]";

  return (
    <Card>
      <CardContent>
        <p className="typewriter-label text-[color:var(--secondary)]">{label}</p>
        <h2 className={`typewriter-display mt-3 text-3xl tracking-tight ${valueClassName}`}>
          {value}
        </h2>
        {hint ? <p className="mt-2 text-sm text-[color:var(--secondary)]">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}
