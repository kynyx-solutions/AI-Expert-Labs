import { getResendClient } from "../config/mailer.js";
import env from "../config/env.js";

const FORM_TYPE_LABELS = {
  contact: "Contact Form",
  consultation: "Consultation Booking",
  "free-consultation": "Free Consultation Request",
  enrollment: "Institute Enrollment",
  newsletter: "Newsletter Signup",
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const buildAdminEmail = (submission) => {
  const label = FORM_TYPE_LABELS[submission.formType] || "Website Form";

  const rows = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Phone", submission.phone],
    ["Company", submission.company],
    ["Subject", submission.subject],
    ["Message", submission.message],
    ["Source page", submission.source],
  ].filter(([, value]) => value);

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const htmlRows = rows
    .map(
      ([rowLabel, value]) => `
      <tr>
        <td style="padding:8px 12px;font-weight:600;color:#334155;border-bottom:1px solid #e2e8f0;white-space:nowrap;">${escapeHtml(
          rowLabel
        )}</td>
        <td style="padding:8px 12px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${escapeHtml(
          value
        ).replace(/\n/g, "<br/>")}</td>
      </tr>`
    )
    .join("");

  return {
    from: env.mailFrom,
    to: env.mailTo,
    replyTo: submission.email,
    subject: `New ${label} — ${submission.name}`,
    text: `New submission from the website (${label})\n\n${text}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#ea580c;">New ${escapeHtml(label)}</h2>
        <table style="width:100%;border-collapse:collapse;">${htmlRows}</table>
      </div>
    `,
  };
};

const buildUserAutoReplyEmail = (submission) => {
  if (submission.formType === "newsletter") {
    return {
      from: env.mailFrom,
      to: submission.email,
      subject: "You're subscribed! — AIxperts Labs",
      text: `Hi,\n\nThanks for subscribing to the AIxperts Labs Intelligence Feed! You'll now get the latest AI breakthroughs delivered to your inbox.\n\n— AIxperts Labs`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#ea580c;">You're subscribed!</h2>
          <p style="color:#334155;font-size:15px;line-height:1.6;">
            Thanks for subscribing to the AIxperts Labs Intelligence Feed. You'll now get the latest AI breakthroughs delivered to your inbox.
          </p>
          <p style="color:#94a3b8;font-size:13px;margin-top:32px;">— AIxperts Labs</p>
        </div>
      `,
    };
  }

  return {
    from: env.mailFrom,
    to: submission.email,
    subject: "We've received your request — AIxperts Labs",
    text: `Hi ${submission.name},\n\nThanks for reaching out to AIxperts Labs! We've received your request and one of our team members will get back to you shortly.\n\n— AIxperts Labs`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#ea580c;">Thanks, ${escapeHtml(submission.name)}!</h2>
        <p style="color:#334155;font-size:15px;line-height:1.6;">
          We've received your request and one of our team members will get back to you shortly.
        </p>
        <p style="color:#94a3b8;font-size:13px;margin-top:32px;">— AIxperts Labs</p>
      </div>
    `,
  };
};

/**
 * Sends the admin notification email, and (if enabled) an auto-reply to the
 * person who submitted the form. Throws if the admin notification fails —
 * the auto-reply failing is not treated as fatal.
 */
export const sendSubmissionEmails = async (submission) => {
  const client = getResendClient();

  const { error } = await client.emails.send(buildAdminEmail(submission));
  if (error) {
    throw new Error(error.message || "Failed to send notification email via Resend");
  }

  if (env.sendAutoReply) {
    const { error: autoReplyError } = await client.emails.send(
      buildUserAutoReplyEmail(submission)
    );
    if (autoReplyError) {
      console.error("[mailer] Auto-reply failed (non-fatal):", autoReplyError.message);
    }
  }

  return true;
};

const detailsTable = (rows) =>
  rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;font-weight:600;color:#334155;border-bottom:1px solid #e2e8f0;white-space:nowrap;">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${escapeHtml(value).replace(/\n/g, "<br/>")}</td>
      </tr>`
    )
    .join("");

const enrollmentConfirmation = (enrollment) => ({
  subject: `You're enrolled — ${enrollment.program} (${enrollment.enrollmentId})`,
  text: `Hi ${enrollment.name},\n\nThanks for enrolling in ${enrollment.program} (${enrollment.batchType} batch) at AIxperts Labs.\n\nYour enrollment ID is ${enrollment.enrollmentId}. Our team will contact you on WhatsApp at ${enrollment.phone} with the batch start date, fee and payment details.\n\n— AIxperts Labs`,
  html: `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#ea580c;">You're enrolled, ${escapeHtml(enrollment.name)}!</h2>
      <p style="color:#334155;font-size:15px;line-height:1.6;">
        Thanks for enrolling in <strong>${escapeHtml(enrollment.program)}</strong> (${escapeHtml(enrollment.batchType)} batch).
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.6;">
        Your enrollment ID is <strong style="font-family:monospace;">${escapeHtml(enrollment.enrollmentId)}</strong>.
        Our team will contact you on WhatsApp at ${escapeHtml(enrollment.phone)} with the batch start date, fee and payment details.
      </p>
      <p style="color:#94a3b8;font-size:13px;margin-top:32px;">— AIxperts Labs</p>
    </div>
  `,
});

const customRequestConfirmation = (enrollment) => ({
  subject: `We've received your course request — ${enrollment.customTopic} (${enrollment.enrollmentId})`,
  text: `Hi ${enrollment.name},\n\nThanks for telling us you want to learn "${enrollment.customTopic}". Our team will review your request and plan a course around your goals.\n\nYour request ID is ${enrollment.enrollmentId}. We'll contact you on WhatsApp at ${enrollment.phone} with a proposed plan, schedule and fee.\n\n— AIxperts Labs`,
  html: `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#ea580c;">We've got your request, ${escapeHtml(enrollment.name)}!</h2>
      <p style="color:#334155;font-size:15px;line-height:1.6;">
        Thanks for telling us you want to learn <strong>${escapeHtml(enrollment.customTopic)}</strong>.
        Our team will review your request and plan a course around your goals.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.6;">
        Your request ID is <strong style="font-family:monospace;">${escapeHtml(enrollment.enrollmentId)}</strong>.
        We'll contact you on WhatsApp at ${escapeHtml(enrollment.phone)} with a proposed plan, schedule and fee.
      </p>
      <p style="color:#94a3b8;font-size:13px;margin-top:32px;">— AIxperts Labs</p>
    </div>
  `,
});

/**
 * Notifies the team of a new enrollment or custom course request (with the learner's photo attached) and
 * sends the learner a confirmation with their enrollment ID. Throws if the team
 * notification fails; the learner confirmation failing is not fatal.
 */
export const sendEnrollmentEmails = async (enrollment, photo) => {
  const client = getResendClient();
  const isCustom = enrollment.requestType === "custom";
  const heading = isCustom ? "New Custom Course Request" : "New Enrollment";

  const rows = [
    [isCustom ? "Request ID" : "Enrollment ID", enrollment.enrollmentId],
    ...(isCustom
      ? [
          ["Wants to learn", enrollment.customTopic],
          ["Goals & background", enrollment.customDetails],
        ]
      : [["Program", enrollment.program]]),
    ["Batch", enrollment.batchType],
    ["Name", enrollment.name],
    ["Father's / mother's name", enrollment.guardianName],
    ["WhatsApp", enrollment.phone],
    ["Email", enrollment.email],
    ["Profile", enrollment.profile],
    ["College / organisation", enrollment.organization],
    ["GSTIN", enrollment.gstin],
    ["Photo", photo ? "Attached" : "Not provided"],
  ];

  const { error } = await client.emails.send({
    from: env.mailFrom,
    to: env.mailTo,
    replyTo: enrollment.email,
    subject: isCustom
      ? `${heading} ${enrollment.enrollmentId} — ${enrollment.name}: ${enrollment.customTopic}`
      : `${heading} ${enrollment.enrollmentId} — ${enrollment.name} (${enrollment.program})`,
    text: rows.filter(([, v]) => v).map(([l, v]) => `${l}: ${v}`).join("\n"),
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#ea580c;">${heading}</h2>
        <table style="width:100%;border-collapse:collapse;">${detailsTable(rows)}</table>
      </div>
    `,
    ...(photo && {
      attachments: [{ filename: photo.filename || "photo.jpg", content: photo.data }],
    }),
  });

  if (error) {
    throw new Error(error.message || "Failed to send enrollment notification via Resend");
  }

  const { error: confirmationError } = await client.emails.send({
    from: env.mailFrom,
    to: enrollment.email,
    ...(isCustom ? customRequestConfirmation(enrollment) : enrollmentConfirmation(enrollment)),
  });

  if (confirmationError) {
    console.error("[mailer] Enrollment confirmation failed (non-fatal):", confirmationError.message);
  }
};

/** Emails the 6-digit code a learner uses to download their certificates. */
export const sendCertificateOtpEmail = async (email, code) => {
  const client = getResendClient();

  const { error } = await client.emails.send({
    from: env.mailFrom,
    to: email,
    subject: `${code} is your AIxperts Labs certificate code`,
    text: `Your code to download your AIxperts Labs certificate is ${code}.\n\nIt expires in 10 minutes. If you didn't request it, you can ignore this email.\n\n— AIxperts Labs`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#ea580c;">Your certificate download code</h2>
        <p style="color:#334155;font-size:15px;line-height:1.6;">Use this code to download your AIxperts Labs certificate:</p>
        <p style="font-size:32px;font-weight:700;letter-spacing:8px;color:#0f172a;margin:24px 0;">${escapeHtml(code)}</p>
        <p style="color:#334155;font-size:15px;line-height:1.6;">It expires in 10 minutes. If you didn't request it, you can ignore this email.</p>
        <p style="color:#94a3b8;font-size:13px;margin-top:32px;">— AIxperts Labs</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message || "Failed to send the code via Resend");
  }
};

export default sendSubmissionEmails;
