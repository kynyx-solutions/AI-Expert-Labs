import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  categories,
  courses,
  coursesIn,
  getCategory,
  levels,
  type CategoryId,
  type Level,
} from "./data/courses";

const INITIAL_VISIBLE = 9;

const tabCls = (active: boolean) =>
  `flex-shrink-0 whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold border transition ${
    active
      ? "bg-orange-500 border-orange-500 text-white shadow-lg"
      : "bg-white border-slate-200 text-slate-600 hover:border-orange-400 hover:text-orange-500"
  }`;

/** Filterable grid of every course, by category and level. Each card links to its program page. */
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
    <div id="course-list" className="scroll-mt-24">
      {/* Scrolls sideways on phones instead of stacking rows of pills */}
      <div className="flex gap-3 overflow-x-auto pb-2 mb-4 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible">
        <button type="button" onClick={() => chooseCategory("all")} className={tabCls(cat === "all")}>
          All {courses.length} programs
        </button>
        {categories
          .filter((c) => coursesIn(c.id).length > 0)
          .map((c) => (
            <button key={c.id} type="button" onClick={() => chooseCategory(c.id)} className={tabCls(cat === c.id)}>
              {c.title}
            </button>
          ))}
      </div>

      <div className="flex gap-2 items-center overflow-x-auto pb-2 mb-6 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible">
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

      <p className="text-sm text-slate-500 mb-8" aria-live="polite">
        Showing {list.length} of {courses.length} programs
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

            <h3 className="font-bold text-xl text-slate-900 mb-2">
              <Link to={`/academy/${c.slug}`} className="hover:text-orange-500 transition">
                {c.title}
              </Link>
            </h3>
            <p className="text-slate-500 mb-5 flex-1">{c.blurb}</p>

            <div className="flex flex-wrap gap-2 mb-5 text-xs font-semibold">
              <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full">{c.duration}</span>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Regular / Weekend</span>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Certificate</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <Link
                to={`/academy/${c.slug}`}
                className="bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-600 transition"
              >
                View program
              </Link>
              <Link to={`/enroll?course=${c.slug}`} className="text-orange-500 text-sm font-semibold">
                Enroll →
              </Link>
            </div>
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
            {showAll ? "Show fewer programs" : `Show all ${list.length} programs`}
          </button>
        </div>
      )}

      {list.length === 0 && (
        <p className="text-center text-slate-500 border border-dashed border-slate-300 rounded-2xl p-8 mt-6">
          No programs match this combination. Try another level or category.
        </p>
      )}
    </div>
  );
}
