import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/components/lib/db";
import { getSessionFromCookies } from "@/components/lib/auth";
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
      data: user,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch profile",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
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

    const body = await request.json();
    const {
      name,
      city,
      profession,
      monthlyIncome,
      monthlySavingsGoal,
    } = body;

    await connectToDatabase();

    const user = await User.findById(session.userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (name !== undefined) user.name = String(name).trim();
    if (city !== undefined) user.city = String(city).trim();
    if (profession !== undefined) user.profession = String(profession).trim();

    if (monthlyIncome !== undefined) {
      const parsedIncome = Number(monthlyIncome);

      if (Number.isNaN(parsedIncome) || parsedIncome < 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Monthly income must be a valid non-negative number",
          },
          { status: 400 }
        );
      }

      user.monthlyIncome = parsedIncome;
    }

    if (monthlySavingsGoal !== undefined) {
      const parsedGoal = Number(monthlySavingsGoal);

      if (Number.isNaN(parsedGoal) || parsedGoal < 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Savings goal must be a valid non-negative number",
          },
          { status: 400 }
        );
      }

      user.monthlySavingsGoal = parsedGoal;
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        city: user.city,
        profession: user.profession,
        monthlyIncome: user.monthlyIncome,
        monthlySavingsGoal: user.monthlySavingsGoal,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update profile",
      },
      { status: 500 }
    );
  }
}