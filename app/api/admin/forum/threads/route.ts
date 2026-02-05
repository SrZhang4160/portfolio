import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const authResult = await isAuthenticated(request);
  if (!authResult) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "pending";

  try {
    const where = status === "all" ? {} : { status };
    const threads = await prisma.forumThread.findMany({
      where,
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
