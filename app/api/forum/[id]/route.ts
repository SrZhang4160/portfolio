import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateAdminSession } from "@/lib/auth";
import { replySchema, commentStatusSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const thread = await prisma.forumThread.findUnique({
      where: { id, status: "approved" },
      select: {
        id: true,
        topic: true,
        title: true,
        content: true,
        authorName: true,
        createdAt: true,
        replies: {
          where: { status: "approved" },
          select: {
            id: true,
            content: true,
            authorName: true,
            parentId: true,
            createdAt: true,
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!thread) {
      return NextResponse.json(
        { success: false, error: "Thread not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: thread });
  } catch (error) {
    console.error("Error fetching thread:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch thread" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = replySchema.parse(body);

    // Verify thread exists
    const thread = await prisma.forumThread.findUnique({
      where: { id },
    });

    if (!thread) {
      return NextResponse.json(
        { success: false, error: "Thread not found" },
        { status: 404 }
      );
    }

    // If parentId is provided, verify it's a valid reply (max 2 levels)
    if (validatedData.parentId) {
      const parentReply = await prisma.forumReply.findUnique({
        where: { id: validatedData.parentId },
      });

      if (!parentReply) {
        return NextResponse.json(
          { success: false, error: "Parent reply not found" },
          { status: 404 }
        );
      }

      // Check if parent already has a parent (would be 3rd level)
      if (parentReply.parentId) {
        return NextResponse.json(
          { success: false, error: "Maximum nesting level reached" },
          { status: 400 }
        );
      }
    }

    const reply = await prisma.forumReply.create({
      data: {
        content: validatedData.content,
        authorName: validatedData.authorName,
        authorEmail: validatedData.authorEmail || null,
        threadId: id,
        parentId: validatedData.parentId || null,
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
      { success: true, data: reply },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Invalid input data" },
        { status: 400 }
      );
    }
    console.error("Error creating reply:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create reply" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    // Check admin authentication
    const isAdmin = await validateAdminSession();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = commentStatusSchema.parse(body);

    // Try to update as thread first, then as reply
    let updated;
    try {
      updated = await prisma.forumThread.update({
        where: { id },
        data: { status: validatedData.status },
        select: { id: true, status: true },
      });
    } catch {
      // If thread not found, try reply
      updated = await prisma.forumReply.update({
        where: { id },
        data: { status: validatedData.status },
        select: { id: true, status: true },
      });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating forum item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update" },
      { status: 500 }
    );
  }
}
