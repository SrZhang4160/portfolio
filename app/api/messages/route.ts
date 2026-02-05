import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkMessage, checkName } from "@/lib/wordFilter";
import { sendGuestMessageNotification } from "@/lib/email";

// GET - Fetch approved messages (newest first, limit 50)
// Optional query param: ?stateId=XX to filter by state
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stateId = searchParams.get("stateId");

    const whereClause: { status: string; stateId?: string | { not: null } } = {
      status: "approved"
    };

    if (stateId) {
      whereClause.stateId = stateId;
    } else {
      // For travel map, only get messages with stateId
      whereClause.stateId = { not: null };
    }

    const messages = await prisma.guestMessage.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST - Submit new message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message, stateId } = body;

    // Validate required fields
    if (!name || !message) {
      return NextResponse.json(
        { success: false, error: "Name and message are required" },
        { status: 400 }
      );
    }

    // Validate lengths
    if (name.length > 50) {
      return NextResponse.json(
        { success: false, error: "Name must be 50 characters or less" },
        { status: 400 }
      );
    }

    if (message.length > 140) {
      return NextResponse.json(
        { success: false, error: "Message must be 140 characters or less" },
        { status: 400 }
      );
    }

    // Check name for bad words
    const nameCheck = checkName(name.trim());
    if (!nameCheck.isClean) {
      return NextResponse.json(
        { success: false, error: nameCheck.reason },
        { status: 400 }
      );
    }

    // Check message for bad words
    const messageCheck = checkMessage(message.trim());
    if (!messageCheck.isClean) {
      return NextResponse.json(
        { success: false, error: messageCheck.reason },
        { status: 400 }
      );
    }

    // Create the message (auto-approved)
    const newMessage = await prisma.guestMessage.create({
      data: {
        name: name.trim(),
        message: message.trim(),
        stateId: stateId || null,
        status: "approved",
      },
    });

    // Send email notification (non-blocking)
    sendGuestMessageNotification({
      name: name.trim(),
      message: message.trim(),
      stateId: stateId || null,
    }).catch((err) => console.error("Email notification failed:", err));

    return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create message" },
      { status: 500 }
    );
  }
}
