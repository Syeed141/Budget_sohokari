import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/components/lib/db";
import { getSessionFromCookies } from "@/components/lib/auth";
import User from "@/components/models/User";
import {
  validateCity,
  validateNonNegativeNumber,
  validatePersonName,
  validateProfession,
} from "@/components/lib/user-validation";

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

    if (name !== undefined) {
      const validatedName = validatePersonName(name);

      if (!validatedName.valid) {
        return NextResponse.json(
          {
            success: false,
            message: validatedName.message || "Invalid name",
          },
          { status: 400 }
        );
      }

      user.name = validatedName.value;
    }
    if (city !== undefined) {
      const validatedCity = validateCity(city);

      if (!validatedCity.valid) {
        return NextResponse.json(
          {
            success: false,
            message: validatedCity.message || "Invalid city",
          },
          { status: 400 }
        );
      }

      user.city = validatedCity.value;
    }

    if (profession !== undefined) {
      const validatedProfession = validateProfession(profession);

      if (!validatedProfession.valid) {
        return NextResponse.json(
          {
            success: false,
            message: validatedProfession.message || "Invalid profession",
          },
          { status: 400 }
        );
      }

      user.profession = validatedProfession.value;
    }

    if (monthlyIncome !== undefined) {
      const validatedIncome = validateNonNegativeNumber(
        monthlyIncome,
        "Monthly income"
      );

      if (!validatedIncome.valid) {
        return NextResponse.json(
          {
            success: false,
            message:
              validatedIncome.message ||
              "Monthly income must be a valid non-negative number",
          },
          { status: 400 }
        );
      }

      user.monthlyIncome = validatedIncome.value;
    }

    if (monthlySavingsGoal !== undefined) {
      const validatedGoal = validateNonNegativeNumber(
        monthlySavingsGoal,
        "Savings goal"
      );

      if (!validatedGoal.valid) {
        return NextResponse.json(
          {
            success: false,
            message:
              validatedGoal.message ||
              "Savings goal must be a valid non-negative number",
          },
          { status: 400 }
        );
      }

      user.monthlySavingsGoal = validatedGoal.value;
    }

    const nextIncome =
      monthlyIncome !== undefined ? user.monthlyIncome ?? 0 : user.monthlyIncome ?? 0;
    const nextSavingsGoal =
      monthlySavingsGoal !== undefined
        ? user.monthlySavingsGoal ?? 0
        : user.monthlySavingsGoal ?? 0;

    if (nextSavingsGoal > nextIncome) {
      return NextResponse.json(
        {
          success: false,
          message: "Savings goal cannot be greater than monthly income",
        },
        { status: 400 }
      );
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
