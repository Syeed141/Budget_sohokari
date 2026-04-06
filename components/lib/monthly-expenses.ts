import mongoose from "mongoose";
import Expense from "@/components/models/Expense";
import type {
  MonthlyExpenseAnalytics,
  ExpenseItemDTO,
  MonthlyChartRow,
  DailyExpenseGroup,
  CategoryTotal,
} from "@/types/expense";

const DEFAULT_CATEGORIES = [
  "Food",
  "Transport",
  "Rent",
  "Bills",
  "Shopping",
  "Health",
  "Education",
  "Entertainment",
  "Other",
];

type GetMonthlyExpenseAnalyticsParams = {
  userId: string;
  year: number;
  month: number; // 1-12
};

function getMonthDateRange(year: number, month: number) {
  const start = new Date(year, month - 1, 1, 0, 0, 0, 0);
  const end = new Date(year, month, 1, 0, 0, 0, 0);

  return { start, end };
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function padDay(day: number) {
  return String(day).padStart(2, "0");
}

export async function getMonthlyExpenseAnalytics({
  userId,
  year,
  month,
}: GetMonthlyExpenseAnalyticsParams): Promise<MonthlyExpenseAnalytics> {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  if (!year || !month || month < 1 || month > 12) {
    throw new Error("Invalid month or year");
  }

  const { start, end } = getMonthDateRange(year, month);

  const rawExpenses = await Expense.find({
    userId,
    date: {
      $gte: start,
      $lt: end,
    },
  })
    .sort({ date: 1, createdAt: 1 })
    .lean();

  const daysInMonth = getDaysInMonth(year, month);

  const chartRowsMap: Record<number, MonthlyChartRow> = {};
  const groupedExpensesMap: Record<string, ExpenseItemDTO[]> = {};
  const categoryTotalsMap: Record<string, number> = {};

  for (let day = 1; day <= daysInMonth; day++) {
    const row: MonthlyChartRow = {
      day: padDay(day),
      total: 0,
    };

    for (const category of DEFAULT_CATEGORIES) {
      row[category] = 0;
    }

    chartRowsMap[day] = row;
  }

  for (const expense of rawExpenses) {
    const expenseDate = new Date(expense.date);
    const dayOfMonth = expenseDate.getDate();
    const category = expense.category || "Other";
    const amount = Number(expense.amount) || 0;

    if (chartRowsMap[dayOfMonth][category] === undefined) {
      chartRowsMap[dayOfMonth][category] = 0;
    }

    chartRowsMap[dayOfMonth][category] =
      Number(chartRowsMap[dayOfMonth][category]) + amount;

    chartRowsMap[dayOfMonth].total =
      Number(chartRowsMap[dayOfMonth].total) + amount;

    categoryTotalsMap[category] = (categoryTotalsMap[category] || 0) + amount;

    const localDateKey = new Date(expense.date).toISOString();

    if (!groupedExpensesMap[localDateKey]) {
      groupedExpensesMap[localDateKey] = [];
    }

    groupedExpensesMap[localDateKey].push({
      id: String(expense._id),
      title: expense.title,
      amount,
      category,
      note: expense.note || "",
      date: new Date(expense.date).toISOString(),
      isFixed: Boolean(expense.isFixed),
    });
  }

  const chartData = Object.values(chartRowsMap);

  const dailyGroups: DailyExpenseGroup[] = Object.entries(groupedExpensesMap)
    .map(([date, expenses]) => ({
      date,
      day: padDay(new Date(date).getDate()),
      total: expenses.reduce((sum, item) => sum + item.amount, 0),
      expenses: expenses.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const categoryTotals: CategoryTotal[] = Object.entries(categoryTotalsMap)
    .map(([category, amount]) => ({
      category,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount);

  const totalMonthlyExpense = categoryTotals.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return {
    month,
    year,
    totalMonthlyExpense,
    categoryTotals,
    chartData,
    dailyGroups,
  };
}