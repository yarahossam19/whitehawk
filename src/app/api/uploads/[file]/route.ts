import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { UPLOADS_DIR } from "@/lib/db";

// Serves the blog cover images written by /api/admin/upload-cover. They can't
// live in public/, because that directory is baked into the Docker image at
// build time — an upload written there would vanish on the next deploy.

const CONTENT_TYPE_BY_EXTENSION: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
  svg: "image/svg+xml",
};

export async function GET(_request: Request, context: { params: Promise<{ file: string }> }) {
  const { file } = await context.params;

  // The names this app generates are `<uuid>.<ext>`. Anything else is either a
  // stale link or an attempt to walk out of the uploads directory.
  if (!/^[0-9a-f-]{36}\.[a-z0-9]{3,4}$/i.test(file)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const extension = file.split(".").pop()!.toLowerCase();
  const contentType = CONTENT_TYPE_BY_EXTENSION[extension];
  if (!contentType) return new NextResponse("Not found", { status: 404 });

  const absolute = path.join(UPLOADS_DIR, file);

  try {
    const info = await stat(absolute);
    if (!info.isFile()) return new NextResponse("Not found", { status: 404 });

    const bytes = await readFile(absolute);
    return new NextResponse(bytes, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(info.size),
        // Names are random and never reused, so these are safe to pin.
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
