import { NextResponse } from "next/server";

export async function POST() {
  try {
    // DATABASE_URL에서 postgres 데이터베이스로 연결
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return NextResponse.json(
        { error: "DATABASE_URL not set" },
        { status: 500 },
      );
    }

    // airvent를 postgres로 변경 (기본 데이터베이스)
    const adminUrl = dbUrl.replace("/airvent", "/postgres");

    // Prisma를 사용해서 직접 SQL 실행
    const { PrismaClient } = await import("@prisma/client");
    const adminPrisma = new PrismaClient({
      datasources: {
        db: {
          url: adminUrl,
        },
      },
    });

    // 데이터베이스 생성
    await adminPrisma.$executeRawUnsafe(
      "CREATE DATABASE IF NOT EXISTS airvent;",
    );
    await adminPrisma.$disconnect();

    return NextResponse.json({ message: "Database created successfully" });
  } catch (error: any) {
    // 이미 존재하면 무시
    if (error.message?.includes("already exists") || error.code === "42P04") {
      return NextResponse.json({ message: "Database already exists" });
    }
    console.error("Init DB error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create database" },
      { status: 500 },
    );
  }
}
