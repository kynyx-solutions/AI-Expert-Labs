"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import CourseCatalogue from "./courseCatalogue";
import VerifyCertificate from "./verifyCertificate";
import DownloadCertificate from "./downloadCertificate";
import NsicCertification from "./nsicCertification";
import {
  categories,
  courses,
  coursesIn,
  enrollablePrograms,
  flagship,
  levels,
} from "./data/courses";

// Counted from the course data, so these stay accurate as courses are added.
const tracks = categories.filter((c) => coursesIn(c.id).length > 0);

const stats = [
  { value: String(enrollablePrograms.length), label: "Certification Programs", color: "text-orange-500" },
  { value: String(tracks.length), label: "Learning Tracks", color: "text-pink-500" },
  { value: `${flagship.hours} hrs`, label: "Flagship Program", color: "text-green-500" },
  { value: String(levels.length), label: "Skill Levels", color: "text-yellow-500" },
];

import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Brain,
  Briefcase,
  BarChart3,
  ShieldCheck,
  Users,
  Rocket,
} from "lucide-react";

const companies = [
  "Google",
  "Deloitte",
  "Zomato",
  "Flipkart",
  "Wipro",
  "Microsoft",
  "Tech Mahindra",
  "Samsung",
  "Apple",
  "Meta",
  "TCL",
  "Amazon",
  "Infosys",
  "TCS",
  "Accenture",
  "IBM",
  "Oracle",
  "Capgemini",
  "HCL",
  "Cognizant",
  "Adobe",
  "Intel",
  "NVIDIA",
  "Paytm",
  "PhonePe",
  "Swiggy",
  "Uber",
  "Netflix",
  "LinkedIn",
  "Salesforce",
];

function TrustedCompaniesSlider() {
  const repeatedCompanies = [...companies, ...companies];

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-14 border-y border-slate-200">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-8 md:mb-10">

        <h2 className="text-4xl md:text-6xl font-bold text-slate-900">
  Students Hired In{" "}
  <span className="text-orange-500">Leading Companies</span>
</h2>
      </div>

      {/* Left Fade */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

      {/* Right Fade */}
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Slider */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex w-max items-center gap-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {repeatedCompanies.map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 text-2xl md:text-4xl font-bold text-slate-700 hover:text-orange-500 transition duration-300"
            >
              {company}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CampasTransformation() {
  const oldSystem = [
    "Students depend on limited campus drives",
    "Manual tracking through Excel sheets",
    "Delayed company updates & responses",
    "Low interview opportunities for freshers",
    "Scattered reports with no live insights",
  ];

  const newSystem = [
    "AI matches students with verified openings instantly",
    "Smart dashboard with real-time placement tracking",
    "Instant alerts for jobs, drives & hiring partners",
    "Higher interview conversion with better profiles",
    "Auto analytics for performance & hiring growth",
  ];

  return (
    <section className="py-12 md:py-16 bg-[#f8fafc] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 blur-[130px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <p className="text-orange-500 font-semibold text-sm md:text-base tracking-[0.2em] uppercase mb-4">
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            What Changes When Your Institute
            <br />
            Grows With <span className="text-orange-500">AIxperts Labs</span>
          </h2>

          <p className="mt-6 text-xl text-slate-500 max-w-3xl mx-auto">
            Less manual effort, stronger placements, smarter career outcomes
            and future-ready students.
          </p>
        </motion.div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-[#0b1d6d] via-[#102c96] to-[#08134d] rounded-[40px] p-8 md:p-14 shadow-2xl border border-white/10">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <XCircle className="w-10 h-10 text-red-400" />
                <h3 className="text-2xl md:text-4xl font-bold text-white">
                  Traditional Challenges
                </h3>
              </div>

              <div className="space-y-5">
                {oldSystem.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-full px-6 py-5 flex items-center gap-4 shadow-lg"
                  >
                    <XCircle className="text-red-500 w-8 h-8 flex-shrink-0" />
                    <span className="text-slate-700 text-lg font-medium">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
                <h3 className="text-2xl md:text-4xl font-bold text-white">
                  AIxperts Labs Solution
                </h3>
              </div>

              <div className="space-y-5">
                {newSystem.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-full px-6 py-5 flex items-center gap-4 shadow-lg"
                  >
                    <CheckCircle2 className="text-green-500 w-8 h-8 flex-shrink-0" />
                    <span className="text-slate-800 text-lg font-semibold">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Institute() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const students = [
  {
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    className: "top-16 left-12",
    x: [0, 20, -15, 10, 0],
    y: [0, -15, 20, -10, 0],
  },
  {
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    className: "top-20 right-16",
    x: [0, -25, 15, -10, 0],
    y: [0, 20, -15, 10, 0],
  },
  {
    img: "https://randomuser.me/api/portraits/men/65.jpg",
    className: "top-72 left-24",
    x: [0, 18, -12, 15, 0],
    y: [0, -20, 15, -8, 0],
  },
  {
    img: "https://randomuser.me/api/portraits/women/29.jpg",
    className: "top-80 right-32",
    x: [0, -20, 10, -15, 0],
    y: [0, 18, -12, 10, 0],
  },
  {
    img: "https://randomuser.me/api/portraits/men/77.jpg",
    className: "bottom-24 left-1/4",
    x: [0, 22, -18, 12, 0],
    y: [0, -16, 14, -10, 0],
  },
  {
    img: "https://randomuser.me/api/portraits/women/53.jpg",
    className: "bottom-20 right-20",
    x: [0, -18, 14, -12, 0],
    y: [0, 22, -16, 8, 0],
  },
];

  return (
    <div className="bg-white text-slate-900 overflow-hidden">

      {/* ================= HERO ================= */}
     <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16">

  {/* 🎥 VIDEO BACKGROUND */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/video/institute.mp4" type="video/mp4" />
  </video>

  {/* 🔥 DARK OVERLAY */}
  <div className="absolute inset-0 bg-[#020617]/80"></div>

  {/* 🔥 GRADIENT GLOW */}
  <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-orange-500/20 blur-[120px]"></div>
  <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-blue-500/20 blur-[120px]"></div>

  {/* MAIN CONTENT */}
  <div className="relative z-20 max-w-7xl mx-auto px-6">

    {/* 🔥 TOP GRID */}
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-40 items-center">

      {/* LEFT TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <span className="px-5 py-3 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-xl font-bold">
          Trusted by Top Brands
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mt-6 leading-tight text-white">
          Launch Your Career in{" "}
          <span className="text-orange-500">Artificial Intelligence</span>
        </h1>

        <p className="text-slate-200 mt-6 text-lg md:text-2xl max-w-xl">
          Learn AI from industry experts with real-world projects, certifications, and career support.
        </p>

        {/* CTA */}
        <div className="flex gap-4 mt-8 flex-wrap">

          <a
            href="#programs"
            className="inline-block bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition"
          >
            View Programs
          </a>

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
            <source src="/video/institute.mp4" type="video/mp4" />
          </video>

        </div>

        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10"></div>

      </motion.div>

    </div>

    {/* 🔥 FULL WIDTH STATS */}
    <div className="mt-16 border-y border-slate-500">

      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`p-6 text-center border-slate-500 ${i % 2 === 0 ? "border-r" : ""} ${
              i === 1 ? "md:border-r" : ""
            } ${i < 2 ? "border-b md:border-b-0" : ""}`}
          >
            <p className={`text-4xl md:text-5xl font-bold mb-2 ${s.color}`}>{s.value}</p>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>

    </div>

  </div>
</section>
<TrustedCompaniesSlider />
    

      {/* ================= PROGRAMS & COURSES ================= */}
<CourseCatalogue />

{/* ================= CAMPUS TRANSFORMATION ================= */}
<CampasTransformation />

      {/* ================= BENEFITS ================= */}
      {/* <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 bg-gradient-to-r from-orange-500 to-purple-500 text-white text-center">

          {[
            "Real Projects",
            "Industry Mentors",
            "Placement Support",
          ].map((item, i) => (
            <div key={i} className="bg-orange  p-6 rounded-2xl shadow">
              <h3 className="font-bold">{item}</h3>
            </div>
          ))}

        </div>
      </section> */}
      {/* ================= TRUST / PARTNERS ================= */}
<section className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid lg:grid-cols-2 gap-12 items-center">

  {/* LEFT TEXT */}
  <motion.div
    initial={{ x: -60, opacity: 0 }}
    viewport={{ once: true }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
      Offer students{" "}
      <span className="text-orange-500">{courses.length}+ certification courses</span>{" "}
      across {tracks.length} learning tracks
    </h2>

    <p className="text-slate-500 mt-6 text-lg max-w-xl">
      From 2-day workshops to 15-day deep dives, in regular or weekend batches.
      Every course ends with an assessment and a verifiable certificate.
    </p>
  </motion.div>

  {/* RIGHT: LEARNING TRACKS */}
  <motion.div
    initial={{ x: 60, opacity: 0 }}
    viewport={{ once: true }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="grid sm:grid-cols-2 gap-3"
  >
    {tracks.map((t) => (
      <a
        key={t.id}
        href="#programs"
        className="flex items-center justify-between gap-3 bg-white rounded-2xl px-5 py-4 shadow border border-slate-100 hover:border-orange-400 transition"
      >
        <span className="font-semibold text-slate-800">{t.title}</span>
        <span className="text-sm font-bold text-orange-500 flex-shrink-0">{coursesIn(t.id).length}</span>
      </a>
    ))}
  </motion.div>

</section>

<InstituteBenefits />

<section className="relative overflow-hidden bg-[#edf3ff] py-12 md:py-16">
  {/* Dots Background */}
  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#7aa2ff_1px,transparent_1px)] [background-size:32px_32px]" />

  {/* Glow */}
  <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 blur-[130px]" />
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 blur-[130px]" />

  {/* Floating Avatars */}
  {students.map((item, i) => (
  <motion.div
    key={i}
    animate={{
      x: item.x,
      y: item.y,
      rotate: [0, 3, -3, 2, 0],
    }}
    transition={{
      duration: 8 + i,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={`absolute ${item.className} hidden md:block`}
  >
    <img
      src={item.img}
      alt="student"
      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl"
    />
  </motion.div>
))}

  {/* Main Content */}
  <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-orange-500 font-semibold text-sm md:text-base tracking-[0.2em] uppercase mb-4"
    >
      Future Ready Campus
    </motion.p>

    <motion.h2
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight"
    >
      Helping Institutes Build
      <br />
      <span className="text-orange-500">Career-Ready Students</span>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.7 }}
      viewport={{ once: true }}
      className="mt-6 text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed"
    >
      AI-powered training, placements, mentorship and real-world learning
      experiences designed for modern institutes.
    </motion.p>

    {/* Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.7 }}
      viewport={{ once: true }}
      className="flex flex-col sm:flex-row gap-5 justify-center mt-10"
    >
      <Link to="/services">
        <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-lg shadow-xl hover:scale-105 transition">
          Services
        </button>
      </Link>

      <Link to="/contact">
        <button className="px-10 py-4 rounded-2xl bg-white text-slate-900 font-semibold text-lg shadow-lg border border-slate-200 hover:scale-105 transition">
          Contact
        </button>
      </Link>
    </motion.div>
  </div>
</section>

{/* ================= JOINT CERTIFICATION WITH NSIC ================= */}
<NsicCertification />

{/* ================= CERTIFICATES: VERIFY + DOWNLOAD (EMAIL OTP) ================= */}
<section id="certificates" className="pt-12 md:pt-16 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-10 md:mb-12">
      <p className="text-orange-500 font-semibold text-sm md:text-base tracking-[0.2em] uppercase mb-4">
        Certificates
      </p>
      <h2 className="text-4xl md:text-6xl font-bold leading-tight">
        Verify or <span className="text-orange-500">Download</span>
      </h2>
      <p className="mt-6 text-xl text-slate-500 max-w-2xl mx-auto">
        Every AIxperts Labs certificate carries a unique certificate ID, so anyone can
        check it in seconds.
      </p>
    </div>

    {/* items-stretch keeps both cards the same height, even when one shows a result */}
    <div className="grid lg:grid-cols-2 gap-8 items-stretch">
      <VerifyCertificate />
      <DownloadCertificate />
    </div>
  </div>
</section>

      {/* ================= CTA ================= */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-4 md:mx-auto text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white p-10 md:p-16 rounded-4xl">

          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
            Start Your AI Journey Today
          </h2>

          <Link
            to="/enroll"
            className="inline-block bg-white text-slate-900 px-10 py-4 rounded-full font-semibold hover:scale-105 transition"
          >
            Enroll Now
          </Link>

        </div>
      </section>

    </div>
  );
}

function InstituteBenefits() {
  const features = [
    {
      icon: Brain,
      title: "AI Learning Platform",
      desc: "Interactive AI modules, live projects and guided career paths for students.",
    },
    {
      icon: Briefcase,
      title: "Placement Ready Programs",
      desc: "Industry-focused training with resume building and interview preparation.",
    },
    {
      icon: BarChart3,
      title: "Live Progress Dashboard",
      desc: "Track student growth, attendance and placement readiness in real time.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Certifications",
      desc: "Recognized certificates that increase hiring confidence.",
    },
    {
      icon: Users,
      title: "Mentor Guidance",
      desc: "Learn directly from experts and experienced industry mentors.",
    },
    {
      icon: Rocket,
      title: "Career Growth",
      desc: "Faster internships, jobs and career acceleration support.",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-[#eef4ff]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-orange-500 font-semibold text-sm md:text-base tracking-[0.2em] uppercase mb-4">
            Why Students Choose Us
          </p>

          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            What Your Institute Gets
            <br />
            With <span className="text-orange-500">AIxperts Labs</span>
          </h2>

          <p className="mt-6 text-xl text-slate-500 max-w-3xl mx-auto">
            Smart tools that simplify learning, training and placement success.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-2">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow-xl border border-slate-100 hover:shadow-xl transition"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-500 text-lg leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Button */}
       <div className="text-center mt-10">
  <Link to="/contact">
    <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-lg shadow-xl hover:scale-105 transition">
      Contact
    </button>
  </Link>
</div>
      </div>
    </section>
  );
}