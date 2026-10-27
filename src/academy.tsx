import { useEffect } from "react";
import { Link } from "react-router-dom";
import CourseCatalogue from "./courseCatalogue";
import NsicCertification from "./nsicCertification";
import {
  CertificatesSection,
  CtaBand,
  DarkHero,
  SectionHeading,
} from "./academyParts";
import {
  categories,
  courses,
  coursesIn,
  curriculumHours,
  flagship,
  modules,
} from "./data/courses";

const trackCount = categories.filter((c) => coursesIn(c.id).length > 0).length;

const stats: [string, string][] = [
  [String(courses.length), "Programs"],
  [String(curriculumHours), "Curriculum hours"],
  [String(trackCount), "Learning tracks"],
  ["2", "Batch types"],
];

const batchDetails: [string, string][] = [
  ["Batch types", "Regular (weekday) or Weekend"],
  ["Duration", "2-day workshops to 15-day programs"],
  ["Levels", "Beginner to leadership"],
  ["Format", "Theory with hands-on practicals"],
  ["Assessment", "Graded performance evaluation"],
  ["Certificate", "Co-issued by NSIC and AIxperts Labs"],
];

export default function Academy() {
  useEffect(() => {
    document.title = "AIxperts Academy | AI Certification Programs";
  }, []);

  return (
    <div className="bg-white text-slate-900">
      {/* ================= HERO ================= */}
      <DarkHero>
        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 items-end">
          <div>
            <p className="text-orange-400 font-semibold text-sm md:text-base tracking-[0.2em] uppercase mb-4">
              AIxperts Academy
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
              {courses.length} certification programs in AI, tech and digital skills.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-2xl">
              Theory with hands-on practicals, regular and weekend batches, and a certificate
              co-issued by NSIC and AIxperts Labs after your assessment.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map(([value, label]) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-3xl md:text-4xl font-bold text-orange-400">{value}</p>
                <p className="text-sm text-slate-300 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkHero>

      {/* ================= FLAGSHIP BANNER ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-16">
        <Link
          to={`/academy/${flagship.slug}`}
          className="group flex flex-col md:flex-row md:items-center justify-between gap-6 bg-orange-500 hover:bg-orange-600 transition rounded-3xl px-6 py-7 md:px-10 md:py-8 text-white"
        >
          <span>
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-orange-100">
              Flagship · {flagship.hours} hours · {flagship.batchTypes}
            </span>
            <span className="block text-2xl md:text-3xl font-bold mt-2 leading-snug">{flagship.title}</span>
          </span>
          <span className="flex-shrink-0 self-start md:self-auto bg-slate-900 text-white px-6 py-3 rounded-full font-semibold group-hover:scale-105 transition">
            View program
          </span>
        </Link>
      </section>

      {/* ================= CATALOGUE ================= */}
      <section id="programs" className="scroll-mt-20 max-w-7xl mx-auto px-6 py-12 md:py-16">
        <SectionHeading eyebrow="Programs" title="Browse programs" />
        <CourseCatalogue />

        <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900 text-white rounded-3xl p-6 md:p-10">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Can't find what you want to learn?</h3>
            <p className="text-slate-300 mt-2 max-w-2xl">
              Tell us the skill or topic, and our team will plan a course around your goals.
            </p>
          </div>
          <Link
            to="/enroll?course=custom"
            className="flex-shrink-0 text-center bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition"
          >
            Request a custom course
          </Link>
        </div>
      </section>

      {/* ================= MASTER CURRICULUM ================= */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_2fr] gap-10">
          <div>
            <SectionHeading
              eyebrow="Master curriculum"
              title={`${modules.length} modules, ${curriculumHours} hours.`}
              intro="The full module bank our programs are built from."
            />
            <Link
              to="/contact"
              className="inline-block bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
            >
              Request detailed syllabus
            </Link>
          </div>
          <ol className="grid sm:grid-cols-2 gap-x-8">
            {modules.map(([title, hours], i) => (
              <li key={title} className="flex items-baseline gap-3 py-3 border-b border-slate-200">
                <span className="text-xs font-mono text-slate-400 w-6 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-slate-800">{title}</span>
                <span className="text-sm font-mono text-slate-500 whitespace-nowrap">{hours} hrs</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= NSIC JOINT CERTIFICATION ================= */}
      <NsicCertification />

      {/* ================= BATCH DETAILS ================= */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="How it works" title="Batch details" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {batchDetails.map(([label, value], i) => (
              <div
                key={label}
                className={`rounded-2xl p-6 border ${
                  i === batchDetails.length - 1 ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-100"
                }`}
              >
                <p className={`text-sm ${i === batchDetails.length - 1 ? "text-slate-300" : "text-slate-500"}`}>{label}</p>
                <p className="font-semibold text-lg mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VERIFY / DOWNLOAD ================= */}
      <CertificatesSection />

      <CtaBand
        title="Not sure which program fits you?"
        text="Tell us your background and goal, and we'll suggest the right program and the next batch."
        primary={{ to: "/enroll", label: "Enroll now" }}
        secondary={{ to: "/contact", label: "Talk to a counsellor" }}
      />
    </div>
  );
}
