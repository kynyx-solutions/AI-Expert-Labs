import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, ShieldCheck, XCircle } from "lucide-react";
import { verifyCertificate, type VerifiedCertificate } from "./lib/api";

const formatDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";

type State = "idle" | "loading" | "empty" | "valid" | "revoked" | "invalid" | "error";

export default function VerifyCertificate() {
  const [params] = useSearchParams();
  const [id, setId] = useState(params.get("cert") ?? "");
  const [state, setState] = useState<State>("idle");
  const [cert, setCert] = useState<VerifiedCertificate | null>(null);

  const verify = async (value = id) => {
    const v = value.trim().toUpperCase();
    if (!v) {
      setState("empty");
      return;
    }

    setState("loading");
    try {
      const result = await verifyCertificate(v);
      setCert(result);
      setState(!result ? "invalid" : result.revoked ? "revoked" : "valid");
    } catch {
      setState("error");
    }
  };

  // Links like /academy?cert=AXL/2026/0001 verify and scroll into view automatically.
  useEffect(() => {
    const q = params.get("cert");
    if (!q) return;
    document.getElementById("verify-certificate")?.scrollIntoView({ behavior: "smooth" });
    verify(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verify();
  };

  const details: [string, string][] = cert
    ? [
        ["Name", cert.name],
        ["Certificate ID", cert.certificateId],
        ["Program", cert.hours ? `${cert.program} (${cert.hours} hours)` : cert.program],
        ["Training period", cert.fromDate && cert.toDate ? `${formatDate(cert.fromDate)} – ${formatDate(cert.toDate)}` : ""],
        ["Grade", cert.grade ?? ""],
        ["Conduct", cert.conduct ?? ""],
        ["NSIC S. No.", cert.serialNo],
        ["Issued on", formatDate(cert.issuedAt)],
      ].filter(([, value]) => value) as [string, string][]
    : [];

  return (
    <div id="verify-certificate" className="scroll-mt-28 h-full bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Verify a certificate</h3>
          <p className="text-slate-500 mt-1">
            For employers and institutions. Enter the certificate ID printed at the foot of the certificate.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="cert-id" className="block font-semibold text-slate-800 mb-3">
          Certificate ID
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="cert-id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="AXL/2026/0001"
            className="flex-1 min-w-0 border border-slate-300 rounded-xl px-4 py-3 font-mono text-lg focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-60"
          >
            {state === "loading" ? "Checking..." : "Verify"}
          </button>
        </div>
        <p className="text-sm text-slate-400 mt-3">Format: AXL/YEAR/NUMBER</p>
        {state === "empty" && (
          <p className="text-red-500 text-sm mt-2" role="alert">Enter a certificate ID to verify.</p>
        )}
        {state === "error" && (
          <p className="text-red-500 text-sm mt-2" role="alert">
            Verification is unavailable right now. Please try again in a minute.
          </p>
        )}
      </form>

      {state === "valid" && cert && (
        <div role="status" className="mt-6 rounded-2xl border-2 border-green-500 overflow-hidden">
          <div className="flex items-center gap-3 bg-green-50 px-5 py-3 font-bold text-green-800">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            Valid certificate issued by NSIC and AIxperts Labs
          </div>
          <dl className="grid sm:grid-cols-2 gap-4 p-5">
            {details.map(([label, value]) => (
              <div key={label} className={label === "Program" ? "sm:col-span-2" : ""}>
                <dt className="text-sm text-slate-500">{label}</dt>
                <dd className="font-semibold text-slate-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {state === "revoked" && (
        <div role="alert" className="mt-6 flex gap-3 items-start rounded-2xl border-2 border-red-500 p-5">
          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-800">This certificate has been revoked</p>
            <p className="text-slate-500 text-sm mt-1">
              Certificate {cert?.certificateId} is no longer valid. Contact us for details.
            </p>
          </div>
        </div>
      )}

      {state === "invalid" && (
        <div role="alert" className="mt-6 flex gap-3 items-start rounded-2xl border-2 border-red-500 p-5">
          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-800">No certificate found with this ID</p>
            <p className="text-slate-500 text-sm mt-1">
              Check the ID for typing errors. If you believe this certificate is genuine,
              contact us with a copy and we'll confirm it.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
