import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { threadSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get("topic");

    if (!topic) {
      return NextResponse.json(
        { success: false, error: "topic is required" },
        { status: 400 }
      );
    }

    const threads = await prisma.forumThread.findMany({
      where: {
        topic,
        status: "approved",
      },
      select: {
        id: true,
        title: true,
        content: true,
        authorName: true,
        createdAt: true,
        _count: {
          select: { replies: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: threads });
  } catch (error) {
    console.error("Error fetching threads:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch threads" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = threadSchema.parse(body);

    const thread = await prisma.forumThread.create({
      data: {
        topic: validatedData.topic,
        title: validatedData.title,
        content: validatedData.content,
        authorName: validatedData.authorName,
        authorEmail: validatedData.authorEmail || null,
        status: "pending",
      },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { success: true, data: thread },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Invalid input data" },
        { status: 400 }
      );
    }
    console.error("Error creating thread:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create thread" },
      { status: 500 }
    );
  }
}
