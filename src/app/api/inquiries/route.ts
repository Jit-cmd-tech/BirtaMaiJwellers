import { NextResponse } from "next/server";
import { saveInquiry } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.phoneOrWhatsapp || !body.message) {
      return NextResponse.json(
        { error: "Full Name, Phone/WhatsApp, and Message are required." },
        { status: 400 }
      );
    }

    const saved = saveInquiry({
      fullName: String(body.fullName).trim(),
      phoneOrWhatsapp: String(body.phoneOrWhatsapp).trim(),
      inquiryType: String(body.inquiryType || "General Inquiry"),
      preferredDate: body.preferredDate ? String(body.preferredDate) : undefined,
      productInterest: body.productInterest ? String(body.productInterest) : undefined,
      message: String(body.message).trim(),
    });

    return NextResponse.json({ success: true, inquiry: saved }, { status: 201 });
  } catch (error) {
    console.error("Failed to save inquiry:", error);
    return NextResponse.json(
      { error: "Failed to record inquiry." },
      { status: 500 }
    );
  }
}
