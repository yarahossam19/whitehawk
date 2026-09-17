import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/auth";
import { UPLOADS_DIR } from "@/lib/db";

// Replaces the Supabase Storage `post-covers` bucket. Files land in the same
// mounted volume as the database, and are read back by /api/uploads/<file>.
//
// This is a route handler rather than a Server Action because Server Actions
// cap their request body at 1 MB by default, well under the 5 MB the editor
// allows for a cover image.

const MAX_BYTES = 5 * 1024 * 1024;

// Fixed map rather than the browser-supplied filename: the extension decides
// what /api/uploads serves this back as, so it must not be attacker-chosen.
const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};

export async function POST(request: Request) {
  if (!(await getSessionEmail())) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  let file: File | null = null;
  try {
    const form = await request.formData();
    const value = form.get("file");
    if (value instanceof File) file = value;
  } catch {
    return NextResponse.json({ error: "Malformed upload" }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be under 5MB" }, { status: 413 });
  }

  const extension = EXTENSION_BY_TYPE[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: "Unsupported image type. Use JPEG, PNG, WebP, GIF, AVIF or SVG." },
      { status: 415 },
    );
  }

  const name = `${randomUUID()}.${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  // turbopackIgnore: UPLOADS_DIR is only known at runtime, and without this the
  // build-time file tracer treats it as a dynamic import root and traces the
  // whole project. Nothing under it is a module — it is uploaded data.
  await writeFile(path.join(/* turbopackIgnore: true */ UPLOADS_DIR, name), bytes);

  return NextResponse.json({ url: `/api/uploads/${name}` });
}
