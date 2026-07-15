import { NextRequest, NextResponse } from "next/server";
import { getCertificateById } from "@/lib/certificate";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ cert_id: string }> }
) {
  try {
    const { cert_id } = await params;

    // Retrieve certificate data
    const certData = await getCertificateById(cert_id);
    if (!certData) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    // Return HTML with security headers
    // Use attachment disposition to force download, preventing inline rendering XSS
    return new NextResponse(certData.html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="certificate-${cert_id}.html"`,
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "sandbox; default-src 'none'; style-src 'unsafe-inline'",
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
