import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/components/lib/db";
import User from "@/components/models/User";
import { createSessionToken, setSessionCookie } from "@/components/lib/auth";
import {
  validatePersonName,
  validateProfileFields,
} from "@/components/lib/user-validation";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const {
      name,
      email,
      password,
      city,
      profession,
      monthlyIncome,
      monthlySavingsGoal,
    } = body;

    if (
      !name ||
      !email ||
      !password ||
      city === undefined ||
      profession === undefined ||
      monthlyIncome === undefined ||
      monthlySavingsGoal === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, email, password, city, profession, monthly income, and savings goal are required",
        },
        { status: 400 }
      );
    }

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

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters long",
        },
        { status: 400 }
      );
    }

    const validatedProfile = validateProfileFields({
      city,
      profession,
      monthlyIncome,
      monthlySavingsGoal,
    });

    if (!validatedProfile.valid) {
      return NextResponse.json(
        {
          success: false,
          message: validatedProfile.message || "Invalid profile information",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "A user with this email already exists",
        },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: validatedName.value,
      email: normalizedEmail,
      passwordHash,
      city: validatedProfile.value.city,
      profession: validatedProfile.value.profession,
      monthlyIncome: validatedProfile.value.monthlyIncome,
      monthlySavingsGoal: validatedProfile.value.monthlySavingsGoal,
    });

    const token = await createSessionToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    await setSessionCookie(token);

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to register user",
      },
      { status: 500 }
    );
  }
}
