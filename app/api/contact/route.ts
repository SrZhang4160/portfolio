import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Check honeypot (spam protection)
    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      // Silently accept to not tip off spammers
      return NextResponse.json(
        { success: true, data: { id: "spam-blocked" } },
        { status: 201 }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject || null,
        message: validatedData.message,
        status: "unread",
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { success: true, data: submission },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Invalid input data" },
        { status: 400 }
      );
    }
    console.error("Error creating contact submission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit" },
      { status: 500 }
    );
  }
}
