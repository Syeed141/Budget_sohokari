import mongoose from "mongoose";
import Expense from "@/components/models/Expense";
import type {
  MonthlyExpenseAnalytics,
  ExpenseItemDTO,
  MonthlyChartRow,
  DailyExpenseGroup,
  CategoryTotal,
  ExpenseRecord,
} from "@/types/expense";

const DEFAULT_CATEGORIES = [
  "Food",
  "Transport",
  "Rent",
  "Internet",
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

function normalizeCategory(category?: string) {
  if (!category) return "Other";

  const map: Record<string, string> = {
    food: "Food",
    transport: "Transport",
    rent: "Rent",
    internet: "Internet",
    bills: "Bills",
    shopping: "Shopping",
    health: "Health",
    education: "Education",
    entertainment: "Entertainment",
    other: "Other",
  };

  return map[category.toLowerCase()] || "Other";
}

function formatBDT(amount: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDemoDate(day: number) {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), day, 12).toISOString();
}

function buildMonthlyExpenseAnalytics(
  expenses: ExpenseItemDTO[],
  year: number,
  month: number
): MonthlyExpenseAnalytics {
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

  for (const expense of expenses) {
    const expenseDate = new Date(expense.date);
    const dayOfMonth = expenseDate.getDate();
    const category = normalizeCategory(expense.category);
    const amount = Number(expense.amount) || 0;
    const localDateKey = new Date(
      expenseDate.getFullYear(),
      expenseDate.getMonth(),
      expenseDate.getDate()
    ).toISOString();

    if (chartRowsMap[dayOfMonth][category] === undefined) {
      chartRowsMap[dayOfMonth][category] = 0;
    }

    chartRowsMap[dayOfMonth][category] =
      Number(chartRowsMap[dayOfMonth][category]) + amount;

    chartRowsMap[dayOfMonth].total =
      Number(chartRowsMap[dayOfMonth].total) + amount;

    categoryTotalsMap[category] = (categoryTotalsMap[category] || 0) + amount;

    if (!groupedExpensesMap[localDateKey]) {
      groupedExpensesMap[localDateKey] = [];
    }

    groupedExpensesMap[localDateKey].push({
      ...expense,
      category,
      amount,
    });
  }

  const chartData = Object.values(chartRowsMap);

  const dailyGroups: DailyExpenseGroup[] = Object.entries(groupedExpensesMap)
    .map(([date, grouped]) => ({
      date,
      day: padDay(new Date(date).getDate()),
      total: grouped.reduce((sum, item) => sum + item.amount, 0),
      expenses: grouped.sort(
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

  const topCategory = categoryTotals[0];
  const spendingDays = dailyGroups.length;
  const noSpendDays = daysInMonth - spendingDays;
  const highestSpendingDay = [...dailyGroups].sort((a, b) => b.total - a.total)[0];
  const averageDailySpend =
    spendingDays > 0 ? totalMonthlyExpense / spendingDays : 0;

  const insights = [
    {
      label: "Top Category",
      value: topCategory ? topCategory.category : "No data",
      helperText: topCategory ? formatBDT(topCategory.amount) : "No expenses yet",
    },
    {
      label: "Highest Spending Day",
      value: highestSpendingDay ? `Day ${highestSpendingDay.day}` : "No data",
      helperText: highestSpendingDay
        ? formatBDT(highestSpendingDay.total)
        : "No expenses yet",
    },
    {
      label: "Average Spending Day",
      value: formatBDT(averageDailySpend),
      helperText:
        spendingDays > 0
          ? `Across ${spendingDays} spending day${spendingDays > 1 ? "s" : ""}`
          : "No spending days yet",
    },
    {
      label: "No-Spend Days",
      value: String(noSpendDays),
      helperText: `Out of ${daysInMonth} day${daysInMonth > 1 ? "s" : ""}`,
    },
  ];

  return {
    month,
    year,
    totalMonthlyExpense,
    categoryTotals,
    chartData,
    dailyGroups,
    insights,
  };
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

  const normalizedExpenses: ExpenseItemDTO[] = rawExpenses.map((expense) => ({
    id: String(expense._id),
    title: expense.title,
    amount: Number(expense.amount) || 0,
    category: expense.category,
    note: expense.note || "",
    date: new Date(expense.date).toISOString(),
    isFixed: Boolean(expense.isFixed),
  }));

  return buildMonthlyExpenseAnalytics(normalizedExpenses, year, month);
}

export function getDemoExpenses(): ExpenseRecord[] {
  return [
    {
      _id: "demo-expense-1",
      title: "Apartment rent",
      amount: 18000,
      category: "Rent",
      note: "Monthly apartment payment",
      date: formatDemoDate(2),
      isFixed: true,
    },
    {
      _id: "demo-expense-2",
      title: "Grocery restock",
      amount: 3450,
      category: "Food",
      note: "Weekly household groceries",
      date: formatDemoDate(5),
      isFixed: false,
    },
    {
      _id: "demo-expense-3",
      title: "Internet bill",
      amount: 1500,
      category: "Internet",
      note: "Home broadband",
      date: formatDemoDate(6),
      isFixed: true,
    },
    {
      _id: "demo-expense-4",
      title: "Electricity bill",
      amount: 3100,
      category: "Bills",
      note: "Current month usage",
      date: formatDemoDate(8),
      isFixed: true,
    },
    {
      _id: "demo-expense-5",
      title: "Office commute",
      amount: 2200,
      category: "Transport",
      note: "Rideshare and fuel",
      date: formatDemoDate(9),
      isFixed: false,
    },
    {
      _id: "demo-expense-6",
      title: "Parents' medicine",
      amount: 1850,
      category: "Health",
      note: "Monthly refill",
      date: formatDemoDate(11),
      isFixed: false,
    },
    {
      _id: "demo-expense-7",
      title: "Design course subscription",
      amount: 1250,
      category: "Education",
      note: "Skill upgrade plan",
      date: formatDemoDate(13),
      isFixed: true,
    },
    {
      _id: "demo-expense-8",
      title: "Family dinner",
      amount: 1950,
      category: "Entertainment",
      note: "Weekend outing",
      date: formatDemoDate(15),
      isFixed: false,
    },
    {
      _id: "demo-expense-9",
      title: "Kitchen supplies",
      amount: 1650,
      category: "Shopping",
      note: "Storage boxes and cleaners",
      date: formatDemoDate(18),
      isFixed: false,
    },
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getDemoMonthlyExpenseAnalytics(): MonthlyExpenseAnalytics {
  const now = new Date();
  const normalizedDemoExpenses: ExpenseItemDTO[] = getDemoExpenses().map((expense) => ({
    id: expense._id,
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    note: expense.note || "",
    date: expense.date,
    isFixed: expense.isFixed,
  }));

  return buildMonthlyExpenseAnalytics(
    normalizedDemoExpenses,
    now.getFullYear(),
    now.getMonth() + 1
  );
}

