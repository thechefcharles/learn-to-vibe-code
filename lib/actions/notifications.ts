"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send enrollment confirmation email
 */
export async function sendEnrollmentEmail(
  email: string,
  name: string,
  version: string
) {
  try {
    const result = await resend.emails.send({
      from: "Learn to Vibe Code <noreply@learntovibe.code>",
      to: email,
      subject: "Welcome to Learn to Vibe Code!",
      html: `
        <h2>Welcome, ${name}!</h2>
        <p>You've successfully enrolled in the <strong>Learn to Vibe Code</strong> course (${version === "kids" ? "Beginner" : "Advanced"} track).</p>
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
 * Send quiz feedback email
 */
export async function sendQuizFeedbackEmail(
  email: string,
  name: string,
  moduleName: string,
  score: number,
  passed: boolean
) {
  try {
    const result = await resend.emails.send({
      from: "Learn to Vibe Code <noreply@learntovibe.code>",
      to: email,
      subject: `Quiz Results: ${moduleName}`,
      html: `
        <h2>Quiz Results for ${moduleName}</h2>
        <p>Hi ${name},</p>
        <p>You scored <strong>${score}%</strong> on the ${moduleName} quiz.</p>
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
 * Send deliverable feedback email
 */
export async function sendDeliverableFeedbackEmail(
  email: string,
  name: string,
  moduleName: string,
  approved: boolean,
  feedback?: string
) {
  try {
    const result = await resend.emails.send({
      from: "Learn to Vibe Code <noreply@learntovibe.code>",
      to: email,
      subject: `Deliverable Review: ${moduleName}`,
      html: `
        <h2>Deliverable Review: ${moduleName}</h2>
        <p>Hi ${name},</p>
        ${
          approved
            ? `<p style="color: #10b981;"><strong>✓ Approved!</strong> Your deliverable for ${moduleName} has been approved.</p>`
            : `<p style="color: #ef4444;"><strong>Needs Revision</strong>. Your deliverable for ${moduleName} needs some work.</p>`
        }
        ${
          feedback
            ? `<p><strong>Feedback:</strong></p><p>${feedback}</p>`
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
 * Send capstone grading result email
 */
export async function sendCapstoneResultEmail(
  email: string,
  name: string,
  passed: boolean,
  score?: number
) {
  try {
    const result = await resend.emails.send({
      from: "Learn to Vibe Code <noreply@learntovibe.code>",
      to: email,
      subject: "Capstone Project Results",
      html: `
        <h2>Capstone Project Graded</h2>
        <p>Hi ${name},</p>
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
