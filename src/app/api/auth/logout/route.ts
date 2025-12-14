import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout successful" },
    { status: 200 },
  );

  // 쿠키 삭제
  response.cookies.delete("airventToken");

  return response;
}
