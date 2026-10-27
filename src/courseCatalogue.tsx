import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, CheckCircle2, Clock } from "lucide-react";
import {
  categories,
  courses,
  coursesIn,
  flagship,
  getCategory,
  levels,
  type CategoryId,
  type Level,
} from "./data/courses";

const INITIAL_VISIBLE = 6;

const tabCls = (active: boolean) =>
  `flex-shrink-0 whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold border transition ${
    active
      ? "bg-orange-500 border-orange-500 text-white shadow-lg"
      : "bg-white border-slate-200 text-slate-600 hover:border-orange-400 hover:text-orange-500"
  }`;

export default function CourseCatalogue() {
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [level, setLevel] = useState<Level | "all">("all");
  const [showAll, setShowAll] = useState(false);

  const list = useMemo(
    () =>
      courses.filter(
        (c) => (cat === "all" || c.cat === cat) && (level === "all" || c.level === level)
      ),
    [cat, level]
  );

  const visible = showAll ? list : list.slice(0, INITIAL_VISIBLE);

  const scrollToList = () =>
    document.getElementById("course-list")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const chooseCategory = (id: CategoryId | "all") => {
    setCat(id);
    setShowAll(false);
  };

  const chooseLevel = (l: Level | "all") => {
    setLevel(l);
    setShowAll(false);
  };

  const toggleShowAll = () => {
    if (showAll) scrollToList();
    setShowAll(!showAll);
  };

  return (
    <>
      <section id="programs" className="scroll-mt-20 bg-slate-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* ================= FLAGSHIP ================= */}
          <div className="bg-gradient-to-br from-[#0b1d6d] via-[#102c96] to-[#08134d] rounded-[40px] p-8 md:p-12 shadow-2xl mb-12 md:mb-16 text-white">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="px-4 py-2 bg-orange-500/20 border border-orange-500/30 text-orange-300 rounded-full text-sm font-bold">
                  Flagship Program
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mt-6 leading-tight text-white">{flagship.title}</h3>
                <div className="flex flex-wrap gap-3 mt-6 text-sm">
                  <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                    <Clock className="w-4 h-4" /> {flagship.hours} hours
                  </span>
                  <span className="bg-white/10 px-4 py-2 rounded-full">{flagship.batchTypes} batches</span>
                  <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                    <Award className="w-4 h-4" /> Certificate
                  </span>
                </div>
                <Link
                  to={`/enroll?course=${flagship.slug}`}
                  className="inline-block mt-8 bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition"
                >
                  Enroll Now
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {flagship.topics.map(([topic, detail]) => (
                  <div key={topic} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      {topic}
                    </div>
                    <p className="text-slate-300 text-sm mt-2">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= COURSE LIST ================= */}
          <div id="course-list" className="scroll-mt-24">
            <div className="text-center mb-10 md:mb-12">
              <p className="text-orange-500 font-semibold text-sm md:text-base tracking-[0.2em] uppercase mb-4">
                Certification Courses
              </p>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
                {courses.length} Courses, <span className="text-orange-500">One Certificate</span>
              </h2>
              <p className="mt-6 text-xl text-slate-500 max-w-3xl mx-auto">
                From 2-day workshops to 15-day deep dives. Every course ends with an assessment
                and a verifiable certificate.
              </p>
            </div>

            {/* Scrolls sideways on phones instead of stacking eight rows of pills */}
            <div className="flex gap-3 overflow-x-auto pb-2 mb-4 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap md:justify-center md:overflow-visible">
              <button type="button" onClick={() => chooseCategory("all")} className={tabCls(cat === "all")}>
                All {courses.length} courses
              </button>
              {categories
                .filter((c) => coursesIn(c.id).length > 0)
                .map((c) => (
                  <button key={c.id} type="button" onClick={() => chooseCategory(c.id)} className={tabCls(cat === c.id)}>
                    {c.title}
                  </button>
                ))}
            </div>

            <div className="flex gap-2 items-center overflow-x-auto pb-2 mb-6 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap md:justify-center md:overflow-visible">
              <span className="text-sm text-slate-500 mr-2 flex-shrink-0">Level:</span>
              {(["all", ...levels] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => chooseLevel(l)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    level === l ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {l === "all" ? "All levels" : l}
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-slate-500 mb-10" aria-live="polite">
              Showing {list.length} of {courses.length} courses
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((c) => (
                <motion.article
                  key={c.slug}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl p-6 shadow hover:shadow-2xl border border-slate-100 transition flex flex-col"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="min-w-0 truncate text-xs font-bold uppercase tracking-wider text-orange-500">
                      {getCategory(c.cat).title}
                    </span>
                    <span className="text-xs font-semibold bg-slate-900 text-white px-3 py-1 rounded-full flex-shrink-0">
                      {c.level}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-slate-900 mb-2">{c.title}</h3>
                  <p className="text-slate-500 mb-5 flex-1">{c.blurb}</p>

                  <div className="flex flex-wrap gap-2 mb-5 text-xs font-semibold">
                    <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full">{c.duration}</span>
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Regular / Weekend</span>
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Certificate</span>
                  </div>

                  <Link to={`/enroll?course=${c.slug}`} className="text-orange-500 font-semibold">
                    Enroll →
                  </Link>
                </motion.article>
              ))}
            </div>

            {list.length > INITIAL_VISIBLE && (
              <div className="text-center mt-10">
                <button
                  type="button"
                  onClick={toggleShowAll}
                  className="px-8 py-3 rounded-full font-semibold border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition"
                >
                  {showAll ? "Show fewer courses" : `Show all ${list.length} courses`}
                </button>
              </div>
            )}

            {list.length === 0 && (
              <p className="text-center text-slate-500 border border-dashed border-slate-300 rounded-2xl p-8 mt-6">
                No courses match this combination. Try another level or category.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
