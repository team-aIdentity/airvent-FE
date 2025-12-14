import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> },
) {
  try {
    const { orderId } = await params;
    const token = request.cookies.get("airventToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Admin 권한 확인
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { role: true },
    });

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { trackingNumber, carrier, shippedAt, deliveredAt } = body;

    // Shipping 정보 업데이트
    const shipping = await prisma.shipping.update({
      where: { orderId },
      data: {
        trackingNumber: trackingNumber || null,
        carrier: carrier || null,
        shippedAt: shippedAt ? new Date(shippedAt) : null,
        deliveredAt: deliveredAt ? new Date(deliveredAt) : null,
      },
    });

    return NextResponse.json({ shipping }, { status: 200 });
  } catch (error) {
    console.error("Update shipping error:", error);
    return NextResponse.json(
      { error: "Failed to update shipping information" },
      { status: 500 },
    );
  }
}
