/**
 * CSV Export Service
 * Converts learner records to RFC 4180 CSV format
 */

interface CsvRow {
  [key: string]: string | number | boolean | null;
}

/**
 * Convert array of objects to CSV string
 */
function convertToCSV(data: CsvRow[], headers: string[]): string {
  // Header row
  const headerRow = headers.map((h) => `"${h}"`).join(",");

  // Data rows
  const dataRows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header];
        if (value === null || value === undefined) return '""';
        const str = String(value);
        return `"${str.replace(/"/g, '""')}"`;
      })
      .join(",")
  );

  return [headerRow, ...dataRows].join("\n");
}

/**
 * Export learners to CSV
 */
export function exportLearnersCSV(
  learners: Array<{
    id: string;
    name: string;
    email: string;
    enrolled_version: string;
    enrolled_at: string;
    status: string;
  }>
): string {
  const headers = [
    "Learner ID",
    "Name",
    "Email",
    "Version",
    "Enrolled Date",
    "Status",
  ];

  const data = learners.map((learner) => ({
    "Learner ID": learner.id,
    Name: learner.name,
    Email: learner.email,
    Version: learner.enrolled_version,
    "Enrolled Date": new Date(learner.enrolled_at).toLocaleDateString(),
    Status: learner.status,
  }));

  return convertToCSV(data, headers);
}

/**
 * Export quiz attempts to CSV
 */
export function exportQuizAttemptsCSV(
  attempts: Array<{
    learner_id: string;
    learner_name: string;
    module_id: number;
    score_percent: number;
    passed: boolean;
    attempt_no: number;
    taken_at: string;
    target_audience: string;
  }>
): string {
  const headers = [
    "Learner ID",
    "Learner Name",
    "Module",
    "Quiz Date",
    "Score %",
    "Passed",
    "Attempt #",
    "Version",
  ];

  const data = attempts.map((attempt) => ({
    "Learner ID": attempt.learner_id,
    "Learner Name": attempt.learner_name,
    Module: `Module ${attempt.module_id}`,
    "Quiz Date": new Date(attempt.taken_at).toLocaleDateString(),
    "Score %": attempt.score_percent,
    Passed: attempt.passed ? "Yes" : "No",
    "Attempt #": attempt.attempt_no,
    Version: attempt.target_audience,
  }));

  return convertToCSV(data, headers);
}

/**
 * Export capstone submissions to CSV
 */
export function exportCapstoneCSV(
  submissions: Array<{
    learner_id: string;
    learner_name: string;
    repo_url: string;
    live_url: string;
    rubric_scores: Record<string, number>;
    result: string;
    target_audience: string;
    graded_by: string | null;
    submitted_at: string;
  }>
): string {
  // Collect all unique rubric keys
  const allRubricKeys = new Set<string>();
  submissions.forEach((sub) => {
    Object.keys(sub.rubric_scores).forEach((key) => allRubricKeys.add(key));
  });
  const rubricKeys = Array.from(allRubricKeys).sort();

  const headers = [
    "Learner ID",
    "Learner Name",
    "Repository URL",
    "Live URL",
    "Result",
    "Graded Date",
    "Version",
    ...rubricKeys.map((k) => `Score: ${k}`),
  ];

  const data = submissions.map((sub) => {
    const row: CsvRow = {
      "Learner ID": sub.learner_id,
      "Learner Name": sub.learner_name,
      "Repository URL": sub.repo_url,
      "Live URL": sub.live_url,
      Result: sub.result,
      "Graded Date": sub.graded_by ? new Date(sub.submitted_at).toLocaleDateString() : "Pending",
      Version: sub.target_audience,
    };

    rubricKeys.forEach((key) => {
      row[`Score: ${key}`] = sub.rubric_scores[key] || 0;
    });

    return row;
  });

  return convertToCSV(data, headers);
}

/**
 * Export certificates to CSV
 */
export function exportCertificatesCSV(
  certificates: Array<{
    learner_id: string;
    learner_name: string;
    cert_id: string;
    issued_at: string;
    ceu_value: number;
    url: string;
  }>
): string {
  const headers = [
    "Learner ID",
    "Learner Name",
    "Certificate ID",
    "Issued Date",
    "CEU Value",
    "Certificate URL",
  ];

  const data = certificates.map((cert) => ({
    "Learner ID": cert.learner_id,
    "Learner Name": cert.learner_name,
    "Certificate ID": cert.cert_id,
    "Issued Date": new Date(cert.issued_at).toLocaleDateString(),
    "CEU Value": cert.ceu_value,
    "Certificate URL": cert.url,
  }));

  return convertToCSV(data, headers);
}

/**
 * Generate filename with timestamp
 */
export function generateFilename(type: string): string {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  return `learners_${type}_${dateStr}.csv`;
}
