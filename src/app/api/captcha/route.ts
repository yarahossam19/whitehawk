import { NextResponse } from "next/server";
import { issueCaptcha } from "@/lib/captcha";

// Each call must be a fresh challenge — never cached.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const challenge = issueCaptcha();
  return NextResponse.json(challenge, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Pragma: "no-cache",
    },
  });
}
