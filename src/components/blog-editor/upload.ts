export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export type UploadedImage = { url: string; width: number | null; height: number | null };

/** Reads the image's pixel size in the browser, so figures are stored with width/height (no layout shift). */
function measure(file: File): Promise<{ width: number | null; height: number | null }> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth || null, height: img.naturalHeight || null });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ width: null, height: null });
    };
    img.src = url;
  });
}

/**
 * Uploads an image to the app's own storage. Used for covers and for figures
 * in the article body.
 *
 * Posted to a route handler rather than a Server Action: actions cap the
 * request body at 1MB, below the 5MB allowed here.
 */
export async function uploadImage(file: File): Promise<UploadedImage> {
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Image must be under 5MB");

  const [size, response] = await Promise.all([
    measure(file),
    (() => {
      const body = new FormData();
      body.append("file", file);
      return fetch("/api/admin/upload-cover", { method: "POST", body });
    })(),
  ]);

  const payload = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
  if (!response.ok || !payload?.url) {
    throw new Error(payload?.error ?? "Failed to upload image");
  }
  return { url: payload.url, ...size };
}
