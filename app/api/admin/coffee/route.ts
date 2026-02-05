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
    const requests = await prisma.coffeeChatRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    console.error("Error fetching coffee requests:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch coffee requests" },
      { status: 500 }
    );
  }
}
