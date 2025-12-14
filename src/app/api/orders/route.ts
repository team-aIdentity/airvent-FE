import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      productType,
      color,
      price,
      transactionId,
      status = "confirmed",
    } = body;

    const order = await prisma.order.create({
      data: {
        userId,
        productType,
        color,
        price,
        transactionId,
        status,
      },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("id");

    if (orderId) {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { shipping: true, user: true },
      });
      return NextResponse.json({ order });
    }

    const orders = await prisma.order.findMany({
      include: { shipping: true, user: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
