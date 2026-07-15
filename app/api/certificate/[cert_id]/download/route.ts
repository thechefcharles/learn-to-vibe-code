import { NextRequest, NextResponse } from "next/server";
import { getCertificateById } from "@/lib/certificate";

/**
 * GET /api/certificate/[cert_id]/download
 * Download certificate as HTML attachment
 * Public endpoint - no authentication required
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ cert_id: string }> }
) {
  try {
    const { cert_id } = await params;

    // Validate cert_id format
    if (!cert_id || !cert_id.startsWith("LVCC-")) {
      return NextResponse.json(
        { error: "Invalid certificate ID format" },
        { status: 400 }
      );
    }

    // Retrieve certificate data
    const certData = await getCertificateById(cert_id);

    if (!certData) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    // Return HTML with attachment header for download
    return new NextResponse(certData.html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="certificate-${cert_id}.html"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Certificate download error:", error);
    return NextResponse.json(
      { error: "Failed to download certificate" },
      { status: 500 }
    );
  }
}
