import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  void request;
  return NextResponse.json(
    {
      success: false,
      message: "Not found",
    },
    { status: 404 }
  );
}
