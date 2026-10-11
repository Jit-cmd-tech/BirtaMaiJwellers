import { NextResponse } from "next/server";
import { isSessionValid } from "@/lib/auth";
import { getInquiries, updateInquiryStatus } from "@/lib/db";

export async function GET() {
  const valid = await isSessionValid();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const inquiries = getInquiries();
  return NextResponse.json({ inquiries });
}

export async function PATCH(req: Request) {
  const valid = await isSessionValid();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required." }, { status: 400 });
    }

    const success = updateInquiryStatus(id, status);
    if (!success) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Inquiry update error:", error);
    return NextResponse.json({ error: "Failed to update inquiry." }, { status: 500 });
  }
}
