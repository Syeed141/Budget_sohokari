import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/components/lib/db";
import Expense from "@/components/models/Expense";
import { getSessionFromCookies } from "@/components/lib/auth";

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
    const { title, amount, category, note, date, isFixed } = body;

    if (!title || amount === undefined || !category || !date) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, amount, category, and date are required",
        },
        { status: 400 }
      );
    }

    const parsedAmount = Number(amount);

    if (Number.isNaN(parsedAmount) || parsedAmount < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Amount must be a valid non-negative number",
        },
        { status: 400 }
      );
    }

    const expense = await Expense.create({
      userId: session.userId,
      title: title.trim(),
      amount: parsedAmount,
      category: category.trim(),
      note: note?.trim() || "",
      date,
      isFixed: Boolean(isFixed),
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