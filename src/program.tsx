import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, FileText } from "lucide-react";
import NsicCertification from "./nsicCertification";
import { Breadcrumb, CtaBand, DarkHero, SectionHeading, StatBox } from "./academyParts";
import { courses, flagship, getCategory, type Course } from "./data/courses";
import pradeep from "./assets/team/pradeep.jpg";

const included = [
  "Certificate co-issued by NSIC and AIxperts Labs",
  "Theory with hands-on practicals",
  "Regular (weekday) or weekend batches",
  "Graded performance evaluation",
];

/** Fee and enroll card shown beside the hero on every program page. */
function EnrollCard({ slug, cta }: { slug: string; cta: string }) {
  return (
    <aside className="bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl">
      <p className="text-sm text-slate-500">Program fee &amp; next batch</p>
      <p className="text-2xl font-bold mt-1">Shared by our team</p>
      <p className="text-sm text-slate-500 mt-1">We confirm the fee and start date on WhatsApp after you enroll.</p>
      <ul className="mt-6 space-y-3">
        {included.map((item) => (
          <li key={item} className="flex gap-3 items-start text-sm">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link
        to={`/enroll?course=${slug}`}
        className="block text-center mt-8 bg-orange-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-orange-600 transition"
      >
        {cta}
      </Link>
      <Link
        to="/contact"
        className="block text-center mt-3 border border-slate-300 text-slate-700 px-6 py-4 rounded-xl font-semibold hover:border-slate-500 transition"
      >
        Talk to a counsellor
      </Link>
    </aside>
  );
}

function CoursePage({ course }: { course: Course }) {
  const category = getCategory(course.cat);
  const d = course.details;
  const related = courses.filter((c) => c.cat === course.cat && c.slug !== course.slug).slice(0, 3);

  return (
    <>
      <DarkHero>
        <Breadcrumb items={[{ label: "Academy", to: "/academy" }, { label: category.title }, { label: course.title }]} />
        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 items-start">
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="text-xs font-semibold bg-orange-500 text-white px-3 py-1 rounded-full">{course.level}</span>
              <span className="text-xs font-semibold border border-white/30 px-3 py-1 rounded-full">{category.title}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">{course.title}</h1>
            <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-2xl">{d?.summary ?? course.blurb}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              <StatBox label="Duration" value={course.duration} />
              <StatBox label="Level" value={course.level} />
              <StatBox label="Batch" value="Regular / Weekend" />
              <StatBox label="Certificate" value="NSIC joint" />
            </div>
          </div>
          <EnrollCard slug={course.slug} cta="Enroll in this program" />
        </div>
      </DarkHero>

      {d ? (
        <>
          <section className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid lg:grid-cols-[2fr_1fr] gap-10">
            <div>
              <SectionHeading title="What you'll be able to do" />
              <ul className="grid sm:grid-cols-2 gap-4">
                {d.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 items-start bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              {(
                [
                  ["Who it's for", d.audience],
                  ["Prerequisites", d.prereq],
                ] as [string, string][]
              ).map(([title, text]) => (
                <div key={title} className="bg-white border border-slate-100 shadow rounded-2xl p-6">
                  <h3 className="font-bold text-lg">{title}</h3>
                  <p className="text-slate-500 mt-2">{text}</p>
                </div>
              ))}
              <div className="bg-white border border-slate-100 shadow rounded-2xl p-6">
                <h3 className="font-bold text-lg">Tools you'll use</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {d.tools.map((t) => (
                    <span key={t} className="text-sm bg-slate-100 text-slate-700 px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-50 py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeading title="Day-by-day plan" intro="Each day combines theory with hands-on practicals." />
              <ol className="border-t border-slate-200">
                {d.plan.map((p) => (
                  <li key={p.day} className="grid md:grid-cols-[110px_1fr_2fr] gap-2 md:gap-8 py-5 border-b border-slate-200">
                    <span className="text-sm font-mono text-orange-500">
                      {p.day.includes("–") ? "DAYS" : "DAY"} {p.day}
                    </span>
                    <span className="font-semibold text-lg">{p.title}</span>
                    <span className="text-slate-500">{p.detail}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </>
      ) : (
        // Top padding only: the NSIC section below brings its own.
        <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-16">
          <div className="flex flex-col md:flex-row md:items-center gap-6 bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center flex-shrink-0">
              <FileText className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold">Get the detailed syllabus</h2>
              <p className="text-slate-500 mt-2">
                The day-wise plan, tools and outcomes for this {course.duration} program are shared on request.
                Ask our team and we'll send them across.
              </p>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition text-center"
            >
              Request syllabus
            </Link>
          </div>
        </section>
      )}

      <NsicCertification />

      {related.length > 0 && (
        <section className="bg-slate-50 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading title="Related programs" />
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/academy/${r.slug}`}
                  className="group bg-white rounded-3xl p-6 shadow hover:shadow-2xl border border-slate-100 transition"
                >
                  <p className="text-xs font-mono uppercase text-slate-400">
                    {r.duration} · {r.level}
                  </p>
                  <h3 className="font-bold text-xl mt-2 group-hover:text-orange-500 transition">{r.title}</h3>
                  <p className="text-orange-500 text-sm font-semibold mt-4">View program →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Ready to start?"
        text="Enroll in a few minutes. Our team will confirm your batch, fee and start date."
        primary={{ to: `/enroll?course=${course.slug}`, label: "Enroll now" }}
        secondary={{ to: "/academy", label: "Browse all programs" }}
      />
    </>
  );
}

const flagshipFaqs: [string, string][] = [
  ["Do I need a technical or coding background?", "No. The program is designed for beginners. Basic computer and smartphone use is enough to start."],
  ["How is the certificate awarded?", "You complete the sessions and the capstone project, and are graded in a performance evaluation. The certificate is then co-issued by NSIC and AIxperts Labs."],
];

function FlagshipPage() {
  return (
    <>
      <DarkHero>
        <Breadcrumb items={[{ label: "Academy", to: "/academy" }, { label: "Flagship program" }]} />
        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 items-start">
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="text-xs font-semibold bg-orange-500 text-white px-3 py-1 rounded-full">Flagship program</span>
              <span className="text-xs font-semibold border border-white/30 px-3 py-1 rounded-full">Certificate co-issued with NSIC</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">{flagship.title}</h1>
            <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-2xl">
              A {flagship.hours}-hour, hands-on program that takes you from AI basics to automating real
              business work, ending with a project and a certificate.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
              <StatBox label="Duration" value={`${flagship.hours} hours`} />
              <StatBox label="Batch" value={flagship.batchTypes} />
              <StatBox label="Modules" value={String(flagship.topics.length)} />
            </div>
          </div>
          <EnrollCard slug={flagship.slug} cta="Reserve my seat" />
        </div>
      </DarkHero>

      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <SectionHeading eyebrow="Audience" title="Who this program is for" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {flagship.audience.map(([title, text]) => (
            <div key={title} className="bg-white border border-slate-100 shadow rounded-2xl p-6">
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-slate-500 mt-2">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="Curriculum" title="What you'll cover" />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {flagship.topics.map(([title, text], i) => {
              const last = i === flagship.topics.length - 1;
              return (
                <li
                  key={title}
                  className={`rounded-2xl p-6 border ${last ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-100"}`}
                >
                  <p className={`text-sm font-mono ${last ? "text-orange-400" : "text-slate-400"}`}>{String(i + 1).padStart(2, "0")}</p>
                  <h3 className={`font-bold text-lg mt-2 ${last ? "text-white" : ""}`}>{title}</h3>
                  <p className={`mt-2 ${last ? "text-slate-300" : "text-slate-500"}`}>{text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid lg:grid-cols-[3fr_2fr] gap-10 items-start">
        <div>
          <SectionHeading title="What you'll walk away with" />
          <ul className="space-y-4">
            {flagship.takeaways.map((t) => (
              <li key={t} className="flex gap-3 items-start text-lg">
                <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-slate-100 shadow-xl rounded-3xl p-6 md:p-8">
          <p className="text-orange-500 font-semibold text-sm tracking-[0.2em] uppercase">Lead faculty</p>
          <div className="flex items-center gap-4 mt-5">
            <img src={pradeep} alt="Pradeep Kumar" className="w-20 h-20 rounded-full object-cover" />
            <div>
              <p className="font-bold text-xl">Pradeep Kumar</p>
              <p className="text-slate-500">Founder &amp; CEO, AIxperts Labs</p>
            </div>
          </div>
          <p className="text-slate-500 mt-5">
            Leading AIxperts Labs with a vision to transform enterprises through cutting-edge AI strategies.
          </p>
        </div>
      </section>

      <NsicCertification />

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading center title="Program FAQs" />
          <div className="space-y-3">
            {flagshipFaqs.map(([q, a]) => (
              <details key={q} className="group bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <summary className="flex justify-between gap-4 cursor-pointer font-semibold text-slate-900 list-none">
                  {q}
                  <span className="text-orange-500 group-open:rotate-45 transition text-xl leading-none">+</span>
                </summary>
                <p className="text-slate-500 mt-3">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Reserve your seat"
        text="Enroll in a few minutes. Our team will confirm your batch, fee and start date."
        primary={{ to: `/enroll?course=${flagship.slug}`, label: "Reserve my seat" }}
        secondary={{ to: "/academy", label: "Browse all programs" }}
      />
    </>
  );
}

/** /academy/:slug — the flagship, any catalogue course, or a not-found message. */
export default function Program() {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  const isFlagship = slug === flagship.slug;

  useEffect(() => {
    const title = isFlagship ? flagship.title : course?.title ?? "Program not found";
    document.title = `${title} | AIxperts Academy`;
  }, [course, isFlagship]);

  if (isFlagship) return <FlagshipPage />;

  if (!course) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-bold">Program not found</h1>
        <p className="text-slate-500 mt-4">This program may have been renamed or removed.</p>
        <Link
          to="/academy"
          className="inline-block mt-8 bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          Browse all programs
        </Link>
      </section>
    );
  }

  return <CoursePage course={course} />;
}
