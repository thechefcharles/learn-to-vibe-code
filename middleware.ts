import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // If there's an auth code in the URL (from Supabase password reset),
  // redirect to the reset-password page with the code
  const code = searchParams.get("code");
  if (code && request.nextUrl.pathname === "/") {
    // Check if it's a recovery code (Supabase adds other params with recovery codes)
    const error = searchParams.get("error");
    if (!error) {
      // Redirect to reset-password with the code
      const resetUrl = new URL("/auth/reset-password", request.url);
      resetUrl.searchParams.set("code", code);
      return NextResponse.redirect(resetUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
