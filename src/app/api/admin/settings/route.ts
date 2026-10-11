import { NextResponse } from "next/server";
import { isSessionValid } from "@/lib/auth";
import { getSettings, updateSettings } from "@/lib/db";

export async function GET() {
  const valid = await isSessionValid();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = getSettings();
  return NextResponse.json({ settings });
}

export async function POST(req: Request) {
  const valid = await isSessionValid();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    // Validate WhatsApp number: ensure digits only or proper format
    let cleanWhatsapp = String(data.whatsappNumber || "9779845033095").replace(/\D/g, "");
    if (!cleanWhatsapp || cleanWhatsapp.length < 9) {
      return NextResponse.json(
        { error: "Invalid WhatsApp number. Please include country code and digits." },
        { status: 400 }
      );
    }

    // Validate external URLs if present
    const urlCheck = (urlStr: string) => {
      if (!urlStr || !urlStr.trim()) return true;
      try {
        new URL(urlStr);
        return true;
      } catch {
        return false;
      }
    };

    if (data.googleMapsUrl && !urlCheck(data.googleMapsUrl)) {
      return NextResponse.json({ error: "Invalid Google Maps URL format." }, { status: 400 });
    }
    if (data.facebookUrl && !urlCheck(data.facebookUrl)) {
      return NextResponse.json({ error: "Invalid Facebook URL format." }, { status: 400 });
    }
    if (data.instagramUrl && !urlCheck(data.instagramUrl)) {
      return NextResponse.json({ error: "Invalid Instagram URL format." }, { status: 400 });
    }

    const updated = updateSettings({
      storeName: data.storeName ? String(data.storeName).trim() : undefined,
      address: data.address ? String(data.address).trim() : undefined,
      whatsappNumber: cleanWhatsapp,
      phoneDisplay: data.phoneDisplay ? String(data.phoneDisplay).trim() : undefined,
      openingHours: data.openingHours ? String(data.openingHours).trim() : undefined,
      announcementText: data.announcementText ? String(data.announcementText).trim() : undefined,
      announcementActive: data.announcementActive !== undefined ? Boolean(data.announcementActive) : undefined,
      brandStory: data.brandStory ? String(data.brandStory).trim() : undefined,
      googleMapsUrl: data.googleMapsUrl ? String(data.googleMapsUrl).trim() : undefined,
      facebookUrl: data.facebookUrl ? String(data.facebookUrl).trim() : "",
      instagramUrl: data.instagramUrl ? String(data.instagramUrl).trim() : "",
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ error: "Failed to update business settings." }, { status: 500 });
  }
}
