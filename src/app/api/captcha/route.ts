import { NextResponse } from "next/server";
import { issueCaptcha } from "@/lib/captcha";

// `issueCaptcha` uses node:crypto and Buffer, so this cannot run on the edge.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { token, image } = issueCaptcha();

  return NextResponse.json(
    { token, image },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
      },
    },
  );
}
