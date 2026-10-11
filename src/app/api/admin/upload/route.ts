import { NextResponse } from "next/server";
import { isSessionValid } from "@/lib/auth";
import { getSupabaseAdminClient } from "@/lib/supabase";
import crypto from "crypto";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const BUCKET_NAME = "products";

export async function POST(req: Request) {
  // 1. Authenticate admin session
  const valid = await isSessionValid();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    // 2. Validate MIME type
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Invalid image format. Allowed formats: JPEG, PNG, WebP, GIF, SVG." },
        { status: 400 }
      );
    }

    // 3. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image file exceeds the 10MB limit." },
        { status: 400 }
      );
    }

    // 4. Generate unique, safe file path
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const cleanExt = extension.replace(/[^a-z0-9]/g, "");
    const safeBase = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "_")
      .slice(0, 30);
    const uniqueId = crypto.randomUUID().slice(0, 8);
    const fileName = `${Date.now()}-${uniqueId}-${safeBase}.${cleanExt || "jpg"}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 5. Upload to Supabase Storage
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error("Supabase Storage upload error:", error);
      return NextResponse.json(
        { error: `Storage upload failed: ${error.message}` },
        { status: 500 }
      );
    }

    // 6. Generate public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      path: data.path,
    });
  } catch (error) {
    console.error("Unexpected upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "File upload failed" },
      { status: 500 }
    );
  }
}
