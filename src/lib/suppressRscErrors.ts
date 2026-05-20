/**
 * Suppress RSC payload 404 errors in production.
 * These errors occur when Next.js tries to fetch React Server Component payloads
 * for dynamic routes on Cloudflare Pages. They don't impact user experience.
 * 
 * This handler prevents these from cluttering the console in production.
 */
export function suppressRscErrors(): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") return;

  // Override console.error to suppress RSC 404 errors
  const originalError = console.error;
  
  console.error = function (...args: any[]) {
    const message = args[0]?.toString?.() ?? "";
    const isRscError = message.includes("?_rsc=") && message.includes("404");
    
    if (isRscError) {
      // Silently suppress RSC 404 errors
      return;
    }
    
    // Pass through all other errors
    originalError.apply(console, args);
  };

  // Also intercept fetch to suppress RSC 404 errors
  const originalFetch = window.fetch.bind(window);
  
  window.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    const isRscRequest = url.includes("?_rsc=");

    return originalFetch(input, init).catch((error: any) => {
      // Re-throw non-RSC errors
      if (!isRscRequest) throw error;
      // Silently suppress RSC payload fetch errors
      return new Response(null, { status: 404 });
    });
  }) as typeof fetch;
}
