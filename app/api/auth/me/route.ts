import { NextResponse } from "next/server";
import { getSessionFromCookies } from "@/components/lib/auth";
import { connectToDatabase } from "@/components/lib/db";
import User from "@/components/models/User";

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

    const user = await User.findById(session.userId).select(
      "_id name email city profession monthlyIncome monthlySavingsGoal"
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch current user",
      },
      { status: 500 }
    );
  }
}
