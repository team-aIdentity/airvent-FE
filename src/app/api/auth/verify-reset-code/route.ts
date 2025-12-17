import { NextRequest, NextResponse } from "next/server";
import { verifyCodeWithoutDelete } from "@/lib/verification-code";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and code are required" },
        { status: 400 },
      );
    }

    // 코드 검증 (삭제하지 않음 - reset-password에서 다시 확인해야 함)
    const isValid = verifyCodeWithoutDelete(email, code);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired verification code" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Verification code is valid" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Verify reset code error:", error);
    return NextResponse.json(
      { error: "Failed to verify code" },
      { status: 500 },
    );
  }
}
