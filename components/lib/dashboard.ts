import { connectToDatabase } from "@/components/lib/db";
import Expense from "@/components/models/Expense";
import User from "@/components/models/User";

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
};

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
  const remainingBalance = monthlyIncome - totalMonthlyExpenses;
  const actualSavings = remainingBalance;
  const remainingDays = getRemainingDaysInMonth(now);
  const safeDailySpend = remainingBalance > 0 ? remainingBalance / remainingDays : 0;

  const categoryMap = new Map<string, number>();

  for (const expense of monthlyExpenses) {
    const current = categoryMap.get(expense.category) || 0;
    categoryMap.set(expense.category, current + expense.amount);
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
  };
}