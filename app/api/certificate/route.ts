import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getCertificateHTML } from "@/lib/certificate";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * GET /api/certificate
 * Get certificate HTML for authenticated user
 */
export async function GET(req: NextRequest) {
  try {
    // Get auth header
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.substring(7);

    // Verify token and get user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get certificate HTML
    const certHtml = await getCertificateHTML(user.id);
    if (!certHtml) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ html: certHtml, userId: user.id });
  } catch (error) {
    console.error("Certificate fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificate" },
      { status: 500 }
    );
  }
}
