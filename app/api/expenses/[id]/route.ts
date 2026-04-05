import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/components/lib/db";
import Expense from "@/components/models/Expense";
import { getSessionFromCookies } from "@/components/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
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

    const { id } = await context.params;
    const body = await request.json();
    const { title, amount, category, note, date, isFixed } = body;

    await connectToDatabase();

    const expense = await Expense.findOne({
      _id: id,
      userId: session.userId,
    });

    if (!expense) {
      return NextResponse.json(
        {
          success: false,
          message: "Expense not found",
        },
        { status: 404 }
      );
    }

    if (title !== undefined) expense.title = title.trim();
    if (amount !== undefined) {
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

      expense.amount = parsedAmount;
    }
    if (category !== undefined) expense.category = category.trim();
    if (note !== undefined) expense.note = note.trim();
    if (date !== undefined) expense.date = date;
    if (isFixed !== undefined) expense.isFixed = Boolean(isFixed);

    await expense.save();

    return NextResponse.json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    console.error("Update expense error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update expense",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
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

    const { id } = await context.params;

    await connectToDatabase();

    const deletedExpense = await Expense.findOneAndDelete({
      _id: id,
      userId: session.userId,
    });

    if (!deletedExpense) {
      return NextResponse.json(
        {
          success: false,
          message: "Expense not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Delete expense error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete expense",
      },
      { status: 500 }
    );
  }
}