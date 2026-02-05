import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteAdminSession, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  try {
    await deleteAdminSession();

    // Clear cookie
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json(
      { success: false, error: "Logout failed" },
      { status: 500 }
    );
  }
}
