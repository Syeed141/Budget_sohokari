import { NextResponse } from "next/server";

function endpointDisabled() {
  return NextResponse.json(
    {
      success: false,
      message: "This endpoint is disabled.",
    },
    { status: 403 }
  );
}

export async function GET() {
  return endpointDisabled();
}

export async function POST() {
  return endpointDisabled();
}

