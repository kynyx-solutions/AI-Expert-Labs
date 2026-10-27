import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter ,Bot} from "lucide-react";
import About from "./about";
import FloatingGini from "./floatinggini";
import Services from "./services";
import Portfolio from "./portfolio";
import Contact from "./contact";
import FloatingSocials from "./FloatingSocials";
import Corporate from "./corporate";
import Institute from "./institute";
import FloatingWhatsapp from "./floatingWhatsapp";
import School from "./school";
import logo from "./assets/logo/logo.png";
import run from "./assets/logo/run.png";
import ecotwist from "./assets/partners/ecotwist.png";
import bharatx from "./assets/partners/bhartex.png";
import infratech from "./assets/partners/infratech.png";
import Homeasy from "./assets/partners/homeasy.png";
import aihero from "./public/videos/aihero.mp4";
import Consultation from "./consultation";
import Enroll from "./enroll";
import Academy from "./academy";
import Program from "./program";
import MovingGini from "./MovingGini";
import cehro from './assets/cehro.png';
import kynyx from './assets/kynyx logo.png'; 
import casters from './assets/Casters.png'; 


import { 
  ArrowRight, 
  BrainCircuit, 
  Workflow, 
  Users, 
  Zap, 
  Menu, 
  X, 
  Mic, 
  ChevronRight,
  BarChart3,
  ShieldCheck,
  Cpu,
  Globe,
  Sparkles,
  Layers,
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Search,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { submitForm } from "./lib/api";

// --- Components ---

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);
  const [consultForm, setConsultForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [consultStatus, setConsultStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleConsultChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConsultForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultForm.name || !consultForm.email) return;

    setConsultStatus("sending");
    try {
      await submitForm({
        formType: "free-consultation",
        name: consultForm.name,
        email: consultForm.email,
        phone: consultForm.phone,
        subject: "Free Consultation Request",
        message: consultForm.message,
        source: "navbar-popup",
      });
      setConsultStatus("sent");
      setConsultForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => {
        setConsultStatus("idle");
        setShowConsultation(false);
      }, 2000);
    } catch (err) {
      console.error("EMAIL ERROR:", err);
      setConsultStatus("error");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 pt-1 transition-all duration-300
      ${
        scrolled
          ? "bg-white shadow-md border-b border-slate-200"
          : "bg-white/70 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        {/* Logo */}
<Link to="/" className="flex items-center gap-3">
  <img
    src={logo}
    alt="AIxperts Labs Logo"
    className="h-18" // 🔥 increased from h-12 → h-16
  />
</Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">

          <Link to="/" className="text-sm font-bold text-slate-600 hover:text-blue-600 uppercase tracking-widest">
            Home
          </Link>

          <Link to="/about" className="text-sm font-bold text-slate-600 hover:text-blue-600 uppercase tracking-widest">
            About
          </Link>

          <Link to="/services" className="text-sm font-bold text-slate-600 hover:text-blue-600 uppercase tracking-widest">
            Services
          </Link>

          {/* Academic Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-blue-600 uppercase tracking-widest">
              Academic
              <ChevronRight className="w-4 h-4 rotate-90" />
            </button>

            <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white shadow-xl border rounded-xl py-2 w-48">

                <Link to="/academy" className="block px-4 py-2 text-sm hover:bg-slate-100">
                  Academy
                </Link>

                <Link to="/corporate" className="block px-4 py-2 text-sm hover:bg-slate-100">
                  Corporate Training
                </Link>

                <Link to="/institute" className="block px-4 py-2 text-sm hover:bg-slate-100">
                  Institute Courses
                </Link>

                <Link to="/school" className="block px-4 py-2 text-sm hover:bg-slate-100">
                  School Programs
                </Link>

              </div>
            </div>
          </div>

          <Link to="/portfolio" className="text-sm font-bold text-slate-600 hover:text-blue-600 uppercase tracking-widest">
            Portfolio
          </Link>

          <Link to="/contact" className="text-sm font-bold text-slate-600 hover:text-blue-600 uppercase tracking-widest">
            Contact
          </Link>

          <div className="flex items-center gap-4">

  {/* Free Consultation */}
 <button
    onClick={() => setShowConsultation(!showConsultation)}
    className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold"
  >
    Free Consultation
  </button>

  {/* WhatsApp Button */}

</div>

        </div>

        {/* Mobile Button */}
        <button
          className="lg:hidden text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-4 shadow-md">

          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block font-semibold text-slate-700">
            Home
          </Link>

          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block font-semibold text-slate-700">
            About
          </Link>

          <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="block font-semibold text-slate-700">
            Services
          </Link>

          <div className="space-y-2">
            <p className="font-bold text-slate-800">Academic</p>

            <Link to="/academy" onClick={() => setIsMobileMenuOpen(false)} className="block pl-3 text-sm text-slate-600">
              Academy
            </Link>

            <Link to="/corporate" onClick={() => setIsMobileMenuOpen(false)} className="block pl-3 text-sm text-slate-600">
              Corporate Training
            </Link>

            <Link to="/institute" onClick={() => setIsMobileMenuOpen(false)} className="block pl-3 text-sm text-slate-600">
              Institute Courses
            </Link>

            <Link to="/school" onClick={() => setIsMobileMenuOpen(false)} className="block pl-3 text-sm text-slate-600">
              School Programs
            </Link>
          </div>

          <Link to="/portfolio" onClick={() => setIsMobileMenuOpen(false)} className="block font-semibold text-slate-700">
            Portfolio
          </Link>

          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block font-semibold text-slate-700">
            Contact
          </Link>

          <button
            onClick={() => {
              setShowConsultation(true);
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-center bg-blue-600 text-white py-3 rounded-full font-semibold"
          >
            Free Consultation
          </button>

        </div>
      )}
    </nav>
{showConsultation && (
  <div className="fixed top-[96px] right-6 z-50 w-[420px]">

    <div className="bg-white rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.2)] border p-6 animate-slideDown">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-slate-800">
          Free Consultation
        </h3>

        <button
          onClick={() => setShowConsultation(false)}
          className="text-gray-400 hover:text-black text-lg"
        >
          ✕
        </button>
      </div>

      {/* FORM */}
      <form className="space-y-4" onSubmit={handleConsultSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={consultForm.name}
          onChange={handleConsultChange}
          required
          className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={consultForm.email}
          onChange={handleConsultChange}
          required
          className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={consultForm.phone}
          onChange={handleConsultChange}
          className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500"
        />

        <textarea
          rows={5}
          name="message"
          placeholder="Tell us about your requirement..."
          value={consultForm.message}
          onChange={handleConsultChange}
          className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={consultStatus === "sending"}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-500 transition disabled:opacity-60"
        >
          {consultStatus === "sending" ? "Sending..." : consultStatus === "sent" ? "Sent! ✓" : "Submit Request"}
        </button>

        {consultStatus === "error" && (
          <p className="text-red-500 text-sm text-center">Failed to send. Please try again.</p>
        )}

      </form>

    </div>
  </div>
)}
  </>
);
}; 
const Hero = () => {

  const companies = [
    "Google","Microsoft","Amazon","Meta","Apple","Netflix",
    "Adobe","Salesforce","IBM","Intel","Nvidia","Oracle"
  ];

  const doubledCompanies = [...companies, ...companies];

  return (
    <>
      <section className="relative w-full min-h-[85vh] flex items-center justify-center pt-10 sm:pt-10 lg:pt-12 pb-6 overflow-hidden hero-futuristic-bg">

        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-orange-600/10 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-6" /> Leading the AI Revolution
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              Engineering <span className="text-orange-500">Intelligence</span> for the Future
            </h1>

            <p className="text-sm sm:text-base md:text-xl text-slate-300 mb-6 max-w-2xl">
              AIxperts Labs is a premier innovation hub specializing in enterprise AI strategy, automation, and workforce transformation.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-6">

              <Link
                to="/services"
                className="bg-orange-600 text-white px-10 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-orange-700 transition flex items-center justify-center gap-2"
              >
                Explore Solutions
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/about"
                className="bg-white/5 border border-white/10 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-white/10 transition text-center"
              >
                Our Methodology
              </Link>

            </div>

            {/* STATS 🔥 UPDATED */}
            <div className="mt-8 flex flex-wrap items-center gap-8 border-t border-white/10 pt-6">

              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">50K+</p>
                <p className="text-[10px] text-slate-400 uppercase">Students</p>
              </div>

              <div className="hidden sm:block w-px h-6 bg-white/10"></div>

              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">200+</p>
                <p className="text-[10px] text-slate-400 uppercase">Projects</p>
              </div>

              <div className="hidden sm:block w-px h-6 bg-white/10"></div>

              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">98%</p>
                <p className="text-[10px] text-slate-400 uppercase">Success Rate</p>
              </div>

              <div className="hidden sm:block w-px h-6 bg-white/10"></div>

              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">24/7</p>
                <p className="text-[10px] text-slate-400 uppercase">Support</p>
              </div>

            </div>

          </motion.div>

          {/* RIGHT */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >

            <div className="mx-auto w-[90%] sm:w-[100%] lg:w-[90%] h-[550px] sm:h-[550px] lg:h-[650px] overflow-hidden rounded-[30px]">

             <video
  autoPlay
  loop
  muted
  playsInline
  className="w-125 max-h-[650px] object-cover"
>
  <source src="/video/aihero.mp4" type="video/mp4" />
</video>

            </div>

          </motion.div>

        </div>
      </section>

      {/* COMPANY SLIDER */}
  <section className="bg-[#0a0f2c] py-8 sm:py-12 overflow-hidden">

  <p className="text-center text-white text-l sm:text-3xl mb-8">
    Our Students Work at <span className="text-purple-400">Top Companies</span>
  </p>

  <div className="overflow-hidden w-full">

    <div className="animate-scroll">

      {[...companies, ...companies, ...companies].map((company, i) => (
        <div
          key={i}
          className="px-3 sm:px-5 py-2 sm:py-3 mr-2 sm:mr-4 bg-white/10 border border-white/20 rounded-xl text-white text-[10px] sm:text-sm font-semibold whitespace-nowrap"
        >
          {company}
        </div>
      ))}

    </div>

  </div>

</section>
    </>
  );
};

const CredibilityStrip = () => {

  const partners = [
    { id: 1, name: "BiddRx", logo: "https://www.biddrx.com/Images/logo.png" },
    { id: 2, name: "Casters Global", logo: casters },
    { id: 3, name: "Cehro India", logo: cehro },
    { id: 4, name: "Sumedha Agro", logo: "https://sumedhaagro.com/assets/Logo-DFEZMT6g.webp" },
    { id: 5, name: "Homeasy", logo: Homeasy },
    { id: 6, name: "Bharatx Ventures", logo: bharatx },
    { id: 7, name: "Kynyx", logo: kynyx },
    { id: 8, name: "EcoTwist", logo: ecotwist },
    { id: 9, name: "Bharatx Infratech", logo: infratech },
  ];

  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-6 overflow-hidden">
      {/* HEADING */}
      <div className="text-center mb-4 px-6">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          <span className="text-black">Strategic </span>
          <span className="text-orange-500">Partners</span>
        </h2>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
          Collaborating with industry leaders to drive innovation and excellence.
        </p>
      </div>

      {/* SLIDER */}
      <div className="relative w-full overflow-hidden">
        {/* FADE EDGES */}
        <div className="absolute left-0 top-0 h-full w-24 md:w-48 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 h-full w-24 md:w-48 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        {/* TRACK */}
        <div className="flex w-max items-center gap-12 md:gap-20 animate-marquee hover:[animation-play-state:paused] px-6">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
                className="
                flex-shrink-0 
                h-24 md:h-28 
                w-auto
                flex items-center justify-center
                rounded-2xl p-3
                hover:bg-white transition
              "
            >
            <img
  src={partner.logo}
  alt={partner.name}
  className={`
    object-contain
    transition duration-300
    hover:scale-110

    ${partner.name === "Kynyx"
      ? "h-40 scale-125"
      : "max-h-full"}
  `}
/>
            </div>
          ))}
        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        @media (max-width: 1024px) {
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        }

        @media (max-width: 640px) {
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        }
      `}</style>
    </section>
  );
};
const CapabilityStack = () => {

  const layers = [
    { title: 'Intelligence Layer', desc: 'Custom LLMs and proprietary neural architectures.', icon: <BrainCircuit className="w-5 h-5" /> },
    { title: 'Agentic Layer', desc: 'Autonomous task execution and self-healing workflows.', icon: <Workflow className="w-5 h-5" /> },
    { title: 'Interface Layer', desc: 'Voice-native and multimodal human-machine interaction.', icon: <Mic className="w-5 h-5" /> },
    { title: 'Infrastructure Layer', desc: 'Secure, scalable, and compliant AI compute stacks.', icon: <ShieldCheck className="w-5 h-5" /> },
  ];

  // 🔥 DARK PREMIUM GRADIENTS
  const gradients = [
    "hover:from-orange-300 hover:via-orange-200 hover:to-amber-300",
    "hover:from-blue-300 hover:via-sky-200 hover:to-cyan-300",
    "hover:from-purple-300 hover:via-pink-200 hover:to-rose-300",
    "hover:from-emerald-300 hover:via-green-200 hover:to-lime-300",
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="max-w-3xl mb-10">
          <h2 className="text-4xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
            The Aixperts <br />
            <span className="text-orange-600">Capability Stack</span>
          </h2>

          <p className="text-slate-500 text-2xl leading-relaxed">
            Our vertical integration ensures that every layer of your AI transformation is optimized for performance and security.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

          {layers.map((layer, i) => (

            <div
              key={i}
              className={`group relative p-8 rounded-3xl overflow-hidden
              
              border border-slate-200
              
              bg-gradient-to-br from-orange-50 via-white to-purple-50
              
              hover:bg-gradient-to-br ${gradients[i]}
              
              transition-all duration-500 ease-out hover:-translate-y-2
              shadow-sm hover:shadow-[0_25px_80px_rgba(0,0,0,0.2)]`}
            >

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-black/20 transition duration-500"></div>

              <div className="relative z-10">

                {/* ICON */}
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center mb-6 
                group-hover:bg-white group-hover:text-orange-600 transition">
                  {layer.icon}
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold mb-3 text-slate-900 
                group-hover:text-white transition">
                  {layer.title}
                </h3>

                {/* DESC */}
                <p className="text-sm text-slate-500 
                group-hover:text-white/90 leading-relaxed transition">
                  {layer.desc}
                </p>

              </div>

              {/* GLOW */}
              <div className="absolute -top-10 -right-10 w-32 h-32 
              bg-gradient-to-r from-orange-400/40 to-purple-400/40 
              blur-3xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

const Industries = () => {

  const industries = [
    { name: 'Deeptech', desc: 'Smart grid management and climate risk analytics.', icon: <BarChart3 className="w-6 h-6" /> },
    { name: 'Healthcare', desc: 'Diagnostic assistance and personalized patient care pathways.', icon: <Activity className="w-6 h-6" /> },
    { name: 'Manufacturing', desc: 'Predictive maintenance and autonomous supply chain optimization.', icon: <Layers className="w-6 h-6" /> },
    { name: 'Edtech', desc: 'Adaptive learning platforms and AI-driven student support.', icon: <Globe className="w-6 h-6" /> },
    { name: 'Retail & E-commerce', desc: 'Hyper-personalized customer journeys and inventory intelligence..', icon: <CheckCircle2 className="w-6 h-6" /> },
    { name: 'Financial Services', desc: 'Risk modeling, fraud detection, and automated wealth management.', icon: <Cpu className="w-6 h-6" /> },
  ];

  // 🔥 6 DIFFERENT PREMIUM GRADIENTS
  const gradients = [
    "hover:from-orange-400 hover:via-orange-300 hover:to-amber-400",
    "hover:from-blue-400 hover:via-sky-300 hover:to-cyan-400",
    "hover:from-purple-400 hover:via-pink-300 hover:to-rose-400",
    "hover:from-emerald-400 hover:via-green-300 hover:to-lime-400",
    "hover:from-indigo-400 hover:via-violet-300 hover:to-purple-400",
    "hover:from-teal-400 hover:via-cyan-300 hover:to-blue-400",
  ];

  return (
    <section className="py-12 md:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col lg:flex-row gap-10 items-center">

          {/* LEFT */}
          {/* LEFT */}
<div className="lg:w-1/2">

  {/* HEADING */}
  <h2 className="text-6xl md:text-8xl font-bold text-slate-900 mb-10 tracking-tight leading-tight">
    Industry <br />
    <span className="text-orange-500">Verticals</span>
  </h2>

  {/* DESCRIPTION */}
  <p className="text-slate-500 text-2xl leading-relaxed mb-14 max-w-xl">
    We deploy specialized AI solutions across diverse sectors, solving unique challenges with precision engineering.
  </p>

  {/* BUTTON */}
  <div className="mt-6">
    <Link
      to="/portfolio"
      className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg 
      hover:bg-orange-600 transition-all inline-flex items-center gap-3 shadow-lg"
    >
      Industry Insights 
      <ArrowUpRight className="w-5 h-5" />
    </Link>
  </div>

</div>

          {/* RIGHT */}
          <div className="lg:w-4/5 p-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {industries.map((ind, i) => (

              <div
                key={i}
                className={`group relative p-6 rounded-[32px] overflow-hidden
                
                border border-slate-200
                
                bg-gradient-to-br from-orange-50 via-white to-purple-50
                
                hover:bg-gradient-to-br ${gradients[i]}
                
                transition-all duration-500 hover:-translate-y-2
                shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)]`}
              >

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-black/25 transition duration-500"></div>

                <div className="relative z-10">

                  {/* ICON */}
                  <div className="text-orange-600 mb-6 group-hover:text-white transition">
                    {ind.icon}
                  </div>

                  {/* TITLE */}
                  <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-white transition">
                    {ind.name}
                  </h4>

                  {/* DESC */}
                  <p className="text-sm text-slate-500 leading-relaxed group-hover:text-white/90 transition">
                    {ind.desc}
                  </p>

                </div>

                {/* GLOW */}
                <div className="absolute -bottom-10 -right-10 w-28 h-28 
                bg-gradient-to-r from-white/30 to-white/10 
                blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
};
const CaseStudies = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h2 className="text-5xl md:text-8xl font-bold text-slate-900 mb-6 tracking-tight">
            Impact <span className="text-orange-500">Stories</span>
          </h2>
          <p className="text-slate-500 text-2xl md:text-4xl">Measurable results from our most ambitious enterprise collaborations.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          {[
            { title: 'Global Bank Transformation', client: 'Fortune 500 Bank', impact: '40% Cost Reduction', img: 'https://www.shutterstock.com/image-photo/cost-reduction-saving-through-digital-600nw-2669968679.jpg' },
            { title: 'Autonomous Logistics Hub', client: 'LogiTech Corp', impact: '99.9% Accuracy', img: 'https://media.istockphoto.com/id/2205777418/photo/port-of-southampton-captured-by-drone-at-sunrise.jpg?s=612x612&w=0&k=20&c=t5CV8Tcin-Qe5wMQ7I5xFxiy94B0vkvPslr-t0hrG5Q=' },
          ].map((study, i) => (
            <Link to="/portfolio" key={i} className="group cursor-pointer block">
              <div className="relative h-[400px] rounded-[40px] overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src={study.img}
                  alt={study.title}
                  className="w-full h-full object-cover rounded-[40px] group-hover:brightness-90 transition-all duration-500"
                />
               
                <div className="absolute bottom-10 left-10 right-10">
                  <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">{study.impact}</span>
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-bold text-white tracking-tight">{study.title}</h3>
                    <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      View Story →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const EducationEcosystem = () => {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-orange-600 font-bold uppercase tracking-[0.2em] text-xs mb-6 block">Knowledge Hub</span>
            <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight">The Education <br /><span className="text-orange-600 italic">Ecosystem</span></h2>
            <p className="text-slate-500 text-xl leading-relaxed mb-12">Empowering the next generation of AI leaders through institutional-grade training and university partnerships.</p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-bold text-slate-900 mb-2">50K+</p>
                <p className="text-sm text-slate-400 uppercase tracking-widest">Students Trained</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-slate-900 mb-2">120+</p>
                <p className="text-sm text-slate-400 uppercase tracking-widest">Partner Institutions</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 p-12 rounded-[48px] border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Curriculum Tracks</h3>
            <div className="space-y-4">
              {['AI Strategy for Executives', 'Deep Learning Engineering', 'AI Ethics & Governance', 'Autonomous Agent Design'].map((track, i) => (
                <Link
                  to="/institute"
                  key={i}
                  className="flex items-center justify-between p-6 rounded-2xl bg-white border border-slate-100 hover:border-orange-500 transition-all group cursor-pointer shadow-sm"
                >
                  <span className="font-bold text-slate-900">{track}</span>
                  <ChevronRight className="w-5 h-5 text-orange-500 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ThoughtLeadership = () => {

  const posts = [
    { 
      title: 'The Future of Autonomous Agents',
      date: 'Mar 10, 2026',
      category: 'Research',
      img: 'https://cdn.prod.website-files.com/61bb26fe53aeb2a18bbd17e4/6808eed10b459c00fbfc6473_Hero%20Image.webp'
    },
    { 
      title: 'Scaling AI in Regulated Industries',
      date: 'Mar 05, 2026',
      category: 'Strategy',
      img: 'https://predikly.com/wp-content/uploads/2025/09/PD-AWA.jpg'
    },
    { 
      title: 'Ethics in the Era of AGI',
      date: 'Feb 28, 2026',
      category: 'Ethics',
      img: 'https://media.licdn.com/dms/image/v2/D4E12AQFwiMVC1kb1eA/article-cover_image-shrink_720_1280/B4EZdhLX7nGwAM-/0/1749682066100?e=2147483647&v=beta&t=lishpPK7d9DQpDSLMx8o8b4Ahbe7kgj-tifp6WeRee4'
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-5xl font-bold text-slate-900 tracking-tight">
            Thought Leadership
          </h2>

          <button className="text-orange-600 font-bold flex items-center gap-2 group">
            All Insights
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* BLOG CARDS */}
        <div className="grid md:grid-cols-3 gap-12">

          {posts.map((post, i) => (

            <div key={i} className="group cursor-pointer">

              {/* IMAGE */}
              <div className="h-64 rounded-3xl mb-8 overflow-hidden">

                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

              </div>

              {/* CATEGORY */}
              <span className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-3 block">
                {post.category}
              </span>

              {/* TITLE */}
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                {post.title}
              </h3>

              {/* DATE */}
              <p className="text-slate-400 text-sm">
                {post.date}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

const Solutions = () => {
  const solutions = [
    {
      title: 'Enterprise AI Strategy',
      desc: 'High-level strategic roadmaps for AI adoption, focusing on ROI, risk mitigation, and long-term scalability.',
      icon: <Globe className="w-6 h-6" />,
      tag: 'Strategic'
    },
    {
      title: 'Autonomous Workflows',
      desc: 'Designing and deploying self-optimizing agents that handle complex operational tasks with zero friction.',
      icon: <Workflow className="w-6 h-6" />,
      tag: 'Automation'
    },
    {
      title: 'Institutional Training',
      desc: 'Customized education programs for universities and corporate leadership to master the AI landscape.',
      icon: <BrainCircuit className="w-6 h-6" />,
      tag: 'Education'
    },
    {
      title: 'Custom LLM Solutions',
      desc: 'Development of proprietary language models tailored to your specific industry data and security needs.',
      icon: <Cpu className="w-6 h-6" />,
      tag: 'Product'
    }
  ];

  // 🔥 DIFFERENT GRADIENTS
  const gradients = [
    "hover:from-orange-400 hover:via-orange-300 hover:to-yellow-200",
    "hover:from-blue-400 hover:via-cyan-300 hover:to-sky-200",
    "hover:from-purple-400 hover:via-pink-300 hover:to-rose-200",
    "hover:from-green-400 hover:via-emerald-300 hover:to-lime-200",
  ];

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="grid lg:grid-cols-12 gap-16 mb-14 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-5 mb-6">
              <div className="h-px w-12 bg-orange-500" />
              <span className="text-orange-500 font-bold uppercase tracking-[0.2em] text-xs">
                Our Expertise
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              <span className="text-black">Architecting the</span> <br />
              <span className="text-orange-600">Next Era of Intelligence</span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pb-4">
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              We provide the technical foundation and strategic vision required for organizations to thrive in an AI-first world.
            </p>

            <Link
              to="/portfolio"
              className="text-slate-900 font-bold flex items-center gap-2 group hover:text-orange-600 transition-colors uppercase tracking-widest text-sm"
            >
              View Capabilities 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-4 gap-6">
          {solutions.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -6 }}
              className={`group relative p-6 rounded-[32px] overflow-hidden
              border border-slate-200

              bg-gradient-to-br from-orange-50 via-white to-purple-50

              hover:bg-gradient-to-br ${gradients[i]}

              transition-all duration-700 ease-out
              shadow-sm hover:shadow-[0_25px_70px_rgba(0,0,0,0.2)]`}
            >

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-black/20 transition duration-500"></div>

              <div className="relative z-10">

                {/* TOP */}
                <div className="flex items-center justify-between mb-10">

                  <div className="w-14 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg 
                  group-hover:bg-white group-hover:text-orange-600 transition">
                    {s.icon}
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border border-slate-200 px-3 py-1 rounded-full 
                  group-hover:text-white group-hover:border-white/30 transition">
                    {s.tag}
                  </span>

                </div>

                {/* TITLE */}
                <h3 className="text-3xl font-bold text-slate-900 mb-4 
                group-hover:text-white transition">
                  {s.title}
                </h3>

                {/* DESC */}
                <p className="text-slate-500 text-lg leading-relaxed mb-10 
                group-hover:text-white/90 transition">
                  {s.desc}
                </p>

              </div>

              {/* GLOW EFFECT */}
              <div className="absolute -bottom-16 -right-16 w-40 h-40 
              bg-gradient-to-r from-white/30 to-white/10 
              blur-3xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

const HelloGini = () => {
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const startListening = () => {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      const fallbackMsg = "Voice input is not supported on this browser. Please try Chrome, Edge, or text inquiry.";
      setResponse(fallbackMsg);
      speak(fallbackMsg);
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.lang = "en-IN";
      setListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();

        let reply = "";

        if (transcript.includes("hellogini") || transcript.includes("what is this")) {
          reply = "HelloGini ek voice based AI system hai jo human aur machine ke beech natural interaction create karta hai.";
        } 
        else if (transcript.includes("feature")) {
          reply = "HelloGini ke features me voice interaction, emotion understanding aur privacy first architecture shamil hai.";
        } 
        else if (transcript.includes("project")) {
          reply = "Humne chatbot, fraud detection aur automation jaise AI projects banate hain.";
        } 
        else {
          reply = "Sorry, please ask about HelloGini or our AI projects.";
        }

        setResponse(reply);
        speak(reply);
      };

      recognition.onerror = () => {
        setListening(false);
      };

      recognition.onend = () => setListening(false);
    } catch (err) {
      console.error(err);
      setListening(false);
    }
  };

  const speak = (text: any) => {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  // 🎯 Priority: Indian Hindi Female Voice
  let selectedVoice =
    voices.find(v => v.name.includes("Google हिन्दी")) ||   // best Hindi
    voices.find(v => v.name.includes("Heera")) ||          // Microsoft female
    voices.find(v => v.name.includes("Swara")) ||          // Microsoft female
    voices.find(v => v.lang === "hi-IN") ||                // fallback Hindi
    voices.find(v => v.lang === "en-IN");                  // fallback English India

  const utter = new SpeechSynthesisUtterance(text);

  if (selectedVoice) {
    utter.voice = selectedVoice;
  }

  utter.lang = "hi-IN";   // 👈 important for Hindi
  utter.pitch = 1.3;      // 👈 soft female tone
  utter.rate = 0.85;      // 👈 slow & clear
  utter.volume = 1;

  synth.cancel(); // clear previous speech
  synth.speak(utter);
};

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">

          {/* LEFT IMAGE */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-[48px] overflow-hidden border shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1000"
                className="w-full grayscale"
              />

              {/* VOICE UI */}
              <div className="absolute bottom-10 left-10 right-10 bg-white p-6 rounded-2xl shadow-lg">
                <p className="text-xs text-slate-400 mb-1">VOICE ASSISTANT</p>
                <p className="font-bold text-slate-900">
                  {listening ? "Listening..." : "Ask about HelloGini"}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="order-1 lg:order-2">

            <h2 className="text-5xl font-bold mb-6">
              <span className="text-black">HelloGini:</span>{" "}
              <span className="text-orange-500 italic">Voice-Native AI</span>
            </h2>

            <p className="text-slate-500 mb-6">
              Developed by AIxperts Labs, HelloGini is a revolutionary voice-first interface.
            </p>

            {/* FEATURES */}
            <div className="space-y-4 mb-8">
              <p>✔ Universal Accessibility</p>
              <p>✔ Emotive Intelligence</p>
              <p>✔ Privacy-First Architecture</p>
            </div>

            {/* 🎤 VOICE BUTTON */}
            <button
              onClick={startListening}
              className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 ${
                listening ? "bg-red-500 text-white" : "bg-black text-white"
              }`}
            >
              🎤 {listening ? "Listening..." : "Ask HelloGini"}
            </button>

            {/* RESPONSE */}
            {response && (
              <p className="mt-6 text-lg text-slate-700">
                🤖 {response}
              </p>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-6 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-8">
        <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-2xl shadow-orange-200 rotate-12">
          <Zap className="w-10 h-10" />
        </div>
        <h2 className="text-4xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tighter leading-none">
          Ready to <span className="text-orange-600">Evolve?</span>
        </h2>
        <p className="text-xl md:text-1xl text-slate-500 mb-6 max-w-2xl mx-auto leading-relaxed">
          Join the elite organizations transforming their future with AIxperts Labs. The next era of intelligence starts now.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/consultation" className="w-full sm:w-auto">
            <button className="w-full bg-slate-900 text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-orange-600 hover:scale-105 transition-all shadow-2xl shadow-slate-200">
              Start Transformation
            </button>
          </Link>
        

<Link to="/contact" className="w-full sm:w-auto">
  <button className="w-full bg-white border-2 border-slate-200 text-slate-900 px-12 py-6 rounded-full font-bold text-xl hover:bg-slate-50 transition-all">
    Contact Strategy Team
  </button>
</Link>
        </div>
      </div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </section>
  );
};
const Privacy = () => {
  return (
    <div className="pt-28 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-6 text-slate-900">
          Privacy Policy
        </h1>

        <p className="text-slate-500 mb-8 text-lg">
          At AIxperts Labs, we prioritize your privacy and are committed to protecting your personal data with transparency and security.
        </p>

        {/* SECTION */}
        <div className="space-y-8">

          <div>
            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <p className="text-slate-600">
              We collect personal details such as your name, email, phone number, and any data submitted through forms or interactions on our platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. How We Use Your Data</h2>
            <p className="text-slate-600">
              Your data is used to improve our services, respond to inquiries, provide updates, and enhance your experience with our AI solutions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
            <p className="text-slate-600">
              We implement advanced security measures to safeguard your information from unauthorized access or misuse.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Third-Party Sharing</h2>
            <p className="text-slate-600">
              We do not sell or share your data with third parties except when required by law or necessary to provide services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Contact Us</h2>
            <p className="text-slate-600">
              If you have any questions, contact us at <span className="text-orange-600 font-semibold">support@aixpertslabs.com</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

const Terms = () => {
  return (
    <div className="pt-28 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-6 text-slate-900">
          Terms of Service
        </h1>

        <p className="text-slate-500 mb-8 text-lg">
          By accessing and using Aixperts Labs, you agree to the following terms and conditions.
        </p>

        <div className="space-y-8">

          <div>
            <h2 className="text-xl font-semibold mb-2">1. Use of Services</h2>
            <p className="text-slate-600">
              You agree to use our platform responsibly and in compliance with all applicable laws and regulations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Intellectual Property</h2>
            <p className="text-slate-600">
              All content, branding, and AI solutions are owned by AIxperts Labs and cannot be copied or reused without permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Limitation of Liability</h2>
            <p className="text-slate-600">
              We are not liable for any direct or indirect damages resulting from the use of our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Modifications</h2>
            <p className="text-slate-600">
              We reserve the right to update these terms at any time without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Contact</h2>
            <p className="text-slate-600">
              For any concerns, reach us at <span className="text-orange-600 font-semibold">support@aixpertslabs.com</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setNewsletterStatus("sending");
    setErrorMessage("");

    try {
      await submitForm({
        formType: "newsletter",
        name: "Newsletter Subscriber",
        email: newsletterEmail.trim(),
        source: "footer-newsletter",
      });
      setNewsletterStatus("sent");
      setNewsletterEmail("");
      setTimeout(() => {
        setNewsletterStatus("idle");
      }, 4000);
    } catch (err: any) {
      console.error("NEWSLETTER ERROR:", err);
      setNewsletterStatus("error");
      setErrorMessage(
        err?.message || "Failed to subscribe. Please ensure the backend API server is running."
      );
    }
  };

  return (
    <footer className="bg-white pt-6 pb-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-8">
               <Link to="/" className="flex items-center gap-3">
  <img
    src={logo}
    alt="AIxperts Labs Logo"
    className="h-10"
  />
</Link>
              <span className="text-2xl font-bold text-slate-900">Aixperts Labs</span>
            </div>
            <p className="text-slate-500 leading-relaxed mb-10">
              The global standard for AI innovation, education, and enterprise transformation.
            </p>
            <div className="flex gap-4">
  {[
    { icon: <Instagram size={20} />, link: "https://instagram.com", label: "Instagram" },
    { icon: <Facebook size={20} />, link: "https://facebook.com", label: "Facebook" },
    { icon: <Twitter size={20} />, link: "https://x.com", label: "X (Twitter)" },
    { icon: <Linkedin size={20} />, link: "https://linkedin.com", label: "LinkedIn" },
  ].map((item, index) => (
    <a
      key={index}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.label}
      className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-orange-50 hover:text-orange-600 hover:scale-110 transition-all cursor-pointer"
    >
      {item.icon}
    </a>
  ))}
</div>
          </div>

          <div>
  <h4 className="text-slate-900 font-bold mb-8 uppercase tracking-widest text-xs">Our Expertise</h4>
  <ul className="space-y-4">

    <li>
      <Link to="/services" className="text-slate-500 hover:text-orange-600 transition-colors">
        Strategic AI Strategy
      </Link>
    </li>

    <li>
      <Link to="/services" className="text-slate-500 hover:text-orange-600 transition-colors">
        Autonomous Workflows
      </Link>
    </li>

    <li>
      <Link to="/services" className="text-slate-500 hover:text-orange-600 transition-colors">
        Custom LLM Solutions
      </Link>
    </li>

    <li>
      <Link to="/hellogini" className="text-slate-500 hover:text-orange-600 transition-colors">
        HelloGini Voice AI
      </Link>
    </li>

  </ul>
</div>

          <div>
            <h4 className="text-slate-900 font-bold mb-8 uppercase tracking-widest text-xs">Ecosystem</h4>
           <ul className="space-y-4">
  <li>
    <Link to="/institute" className="text-slate-500 hover:text-orange-600 transition-colors">
      Academic Programs
    </Link>
  </li>

  <li>
    <Link to="/corporate" className="text-slate-500 hover:text-orange-600 transition-colors">
      Corporate Training
    </Link>
  </li>

  <li>
    <Link to="/portfolio" className="text-slate-500 hover:text-orange-600 transition-colors">
      Impact Stories
    </Link>
  </li>

  <li>
    <Link to="/contact" className="text-slate-500 hover:text-orange-600 transition-colors">
     Contact Team
    </Link>
  </li>
</ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-8 uppercase tracking-widest text-xs">Intelligence Feed</h4>
            <p className="text-slate-500 mb-8 text-sm">Get the latest AI breakthroughs delivered to your inbox.</p>
            <form onSubmit={handleNewsletterSubmit} className="relative">
              <input
                type="email"
                placeholder={newsletterStatus === "sent" ? "Subscribed! ✓" : "Enter email address"}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                disabled={newsletterStatus === "sending" || newsletterStatus === "sent"}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-5 pr-14 py-4 text-slate-900 focus:outline-none focus:border-orange-500 transition-all disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={newsletterStatus === "sending" || newsletterStatus === "sent"}
                aria-label="Subscribe to newsletter"
                className="absolute right-2 top-2 bottom-2 bg-slate-900 hover:bg-orange-600 text-white px-4 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center cursor-pointer"
              >
                {newsletterStatus === "sending" ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : newsletterStatus === "sent" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </button>
            </form>
            {newsletterStatus === "sent" && (
              <p className="text-emerald-600 text-xs mt-2 font-medium">✓ You are subscribed to our Intelligence Feed!</p>
            )}
            {newsletterStatus === "error" && (
              <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-400 text-sm">© 2026 AIxperts Labs Private Limited. All rights reserved.</p>
          <div className="flex gap-10">
           <Link to="/privacy" className="text-slate-400 hover:text-orange-600 text-sm transition-colors">
  Privacy Policy
</Link>

<Link to="/terms" className="text-slate-400 hover:text-orange-600 text-sm transition-colors">
  Terms of Service
</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

const NotFound = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center py-20">
    <span className="px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-600 font-bold text-xs uppercase tracking-widest mb-4">
      404 Error
    </span>
    <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-4 tracking-tight">
      Page Not <span className="text-orange-600">Found</span>
    </h1>
    <p className="text-slate-500 max-w-md text-lg mb-8 leading-relaxed">
      The intelligence pathway you are looking for does not exist or has been relocated.
    </p>
    <div className="flex flex-wrap gap-4 justify-center">
      <Link
        to="/"
        className="bg-slate-900 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg inline-flex items-center gap-2"
      >
        Return Home <ArrowRight className="w-4 h-4" />
      </Link>
      <Link
        to="/contact"
        className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-8 py-4 rounded-full transition-all"
      >
        Contact Support
      </Link>
    </div>
  </div>
);

const HomePage = () => (
  <>
    <Hero />
    <Solutions />
    <CredibilityStrip />
    <CapabilityStack />
    <Industries />
    <CaseStudies />
    <EducationEcosystem />
    <HelloGini />
    {/* <ThoughtLeadership /> */}
    <CTA /> 
  </>
);

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <FloatingGini />
      <FloatingSocials />  
      <div className="min-h-screen bg-white font-sans">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/corporate" element={<Corporate />} />
            <Route path="/institute" element={<Institute />} />
            <Route path="/school" element={<School />} />
            <Route path="/hellogini" element={<HelloGini />} /> 

            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* <Route path="/research" element={<Research />} /> */}
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/academy/:slug" element={<Program />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

