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
      ? "text-emerald-600"
      : emphasis === "negative"
      ? "text-red-600"
      : "text-slate-900";

  return (
    <Card>
      <CardContent>
        <p className="text-sm text-slate-500">{label}</p>
        <h2 className={`mt-3 text-3xl font-bold tracking-tight ${valueClassName}`}>
          {value}
        </h2>
        {hint ? <p className="mt-2 text-sm text-slate-500">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}