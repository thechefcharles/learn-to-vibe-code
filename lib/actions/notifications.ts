"use server";

import { Resend } from "resend";
import { getUser } from "@/lib/auth";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Escape HTML special characters to prevent injection
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}

/**
 * Send enrollment confirmation email (server action)
 */
export async function sendEnrollmentEmail(
  email: string,
  name: string,
  version: string
) {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  // Verify user is sending email for themselves or is instructor
  if (user.id !== email && user.role !== "instructor") {
    throw new Error("Unauthorized");
  }

  // Validate email format
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw new Error("Invalid email address");
  }

  // Escape user input
  const escapedName = escapeHtml(name);
  const escapedVersion = escapeHtml(version);

  try {
    const result = await resend.emails.send({
      from: "Learn to Vibe Code <noreply@learntovibe.code>",
      to: email,
      subject: "Welcome to Learn to Vibe Code!",
      html: `
        <h2>Welcome, ${escapedName}!</h2>
        <p>You've successfully enrolled in the <strong>Learn to Vibe Code</strong> course (${escapedVersion === "kids" ? "Beginner" : "Advanced"} track).</p>
        <p>You're now ready to start learning AI-assisted full-stack development. Head to your dashboard to begin Module 1.</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/course" style="background: #7C3AED; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">Start Learning</a></p>
        <p>Questions? Reply to this email or visit our support page.</p>
      `,
    });

    if (result.error) {
      console.error("Enrollment email error:", result.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send enrollment email:", error);
    return false;
  }
}

/**
 * Send quiz feedback email (instructor only)
 */
export async function sendQuizFeedbackEmail(
  email: string,
  name: string,
  moduleName: string,
  score: number,
  passed: boolean
) {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  // Only instructors can send feedback emails
  if (user.role !== "instructor") {
    throw new Error("Unauthorized: only instructors can send feedback");
  }

  // Validate inputs
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw new Error("Invalid email address");
  }
  if (score < 0 || score > 100) {
    throw new Error("Invalid score");
  }

  // Escape user input
  const escapedName = escapeHtml(name);
  const escapedModule = escapeHtml(moduleName);

  try {
    const result = await resend.emails.send({
      from: "Learn to Vibe Code <noreply@learntovibe.code>",
      to: email,
      subject: `Quiz Results: ${escapedModule}`,
      html: `
        <h2>Quiz Results for ${escapedModule}</h2>
        <p>Hi ${escapedName},</p>
        <p>You scored <strong>${score}%</strong> on the ${escapedModule} quiz.</p>
        ${
          passed
            ? `<p style="color: #10b981;"><strong>✓ Passed!</strong> You're ready to move on to the next module.</p>`
            : `<p style="color: #ef4444;"><strong>✗ Not quite yet.</strong> You need 80% to pass. Feel free to retake the quiz to improve your score.</p>`
        }
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/course" style="background: #7C3AED; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">Return to Course</a></p>
      `,
    });

    if (result.error) {
      console.error("Quiz feedback email error:", result.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send quiz feedback email:", error);
    return false;
  }
}

/**
 * Send deliverable feedback email (instructor only)
 */
export async function sendDeliverableFeedbackEmail(
  email: string,
  name: string,
  moduleName: string,
  approved: boolean,
  feedback?: string
) {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  // Only instructors can send feedback emails
  if (user.role !== "instructor") {
    throw new Error("Unauthorized: only instructors can send feedback");
  }

  // Validate email
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw new Error("Invalid email address");
  }

  // Escape user input
  const escapedName = escapeHtml(name);
  const escapedModule = escapeHtml(moduleName);
  const escapedFeedback = feedback ? escapeHtml(feedback) : "";

  try {
    const result = await resend.emails.send({
      from: "Learn to Vibe Code <noreply@learntovibe.code>",
      to: email,
      subject: `Deliverable Review: ${escapedModule}`,
      html: `
        <h2>Deliverable Review: ${escapedModule}</h2>
        <p>Hi ${escapedName},</p>
        ${
          approved
            ? `<p style="color: #10b981;"><strong>✓ Approved!</strong> Your deliverable for ${escapedModule} has been approved.</p>`
            : `<p style="color: #ef4444;"><strong>Needs Revision</strong>. Your deliverable for ${escapedModule} needs some work.</p>`
        }
        ${
          escapedFeedback
            ? `<p><strong>Feedback:</strong></p><p>${escapedFeedback}</p>`
            : ""
        }
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/course" style="background: #7C3AED; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">View Submission</a></p>
      `,
    });

    if (result.error) {
      console.error("Deliverable feedback email error:", result.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send deliverable feedback email:", error);
    return false;
  }
}

/**
 * Send capstone grading result email (instructor only)
 */
export async function sendCapstoneResultEmail(
  email: string,
  name: string,
  passed: boolean,
  score?: number
) {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  // Only instructors can send grading emails
  if (user.role !== "instructor") {
    throw new Error("Unauthorized: only instructors can send results");
  }

  // Validate email
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw new Error("Invalid email address");
  }

  // Escape user input
  const escapedName = escapeHtml(name);

  try {
    const result = await resend.emails.send({
      from: "Learn to Vibe Code <noreply@learntovibe.code>",
      to: email,
      subject: "Capstone Project Results",
      html: `
        <h2>Capstone Project Graded</h2>
        <p>Hi ${escapedName},</p>
        ${
          passed
            ? `<p style="color: #10b981;"><strong>✓ Congratulations!</strong> You've successfully completed the capstone project.</p>
               <p>Your certificate has been issued and is ready to download.</p>
               <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/badges" style="background: #7C3AED; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">View Certificate</a></p>`
            : `<p style="color: #ef4444;"><strong>Needs Revision</strong>. We've reviewed your capstone project and have some feedback.</p>
               <p>You're welcome to resubmit with improvements. <a href="${process.env.NEXT_PUBLIC_APP_URL}/capstone">Resubmit</a></p>`
        }
      `,
    });

    if (result.error) {
      console.error("Capstone result email error:", result.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send capstone result email:", error);
    return false;
  }
}

/**
 * Send donation receipt email
 */
export async function sendDonationEmail(
  email: string,
  amount: number,
  currency: string = "USD"
) {
  // Validate email format
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw new Error("Invalid email address");
  }

  // Validate amount (in cents, so $5 = 500)
  if (amount < 100 || amount > 1000000) {
    throw new Error("Invalid donation amount");
  }

  const amountUSD = (amount / 100).toFixed(2);

  try {
    const result = await resend.emails.send({
      from: "Learn to Vibe Code <noreply@learntovibe.code>",
      to: email,
      subject: "Thank You for Your Donation!",
      html: `
        <h2>Thank You for Supporting Learn to Vibe Code</h2>
        <p>We've received your donation of <strong>$${amountUSD} ${currency}</strong>.</p>
        <p>Your support directly funds:</p>
        <ul style="font-size: 14px; line-height: 1.8; color: #555;">
          <li>Server infrastructure and course hosting</li>
          <li>Content development and curriculum updates</li>
          <li>Instructor grading and learner support</li>
          <li>Accreditation pursuit (CPD interim, IACET full)</li>
          <li>Continuous platform improvements</li>
        </ul>
        <p style="margin-top: 24px;">You can track your learning progress and access all course materials here:</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #7C3AED; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">Go to Dashboard</a></p>
        <p style="margin-top: 20px; font-size: 12px; color: #999;">Questions? Reply to this email or visit our support page.</p>
      `,
    });

    if (result.error) {
      console.error("Donation email error:", result.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send donation email:", error);
    return false;
  }
}
