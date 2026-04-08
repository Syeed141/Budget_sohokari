import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/components/lib/db";
import Expense from "@/components/models/Expense";
import { getSessionFromCookies } from "@/components/lib/auth";
import { validateExpenseInput } from "@/components/lib/expense-validation";

export async function GET() {
  try {
    const session = await getSessionFromCookies();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const expenses = await Expense.find({ userId: session.userId }).sort({
      date: -1,
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    console.error("Get expenses error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch expenses",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookies();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const body = await request.json();
    const validation = validateExpenseInput(body, false);
    if (!validation.data) {
      return NextResponse.json(
        {
          success: false,
          message: validation.message || "Invalid expense input",
        },
        { status: 400 }
      );
    }
    const { title, amount, category, note, date, isFixed } = validation.data;

    if (
      title === undefined ||
      amount === undefined ||
      category === undefined ||
      date === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, amount, category, and date are required",
        },
        { status: 400 }
      );
    }

    const expense = await Expense.create({
      userId: session.userId,
      title,
      amount,
      category,
      note: note || "",
      date: new Date(date),
      isFixed,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Expense created successfully",
        data: expense,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create expense error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create expense",
      },
      { status: 500 }
    );
  }
}
