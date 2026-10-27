"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { submitForm } from "./lib/api";

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

const courses = [
  {
    title: "AI & ML Program",
    desc: "Become AI Engineer with real projects",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200",
  },
  {
    title: "Generative AI",
    desc: "Master ChatGPT & LLM tools",
    image:
      "https://images.unsplash.com/photo-1682685797439-a05dd915cee9?q=80&w=1200",
  },
  {
    title: "Data Science",
    desc: "Real datasets & ML training",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
  },
  {
    title: "Cyber Security",
    desc: "Learn ethical hacking & security tools",
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1200",
  },
  {
    title: "Cloud Computing",
    desc: "Master AWS, Azure & DevOps tools",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
  },
  {
    title: "Full Stack Development",
    desc: "Build modern web apps with React & Node",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200",
  },
];

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
    <section className="relative overflow-hidden bg-white py-16 border-y border-slate-200">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">

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
    <section className="py-28 bg-[#f8fafc] relative overflow-hidden">
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
          className="text-center mb-20"
        >
         <p className="text-5xl font-semibold tracking-[0.1em] uppercase mb-4 leading-tight text-orange-500">
  Why <span className="text-black">Choose</span> Us
</p>

          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            What Changes When Your Institute
            <br />
            Grows With <span className="text-orange-500">AI Expert Labs</span>
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
                  AI Expert Labs Solution
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
  const [showForm, setShowForm] = useState(false);
  const [enrollForm, setEnrollForm] = useState({ name: "", email: "" });
  const [enrollStatus, setEnrollStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleEnrollChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEnrollForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollForm.name || !enrollForm.email) return;

    setEnrollStatus("sending");
    try {
      await submitForm({
        formType: "enrollment",
        name: enrollForm.name,
        email: enrollForm.email,
        subject: "Institute Enrollment Request",
        message: `${enrollForm.name} (${enrollForm.email}) requested enrollment info via the Institute page.`,
        source: "institute-page",
      });
      setEnrollStatus("sent");
      setEnrollForm({ name: "", email: "" });
      setTimeout(() => {
        setEnrollStatus("idle");
        setShowForm(false);
      }, 2000);
    } catch (err) {
      console.error("EMAIL ERROR:", err);
      setEnrollStatus("error");
    }
  };

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
     <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">

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
    <div className="grid lg:grid-cols-2 gap-40 items-center">

      {/* LEFT TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <span className="px-5 py-3 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-xl font-bold">
          Trusted by Top Brands
        </span>

        <h1 className="text-6xl md:text-6xl font-extrabold mt-6 leading-tight text-white">
          Launch Your Career in{" "}
          <span className="text-orange-500">Artificial Intelligence</span>
        </h1>

        <p className="text-slate-200 mt-6 text-2xl max-w-xl">
          Learn AI from industry experts with real-world projects, certifications, and career support.
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
            <source src="/video/institute.mp4" type="video/mp4" />
          </video>

        </div>

        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10"></div>

      </motion.div>

    </div>

    {/* 🔥 FULL WIDTH STATS */}
    <div className="mt-16 border-y border-slate-500">

      <div className="grid grid-cols-2 md:grid-cols-4">

        <div className="p-6 border-r border-slate-500 text-center">
          <p className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">1000+</p>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
            Learners
          </p>
        </div>

        <div className="p-6 border-r border-slate-500 text-center">
          <p className="text-4xl md:text-5xl font-bold text-pink-500 mb-2">50+</p>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
            Courses
          </p>
        </div>

        <div className="p-6 border-r border-slate-500 text-center">
          <p className="text-4xl md:text-5xl font-bold text-green-500 mb-2">90%</p>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
            Placement Rate
          </p>
        </div>

        <div className="p-6 text-center">
          <p className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">95%</p>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
            Success
          </p>
        </div>

      </div>

    </div>

  </div>
</section>
<TrustedCompaniesSlider />
    

      {/* ================= COURSES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-7xl font-bold text-center mb-18">
          Explore <span className="text-orange-500">Programs</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {courses.map((c, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              data-aos="fade-up"
              className="rounded-3xl overflow-hidden shadow hover:shadow-2xl transition"
            >
              <img src={c.image} className="h-52 w-full object-cover" />

              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{c.title}</h3>
                <p className="text-slate-500 mb-4">{c.desc}</p>

                <button
                  onClick={() => setShowForm(true)}
                  className="text-orange-500 font-semibold"
                >
                  Enroll →
                </button>
              </div>
            </motion.div>
          ))}

        </div>
</section>

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
<section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">

  {/* LEFT TEXT */}
  <motion.div
    initial={{ x: -60, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
      Offer students{" "}
      <span className="text-orange-500">10,600+ courses</span>{" "}
      from 350+ leading universities and industry partners
    </h2>

    <p className="text-slate-500 mt-6 text-lg max-w-xl">
      Learn from world-class institutions and top companies with
      cutting-edge AI curriculum and real-world applications.
    </p>
  </motion.div>

  {/* RIGHT LOGO IMAGE */}
  <motion.div
    initial={{ x: 60, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <img
      src="https://images.ctfassets.net/2pudprfttvy6/2eC1z7LVc0mMog2PnVxS5u/1e10361669fa01aeea0a1a2e9352a229/BC-2700_B2B_Homepage_Partner_Logo_Refresh_April_2024b.png"
      className="w-full rounded-2xl shadow-xl"
    />
  </motion.div>

</section>

<InstituteBenefits />

<section className="relative overflow-hidden bg-[#edf3ff] py-28">
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
      className="text-orange-500 font-semibold text-4xl uppercase tracking-[0.3em] mb-10"
    >
     Future <span className="text-black">Ready</span> Campus
</motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="text-4xl md:text-7xl font-bold text-slate-900 leading-tight"
    >
      Helping Institutes Build
      <br />
      <span className="text-orange-500">Career-Ready Students</span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.7 }}
      viewport={{ once: true }}
      className="mt-8 text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed"
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
      className="flex flex-col sm:flex-row gap-5 justify-center mt-12"
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

      {/* ================= CTA ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white p-16 rounded-4xl">

          <h2 className="text-7xl font-bold mb-6">
            Start Your AI Journey Today
          </h2>

          <button
            onClick={() => setShowForm(true)}
            className="bg-white text-black px-8 py-3 rounded-full"
          >
            Enroll Now
          </button>

        </div>
      </section>

      {/* ================= MODAL ================= */}
     {/* ================= MODAL ================= */}
{showForm && (
  <div
    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    onClick={() => setShowForm(false)} // 👈 outside click se close
  >
    <div
      className="bg-white p-8 rounded-2xl w-80 relative"
      onClick={(e) => e.stopPropagation()} // 👈 andar click pe band na ho
    >

      {/* ❌ CLOSE BUTTON */}
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
      >
        ✕
      </button>

      <h2 className="font-bold mb-4 text-lg">Enroll</h2>

      {enrollStatus === "sent" ? (
        <p className="text-emerald-600 font-semibold text-center py-4">Thanks! We'll be in touch. ✓</p>
      ) : (
        <form onSubmit={handleEnrollSubmit}>
          <input
            name="name"
            value={enrollForm.name}
            onChange={handleEnrollChange}
            required
            className="w-full mb-3 border p-2 rounded"
            placeholder="Name"
          />

          <input
            type="email"
            name="email"
            value={enrollForm.email}
            onChange={handleEnrollChange}
            required
            className="w-full mb-3 border p-2 rounded"
            placeholder="Email"
          />

          <button
            type="submit"
            disabled={enrollStatus === "sending"}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition disabled:opacity-60"
          >
            {enrollStatus === "sending" ? "Sending..." : "Submit"}
          </button>

          {enrollStatus === "error" && (
            <p className="text-red-500 text-xs text-center mt-2">Failed to send. Please try again.</p>
          )}
        </form>
      )}

    </div>
  </div>
)}

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
    <section className="py-28 bg-[#eef4ff]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
         <p className="text-orange-500 font-semibold text-4xl tracking-[0.1em] uppercase mb-8">
  Why Students <span className="text-black">Choose Us</span>
</p>

          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            What Your Institute Gets
            <br />
            With <span className="text-orange-500">AI Expert Labs</span>
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