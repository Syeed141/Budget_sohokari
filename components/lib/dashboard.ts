import { connectToDatabase } from "@/components/lib/db";
import Expense from "@/components/models/Expense";
import User from "@/components/models/User";

type SpendingCalendarCell = {
  key: string;
  isoDate: string | null;
  dayNumber: number | null;
  total: number | null;
  isToday: boolean;
  intensity: number;
};

export type DashboardSummary = {
  user: {
    id: string;
    name: string;
    email: string;
    city: string;
    profession: string;
    monthlyIncome: number;
    monthlySavingsGoal: number;
  };
  totals: {
    monthlyIncome: number;
    monthlyExpenses: number;
    remainingBalance: number;
    safeDailySpend: number;
    actualSavings: number;
    savingsGoal: number;
    savingsProgressPercentage: number;
  };
  categoryBreakdown: Array<{
    category: string;
    total: number;
  }>;
  recentExpenses: Array<{
    _id: string;
    title: string;
    category: string;
    amount: number;
    date: string;
    isFixed: boolean;
    note?: string;
  }>;
  spendingCalendar: {
    monthLabel: string;
    weekdayLabels: string[];
    highestDailySpend: number;
    days: SpendingCalendarCell[];
  };
};

function formatDemoDate(day: number) {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), day, 12).toISOString();
}

function getDemoSnapshotDate(day: number) {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), day, 12);
}

function getMonthRange(date = new Date()) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  return { start, end };
}

function getRemainingDaysInMonth(date = new Date()) {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const currentDay = date.getDate();
  return Math.max(lastDay - currentDay + 1, 1);
}

function roundToTwo(num: number) {
  return Math.round(num * 100) / 100;
}

function buildSpendingCalendar(
  dailyTotals: Map<number, number>,
  date = new Date()
): DashboardSummary["spendingCalendar"] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = firstDay.getDay();
  const highestDailySpend = Math.max(...dailyTotals.values(), 0);
  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days: SpendingCalendarCell[] = [];

  for (let index = 0; index < leadingBlanks; index += 1) {
    days.push({
      key: `blank-${index}`,
      isoDate: null,
      dayNumber: null,
      total: null,
      isToday: false,
      intensity: 0,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const cellDate = new Date(year, month, day);
    const total = dailyTotals.get(day) || 0;
    const isToday =
      cellDate.getFullYear() === date.getFullYear() &&
      cellDate.getMonth() === date.getMonth() &&
      cellDate.getDate() === date.getDate();
    const intensity =
      highestDailySpend > 0 && total > 0 ? Math.max(total / highestDailySpend, 0.15) : 0;

    days.push({
      key: cellDate.toISOString(),
      isoDate: cellDate.toISOString(),
      dayNumber: day,
      total: roundToTwo(total),
      isToday,
      intensity: roundToTwo(intensity),
    });
  }

  return {
    monthLabel: new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date),
    weekdayLabels,
    highestDailySpend: roundToTwo(highestDailySpend),
    days,
  };
}

export async function getDashboardData(userId: string): Promise<DashboardSummary> {
  await connectToDatabase();

  const user = await User.findById(userId).select(
    "_id name email city profession monthlyIncome monthlySavingsGoal"
  );

  if (!user) {
    throw new Error("User not found");
  }

  const now = new Date();
  const { start, end } = getMonthRange(now);

  const monthlyExpenses = await Expense.find({
    userId,
    date: {
      $gte: start,
      $lt: end,
    },
  }).sort({ date: -1, createdAt: -1 });

  const recentExpenses = await Expense.find({
    userId,
  })
    .sort({ date: -1, createdAt: -1 })
    .limit(5);

  const totalMonthlyExpenses = monthlyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const monthlyIncome = user.monthlyIncome || 0;
  const savingsGoal = user.monthlySavingsGoal || 0;
  const monthlySpendableBudget = monthlyIncome - savingsGoal;
  const remainingSpendableBudget = monthlySpendableBudget - totalMonthlyExpenses;
  const remainingBalance = monthlyIncome - totalMonthlyExpenses;
  const actualSavings = remainingBalance;
  const remainingDays = getRemainingDaysInMonth(now);
  // Daily safe spend is based on the spendable portion of income
  // after reserving savings goal, distributed across remaining days.
  const safeDailySpend = remainingSpendableBudget / remainingDays;

  const categoryMap = new Map<string, number>();
  const dailyTotalsMap = new Map<number, number>();

  for (const expense of monthlyExpenses) {
    const current = categoryMap.get(expense.category) || 0;
    categoryMap.set(expense.category, current + expense.amount);
    const expenseDay = new Date(expense.date).getDate();
    const currentDayTotal = dailyTotalsMap.get(expenseDay) || 0;
    dailyTotalsMap.set(expenseDay, currentDayTotal + expense.amount);
  }

  const categoryBreakdown = Array.from(categoryMap.entries())
    .map(([category, total]) => ({
      category,
      total,
    }))
    .sort((a, b) => b.total - a.total);

  const savingsProgressPercentage =
    savingsGoal > 0
      ? Math.min(Math.max((actualSavings / savingsGoal) * 100, 0), 100)
      : 0;

  return {
    user: {
      id: user._id.toString(),
      name: user.name || "",
      email: user.email || "",
      city: user.city || "",
      profession: user.profession || "",
      monthlyIncome,
      monthlySavingsGoal: savingsGoal,
    },
    totals: {
      monthlyIncome: roundToTwo(monthlyIncome),
      monthlyExpenses: roundToTwo(totalMonthlyExpenses),
      remainingBalance: roundToTwo(remainingBalance),
      safeDailySpend: roundToTwo(safeDailySpend),
      actualSavings: roundToTwo(actualSavings),
      savingsGoal: roundToTwo(savingsGoal),
      savingsProgressPercentage: roundToTwo(savingsProgressPercentage),
    },
    categoryBreakdown,
    recentExpenses: recentExpenses.map((expense) => ({
      _id: expense._id.toString(),
      title: expense.title,
      category: expense.category,
      amount: expense.amount,
      date: expense.date.toISOString(),
      isFixed: expense.isFixed,
      note: expense.note || "",
    })),
    spendingCalendar: buildSpendingCalendar(dailyTotalsMap, now),
  };
}

export function getDemoDashboardData(): DashboardSummary {
  const snapshotDate = getDemoSnapshotDate(10);
  const monthlyIncome = 85000;
  const savingsGoal = 15000;
  const monthlyExpenses = 46850;
  const remainingBalance = monthlyIncome - monthlyExpenses;
  const remainingDays = getRemainingDaysInMonth(snapshotDate);
  const monthlySpendableBudget = monthlyIncome - savingsGoal;
  const remainingSpendableBudget = monthlySpendableBudget - monthlyExpenses;
  const safeDailySpend = remainingSpendableBudget / remainingDays;
  const actualSavings = remainingBalance;
  const savingsProgressPercentage =
    savingsGoal > 0
      ? Math.min(Math.max((actualSavings / savingsGoal) * 100, 0), 100)
      : 0;
  const demoDailyTotals = new Map<number, number>([
    [2, 18000],
    [7, 3450],
    [8, 4600],
    [9, 4050],
    [12, 3100],
    [16, 3900],
    [19, 2400],
    [22, 1750],
    [24, 1600],
    [27, 4000],
  ]);

  return {
    user: {
      id: "demo-user",
      name: "Nusrat Jahan",
      email: "nusrat.demo@example.com",
      city: "Dhaka",
      profession: "Senior Product Designer",
      monthlyIncome,
      monthlySavingsGoal: savingsGoal,
    },
    totals: {
      monthlyIncome: roundToTwo(monthlyIncome),
      monthlyExpenses: roundToTwo(monthlyExpenses),
      remainingBalance: roundToTwo(remainingBalance),
      safeDailySpend: roundToTwo(safeDailySpend),
      actualSavings: roundToTwo(actualSavings),
      savingsGoal: roundToTwo(savingsGoal),
      savingsProgressPercentage: roundToTwo(savingsProgressPercentage),
    },
    categoryBreakdown: [
      { category: "Rent", total: 18000 },
      { category: "Food", total: 9650 },
      { category: "Transport", total: 5200 },
      { category: "Utilities", total: 4600 },
      { category: "Family", total: 3900 },
      { category: "Health", total: 3100 },
      { category: "Entertainment", total: 2400 },
    ],
    recentExpenses: [
      {
        _id: "demo-expense-1",
        title: "April apartment rent",
        category: "Rent",
        amount: 18000,
        date: formatDemoDate(2),
        isFixed: true,
        note: "Monthly house rent",
      },
      {
        _id: "demo-expense-2",
        title: "Weekly groceries",
        category: "Food",
        amount: 3450,
        date: formatDemoDate(7),
        isFixed: false,
        note: "Kitchen staples and produce",
      },
      {
        _id: "demo-expense-3",
        title: "Internet and electricity",
        category: "Utilities",
        amount: 4600,
        date: formatDemoDate(8),
        isFixed: true,
        note: "Home bills",
      },
      {
        _id: "demo-expense-4",
        title: "Ride share and fuel",
        category: "Transport",
        amount: 2200,
        date: formatDemoDate(9),
        isFixed: false,
        note: "Office commute",
      },
      {
        _id: "demo-expense-5",
        title: "Parents' medicine",
        category: "Health",
        amount: 1850,
        date: formatDemoDate(9),
        isFixed: false,
        note: "Monthly refill",
      },
    ],
    spendingCalendar: buildSpendingCalendar(demoDailyTotals, snapshotDate),
  };
}
