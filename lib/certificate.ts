import { randomBytes } from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface CertificateData {
  userId: string;
  userName: string;
  completionDate: string;
  certId: string;
  moduleCount: number;
  contactHours: number;
  ceuCount: string;
}

/**
 * Generate a certificate as HTML string (to be rendered or converted to PDF)
 */
export function generateCertificateHTML(data: CertificateData): string {
  const formattedDate = new Date(data.completionDate).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Certificate of Completion - Learn to Vibe Code</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Georgia', serif;
      background: #f5f5f5;
      padding: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .certificate {
      width: 900px;
      height: 650px;
      background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
      border: 4px solid #1f2937;
      border-radius: 8px;
      padding: 60px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      position: relative;
    }
    .logo-area {
      position: absolute;
      top: 30px;
      left: 30px;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5em;
    }
    .header {
      border-bottom: 3px solid #7C3AED;
      padding-bottom: 20px;
      margin-bottom: 40px;
      margin-top: 20px;
    }
    .header h1 {
      font-style: italic;
      font-size: 2.8em;
      color: #1f2937;
      margin-bottom: 8px;
    }
    .header p {
      font-size: 1.1em;
      color: #7C3AED;
      font-weight: 600;
    }
    .body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 25px;
    }
    .statement {
      font-size: 1.2em;
      color: #374151;
      line-height: 1.6;
    }
    .learner-name {
      font-size: 2.5em;
      color: #1f2937;
      font-weight: bold;
      margin: 15px 0;
      text-decoration: underline;
      text-decoration-color: #7C3AED;
      text-decoration-thickness: 2px;
      text-underline-offset: 10px;
    }
    .achievement {
      font-size: 1.05em;
      color: #4b5563;
      line-height: 1.8;
    }
    .achievement strong {
      color: #1f2937;
      font-weight: 600;
    }
    .contact-hours {
      font-size: 1.1em;
      color: #7C3AED;
      font-weight: 600;
      margin-top: 10px;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-top: 20px;
      border-top: 1px solid #d1d5db;
      margin-top: 20px;
    }
    .signature {
      flex: 1;
      text-align: left;
    }
    .signature-line {
      width: 180px;
      height: 1px;
      background: #1f2937;
      margin-bottom: 4px;
    }
    .signature-title {
      font-size: 0.85em;
      color: #6b7280;
    }
    .cert-info {
      flex: 1;
      text-align: right;
      font-size: 0.85em;
    }
    .cert-id {
      color: #9ca3af;
      line-height: 1.6;
      font-family: 'Courier New', monospace;
    }
    .seal {
      flex: 0;
      font-size: 3.5em;
      margin: 0 20px;
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="logo-area">🎓</div>

    <div class="header">
      <h1>Certificate of Completion</h1>
      <p>Learn to Vibe Code</p>
    </div>

    <div class="body">
      <p class="statement">This is to certify that</p>
      <div class="learner-name">${escapeHtml(data.userName)}</div>
      <p class="achievement">
        has successfully completed<br/>
        <strong>Learn to Vibe Code</strong><br/>
        and demonstrated competency in AI-assisted full-stack development
      </p>
      <p class="contact-hours">
        ${data.contactHours} Contact Hours · ${data.ceuCount} CEUs
      </p>
    </div>

    <div class="footer">
      <div class="signature">
        <div class="signature-line"></div>
        <p class="signature-title">Authorized Signature</p>
      </div>
      <div class="seal">🏆</div>
      <div class="cert-info">
        <div class="cert-id">
          Certificate ID:<br/>
          ${escapeHtml(data.certId)}<br/>
          <br/>
          Completed:<br/>
          ${formattedDate}
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Escape HTML special characters for safe rendering
 */
function escapeHtml(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapeMap[char] || char);
}

/**
 * Create or retrieve a certificate for a learner
 * Called when capstone is graded as "pass"
 */
export async function issueCertificate(userId: string, userName: string) {
  try {
    // Generate cryptographically secure cert ID (128 bits of entropy)
    const certId = `LVCC-${randomBytes(16).toString("base64url").toUpperCase()}`;
    const completionDate = new Date().toISOString();

    // Check if learner already has a certificate
    const { data: existing } = await supabase
      .from("certificates")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (existing) {
      return existing; // Already issued
    }

    // Insert certificate record
    const { data, error } = await supabase
      .from("certificates")
      .insert({
        user_id: userId,
        cert_id: certId,
        issued_at: completionDate,
        url: `/certificate/share/${certId}`,
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Certificate issuance error:", error);
    throw error;
  }
}

/**
 * Get certificate HTML for a learner
 */
export async function getCertificateHTML(userId: string): Promise<string | null> {
  try {
    const { data: user } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", userId)
      .single();

    const { data: cert } = await supabase
      .from("certificates")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!user || !cert) return null;

    return generateCertificateHTML({
      userId,
      userName: user.name,
      completionDate: cert.issued_at,
      certId: cert.cert_id,
      moduleCount: 16,
      contactHours: 100,
      ceuCount: "10.0",
    });
  } catch (error) {
    console.error("Get certificate HTML error:", error);
    return null;
  }
}

/**
 * Convert certificate HTML to PDF buffer (MVP: returns HTML as-is for browser print-to-PDF)
 */
export function generateCertificatePDF(html: string): Buffer {
  // For MVP, we return the HTML as a buffer since learners will use browser print-to-PDF
  // In future phases, integrate html2pdf.js or similar for server-side PDF generation
  return Buffer.from(html, "utf-8");
}

/**
 * Retrieve certificate by cert_id (public access, no auth required)
 * Used for shareable certificate links
 */
export async function getCertificateById(
  certId: string
): Promise<{
  html: string;
  user: { id: string; name: string };
  certificate: { cert_id: string; issued_at: string };
} | null> {
  try {
    // Validate cert_id format
    if (!certId.startsWith("LVCC-")) {
      return null;
    }

    // Query certificate by cert_id
    const { data: cert, error: certError } = await supabase
      .from("certificates")
      .select("user_id, cert_id, issued_at")
      .eq("cert_id", certId)
      .single();

    if (certError || !cert) {
      console.error("Certificate not found:", certError);
      return null;
    }

    // Query user profile
    const { data: user, error: userError } = await supabase
      .from("profiles")
      .select("id, name")
      .eq("id", cert.user_id)
      .single();

    if (userError || !user) {
      console.error("User profile not found:", userError);
      return null;
    }

    // Generate certificate HTML
    const html = generateCertificateHTML({
      userId: user.id,
      userName: user.name,
      completionDate: cert.issued_at,
      certId: cert.cert_id,
      moduleCount: 16,
      contactHours: 100,
      ceuCount: "10.0",
    });

    return {
      html,
      user,
      certificate: {
        cert_id: cert.cert_id,
        issued_at: cert.issued_at,
      },
    };
  } catch (error) {
    console.error("Get certificate by ID error:", error);
    return null;
  }
}
