export type FormType = "contact" | "consultation" | "free-consultation" | "enrollment" | "newsletter";

export interface SubmissionPayload {
  formType: FormType;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  source?: string;
}

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

export async function submitForm(payload: SubmissionPayload) {
  const res = await fetch(`${API_URL}/api/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || "Failed to submit form. Please try again.");
  }

  return data;
}

/** Submits the /enroll form (multipart, so it can carry the photo). Returns the new enrollment ID. */
export async function submitEnrollment(form: FormData): Promise<{ enrollmentId: string }> {
  const res = await fetch(`${API_URL}/api/enrollments`, { method: "POST", body: form });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || "Enrollment failed. Please try again.");
  }

  return data.data;
}

export interface VerifiedCertificate {
  certificateId: string;
  serialNo: string;
  name: string;
  program: string;
  hours?: number;
  grade?: string;
  conduct?: string;
  fromDate?: string;
  toDate?: string;
  issuedAt: string;
  revoked: boolean;
}

/** Returns the certificate, or null if no certificate has this number. */
export async function verifyCertificate(id: string): Promise<VerifiedCertificate | null> {
  const res = await fetch(`${API_URL}/api/certificates/verify?id=${encodeURIComponent(id)}`);

  if (res.status === 404) return null;

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || "Verification is unavailable right now. Please try again.");
  }

  return data.data;
}

async function postJson(path: string, body: unknown) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong. Please try again.");
  }

  return data;
}

/** Emails a 6-digit download code. `devOtp` is only present when the server runs with OTP_DEV_MODE. */
export async function sendCertificateOtp(email: string): Promise<{ devOtp?: string }> {
  return postJson("/api/certificates/otp/send", { email });
}

export async function verifyCertificateOtp(
  email: string,
  otp: string
): Promise<{ certificates: VerifiedCertificate[]; token: string }> {
  const data = await postJson("/api/certificates/otp/verify", { email, otp });
  return data.data;
}

export async function downloadCertificatePdf(id: string, token: string) {
  const res = await fetch(`${API_URL}/api/certificates/download?id=${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || "Download failed. Please try again.");
  }

  const url = URL.createObjectURL(await res.blob());
  const link = document.createElement("a");
  link.href = url;
  link.download = `AIxperts-Labs-Certificate-${id.replace(/\//g, "-")}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}
