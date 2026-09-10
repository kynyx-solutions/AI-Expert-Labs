"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight, X } from "lucide-react";

interface ModuleItem {
  title: string;
  desc: string;
  icon: string;
  duration?: string;
  highlights?: string[];
}

export default function School() {
  const [activeTab, setActiveTab] = useState<string>("K-12");
  const [selectedModule, setSelectedModule] = useState<ModuleItem | null>(null);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const tabData: Record<string, ModuleItem[]> = {
    "K-12": [
      {
        title: "AI Foundations",
        desc: "Basics of AI and ethics",
        icon: "🤖",
        duration: "4 Weeks • Beginner",
        highlights: ["Introduction to AI & Machine Learning", "Real-world AI examples", "Responsible AI usage & ethics"]
      },
      {
        title: "Creative Coding",
        desc: "Build AI applications",
        icon: "💻",
        duration: "6 Weeks • Practical",
        highlights: ["Python basics for AI", "Visual programming & prompt engineering", "Building mini web apps"]
      },
      {
        title: "AI Ethics",
        desc: "Bias & safety in AI",
        icon: "🧠",
        duration: "3 Weeks • Essential",
        highlights: ["Algorithmic bias & fairness", "Data privacy & digital safety", "Future societal impact of AI"]
      },
    ],
    "Higher Education": [
      {
        title: "Machine Learning",
        desc: "Advanced ML models",
        icon: "📊",
        duration: "8 Weeks • Intermediate",
        highlights: ["Supervised & unsupervised learning", "Feature engineering & evaluation", "Deploying models to production"]
      },
      {
        title: "Deep Learning",
        desc: "Neural networks",
        icon: "🧠",
        duration: "10 Weeks • Advanced",
        highlights: ["CNNs, RNNs & Transformers", "Computer vision & NLP pipelines", "PyTorch / TensorFlow hands-on"]
      },
      {
        title: "AI Research",
        desc: "Innovation & experiments",
        icon: "🔬",
        duration: "12 Weeks • Project-Driven",
        highlights: ["Research paper implementations", "Autonomous agents & LLM fine-tuning", "Capstone innovation project"]
      },
    ],
    "Vocational": [
      {
        title: "AI Tools",
        desc: "Use ChatGPT tools",
        icon: "⚙️",
        duration: "3 Weeks • Fast-Track",
        highlights: ["GenAI productivity stacks", "Prompt engineering workflows", "Automating document analysis"]
      },
      {
        title: "Automation",
        desc: "Workflow automation",
        icon: "🔄",
        duration: "4 Weeks • Hands-on",
        highlights: ["No-code / low-code AI agents", "Zapier & Make.com workflows", "Enterprise system integration"]
      },
      {
        title: "Freelancing AI",
        desc: "Earn with AI",
        icon: "💼",
        duration: "4 Weeks • Career-Ready",
        highlights: ["Client acquisition strategies", "AI service delivery frameworks", "Portfolio & pitch building"]
      },
    ],
  };

  const openModule = (item: ModuleItem) => {
    setSelectedModule(item);
  };

  return (
    <div className="bg-slate-50 text-slate-900">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

        {/* 🎥 VIDEO BACKGROUND */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/school.mp4" type="video/mp4" />
        </video>

        {/* 🔥 DARK OVERLAY */}
        <div className="absolute inset-0 bg-[#020617]/80"></div>

        {/* 🔥 GRADIENT GLOW */}
        <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-orange-500/20 blur-[120px]"></div>
        <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-purple-500/20 blur-[120px]"></div>

        {/* MAIN CONTENT */}
        <div className="relative z-20 max-w-7xl mx-auto px-6">

          {/* 🔥 TOP GRID */}
          <div className="grid lg:grid-cols-2 gap-40 items-center">

            {/* LEFT TEXT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >

              <span className="px-5 py-3 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-xl font-bold">
                Institutional Grade AI
              </span>

              <h1 className="text-6xl md:text-6xl font-extrabold mt-6 leading-tight text-white">
                AI Curriculum for{" "}
                <span className="text-orange-500">
                  Innovators
                </span>
              </h1>

              <p className="text-slate-200 mt-6 text-2xl max-w-xl">
                AI education for schools & universities with real-world learning,
                ethical training and future-ready curriculum.
              </p>

              {/* CTA */}
              <div className="flex gap-4 mt-8 flex-wrap">

                <Link to="/services">
                  <button className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition">
                    View Programs
                  </button>
                </Link>

                <Link to="/contact">
                  <button className="border border-white/30 text-white px-8 py-4 rounded-full hover:bg-white/10 transition">
                    Contact Sales
                  </button>
                </Link>

              </div>

            </motion.div>

            {/* RIGHT VIDEO */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >

              <div className="rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">

                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[300px] md:h-[420px] object-cover"
                >
                  <source src="/video/school.mp4" type="video/mp4" />
                </video>

              </div>

              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10"></div>

            </motion.div>

          </div>

          {/* 🔥 FULL WIDTH STATS */}
          <div className="mt-16 border-y border-slate-500">

            <div className="grid grid-cols-2 md:grid-cols-4">

              <div className="p-6 border-r border-slate-500 text-center">
                <p className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">200+</p>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  Schools
                </p>
              </div>

              <div className="p-6 border-r border-slate-500 text-center">
                <p className="text-4xl md:text-5xl font-bold text-pink-500 mb-2">50K+</p>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  Students
                </p>
              </div>

              <div className="p-6 border-r border-slate-500 text-center">
                <p className="text-4xl md:text-5xl font-bold text-green-500 mb-2">100%</p>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  Curriculum Ready
                </p>
              </div>

              <div className="p-6 text-center">
                <p className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">24</p>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  Modules
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= TABS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-26">

        <h2 className="text-6xl font-bold mb-10">
          Tailored for {" "}
          <span className="text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
            Every Level
          </span>
        </h2>

        {/* TABS */}
        <div className="flex gap-6 border-b pb-4 mb-10">
          {Object.keys(tabData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 font-semibold transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-orange-500 text-black"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8">

          {tabData[activeTab].map((item, i) => {

            const gradients = [
              "from-orange-500 via-pink-500 to-purple-500",
              "from-blue-500 via-cyan-500 to-teal-400",
              "from-green-500 via-emerald-500 to-lime-400",
            ];

            return (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.03 }}
                onClick={() => openModule(item)}
                className="relative p-6 rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
              >

                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]}`}></div>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>

                <div className="relative z-10 text-white">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-white/80 mb-4">{item.desc}</p>

                  <div className="inline-flex items-center gap-2 font-semibold text-white group-hover:translate-x-1 transition-transform">
                    View Module Details →
                  </div>
                </div>

              </motion.div>
            );
          })}

        </div>

      </section>

      {/* ================= MODULE DETAIL MODAL ================= */}
      <AnimatePresence>
        {selectedModule && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedModule(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative border border-slate-100"
            >
              <button
                onClick={() => setSelectedModule(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl p-3 bg-orange-50 rounded-2xl border border-orange-100">
                  {selectedModule.icon}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                    {selectedModule.duration || "Institutional Module"}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {selectedModule.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 mb-6 leading-relaxed">
                {selectedModule.desc}. Designed with hands-on labs, guided mentoring, and industry-standard projects.
              </p>

              {selectedModule.highlights && (
                <div className="mb-8 bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                    Curriculum Highlights
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {selectedModule.highlights.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-4">
                <Link
                  to="/contact"
                  onClick={() => setSelectedModule(null)}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-orange-600/20 text-center"
                >
                  Enroll / Request Syllabus <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="px-5 py-3.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= CTA ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        <div className="relative p-16 rounded-3xl text-center text-white overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              Ready to integrate AI?
            </h2>

            <Link to="/contact">
              <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-slate-100 transition shadow-lg">
                Schedule Demo
              </button>
            </Link>
          </div>

        </div>

      </section>

    </div>
  );
}