"use client";

// Last-resort fallback if the root layout itself throws. Kept as plain
// inline-styled markup (no Tailwind, no app providers) since the app shell
// that would normally supply them may be the thing that failed.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          font: "15px/1.5 system-ui, -apple-system, sans-serif",
          background: "#fafafa",
          color: "#111",
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
          margin: 0,
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "28rem", width: "100%", textAlign: "center", padding: "2rem" }}>
          <h1 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>This page didn't load</h1>
          <p style={{ color: "#4b5563", margin: "0 0 1.5rem" }}>
            Something went wrong on our end. You can try refreshing or head back home.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => reset()}
              style={{
                background: "#111",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                border: "1px solid transparent",
                font: "inherit",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                background: "#fff",
                color: "#111",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                border: "1px solid #d1d5db",
                font: "inherit",
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
