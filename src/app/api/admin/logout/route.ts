import { NextResponse } from "next/server";
import { removeAdminSessionCookie } from "@/lib/auth";

export async function POST() {
  await removeAdminSessionCookie();
  return NextResponse.json({ success: true });
}

export async function GET() {
  await removeAdminSessionCookie();
  return NextResponse.redirect(new URL("/admin/login", "http://localhost:3000"));
}
