import { NextResponse } from "next/server";
import { isSessionValid } from "@/lib/auth";
import { getRates, updateRates } from "@/lib/db";

export async function GET() {
  const rates = getRates();
  return NextResponse.json({ rates });
}

export async function POST(req: Request) {
  const valid = await isSessionValid();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    const goldTola = Number(data.goldFinePerTola);
    const gold10g = Number(data.goldFinePer10g);
    const silverTola = Number(data.silverPerTola);
    const silver10g = Number(data.silverPer10g);

    if (isNaN(goldTola) || isNaN(gold10g) || isNaN(silverTola) || isNaN(silver10g)) {
      return NextResponse.json({ error: "Invalid numeric rates entered." }, { status: 400 });
    }

    const updated = updateRates({
      goldFinePerTola: goldTola,
      goldFinePer10g: gold10g,
      silverPerTola: silverTola,
      silverPer10g: silver10g,
      sourceAttribution: String(data.sourceAttribution || "Birgunj Bullion Association / Admin Verified").trim(),
      isAvailable: Boolean(data.isAvailable),
    });

    return NextResponse.json({ success: true, rates: updated });
  } catch (error) {
    console.error("Rates update error:", error);
    return NextResponse.json({ error: "Failed to update rates." }, { status: 500 });
  }
}
