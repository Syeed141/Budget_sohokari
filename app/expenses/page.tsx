import Container from "@/components/ui/Container";
import PageHeader from "@/components/PageHeader";
import ExpenseManager from "@/components/expenses/ExpenseManager";
import MonthlyExpensesAnalytics from "@/components/expenses/MonthlyExpensesAnalytics";
import { getSessionFromCookies } from "@/components/lib/auth";
import {
  getDemoExpenses,
  getDemoMonthlyExpenseAnalytics,
} from "@/components/lib/monthly-expenses";

export default async function ExpensesPage() {
  const session = await getSessionFromCookies();
  const isDemo = !session;
  const demoExpenses = isDemo ? getDemoExpenses() : [];
  const demoAnalytics = isDemo ? getDemoMonthlyExpenseAnalytics() : null;

  return (
    <Container className="py-10">
      <PageHeader
        title={isDemo ? "Expenses Preview" : "Expenses"}
        description={
          isDemo
            ? "Explore a realistic month of saved transactions, category trends, and daily breakdowns before signing in."
            : "Track spending, review patterns, and understand your monthly expense behavior."
        }
      />

      {isDemo ? (
        <section className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50/80 p-5 text-sm text-emerald-950 shadow-sm">
          <p className="leading-6">
            You are viewing a sample expense workspace. Sign in to add, edit, delete,
            and export your own monthly expense data.
          </p>
        </section>
      ) : null}

      <div className="mt-8 space-y-8">
        <MonthlyExpensesAnalytics initialData={demoAnalytics} isDemo={isDemo} />
        <ExpenseManager initialExpenses={demoExpenses} isDemo={isDemo} />
      </div>
    </Container>
  );
}
