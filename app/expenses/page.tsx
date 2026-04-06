import Container from "@/components/ui/Container";
import PageHeader from "@/components/PageHeader";
import ExpenseManager from "@/components/expenses/ExpenseManager";
import MonthlyExpensesAnalytics from "@/components/expenses/MonthlyExpensesAnalytics";

export default function ExpensesPage() {
  return (
    <Container className="py-10">
      <PageHeader
        title="Expenses"
        subtitle="Track spending, review patterns, and understand your monthly expense behavior."
      />

      <div className="mt-8 space-y-8">
        <MonthlyExpensesAnalytics />
        <ExpenseManager />
      </div>
    </Container>
  );
}