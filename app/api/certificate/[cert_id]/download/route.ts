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

    // Return HTML for browser to render and print to PDF
    // Client-side will handle print-to-PDF conversion
    return new NextResponse(certData.html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `inline; filename="certificate-${cert_id}.html"`,
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
