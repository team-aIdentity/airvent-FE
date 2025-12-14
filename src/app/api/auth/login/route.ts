import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;

    // 유효성 검사
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // 비밀번호 확인
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // JWT 토큰 생성
    const token = generateToken(user.id, user.email);

    // 응답에 토큰 포함
    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          nickname: user.nickname,
        },
        token,
        message: "Login successful",
      },
      { status: 200 },
    );

    // 쿠키에 토큰 저장
    const maxAge = rememberMe
      ? 60 * 60 * 24 * 30 // 30일 (초 단위)
      : 60 * 60; // 1시간 (초 단위)

    response.cookies.set("airventToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: maxAge,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
