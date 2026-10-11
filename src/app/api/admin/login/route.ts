import { NextResponse } from "next/server";
import { verifyCredentials, createSessionToken, setAdminSessionCookie, removeAdminSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: "Password is required." }, { status: 400 });
    }

    const isValid = await verifyCredentials(password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid administrator credentials." }, { status: 401 });
    }

    const token = await createSessionToken();
    await setAdminSessionCookie(token);

    return NextResponse.json({ success: true, message: "Logged in successfully." });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Authentication failed." }, { status: 500 });
  }
}

export async function DELETE() {
  await removeAdminSessionCookie();
  return NextResponse.json({ success: true, message: "Logged out successfully." });
}
