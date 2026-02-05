import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { coffeeChatSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = coffeeChatSchema.parse(body);

    const chatRequest = await prisma.coffeeChatRequest.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company || null,
        role: validatedData.role || null,
        topic: validatedData.topic,
        preferredTime: validatedData.preferredTime || null,
        additionalNotes: validatedData.additionalNotes || null,
        status: "pending",
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { success: true, data: chatRequest },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Invalid input data" },
        { status: 400 }
      );
    }
    console.error("Error creating coffee chat request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit request" },
      { status: 500 }
    );
  }
}
