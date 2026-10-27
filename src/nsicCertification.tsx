import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, BadgeCheck, Building2, Languages, Maximize2, X } from "lucide-react";
import sampleCertificate from "./assets/certificates/nsic-sample-certificate.webp";

const points = [
  {
    icon: Building2,
    title: "Co-issued by NSIC & AIxperts Labs",
    desc: "Signed by the Head of Centre, NSIC Technical Services Centre, and by AIxperts Labs.",
  },
  {
    icon: Award,
    title: "Backed by a Government of India Enterprise",
    desc: "NSIC works under the Ministry of MSME, Government of India.",
  },
  {
    icon: Languages,
    title: "Bilingual certificate",
    desc: "Every certificate is printed in both Hindi and English.",
  },
  {
    icon: BadgeCheck,
    title: "Every detail on record",
    desc: "Serial number, course and hours, training dates, grade and conduct.",
  },
];

/** Diagonal "SAMPLE" mark so the page image can't be passed off as a real certificate. */
function SampleWatermark({ large = false }: { large?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
      <span
        className={`-rotate-[18deg] font-black uppercase tracking-[0.3em] text-red-600/25 border-red-600/25 rounded-2xl select-none ${
          large ? "text-7xl md:text-9xl border-8 px-8" : "text-5xl md:text-7xl border-4 md:border-[6px] px-4"
        }`}
      >
        Sample
      </span>
    </div>
  );
}

export default function NsicCertification() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="nsic-certification" className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-orange-500 font-semibold text-sm md:text-base tracking-[0.2em] uppercase mb-4">
            Joint Certification
          </p>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Certified with <span className="text-orange-500">NSIC</span>
          </h2>
          <p className="mt-6 text-xl text-slate-500 max-w-3xl mx-auto">
            Programs run with The National Small Industries Corporation Ltd. (NSIC) earn a
            certificate co-issued by NSIC and AIxperts Labs.
          </p>
        </div>

        <div className="grid lg:grid-cols-[2fr_3fr] gap-10 items-center">
          {/* POINTS */}
          <div className="space-y-4">
            {points.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex gap-4 items-start bg-slate-50 rounded-2xl p-5 border border-slate-100"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="text-slate-500 mt-1">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SAMPLE CERTIFICATE */}
          <motion.figure
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group relative block w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-zoom-in"
              aria-label="View the sample certificate larger"
            >
              <img
                src={sampleCertificate}
                alt="Sample NSIC and AIxperts Labs joint certificate"
                className="w-full h-auto"
                loading="lazy"
              />
              <SampleWatermark />
              <span className="absolute bottom-3 right-3 flex items-center gap-2 bg-slate-900/80 text-white text-xs font-semibold px-3 py-2 rounded-full opacity-90 group-hover:opacity-100 transition">
                <Maximize2 className="w-3.5 h-3.5" /> View larger
              </span>
            </button>
            <figcaption className="text-sm text-slate-400 text-center mt-4">
              Sample certificate, shown for reference only.
            </figcaption>
          </motion.figure>
        </div>
      </div>

      {/* ENLARGED VIEW */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Sample certificate"
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={sampleCertificate} alt="Sample NSIC and AIxperts Labs joint certificate" className="w-full h-auto rounded-xl" />
            <SampleWatermark large />
          </div>
        </div>
      )}
    </section>
  );
}
