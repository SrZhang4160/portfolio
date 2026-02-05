import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "";
const FROM_EMAIL = "Sharon Portfolio <onboarding@resend.dev>";

interface EmailResult {
  success: boolean;
  error?: string;
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
}): Promise<EmailResult> {
  if (!resend || !NOTIFICATION_EMAIL) {
    console.log("Email not configured, skipping notification");
    return { success: true };
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `New Contact: ${data.subject || "No subject"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${data.name} (${data.email})</p>
        <p><strong>Subject:</strong> ${data.subject || "No subject"}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br />")}</p>
        <hr />
        <p><a href="mailto:${data.email}?subject=Re: ${data.subject || "Your message"}">Reply to ${data.name}</a></p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send contact notification:", error);
    return { success: false, error: "Failed to send email" };
  }
}

export async function sendGuestMessageNotification(data: {
  name: string;
  message: string;
  stateId?: string | null;
}): Promise<EmailResult> {
  if (!resend || !NOTIFICATION_EMAIL) {
    console.log("Email not configured, skipping notification");
    return { success: true };
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `New Guest Message${data.stateId ? ` from ${data.stateId}` : ""}`,
      html: `
        <h2>New Guest Message on Travel Map</h2>
        <p><strong>From:</strong> ${data.name}</p>
        ${data.stateId ? `<p><strong>State:</strong> ${data.stateId}</p>` : ""}
        <hr />
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
        <hr />
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || ""}/admin/messages">View in Admin</a></p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send guest message notification:", error);
    return { success: false, error: "Failed to send email" };
  }
}
