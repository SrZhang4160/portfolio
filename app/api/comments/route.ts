import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { commentSchema } from "@/lib/validations";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const targetType = searchParams.get("targetType");
    const targetSlug = searchParams.get("targetSlug");
    const status = searchParams.get("status");

    // Admin query - get comments by status for moderation
    if (status) {
      const authResult = await isAuthenticated(request);
      if (!authResult) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const where = status === "all" ? {} : { status };
      const comments = await prisma.comment.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({ success: true, data: comments });
    }

    // Public query - get approved comments for a specific target
    if (!targetType || !targetSlug) {
      return NextResponse.json(
        { success: false, error: "targetType and targetSlug are required" },
        { status: 400 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: {
        targetType,
        targetSlug,
        status: "approved",
      },
      select: {
        id: true,
        content: true,
        authorName: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = commentSchema.parse(body);

    const comment = await prisma.comment.create({
      data: {
        content: validatedData.content,
        authorName: validatedData.authorName,
        authorEmail: validatedData.authorEmail || null,
        targetType: validatedData.targetType,
        targetSlug: validatedData.targetSlug,
        status: "pending",
      },
      select: {
        id: true,
        content: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { success: true, data: comment },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Invalid input data" },
        { status: 400 }
      );
    }
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
