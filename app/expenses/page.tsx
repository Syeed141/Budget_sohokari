import Container from "@/components/ui/Container";
import PageHeader from "@/components/PageHeader";
import ExpenseManager from "@/components/expenses/ExpenseManager";

export default function ExpensesPage() {
  return (
    <main className="py-10">
      <Container>
        <PageHeader
          badgeText="Expense management"
          title="Expenses"
          description="Track daily spending and fixed monthly costs in one clean view."
        />

        <ExpenseManager />
      </Container>
    </main>
  );
}