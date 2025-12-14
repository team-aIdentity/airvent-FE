import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { setVerificationCode } from "@/lib/verification-code";

// 6자리 랜덤 숫자 생성
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 이메일 전송 설정
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // 인증 코드 생성
    const code = generateVerificationCode();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10분 후 만료

    setVerificationCode(email, code, 10);

    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: "Airvent Verification Code",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10B981;">Airvent Verification Code</h2>
            <p>This is your verification code for signing up.</p>
            <div style="background-color: #F0FDF4; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h1 style="color: #059669; font-size: 32px; letter-spacing: 8px; margin: 0;">${code}</h1>
            </div>
            <p style="color: #6B7280; font-size: 14px;">This code is valid for 10 minutes.</p>
            <p style="color: #6B7280; font-size: 14px;">If you did not request this, please ignore this email.</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Email send error:", emailError);
      if (process.env.NODE_ENV === "development") {
        console.log("=== 개발 모드: 인증 코드 ===");
        console.log(`이메일: ${email}`);
        console.log(`인증 코드: ${code}`);
        console.log("========================");
      }
    }

    return NextResponse.json(
      {
        message: "Verification code sent",
        ...(process.env.NODE_ENV === "development" && { code }),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Send verification code error:", error);
    return NextResponse.json(
      { error: "Failed to send verification code" },
      { status: 500 },
    );
  }
}
