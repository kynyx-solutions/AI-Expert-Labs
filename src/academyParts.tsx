import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import VerifyCertificate from "./verifyCertificate";
import DownloadCertificate from "./downloadCertificate";

/** Shared pieces for the /academy page and the program pages. */

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 md:mb-12 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <p className="text-orange-500 font-semibold text-sm md:text-base tracking-[0.2em] uppercase mb-4">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-5xl font-bold leading-tight">{title}</h2>
      {intro && (
        <p className={`mt-5 text-lg md:text-xl text-slate-500 max-w-3xl ${center ? "mx-auto" : ""}`}>{intro}</p>
      )}
    </div>
  );
}

/** Dark navy hero used at the top of the academy and program pages. */
export function DarkHero({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0b1d6d] via-[#102c96] to-[#08134d] text-white">
      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-orange-500/20 blur-[120px]" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-blue-400/20 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16">{children}</div>
    </section>
  );
}

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-300 mb-8 flex flex-wrap gap-x-2 gap-y-1">
      {items.map((item, i) => (
        <span key={item.label} className="flex gap-2">
          {i > 0 && <span aria-hidden="true">/</span>}
          {item.to ? (
            <Link to={item.to} className="text-white hover:text-orange-400 transition">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
      <p className="text-xs uppercase tracking-widest text-slate-300">{label}</p>
      <p className="font-bold text-lg mt-1">{value}</p>
    </div>
  );
}

export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: string;
  primary: { to: string; label: string };
  secondary?: { to: string; label: string };
}) {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-4 md:mx-auto text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white p-10 md:p-16 rounded-4xl">
        <h2 className="text-3xl md:text-5xl font-bold text-white">{title}</h2>
        <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">{text}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to={primary.to} className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:scale-105 transition">
            {primary.label}
          </Link>
          {secondary && (
            <Link to={secondary.to} className="border border-white/60 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/** Verify a certificate (public) and download your own (email OTP), side by side. */
export function CertificatesSection() {
  return (
    <section id="certificates" className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          center
          eyebrow="Certificates"
          title={
            <>
              Verify or <span className="text-orange-500">Download</span>
            </>
          }
          intro="Every certificate carries a unique certificate ID, so anyone can check it in seconds."
        />
        {/* items-stretch keeps both cards the same height, even when one shows a result */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <VerifyCertificate />
          <DownloadCertificate />
        </div>
      </div>
    </section>
  );
}
