import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    // Check admin authentication
    const isAdmin = await validateAdminSession();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const [
      pendingComments,
      pendingThreads,
      pendingReplies,
      unreadContacts,
      pendingCoffeeChats,
    ] = await Promise.all([
      prisma.comment.count({ where: { status: "pending" } }),
      prisma.forumThread.count({ where: { status: "pending" } }),
      prisma.forumReply.count({ where: { status: "pending" } }),
      prisma.contactSubmission.count({ where: { status: "unread" } }),
      prisma.coffeeChatRequest.count({ where: { status: "pending" } }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        pendingComments,
        pendingThreads,
        pendingReplies,
        unreadContacts,
        pendingCoffeeChats,
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
