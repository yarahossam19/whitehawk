import { NextResponse } from "next/server";
import { issueCaptcha } from "@/lib/captcha";

// Runs on Cloudflare Workers / Vercel Edge — no Node-specific APIs.
export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  const challenge = await issueCaptcha();
  return NextResponse.json(challenge, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Pragma: "no-cache",
    },
  });
}
