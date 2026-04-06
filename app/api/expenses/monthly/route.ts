import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/components/lib/db";
import Expense from "@/components/models/Expense";
import { getSessionFromCookies } from "@/components/lib/auth";

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

function padDay(day: number) {
  return String(day).padStart(2, "0");
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function getMonthDateRange(year: number, month: number) {
  const start = new Date(year, month - 1, 1, 0, 0, 0, 0);
  const end = new Date(year, month, 1, 0, 0, 0, 0);

  return { start, end };
}

function normalizeCategory(category?: string) {
  if (!category) return "Other";

  const map: Record<string, string> = {
    food: "Food",
    transport: "Transport",
    rent: "Rent",
    bills: "Bills",
    shopping: "Shopping",
    health: "Health",
    education: "Education",
    entertainment: "Entertainment",
    other: "Other",
  };

  return map[category.toLowerCase()] || "Other";
}

function getLocalDateKey(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const session = await getSessionFromCookies();

    if (!session?.userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const monthParam = searchParams.get("month");
    const yearParam = searchParams.get("year");

    const now = new Date();
    const month = Number(monthParam || now.getMonth() + 1);
    const year = Number(yearParam || now.getFullYear());

    if (!month || !year || month < 1 || month > 12) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid month or year",
        },
        { status: 400 }
      );
    }

    const { start, end } = getMonthDateRange(year, month);

    const rawExpenses = await Expense.find({
      userId: session.userId,
      date: {
        $gte: start,
        $lt: end,
      },
    })
      .sort({ date: 1, createdAt: 1 })
      .lean();

    const daysInMonth = getDaysInMonth(year, month);

    const chartRowsMap: Record<number, Record<string, string | number>> = {};
    const groupedExpensesMap: Record<string, any[]> = {};
    const categoryTotalsMap: Record<string, number> = {};

    for (let day = 1; day <= daysInMonth; day++) {
      const row: Record<string, string | number> = {
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
      const category = normalizeCategory(expense.category);
      const amount = Number(expense.amount) || 0;
      const localDateKey = getLocalDateKey(expenseDate);

      chartRowsMap[dayOfMonth][category] =
        Number(chartRowsMap[dayOfMonth][category]) + amount;

      chartRowsMap[dayOfMonth].total =
        Number(chartRowsMap[dayOfMonth].total) + amount;

      categoryTotalsMap[category] = (categoryTotalsMap[category] || 0) + amount;

      if (!groupedExpensesMap[localDateKey]) {
        groupedExpensesMap[localDateKey] = [];
      }

      groupedExpensesMap[localDateKey].push({
        id: String(expense._id),
        title: expense.title,
        amount,
        category,
        note: expense.note || "",
        date: expenseDate.toISOString(),
        isFixed: Boolean(expense.isFixed),
      });
    }

    const chartData = Object.values(chartRowsMap);

    const dailyGroups = Object.entries(groupedExpensesMap)
      .map(([date, expenses]) => ({
        date,
        day: padDay(new Date(date).getDate()),
        total: expenses.reduce((sum, item) => sum + item.amount, 0),
        expenses: expenses.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const categoryTotals = Object.entries(categoryTotalsMap)
      .map(([category, amount]) => ({
        category,
        amount,
      }))
      .sort((a, b) => b.amount - a.amount);

    const totalMonthlyExpense = categoryTotals.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    return NextResponse.json({
      success: true,
      data: {
        month,
        year,
        totalMonthlyExpense,
        categoryTotals,
        chartData,
        dailyGroups,
      },
    });
  } catch (error) {
    console.error("Monthly analytics GET error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load monthly expense analytics",
      },
      { status: 500 }
    );
  }
}