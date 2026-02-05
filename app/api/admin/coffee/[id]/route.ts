import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const authResult = await isAuthenticated(request);
  if (!authResult) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { status } = body;

    if (!["confirmed", "declined", "completed"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    const request_ = await prisma.coffeeChatRequest.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, data: request_ });
  } catch (error) {
    console.error("Error updating coffee request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update coffee request" },
      { status: 500 }
    );
  }
}
