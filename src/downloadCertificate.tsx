import React, { useState } from "react";
import { Download, Mail } from "lucide-react";
import {
  downloadCertificatePdf,
  sendCertificateOtp,
  verifyCertificateOtp,
  type VerifiedCertificate,
} from "./lib/api";

type Step = "email" | "otp" | "done";

const inputCls =
  "flex-1 min-w-0 border border-slate-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-orange-500";
const buttonCls =
  "bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-60";

export default function DownloadCertificate() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [certificates, setCertificates] = useState<VerifiedCertificate[]>([]);
  const [token, setToken] = useState("");
  const [downloading, setDownloading] = useState("");

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError("");
    try {
      await action();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    run(async () => {
      const result = await sendCertificateOtp(email.trim());
      setDevOtp(result.devOtp ?? "");
      setOtp("");
      setStep("otp");
    });
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    run(async () => {
      const result = await verifyCertificateOtp(email.trim(), otp.trim());
      setCertificates(result.certificates);
      setToken(result.token);
      setStep("done");
    });
  };

  const handleDownload = async (id: string) => {
    setDownloading(id);
    setError("");
    try {
      await downloadCertificatePdf(id, token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed. Please try again.");
    } finally {
      setDownloading("");
    }
  };

  const startOver = () => {
    setStep("email");
    setOtp("");
    setDevOtp("");
    setError("");
    setCertificates([]);
    setToken("");
  };

  return (
    <div id="download-certificate" className="scroll-mt-28 h-full bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center flex-shrink-0">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Download your certificate</h3>
            <p className="text-slate-500 mt-1">
              For learners. Enter the email you enrolled with and we'll send a one-time code.
            </p>
          </div>
        </div>

        <div>
          {step === "email" && (
            <form onSubmit={handleSendOtp}>
              <label htmlFor="cert-email" className="block font-semibold text-slate-800 mb-3">
                Email address
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="cert-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls}
                />
                <button type="submit" disabled={busy} className={buttonCls}>
                  {busy ? "Sending..." : "Send code"}
                </button>
              </div>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp}>
              <div className="flex items-start gap-3 bg-orange-50 text-orange-800 rounded-2xl p-4 mb-6">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  If <span className="font-semibold">{email.trim()}</span> has certificates with us, a
                  6-digit code is on its way. It expires in 10 minutes.
                </p>
              </div>
              {devOtp && (
                <p className="text-sm bg-slate-900 text-white rounded-xl px-4 py-2 mb-4 font-mono">
                  Dev mode — your code is {devOtp}
                </p>
              )}
              <label htmlFor="cert-otp" className="block font-semibold text-slate-800 mb-3">
                6-digit code
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="cert-otp"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className={`${inputCls} font-mono tracking-[0.4em]`}
                />
                <button type="submit" disabled={busy || otp.length !== 6} className={buttonCls}>
                  {busy ? "Checking..." : "Verify"}
                </button>
              </div>
              <button type="button" onClick={startOver} className="text-sm text-slate-500 hover:text-orange-500 mt-4">
                Use a different email
              </button>
            </form>
          )}

          {step === "done" && (
            <div>
              {certificates.length === 0 ? (
                <p className="text-slate-600">
                  We couldn't find any certificates for <span className="font-semibold">{email.trim()}</span>.
                  If you believe this is a mistake, please contact us.
                </p>
              ) : (
                <ul className="space-y-4">
                  {certificates.map((c) => (
                    <li
                      key={c.certificateId}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 rounded-2xl p-5"
                    >
                      <div>
                        <p className="font-bold text-slate-900">{c.program}</p>
                        <p className="text-sm text-slate-500 font-mono mt-1">{c.certificateId}</p>
                      </div>
                      <button
                        onClick={() => handleDownload(c.certificateId)}
                        disabled={downloading === c.certificateId}
                        className={`${buttonCls} flex items-center justify-center gap-2`}
                      >
                        <Download className="w-4 h-4" />
                        {downloading === c.certificateId ? "Preparing..." : "Download PDF"}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <button type="button" onClick={startOver} className="text-sm text-slate-500 hover:text-orange-500 mt-6">
                Start over
              </button>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm mt-4" role="alert">
              {error}
            </p>
          )}
        </div>
    </div>
  );
}
