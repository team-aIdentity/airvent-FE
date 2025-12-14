import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orderId,
      email,
      evmWalletAddress,
      solanaWalletAddress,
      country,
      residentRegNumber,
      personalClearanceNum,
      firstName,
      lastName,
      dateOfBirth,
      streetAddress,
      apartment,
      city,
      state,
      postalCode,
      phone,
    } = body;

    const shipping = await prisma.shipping.upsert({
      where: {
        orderId: orderId,
      },
      update: {
        email,
        evmWalletAddress,
        solanaWalletAddress,
        country,
        residentRegNumber,
        personalClearanceNum,
        firstName,
        lastName,
        dateOfBirth,
        streetAddress,
        apartment,
        city,
        state,
        postalCode,
        phone,
      },
      create: {
        orderId,
        email,
        evmWalletAddress,
        solanaWalletAddress,
        country,
        residentRegNumber,
        personalClearanceNum,
        firstName,
        lastName,
        dateOfBirth,
        streetAddress,
        apartment,
        city,
        state,
        postalCode,
        phone,
      },
    });

    return NextResponse.json({ shipping }, { status: 201 });
  } catch (error) {
    console.error("Shipping creation error:", error);
    return NextResponse.json(
      { error: "Failed to create shipping information" },
      { status: 500 },
    );
  }
}
