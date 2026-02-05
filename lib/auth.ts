import { cookies } from "next/headers";
import { prisma } from "./prisma";

const ADMIN_COOKIE_NAME = "admin_session";

export async function createAdminSession(): Promise<string> {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await prisma.adminSession.create({
    data: {
      token,
      expiresAt,
    },
  });

  return token;
}

export async function validateAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!sessionToken) return false;

  const session = await prisma.adminSession.findUnique({
    where: { token: sessionToken },
  });

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.adminSession.delete({ where: { id: session.id } });
    }
    return false;
  }

  return true;
}

export async function deleteAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (sessionToken) {
    await prisma.adminSession.deleteMany({
      where: { token: sessionToken },
    });
  }
}

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error("ADMIN_PASSWORD environment variable not set");
    return false;
  }
  return password === adminPassword;
}

export { ADMIN_COOKIE_NAME };

// Alias for isAuthenticated used in API routes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function isAuthenticated(_request?: unknown): Promise<boolean> {
  return validateAdminSession();
}
