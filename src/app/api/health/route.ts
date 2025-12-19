import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 데이터베이스 연결 확인 (선택사항)
    // const prisma = await import('@/lib/prisma').then(m => m.prisma);
    // await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
        service: "airvent-nextjs",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
      },
      { status: 500 },
    );
  }
}
