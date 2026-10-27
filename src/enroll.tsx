import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { submitEnrollment } from "./lib/api";
import {
  categories,
  enrollablePrograms,
  flagship,
  getCategory,
  getProgram,
} from "./data/courses";

const STEPS = ["Program & batch", "Your details", "Review & submit", "Confirmed"];

const BATCHES = [
  { id: "Regular", label: "Regular batch", detail: "Weekdays" },
  { id: "Weekend", label: "Weekend batch", detail: "Saturday & Sunday" },
] as const;

const PROFILES = ["Student", "Working professional", "MSME owner", "Teacher / educator", "Job seeker"];

// Program-select value for "something we don't offer yet": the team plans a course for the learner.
// Also accepted as /enroll?course=custom.
const CUSTOM = "custom";

type BatchType = (typeof BATCHES)[number]["id"];

interface Details {
  name: string;
  phone: string;
  email: string;
  guardianName: string;
  profile: string;
  organization: string;
  gstin: string;
}

const emptyDetails: Details = {
  name: "",
  phone: "",
  email: "",
  guardianName: "",
  profile: PROFILES[0],
  organization: "",
  gstin: "",
};

const inputCls =
  "w-full border border-slate-300 rounded-xl px-4 py-3 mt-2 font-normal text-slate-900 focus:outline-none focus:border-orange-500";
const primaryBtn =
  "flex-1 bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-60";
const outlineBtn =
  "px-8 py-4 rounded-xl font-semibold border border-slate-300 text-slate-700 hover:border-slate-500 transition";

export default function Enroll() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(1);
  const [slug, setSlug] = useState(
    params.get("course") === CUSTOM ? CUSTOM : getProgram(params.get("course"))?.slug ?? flagship.slug
  );
  const [customTopic, setCustomTopic] = useState("");
  const [customDetails, setCustomDetails] = useState("");
  const [batchType, setBatchType] = useState<BatchType>("Regular");
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [photo, setPhoto] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState("");

  const isCustom = slug === CUSTOM;
  const program = getProgram(slug);

  const summary =
    isCustom || !program
      ? { title: customTopic.trim() || "Your custom course", category: "Custom course", duration: "Planned with you", level: "Based on your goals" }
      : { title: program.title, category: getCategory(program.cat).title, duration: program.duration, level: program.level };

  const continueToDetails = () => {
    if (isCustom && customTopic.trim().length < 3) {
      setError("Tell us what you want to learn.");
      return;
    }
    setError("");
    setStep(2);
  };

  const setField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && !["image/jpeg", "image/png"].includes(file.type)) {
      setError("Upload the photo as a JPG or PNG file.");
      e.target.value = "";
      return;
    }
    if (file && file.size > 2 * 1024 * 1024) {
      setError("The photo must be under 2 MB.");
      e.target.value = "";
      return;
    }
    setError("");
    setPhoto(file);
  };

  const handleDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo && !isCustom) {
      setError("Add a passport-size photo. It is printed on your certificate.");
      return;
    }
    if (!consent) {
      setError("Please accept the terms to continue.");
      return;
    }
    setError("");
    setStep(3);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const form = new FormData();
      if (isCustom || !program) {
        form.append("requestType", "custom");
        form.append("customTopic", customTopic.trim());
        form.append("customDetails", customDetails.trim());
      } else {
        form.append("program", program.title);
        form.append("programSlug", program.slug);
      }
      form.append("batchType", batchType);
      Object.entries(details).forEach(([key, value]) => form.append(key, value.trim()));
      form.append("consent", String(consent));
      if (photo) form.append("photo", photo);

      const result = await submitEnrollment(form);
      setEnrollmentId(result.enrollmentId);
      setStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Enrollment failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const batch = BATCHES.find((b) => b.id === batchType)!;

  return (
    <section className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          Enroll in a <span className="text-orange-500">Program</span>
        </h1>
        <p className="text-lg text-slate-500 mt-3 mb-10">
          Takes about 3 minutes. Our team will confirm your batch, fee and start date on WhatsApp.
        </p>

        {/* ================= STEPS ================= */}
        <ol className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10" aria-label="Progress">
          {STEPS.map((label, i) => {
            const state = i + 1 < step ? "done" : i + 1 === step ? "current" : "todo";
            return (
              <li
                key={label}
                aria-current={state === "current" ? "step" : undefined}
                className={`rounded-2xl px-4 py-3 border-2 ${
                  state === "current"
                    ? "border-orange-500 bg-white"
                    : state === "done"
                      ? "border-green-500 bg-green-50"
                      : "border-slate-200 bg-white"
                }`}
              >
                <small className="block text-xs font-semibold text-slate-400">STEP 0{i + 1}</small>
                <b className={`text-sm ${state === "todo" ? "text-slate-400" : "text-slate-900"}`}>{label}</b>
              </li>
            );
          })}
        </ol>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100">
            {/* ================= STEP 1 ================= */}
            {step === 1 && (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Choose your program and batch</h2>

                <label className="block font-semibold text-slate-800">
                  Program
                  <select
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setError("");
                    }}
                    className={inputCls}
                  >
                    <option value={flagship.slug}>{flagship.title} (Flagship)</option>
                    {categories.map((cat) => {
                      const options = enrollablePrograms.filter((p) => p.cat === cat.id && p.slug !== flagship.slug);
                      if (!options.length) return null;
                      return (
                        <optgroup key={cat.id} label={cat.title}>
                          {options.map((p) => (
                            <option key={p.slug} value={p.slug}>
                              {p.title}
                            </option>
                          ))}
                        </optgroup>
                      );
                    })}
                    <optgroup label="Not listed?">
                      <option value={CUSTOM}>Something else: I'll tell you what I want to learn</option>
                    </optgroup>
                  </select>
                </label>

                {isCustom && (
                  <div className="mt-6 bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-5">
                    <p className="text-sm text-orange-800">
                      Tell us what you want to learn and our team will plan a course around your goals.
                    </p>
                    <label className="block font-semibold text-slate-800 text-sm">
                      What do you want to learn?
                      <input
                        value={customTopic}
                        onChange={(e) => {
                          setCustomTopic(e.target.value);
                          setError("");
                        }}
                        maxLength={120}
                        placeholder="e.g. AI for real estate marketing, Excel automation for HR"
                        className={`${inputCls} bg-white`}
                      />
                    </label>
                    <label className="block font-semibold text-slate-800 text-sm">
                      Your goals and background (optional)
                      <textarea
                        value={customDetails}
                        onChange={(e) => setCustomDetails(e.target.value)}
                        maxLength={1000}
                        rows={4}
                        placeholder="What you want to achieve, what you already know, and when you'd like to start."
                        className={`${inputCls} bg-white`}
                      />
                      <span className="block text-xs text-slate-400 font-normal mt-1">{customDetails.length}/1000</span>
                    </label>
                  </div>
                )}

                <p className="font-semibold text-slate-800 mt-8 mb-3">Batch</p>
                <div role="radiogroup" aria-label="Batch" className="grid sm:grid-cols-2 gap-3">
                  {BATCHES.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      role="radio"
                      aria-checked={batchType === b.id}
                      onClick={() => setBatchType(b.id)}
                      className={`text-left rounded-2xl px-5 py-4 transition ${
                        batchType === b.id
                          ? "border-2 border-orange-500 bg-orange-50"
                          : "border border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      <span className="block font-semibold text-slate-900">{b.label}</span>
                      <span className="text-sm text-slate-500">{b.detail}</span>
                    </button>
                  ))}
                </div>

                <p className="text-sm text-slate-500 mt-6">
                  Want to see every course first?{" "}
                  <Link to="/academy" className="text-orange-500 font-semibold">
                    Browse all programs
                  </Link>
                </p>

                {error && <p className="text-red-500 text-sm mt-6" role="alert">{error}</p>}

                <button type="button" onClick={continueToDetails} className={`${primaryBtn} w-full mt-8`}>
                  Continue
                </button>
              </>
            )}

            {/* ================= STEP 2 ================= */}
            {step === 2 && (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Your details</h2>
                <form onSubmit={handleDetails} className="grid md:grid-cols-2 gap-5">
                  <label className="block font-semibold text-slate-800 text-sm">
                    Full name (as on certificate)
                    <input required name="name" autoComplete="name" value={details.name} onChange={setField} className={inputCls} />
                  </label>
                  <label className="block font-semibold text-slate-800 text-sm">
                    WhatsApp number
                    <input required name="phone" type="tel" pattern="[0-9+ ]{10,14}" autoComplete="tel" value={details.phone} onChange={setField} className={inputCls} />
                  </label>
                  <label className="block font-semibold text-slate-800 text-sm">
                    Email
                    <input required name="email" type="email" autoComplete="email" value={details.email} onChange={setField} className={inputCls} />
                  </label>
                  <label className="block font-semibold text-slate-800 text-sm">
                    Father's / mother's name
                    <input required name="guardianName" value={details.guardianName} onChange={setField} className={inputCls} />
                  </label>
                  <label className="block font-semibold text-slate-800 text-sm">
                    I am a
                    <select name="profile" value={details.profile} onChange={setField} className={inputCls}>
                      {PROFILES.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block font-semibold text-slate-800 text-sm">
                    College / organisation (optional)
                    <input name="organization" value={details.organization} onChange={setField} className={inputCls} />
                  </label>
                  <label className="block font-semibold text-slate-800 text-sm">
                    GSTIN for invoice (optional)
                    <input name="gstin" maxLength={15} value={details.gstin} onChange={setField} className={`${inputCls} uppercase`} />
                  </label>
                  <label className="block font-semibold text-slate-800 text-sm">
                    Passport-size photo {isCustom ? "(optional for now)" : "(printed on your certificate)"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handlePhoto}
                      className={`${inputCls} border-dashed text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-orange-50 file:px-3 file:py-1 file:text-orange-600 file:font-semibold`}
                    />
                    <span className="block text-xs text-slate-400 font-normal mt-1">
                      {photo ? `Selected: ${photo.name}` : "JPG or PNG, plain background, face clearly visible, under 2 MB."}
                    </span>
                  </label>

                  <label className="md:col-span-2 flex gap-3 items-start text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="w-5 h-5 mt-0.5 accent-orange-500"
                    />
                    <span>
                      I agree to the{" "}
                      <Link to="/terms" className="text-orange-500 font-semibold">Terms of Use</Link> and{" "}
                      <Link to="/privacy" className="text-orange-500 font-semibold">Privacy Policy</Link>, and to
                      receive batch updates on WhatsApp.
                    </span>
                  </label>

                  {error && (
                    <p className="md:col-span-2 text-red-500 text-sm" role="alert">{error}</p>
                  )}

                  <div className="md:col-span-2 flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className={outlineBtn}>Back</button>
                    <button type="submit" className={primaryBtn}>Review</button>
                  </div>
                </form>
              </>
            )}

            {/* ================= STEP 3 ================= */}
            {step === 3 && (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Review and submit</h2>
                <div className="bg-slate-50 rounded-2xl p-5 space-y-1">
                  <p className="font-bold text-slate-900">{isCustom ? `Custom course: ${summary.title}` : summary.title}</p>
                  <p className="text-sm text-slate-500">{batch.label} ({batch.detail}) · {summary.duration}</p>
                  {isCustom && customDetails.trim() && (
                    <p className="text-sm text-slate-600 pt-2 whitespace-pre-line">{customDetails.trim()}</p>
                  )}
                </div>
                <dl className="grid sm:grid-cols-2 gap-4 mt-6">
                  {(
                    [
                      ["Name on certificate", details.name],
                      ["Father's / mother's name", details.guardianName],
                      ["WhatsApp", details.phone],
                      ["Email", details.email],
                      ["I am a", details.profile],
                      ["College / organisation", details.organization],
                      ["GSTIN", details.gstin.toUpperCase()],
                      ["Photo", photo?.name ?? ""],
                    ] as [string, string][]
                  )
                    .filter(([, v]) => v)
                    .map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-sm text-slate-500">{label}</dt>
                        <dd className="font-semibold text-slate-900 break-words">{value}</dd>
                      </div>
                    ))}
                </dl>
                <p className="text-sm text-slate-500 mt-6">
                  {isCustom
                    ? "No payment now. Our team will review your request and share a course plan, schedule and fee on WhatsApp."
                    : "No payment now. After you submit, our team will share the fee, start date and payment options on WhatsApp."}
                </p>
                {error && <p className="text-red-500 text-sm mt-4" role="alert">{error}</p>}
                <div className="flex gap-3 mt-8">
                  <button type="button" onClick={() => setStep(2)} className={outlineBtn}>Back</button>
                  <button type="button" onClick={handleSubmit} disabled={submitting} className={primaryBtn}>
                    {submitting ? "Submitting..." : isCustom ? "Submit request" : "Submit enrollment"}
                  </button>
                </div>
              </>
            )}

            {/* ================= STEP 4 ================= */}
            {step === 4 && (
              <div>
                <CheckCircle2 className="w-14 h-14 text-green-500" />
                <h2 className="text-3xl font-bold text-slate-900 mt-4">
                  {isCustom ? "Request received. We'll plan it with you!" : "You're enrolled. See you in class!"}
                </h2>
                <p className="text-slate-500 mt-2">
                  {isCustom ? "Request ID" : "Enrollment ID"} <b className="font-mono text-slate-900">{enrollmentId}</b> ·{" "}
                  {summary.title}
                </p>
                {isCustom ? (
                  <ol className="list-decimal pl-5 mt-6 space-y-2 text-slate-600">
                    <li>A confirmation with your request ID has been sent to {details.email}.</li>
                    <li>Our team will review what you want to learn and design a course around your goals.</li>
                    <li>We'll contact you on WhatsApp with the proposed plan, schedule and fee.</li>
                  </ol>
                ) : (
                  <ol className="list-decimal pl-5 mt-6 space-y-2 text-slate-600">
                    <li>A confirmation with your enrollment ID has been sent to {details.email}.</li>
                    <li>Our team will contact you on WhatsApp with the batch start date, fee and payment details.</li>
                    <li>Your seat is confirmed once payment is complete.</li>
                    <li>On day 1, bring a photo ID, a notebook and your phone.</li>
                  </ol>
                )}
                <div className="flex flex-wrap gap-3 mt-8">
                  <Link to="/academy" className="bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition">
                    Back to programs
                  </Link>
                  <Link to="/" className={outlineBtn}>Home</Link>
                </div>
              </div>
            )}
          </div>

          {/* ================= SUMMARY ================= */}
          <aside className="bg-gradient-to-br from-[#0b1d6d] via-[#102c96] to-[#08134d] text-white rounded-3xl p-6 shadow-xl space-y-4 lg:sticky lg:top-28">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
              {isCustom ? "Request summary" : "Enrollment summary"}
            </span>
            <p className="font-bold text-lg leading-snug break-words">{summary.title}</p>
            <p className="text-sm text-slate-300">{summary.category}</p>
            <div className="border-t border-white/10 pt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-300">Duration</span>
                <span className="text-right">{summary.duration}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-300">Batch</span>
                <span>{batch.label}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-300">Level</span>
                <span className="text-right">{summary.level}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-300">Certificate</span>
                <span className="text-orange-400 font-semibold">Included</span>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between gap-4 font-bold">
              <span>Program fee</span>
              <span className="text-right text-slate-300 font-normal text-sm">Shared by our team</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
