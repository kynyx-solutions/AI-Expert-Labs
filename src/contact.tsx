import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { submitForm } from "./lib/api";

/* ═══════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════ */
type MouthType = "happy" | "vhappy" | "excited" | "neutral" | "sad" | "open";
type CharState = "walk" | "idle" | "push";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/* ═══════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════ */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn = (t: number) => t * t * t;
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const mouths: Record<MouthType, string> = {
  happy: "M60 118 Q70 130 80 118",
  vhappy: "M56 115 Q70 133 84 115",
  excited: "M54 113 Q70 136 86 113",
  neutral: "M60 122 Q70 122 80 122",
  sad: "M60 126 Q70 118 80 126",
  open: "M60 116 Q70 134 80 116",
};

/* ═══════════════════════════════════════════════
   CHARACTER SVG
═══════════════════════════════════════════════ */
const CharacterSVG: React.FC<{ mouthD: string }> = ({ mouthD }) => (
  <svg
    viewBox="0 0 140 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 130, height: "auto", display: "block" }}
  >
    <defs>
      <radialGradient id="sg" cx="50%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#ffd4a3" />
        <stop offset="100%" stopColor="#e8943a" />
      </radialGradient>
      <radialGradient id="shirtG" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </radialGradient>
      <radialGradient id="pantG" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#1e3a5f" />
        <stop offset="100%" stopColor="#0f172a" />
      </radialGradient>
    </defs>

    {/* LEGS */}
    <g style={{ transformOrigin: "48px 215px", animation: "legL 0.5s ease-in-out infinite" }}>
      <rect x="42" y="215" width="26" height="55" rx="12" fill="url(#pantG)" />
      <rect x="43" y="252" width="24" height="26" rx="10" fill="#0f172a" />
      <ellipse cx="55" cy="280" rx="20" ry="9" fill="#020617" />
      <ellipse cx="51" cy="278" rx="16" ry="7" fill="#1e3a5f" />
    </g>
    <g style={{ transformOrigin: "92px 215px", animation: "legR 0.5s ease-in-out infinite" }}>
      <rect x="72" y="215" width="26" height="55" rx="12" fill="url(#pantG)" />
      <rect x="73" y="252" width="24" height="26" rx="10" fill="#0f172a" />
      <ellipse cx="85" cy="280" rx="20" ry="9" fill="#020617" />
      <ellipse cx="81" cy="278" rx="16" ry="7" fill="#1e3a5f" />
    </g>

    {/* BODY */}
    <g style={{ animation: "breath 3s ease-in-out infinite", transformOrigin: "70px 190px" }}>
      <rect x="28" y="135" width="84" height="85" rx="22" fill="url(#shirtG)" />
      <path d="M54 135 Q70 148 86 135" fill="rgba(0,0,0,.18)" />
      <rect x="36" y="150" width="24" height="18" rx="5" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.15)" strokeWidth="1" />
      <circle cx="70" cy="157" r="3" fill="rgba(255,255,255,.3)" />
      <circle cx="70" cy="168" r="3" fill="rgba(255,255,255,.3)" />
      <circle cx="70" cy="179" r="3" fill="rgba(255,255,255,.3)" />
      <rect x="28" y="207" width="84" height="10" rx="5" fill="#020617" />
      <rect x="62" y="208" width="16" height="9" rx="3" fill="url(#sg)" stroke="#b36a1a" strokeWidth=".5" />
    </g>

    {/* LEFT ARM */}
    <g style={{ transformOrigin: "20px 130px", animation: "armL 0.5s ease-in-out infinite" }}>
      <rect x="6" y="135" width="24" height="50" rx="12" fill="url(#shirtG)" />
      <rect x="8" y="170" width="20" height="30" rx="10" fill="url(#sg)" />
      <ellipse cx="18" cy="204" rx="14" ry="13" fill="url(#sg)" />
      <ellipse cx="5" cy="196" rx="7" ry="5" fill="url(#sg)" transform="rotate(-20 5 196)" />
      <ellipse cx="4" cy="206" rx="7" ry="5" fill="url(#sg)" />
    </g>

    {/* RIGHT ARM */}
    <g style={{ transformOrigin: "120px 130px", animation: "armR 0.5s ease-in-out infinite" }}>
      <rect x="110" y="135" width="24" height="50" rx="12" fill="url(#shirtG)" />
      <rect x="112" y="170" width="20" height="30" rx="10" fill="url(#sg)" />
      <ellipse cx="122" cy="204" rx="14" ry="13" fill="url(#sg)" />
      <ellipse cx="135" cy="196" rx="7" ry="5" fill="url(#sg)" transform="rotate(20 135 196)" />
      <ellipse cx="136" cy="206" rx="7" ry="5" fill="url(#sg)" />
    </g>

    {/* NECK */}
    <rect x="60" y="122" width="20" height="18" rx="9" fill="url(#sg)" />

    {/* HEAD */}
    <g style={{ animation: "headBob 4s ease-in-out infinite", transformOrigin: "70px 90px" }}>
      <ellipse cx="70" cy="88" rx="42" ry="46" fill="url(#sg)" />
      {/* Ears */}
      <ellipse cx="28" cy="88" rx="11" ry="15" fill="url(#sg)" />
      <ellipse cx="28" cy="88" rx="6" ry="9" fill="#d4813a" />
      <ellipse cx="112" cy="88" rx="11" ry="15" fill="url(#sg)" />
      <ellipse cx="112" cy="88" rx="6" ry="9" fill="#d4813a" />
      {/* HAIR */}
      <ellipse cx="70" cy="52" rx="40" ry="26" fill="#1a0a3d" />
      <ellipse cx="36" cy="66" rx="14" ry="20" fill="#1a0a3d" />
      <ellipse cx="104" cy="66" rx="14" ry="20" fill="#1a0a3d" />
      <path d="M52 38 Q70 26 88 38" stroke="#2d1b69" strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* Eyebrows */}
      <path d="M48 70 Q58 64 68 68" stroke="#1a0a3d" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M72 68 Q82 64 92 70" stroke="#1a0a3d" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* LEFT EYE */}
      <g style={{ animation: "blink 4s ease-in-out infinite", transformBox: "fill-box" as any, transformOrigin: "center" }}>
        <ellipse cx="58" cy="82" rx="10" ry="11" fill="white" />
        <circle cx="58" cy="83" r="7" fill="#ea580c" />
        <circle cx="58" cy="83" r="4" fill="#1a0a3d" />
        <circle cx="61" cy="80" r="2.5" fill="white" />
        <path d="M48 78 Q58 72 68 78" stroke="#1a0a3d" strokeWidth="1.8" fill="none" />
      </g>
      {/* RIGHT EYE */}
      <g style={{ animation: "blink 4s ease-in-out infinite .12s", transformBox: "fill-box" as any, transformOrigin: "center" }}>
        <ellipse cx="82" cy="82" rx="10" ry="11" fill="white" />
        <circle cx="82" cy="83" r="7" fill="#ea580c" />
        <circle cx="82" cy="83" r="4" fill="#1a0a3d" />
        <circle cx="85" cy="80" r="2.5" fill="white" />
        <path d="M72 78 Q82 72 92 78" stroke="#1a0a3d" strokeWidth="1.8" fill="none" />
      </g>
      {/* NOSE */}
      <circle cx="66" cy="107" r="3.5" fill="rgba(180,100,50,.18)" />
      <circle cx="74" cy="107" r="3.5" fill="rgba(180,100,50,.18)" />
      {/* MOUTH */}
      <path d={mouthD} stroke="#c06030" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M63 120 Q70 126 77 120" fill="rgba(255,255,255,.4)" />
      {/* Cheeks */}
      <ellipse cx="40" cy="103" rx="10" ry="7" fill="rgba(255,100,100,.22)" />
      <ellipse cx="100" cy="103" rx="10" ry="7" fill="rgba(255,100,100,.22)" />
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════
   ANIMATED SECTION (Character + Form Unit)
═══════════════════════════════════════════════ */
const AnimatedContactSection: React.FC<{
  onSubmitSuccess: () => void;
}> = ({ onSubmitSuccess }) => {
  const unitRef = useRef<HTMLDivElement>(null);
  const mouthRef = useRef<SVGPathElement>(null);
  const speechRef = useRef<HTMLDivElement>(null);
  const speechTextRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [charState, setCharState] = useState<CharState>("walk");
  const [mouthD, setMouthD] = useState(mouths.happy);
  const [speechVisible, setSpeechVisible] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [fieldStates, setFieldStates] = useState<Record<string, "idle" | "ok" | "err">>({
    name: "idle", email: "idle", phone: "idle", subject: "idle", message: "idle",
  });
  const [charCount, setCharCount] = useState(0);

  const unitXRef = useRef(-700);
  const rafRef = useRef<number>(0);
 const speechTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confPiecesRef = useRef<any[]>([]);
  const confRunningRef = useRef(false);
  const confRAFRef = useRef<number>(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── helpers ── */
  const setUnitLeft = (px: number) => {
    if (unitRef.current) unitRef.current.style.left = px + "px";
    unitXRef.current = px;
  };

  const getUnitWidth = () => unitRef.current?.getBoundingClientRect().width || 620;

  const getCenterLeft = () => {
    const vw = window.innerWidth;
    const charW = 130;
    const formW = Math.min(440, vw * 0.6);
    const formCenterInUnit = charW + formW / 2;
    return vw / 2 - formCenterInUnit + 10;
  };

const speak = (text: string, ms = 3000) => {
  if (speechTimerRef.current) {
    clearTimeout(speechTimerRef.current);
  }

  setSpeechText(text);
  setSpeechVisible(true);

  speechTimerRef.current = setTimeout(() => {
    setSpeechVisible(false);
  }, ms);
};

  const changeMouth = (t: MouthType) => setMouthD(mouths[t]);

  /* ── animate unit position ── */
  const animateUnit = (target: number, duration: number, easeFn: (t: number) => number) =>
    new Promise<void>((resolve) => {
      const start = unitXRef.current;
      const startT = performance.now();
      const frame = (now: number) => {
        const t = Math.min((now - startT) / duration, 1);
        setUnitLeft(lerp(start, target, easeFn(t)));
        if (t < 1) rafRef.current = requestAnimationFrame(frame);
        else { setUnitLeft(target); resolve(); }
      };
      rafRef.current = requestAnimationFrame(frame);
    });

  /* ── INTRO ── */
  const runIntro = async () => {
    setSent(false);
    setLoading(false);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setFieldStates({ name: "idle", email: "idle", phone: "idle", subject: "idle", message: "idle" });
    setCharCount(0);
    setCharState("walk");
    changeMouth("excited");

    const uw = getUnitWidth();
    setUnitLeft(-uw - 100);

    await wait(300);
    speak("I'm bringing you the form! 📋", 3000);

    await animateUnit(getCenterLeft(), 1400, easeOut);

    setCharState("idle");
    changeMouth("happy");
    speak("Here you go! Fill it in 😊", 3500);
    startIdleTimer();
  };

  /* ── IDLE SPEECH ── */
  const idleLines = ["Need any help? 🤝", "Take your time! ⏰", "Still here! 👋", "Your message matters! 💜", "Looking good! ⭐"];
  let idleIdx = 0;

  const startIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (!sent) speak(idleLines[idleIdx++ % idleLines.length], 3000);
      startIdleTimer();
    }, 9000);
  };

  /* ── CONFETTI ── */
  const spawnConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols = ["#f97316","#ea580c","#3b82f6","#10b981","#ec4899","#a855f7","#f59e0b","#06b6d4"];
    confPiecesRef.current = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width, y: -Math.random() * 300,
      w: Math.random() * 12 + 5, h: Math.random() * 6 + 4,
      color: cols[Math.floor(Math.random() * cols.length)],
      ang: Math.random() * Math.PI * 2,
      spin: (Math.random() - .5) * .18,
      vx: (Math.random() - .5) * 5,
      vy: Math.random() * 4 + 2,
      opacity: 1,
      shape: Math.random() > .5 ? "rect" : "circle",
    }));
    confRunningRef.current = true;
    animateConfetti();
  };

  const animateConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas || !confRunningRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confPiecesRef.current = confPiecesRef.current.filter(p => p.opacity > 0.02 && p.y < canvas.height + 60);
    confPiecesRef.current.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.ang += p.spin; p.vy += .07;
      if (p.y > canvas.height * .65) p.opacity -= .012;
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.ang);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      if (p.shape === "rect") ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      else { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore();
    });
    if (confPiecesRef.current.length) confRAFRef.current = requestAnimationFrame(animateConfetti);
    else { ctx.clearRect(0, 0, canvas.width, canvas.height); confRunningRef.current = false; }
  };

  const stopConfetti = () => {
    confRunningRef.current = false;
    cancelAnimationFrame(confRAFRef.current);
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    confPiecesRef.current = [];
  };

  /* ── MOUNT ── */
  useEffect(() => {
    const t = setTimeout(() => runIntro(), 400);
    return () => {
      clearTimeout(t);
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      cancelAnimationFrame(rafRef.current);
      stopConfetti();
    };
  }, []);

  /* ── RESIZE ── */
  useEffect(() => {
    const onResize = () => {
      if (charState === "idle") setUnitLeft(getCenterLeft());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [charState]);

  /* ── FIELD HANDLERS ── */
  const validators: Record<string, (v: string) => boolean> = {
    name: (v) => v.trim().length >= 2,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    phone: (v) => v.trim().length >= 7,
    subject: (v) => v.trim() !== "",
    message: (v) => v.trim().length >= 10,
  };

  const focusTips: Record<string, string[]> = {
    name: ["What's your name? 😊", "Great to meet you! 🤝"],
    email: ["Your email so we can reply! 📧", "We'll write back here ✉️"],
    phone: ["Your phone number 📱", "Optional but helpful! 😊"],
    subject: ["What's this about? 🤔", "Pick the right topic! ✨"],
    message: ["Tell us everything! 👂", "We're all ears! 🎧"],
  };

  const progressTips = [
    null,
    "Good start! Keep going 👍",
    "Nice! Keep filling 🌟",
    "Half way there! ⭐",
    "Almost done! 🔥",
    "Everything looks great! 🚀",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === "message") setCharCount(value.length);
    const ok = validators[name]?.(value);
    setFieldStates(prev => ({ ...prev, [name]: value.trim() === "" ? "idle" : ok ? "ok" : "err" }));
    const filled = Object.keys(validators).filter(k => validators[k](k === name ? value : form[k as keyof FormState])).length;
    if (progressTips[filled]) speak(progressTips[filled]!, 2200);
    if (filled === 5) changeMouth("excited");
  };

  const handleFocus = (name: string) => {
    const tips = focusTips[name];
    speak(tips[Math.floor(Math.random() * tips.length)], 2500);
    changeMouth("happy");
  };

  /* ── SUBMIT ── */
/* ── SUBMIT ── */
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const invalids = Object.keys(validators).filter(
    (k) => !validators[k](form[k as keyof FormState])
  );

  if (invalids.length) {
    speak(`Fix ${invalids.length} field first 😬`, 3000);
    changeMouth("sad");
    setTimeout(() => changeMouth("happy"), 2000);
    return;
  }

  setLoading(true);
  speak("On my way! Delivering now! 🚀", 2500);
  changeMouth("excited");

  try {
    await submitForm({
      formType: "contact",
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
      source: "contact-page",
    });
  } catch (err) {
    console.error(err);
    speak("Failed to send 😢 Try again!", 3000);
    setLoading(false);
    changeMouth("sad");
    return;
  }

  setSpeechVisible(false);
  setCharState("push");

  const vw = window.innerWidth;
  const uw = getUnitWidth();

  await animateUnit(vw + uw, 900, easeIn);

  await wait(150);

  setLoading(false);
  setSent(true);
  spawnConfetti();
  onSubmitSuccess();
};

  /* ── character click ── */
  const clickLines = ["Hehe, that tickles! 😄", "Eyes on the form! 😜", "I'm the delivery guy! 📦", "You've got this! 💪", "Fill it all in! ✍️"];
  let clickIdx = 0;
  const handleCharClick = () => {
    speak(clickLines[clickIdx++ % clickLines.length], 2500);
    changeMouth("excited");
    setTimeout(() => changeMouth("happy"), 1500);
  };

  /* ── field class ── */
  const fieldCls = (name: string) => {
    const base = "w-full border px-4 py-3 rounded-xl outline-none transition-all duration-200 bg-white text-slate-800 placeholder-slate-400 focus:ring-2";
    if (fieldStates[name] === "ok") return base + " border-emerald-400 focus:ring-emerald-200";
    if (fieldStates[name] === "err") return base + " border-rose-400 focus:ring-rose-200";
    return base + " border-slate-300 focus:border-orange-400 focus:ring-orange-100";
  };

  const statusIcon = (name: string) => {
    if (fieldStates[name] === "ok") return <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">✅</span>;
    if (fieldStates[name] === "err") return <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">❌</span>;
    return null;
  };

  /* ── arm/leg animation class based on charState ── */
  const armLegAnim = (limb: "armL" | "armR" | "legL" | "legR") => {
    const anims: Record<CharState, Record<string, string>> = {
      walk: {
        armL: "armWalkL 0.5s ease-in-out infinite",
        armR: "armWalkR 0.5s ease-in-out infinite",
        legL: "legWalkL 0.5s ease-in-out infinite",
        legR: "legWalkR 0.5s ease-in-out infinite",
      },
      idle: {
        armL: "armIdleL 3s ease-in-out infinite",
        armR: "armIdleR 3.5s ease-in-out infinite",
        legL: "legIdleL 3s ease-in-out infinite",
        legR: "legIdleR 3s ease-in-out infinite",
      },
      push: {
        armL: "armPushL 0.35s ease-in-out infinite",
        armR: "armPushR 0.35s ease-in-out infinite",
        legL: "legWalkL 0.35s ease-in-out infinite",
        legR: "legWalkR 0.35s ease-in-out infinite",
      },
    };
    return anims[charState][limb];
  };

  return (
    <>
      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes breath    { 0%,100%{transform:scaleY(1) translateY(0)} 50%{transform:scaleY(1.02) translateY(-3px)} }
        @keyframes headBob   { 0%,100%{transform:rotate(-1.5deg) translateY(0)} 50%{transform:rotate(1.5deg) translateY(-5px)} }
        @keyframes blink     { 0%,88%,100%{transform:scaleY(1)} 94%{transform:scaleY(0.05)} }
        @keyframes armIdleL  { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(8deg)} }
        @keyframes armIdleR  { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-8deg)} }
        @keyframes legIdleL  { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(3deg)} }
        @keyframes legIdleR  { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-3deg)} }
        @keyframes armWalkL  { 0%,100%{transform:rotate(28deg)} 50%{transform:rotate(-28deg)} }
        @keyframes armWalkR  { 0%,100%{transform:rotate(-28deg)} 50%{transform:rotate(28deg)} }
        @keyframes legWalkL  { 0%,100%{transform:rotate(-18deg)} 50%{transform:rotate(18deg)} }
        @keyframes legWalkR  { 0%,100%{transform:rotate(18deg)} 50%{transform:rotate(-18deg)} }
        @keyframes armPushL  { 0%,100%{transform:rotate(-20deg)} 50%{transform:rotate(-14deg)} }
        @keyframes armPushR  { 0%,100%{transform:rotate(20deg)} 50%{transform:rotate(14deg)} }
        @keyframes shadowP   { 0%,100%{transform:translateX(-50%) scaleX(1);opacity:.6} 50%{transform:translateX(-50%) scaleX(.85);opacity:.35} }
        @keyframes ringPulse { 0%{box-shadow:0 0 0 0 rgba(249,115,22,.5)} 70%{box-shadow:0 0 0 22px rgba(249,115,22,0)} 100%{box-shadow:0 0 0 0 rgba(249,115,22,0)} }
        @keyframes drawC     { to{stroke-dashoffset:0} }
        @keyframes fadeInUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn   { from{transform:scale(0) rotate(-10deg)} to{transform:scale(1) rotate(0)} }
        @keyframes shimmer   { 0%{left:-70%} 100%{left:170%} }

        .speech-bubble {
          position:absolute; bottom:105%; left:50%;
          transform:translateX(-30%) scale(0);
          transform-origin: bottom left;
          background:white; color:#1a0533;
          font-size:12px; font-weight:700;
          padding:9px 15px; border-radius:16px 16px 16px 4px;
          white-space:normal; max-width:200px; text-align:center; line-height:1.4;
          box-shadow:0 8px 28px rgba(0,0,0,.2);
          transition:transform .35s cubic-bezier(.34,1.56,.64,1), opacity .3s;
          opacity:0; pointer-events:none; z-index:50;
        }
        .speech-bubble.show { transform:translateX(-30%) scale(1); opacity:1; }
        .speech-bubble::after {
          content:''; position:absolute; bottom:-10px; left:16px;
          border:6px solid transparent;
          border-top-color:white; border-right-color:white;
        }

        .char-shadow {
          position:absolute; bottom:-4px; left:50%; transform:translateX(-50%);
          width:80px; height:14px;
          background:radial-gradient(ellipse,rgba(249,115,22,.45),transparent 70%);
          animation:shadowP 3s ease-in-out infinite;
        }

        .card-shimmer { position:absolute; inset:0; pointer-events:none; overflow:hidden; border-radius:1.5rem; }
        .card-shimmer::after {
          content:''; position:absolute; top:-50%; left:-70%; width:50%; height:200%;
          background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.05) 50%,transparent 60%);
          animation:shimmer 5s linear infinite;
        }

        .unit-container {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 0;
}

        .success-anim { animation: fadeInUp .6s ease forwards; }
        .success-ring { animation: ringPulse 2s ease-in-out infinite; }
        .success-check circle {
          fill:none; stroke:rgba(249,115,22,.5); stroke-width:2;
          stroke-dasharray:380; stroke-dashoffset:380;
          animation:drawC 1s ease forwards .4s;
        }
      `}</style>

      {/* CONFETTI CANVAS */}
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 150 }}
      />

      {/* ═══ ANIMATED SECTION ═══ */}
      {!sent ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "85vh",
            minHeight: "600px",
            overflow: "hidden", 
            margin: "10",
            background: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)",
            borderRadius: "0 0 2rem 2rem",
            marginBottom: "3rem",
          }}
        >
          {/* Stars */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {Array.from({ length: 80 }).map((_, i) => {
              const sz = Math.random() * 2.5 + 0.5;
              return (
                <div key={i} style={{
                  position: "absolute",
                  width: sz, height: sz,
                  borderRadius: "50%",
                  background: "white",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.1,
                  animation: `blink ${Math.random() * 4 + 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }} />
              );
            })}
          </div>

          {/* Ground line */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
            background: "linear-gradient(90deg,transparent,rgba(249,115,22,.8) 30%,rgba(234,88,12,.8) 70%,transparent)",
            boxShadow: "0 0 20px rgba(249,115,22,.5)",
          }} />

          {/* UNIT: Character + Form */}
          <div ref={unitRef} className="unit-container" style={{ left: -700 }}>

            {/* CHARACTER */}
            <div
              style={{ position: "relative", flexShrink: 0, zIndex: 10, cursor: "pointer", filter: "drop-shadow(0 15px 35px rgba(249,115,22,.5))" }}
              onClick={handleCharClick}
            >
              <div className="char-shadow" />
              <div className={`speech-bubble ${speechVisible ? "show" : ""}`}>
                {speechText}
              </div>

              {/* Override SVG arm/leg animations based on charState */}
              <style>{`
                .char-armL { animation: ${armLegAnim("armL")}; transform-origin: 20px 130px; }
                .char-armR { animation: ${armLegAnim("armR")}; transform-origin: 120px 130px; }
                .char-legL { animation: ${armLegAnim("legL")}; transform-origin: 48px 215px; }
                .char-legR { animation: ${armLegAnim("legR")}; transform-origin: 92px 215px; }
              `}</style>

              {/* Full SVG with class-based limb animations */}
              <svg viewBox="0 0 140 300" fill="none" style={{ width: 130, display: "block" }}>
                <defs>
                  <radialGradient id="sg2" cx="50%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#ffd4a3" /><stop offset="100%" stopColor="#e8943a" />
                  </radialGradient>
                  <radialGradient id="shirtG2" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#f97316" /><stop offset="100%" stopColor="#ea580c" />
                  </radialGradient>
                  <radialGradient id="pantG2" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#1e3a5f" /><stop offset="100%" stopColor="#0f172a" />
                  </radialGradient>
                </defs>
                {/* Legs */}
                <g className="char-legL">
                  <rect x="42" y="215" width="26" height="55" rx="12" fill="url(#pantG2)" />
                  <rect x="43" y="252" width="24" height="26" rx="10" fill="#0f172a" />
                  <ellipse cx="55" cy="280" rx="20" ry="9" fill="#020617" />
                  <ellipse cx="51" cy="278" rx="16" ry="7" fill="#1e3a5f" />
                  <ellipse cx="46" cy="274" rx="6" ry="3" fill="rgba(255,255,255,.12)" />
                </g>
                <g className="char-legR">
                  <rect x="72" y="215" width="26" height="55" rx="12" fill="url(#pantG2)" />
                  <rect x="73" y="252" width="24" height="26" rx="10" fill="#0f172a" />
                  <ellipse cx="85" cy="280" rx="20" ry="9" fill="#020617" />
                  <ellipse cx="81" cy="278" rx="16" ry="7" fill="#1e3a5f" />
                  <ellipse cx="76" cy="274" rx="6" ry="3" fill="rgba(255,255,255,.12)" />
                </g>
                {/* Body */}
                <g style={{ animation: "breath 3s ease-in-out infinite", transformOrigin: "70px 190px" }}>
                  <rect x="28" y="135" width="84" height="85" rx="22" fill="url(#shirtG2)" />
                  <path d="M54 135 Q70 148 86 135" fill="rgba(0,0,0,.18)" />
                  <rect x="36" y="150" width="24" height="18" rx="5" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.15)" strokeWidth="1" />
                  <circle cx="70" cy="157" r="3" fill="rgba(255,255,255,.3)" />
                  <circle cx="70" cy="168" r="3" fill="rgba(255,255,255,.3)" />
                  <circle cx="70" cy="179" r="3" fill="rgba(255,255,255,.3)" />
                  <rect x="28" y="207" width="84" height="10" rx="5" fill="#020617" />
                  <rect x="62" y="208" width="16" height="9" rx="3" fill="url(#sg2)" stroke="#b36a1a" strokeWidth=".5" />
                </g>
                {/* Left Arm */}
                <g className="char-armL">
                  <rect x="6" y="135" width="24" height="50" rx="12" fill="url(#shirtG2)" />
                  <rect x="8" y="170" width="20" height="30" rx="10" fill="url(#sg2)" />
                  <ellipse cx="18" cy="204" rx="14" ry="13" fill="url(#sg2)" />
                  <ellipse cx="5" cy="196" rx="7" ry="5" fill="url(#sg2)" transform="rotate(-20 5 196)" />
                  <ellipse cx="4" cy="206" rx="7" ry="5" fill="url(#sg2)" />
                  <ellipse cx="6" cy="215" rx="6" ry="5" fill="url(#sg2)" transform="rotate(15 6 215)" />
                  <ellipse cx="30" cy="196" rx="6" ry="5" fill="url(#sg2)" transform="rotate(30 30 196)" />
                </g>
                {/* Right Arm */}
                <g className="char-armR">
                  <rect x="110" y="135" width="24" height="50" rx="12" fill="url(#shirtG2)" />
                  <rect x="112" y="170" width="20" height="30" rx="10" fill="url(#sg2)" />
                  <ellipse cx="122" cy="204" rx="14" ry="13" fill="url(#sg2)" />
                  <ellipse cx="135" cy="196" rx="7" ry="5" fill="url(#sg2)" transform="rotate(20 135 196)" />
                  <ellipse cx="136" cy="206" rx="7" ry="5" fill="url(#sg2)" />
                  <ellipse cx="134" cy="215" rx="6" ry="5" fill="url(#sg2)" transform="rotate(-15 134 215)" />
                  <ellipse cx="110" cy="196" rx="6" ry="5" fill="url(#sg2)" transform="rotate(-30 110 196)" />
                </g>
                {/* Neck */}
                <rect x="60" y="122" width="20" height="18" rx="9" fill="url(#sg2)" />
                {/* Head */}
                <g style={{ animation: "headBob 4s ease-in-out infinite", transformOrigin: "70px 90px" }}>
                  <ellipse cx="70" cy="88" rx="42" ry="46" fill="url(#sg2)" />
                  <ellipse cx="28" cy="88" rx="11" ry="15" fill="url(#sg2)" />
                  <ellipse cx="28" cy="88" rx="6" ry="9" fill="#d4813a" />
                  <ellipse cx="112" cy="88" rx="11" ry="15" fill="url(#sg2)" />
                  <ellipse cx="112" cy="88" rx="6" ry="9" fill="#d4813a" />
                  <ellipse cx="70" cy="52" rx="40" ry="26" fill="#1a0a3d" />
                  <ellipse cx="36" cy="66" rx="14" ry="20" fill="#1a0a3d" />
                  <ellipse cx="104" cy="66" rx="14" ry="20" fill="#1a0a3d" />
                  <path d="M52 38 Q70 26 88 38" stroke="#2d1b69" strokeWidth="7" strokeLinecap="round" fill="none" />
                  <path d="M48 70 Q58 64 68 68" stroke="#1a0a3d" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M72 68 Q82 64 92 70" stroke="#1a0a3d" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <g style={{ animation: "blink 4s ease-in-out infinite", transformBox: "fill-box" as any, transformOrigin: "center" }}>
                    <ellipse cx="58" cy="82" rx="10" ry="11" fill="white" />
                    <circle cx="58" cy="83" r="7" fill="#ea580c" />
                    <circle cx="58" cy="83" r="4" fill="#1a0a3d" />
                    <circle cx="61" cy="80" r="2.5" fill="white" />
                    <path d="M48 78 Q58 72 68 78" stroke="#1a0a3d" strokeWidth="1.8" fill="none" />
                  </g>
                  <g style={{ animation: "blink 4s ease-in-out infinite .12s", transformBox: "fill-box" as any, transformOrigin: "center" }}>
                    <ellipse cx="82" cy="82" rx="10" ry="11" fill="white" />
                    <circle cx="82" cy="83" r="7" fill="#ea580c" />
                    <circle cx="82" cy="83" r="4" fill="#1a0a3d" />
                    <circle cx="85" cy="80" r="2.5" fill="white" />
                    <path d="M72 78 Q82 72 92 78" stroke="#1a0a3d" strokeWidth="1.8" fill="none" />
                  </g>
                  <circle cx="66" cy="107" r="3.5" fill="rgba(180,100,50,.18)" />
                  <circle cx="74" cy="107" r="3.5" fill="rgba(180,100,50,.18)" />
                  <path d={mouthD} stroke="#c06030" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                  <path d="M63 120 Q70 126 77 120" fill="rgba(255,255,255,.4)" />
                  <ellipse cx="40" cy="103" rx="10" ry="7" fill="rgba(255,100,100,.22)" />
                  <ellipse cx="100" cy="103" rx="10" ry="7" fill="rgba(255,100,100,.22)" />
                </g>
              </svg>
            </div>

            {/* FORM CARD */}
            <div style={{ flexShrink: 0, marginLeft: -8, position: "relative" }}>
              <div style={{
                width: "min(440px, 65vw)",
                background: "rgba(255,255,255,.96)",
                backdropFilter: "blur(20px)",
                borderRadius: "1.5rem",
                padding: "32px 28px 28px",
                boxShadow: "0 32px 64px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.1) inset",
                position: "relative", overflow: "hidden",
                maxHeight: 600, overflowY: "auto",
              }}>
                {/* Top accent bar */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: "linear-gradient(90deg,#f97316,#ea580c,#3b82f6)",
                  borderRadius: "1.5rem 1.5rem 0 0",
                }} />
                <div className="card-shimmer" />

                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div style={{
                    width: 48, height: 48,
                    background: "linear-gradient(135deg,#f97316,#ea580c)",
                    borderRadius: 14,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, marginBottom: 10,
                    boxShadow: "0 8px 20px rgba(249,115,22,.4)",
                  }}>✉️</div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>Send Us a Message</h2>
                  <p style={{ fontSize: 12, color: "#64748b" }}>We reply within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Name + Phone */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                    <div style={{ position: "relative" }}>
                      <input type="text" name="name" value={form.name} onChange={handleChange} onFocus={() => handleFocus("name")}
                        placeholder="Full Name" className={fieldCls("name")} style={{ fontSize: 13, padding: "10px 36px 10px 12px" }} />
                      {statusIcon("name")}
                    </div>
                    <div style={{ position: "relative" }}>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} onFocus={() => handleFocus("phone")}
                        placeholder="Phone Number" className={fieldCls("phone")} style={{ fontSize: 13, padding: "10px 36px 10px 12px" }} />
                      {statusIcon("phone")}
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{ position: "relative", marginBottom: 10 }}>
                    <input type="email" name="email" value={form.email} onChange={handleChange} onFocus={() => handleFocus("email")}
                      placeholder="Email Address" className={fieldCls("email")} style={{ fontSize: 13, padding: "10px 36px 10px 12px" }} />
                    {statusIcon("email")}
                  </div>

                  {/* Subject */}
                  <div style={{ position: "relative", marginBottom: 10 }}>
                    <select name="subject" value={form.subject} onChange={handleChange} onFocus={() => handleFocus("subject")}
                      className={fieldCls("subject")} style={{ fontSize: 13, padding: "10px 12px" }}>
                      <option value="">Select Subject</option>
                      <option>AI Development</option>
                      <option>Machine Learning</option>
                      <option>Corporate Training</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div style={{ position: "relative", marginBottom: 14 }}>
                    <textarea name="message" rows={3} value={form.message} onChange={handleChange} onFocus={() => handleFocus("message")}
                      placeholder="Your message..." maxLength={500}
                      className={fieldCls("message")} style={{ fontSize: 13, padding: "10px 12px", resize: "none" }} />
                    <div style={{ textAlign: "right", fontSize: 10, color: charCount > 400 ? "#f59e0b" : "#94a3b8", marginTop: 2 }}>
                      {charCount} / 500
                    </div>
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={loading}
                    style={{
                      width: "100%", padding: "13px",
                      background: loading ? "#94a3b8" : "linear-gradient(135deg,#f97316,#ea580c)",
                      color: "white", border: "none", borderRadius: 50,
                      fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                      boxShadow: "0 6px 20px rgba(249,115,22,.4)",
                      transition: "all .3s",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}>
                    {loading ? (
                      <>
                        <div style={{
                          width: 16, height: 16, border: "2.5px solid rgba(255,255,255,.3)",
                          borderTopColor: "white", borderRadius: "50%", animation: "spin .7s linear infinite",
                        }} />
                        Sending...
                      </>
                    ) : "Send Message →"}
                  </button>
                </form>

                {/* Progress dots */}
                <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
                  {["name", "email", "phone", "subject", "message"].map(k => (
                    <div key={k} style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: fieldStates[k] === "ok" ? "#10b981" : fieldStates[k] === "err" ? "#f97316" : "rgba(0,0,0,.15)",
                      boxShadow: fieldStates[k] === "ok" ? "0 0 8px #10b981" : "none",
                      transition: "all .4s",
                    }} />
                  ))}
                </div>
              </div>
            </div>

          </div>{/* end unit */}
        </div>
      ) : (
        /* ═══ SUCCESS ═══ */
        <div className="success-anim" style={{
          background: "linear-gradient(135deg,#0f172a,#1e1b4b)",
          borderRadius: "0 0 2rem 2rem",
          marginBottom: "3rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "60px 20px",
        }}>
          <div style={{
            background: "rgba(255,255,255,.06)",
            backdropFilter: "blur(40px)",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: "2rem", padding: "48px 44px",
            textAlign: "center", maxWidth: 420, width: "90%",
            boxShadow: "0 40px 80px rgba(0,0,0,.5)",
          }}>
            <div className="success-ring" style={{
              width: 96, height: 96, borderRadius: "50%",
              background: "linear-gradient(135deg,#f97316,#ea580c)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 42, margin: "0 auto 22px", position: "relative",
            }}>
              🎉
              <svg className="success-check" viewBox="0 0 124 124" style={{ position: "absolute", inset: -12, width: "calc(100% + 24px)", height: "calc(100% + 24px)" }}>
                <circle cx="62" cy="62" r="58" />
              </svg>
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", letterSpacing: -.5, marginBottom: 10 }}>Message Sent! 🎊</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 22 }}>
              Thank you for contacting us.<br />Our team will reply within 24 hours.
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 22, flexWrap: "wrap" }}>
              {["✅ Delivered", "⏱ Reply in 24h", "💜 We care"].map(b => (
                <span key={b} style={{
                  background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)",
                  borderRadius: 50, padding: "5px 12px", fontSize: 11, color: "rgba(255,255,255,.6)",
                }}>{b}</span>
              ))}
            </div>
            <button
              onClick={() => { stopConfetti(); runIntro(); }}
              style={{
                padding: "12px 28px", borderRadius: 50,
                border: "1.5px solid rgba(255,255,255,.2)",
                background: "rgba(255,255,255,.08)", color: "white",
                fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer",
                transition: "all .3s",
              }}
              onMouseOver={e => (e.currentTarget.style.background = "rgba(249,115,22,.3)")}
              onMouseOut={e => (e.currentTarget.style.background = "rgba(255,255,255,.08)")}
            >↩ Send Another Message</button>
          </div>
        </div>
      )}
    </>
  );
};

/* ═══════════════════════════════════════════════
   MAIN CONTACT PAGE
═══════════════════════════════════════════════ */
const Contact: React.FC = () => {
  const [globalSent, setGlobalSent] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
    window.scrollTo(0, 0);
  }, []);
  

  return (
    <div className="bg-white pt-0 pb-12 md:pb-16">
      {/* ANIMATED CHARACTER + FORM */}
      <AnimatedContactSection onSubmitSuccess={() => setGlobalSent(true)} />

      {/* CONTACT INFO GRID */}


    </div>
  );
};

export default Contact;