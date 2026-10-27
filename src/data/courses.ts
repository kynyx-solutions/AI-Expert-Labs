import { syllabi } from "./syllabi";

export type CategoryId =
  | "aiml"
  | "genai"
  | "data"
  | "cyber"
  | "cloud"
  | "fullstack"
  | "foundations"
  | "business"
  | "industries";

export type Level = "Beginner" | "Intermediate" | "Advanced" | "Leaders";

export interface Category {
  id: CategoryId;
  title: string;
}

// Categories without courses (Cyber Security, Full Stack) stay hidden until a course is added to them.
export const categories: Category[] = [
  { id: "aiml", title: "AI & ML Program" },
  { id: "genai", title: "Generative AI" },
  { id: "data", title: "Data Science" },
  { id: "cyber", title: "Cyber Security" },
  { id: "cloud", title: "Cloud Computing" },
  { id: "fullstack", title: "Full Stack Development" },
  { id: "foundations", title: "AI Foundations & Career Skills" },
  { id: "business", title: "AI for Business & Entrepreneurship" },
  { id: "industries", title: "AI for Industries" },
];

export const levels: Level[] = ["Beginner", "Intermediate", "Advanced", "Leaders"];

/** Full syllabus for a program page. Programs without it show a "request syllabus" prompt instead. */
export interface CourseDetails {
  summary: string;
  audience: string;
  prereq: string;
  tools: string[];
  outcomes: string[];
  plan: { day: string; title: string; detail: string }[];
}

export interface Course {
  slug: string;
  title: string;
  cat: CategoryId;
  /** Shown as "N days", or as "N hours" for the flagship. */
  duration: string;
  level: Level;
  blurb: string;
  details?: CourseDetails;
}

// Keep in sync with slugify() in scripts/generate-sitemap.js, which builds the program URLs.
export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type Raw = [CategoryId, string, number, Level, string];

// The sitemap script reads course titles from these rows; keep one course per line.
const raw: Raw[] = [
  // AI & ML Program
  ["aiml", "Python for AI Beginners", 15, "Beginner", "Python from zero, through to data handling and simple AI models."],
  ["aiml", "AI Engineering with Large Language Models (LLMs)", 2, "Advanced", "How LLMs work and how to build reliable applications on them."],
  ["aiml", "Agentic AI & Autonomous Systems", 3, "Advanced", "Multi-step agents that plan, use tools and act with oversight."],
  ["aiml", "Retrieval Augmented Generation (RAG) & Vector Databases", 5, "Advanced", "Ground AI answers in your own documents and data."],
  // Generative AI
  ["genai", "ChatGPT & Generative AI for Beginners", 3, "Beginner", "Your first hands-on steps with ChatGPT and other GenAI tools."],
  ["genai", "Prompt Engineering Masterclass", 5, "Beginner", "Write prompts that give accurate, reliable and reusable results."],
  ["genai", "Generative AI Application Development (No-Code)", 15, "Intermediate", "Build working GenAI apps without writing code."],
  ["genai", "AI Agent Development using No-Code Tools", 15, "Intermediate", "Design agents that research, respond and complete tasks on their own."],
  ["genai", "AI Content Creation & Social Media", 5, "Beginner", "Create posts, images and short videos with AI, consistently."],
  // Data Science
  ["data", "Data Analytics using Excel & AI", 7, "Beginner", "Clean, analyse and present data faster with Excel and AI."],
  ["data", "Power BI with AI Insights", 7, "Intermediate", "Build interactive dashboards and AI-assisted business insights."],
  // Cloud Computing
  ["cloud", "MLOps & AI Model Deployment", 5, "Advanced", "Take models from notebook to production and keep them healthy."],
  // AI Foundations & Career Skills
  ["foundations", "AI Literacy & Digital Productivity", 2, "Beginner", "Understand AI and use everyday digital tools with confidence."],
  ["foundations", "AI Tools for Office Productivity", 5, "Beginner", "Use AI in documents, sheets, email and presentations to save hours."],
  ["foundations", "Future Skills Program (AI, IoT, Blockchain & Robotics)", 2, "Beginner", "A practical introduction to the technologies shaping the next decade."],
  ["foundations", "AI Resume Building & Career Accelerator", 2, "Beginner", "An AI-assisted resume, LinkedIn profile and job search plan."],
  ["foundations", "Job Readiness Program with AI, Communication & Interview Preparation", 3, "Beginner", "Communication, mock interviews and AI-powered job preparation."],
  // AI for Business & Entrepreneurship
  ["business", "Business Automation using AI", 7, "Intermediate", "Automate repetitive work across sales, HR, accounts and support."],
  ["business", "AI for MSMEs & Small Businesses", 3, "Beginner", "Practical AI for marketing, customers and operations in small firms."],
  ["business", "AI Powered Digital Marketing", 7, "Intermediate", "Plan, create and optimise campaigns with AI across channels."],
  ["business", "AI for Finance & Accounting", 5, "Intermediate", "Use AI for bookkeeping, reconciliation, reporting and analysis."],
  ["business", "AI Entrepreneurship Bootcamp", 2, "Beginner", "Turn an AI idea into a business you can test quickly."],
  ["business", "Entrepreneurship, Startup & Innovation Management", 5, "Intermediate", "From idea validation to funding, schemes and growth."],
  ["business", "Executive Program on AI Leadership & Digital Transformation", 7, "Leaders", "Lead AI adoption and digital transformation in your organisation."],
  // AI for Industries
  ["industries", "AI for Teachers & Educators", 3, "Beginner", "Plan lessons, create material and assess faster with AI."],
  ["industries", "AI in Education & EdTech", 5, "Intermediate", "How AI is reshaping learning, institutions and EdTech products."],
  ["industries", "AI in Healthcare & Life Sciences", 3, "Intermediate", "AI use cases in diagnostics, hospital operations and research."],
  ["industries", "AI for Agriculture & Smart Farming", 7, "Beginner", "Crop advisory, weather, soil and market insights with AI."],
  ["industries", "AI for Manufacturing & Industry 4.0", 2, "Intermediate", "Quality checks, predictive maintenance and smart factories."],
  ["industries", "AI for Government & Smart Governance", 7, "Intermediate", "AI for citizen services, records and data-driven decisions."],
];

export const flagship = {
  slug: "professional-certificate",
  title: "Professional Certificate Program in AI, Generative AI & Business Automation",
  hours: 40,
  batchTypes: "Regular / Weekend",
  audience: [
    ["Students & graduates", "Add job-ready AI skills and a certified project to your resume."],
    ["Working professionals", "Work faster and take on AI-related responsibilities at work."],
    ["MSME owners & teams", "Automate routine work and use AI in marketing and operations."],
    ["Job seekers & career switchers", "Build a practical skill set for AI-enabled roles. No coding needed."],
  ] as [string, string][],
  takeaways: [
    "Confidence using leading AI tools for everyday work",
    "A working business automation you built yourself",
    "A capstone project to show employers or clients",
    "A certificate co-issued by NSIC and AIxperts Labs",
  ],
  topics: [
    ["AI Fundamentals", "What AI and GenAI are, how they work, and where they help."],
    ["Prompt Engineering", "Structured prompts that give accurate, consistent output."],
    ["Generative AI Applications", "Text, image, audio and video generation for real tasks."],
    ["AI Productivity Tools", "AI in documents, spreadsheets, email and presentations."],
    ["AI for Business & MSMEs", "Use cases in sales, marketing, customer service and finance."],
    ["No-Code AI Automation", "Build workflows that run repetitive tasks automatically."],
    ["AI Agents & Business Workflows", "Agents that research, respond and act across your tools."],
    ["Capstone Project", "Solve a real business problem with AI and submit it for review."],
  ] as [string, string][],
};

export const courses: Course[] = raw.map(([cat, title, days, level, blurb]) => ({
  slug: slugify(title),
  title,
  cat,
  duration: `${days} ${days === 1 ? "day" : "days"}`,
  level,
  blurb,
  details: syllabi[title],
}));

// Master curriculum: the module bank programs are built from (module name, hours).
export const modules: [string, number][] = [
  ["Foundation Digital Skills", 12],
  ["AI Fundamentals", 14],
  ["Prompt Engineering", 12],
  ["Generative AI Applications", 15],
  ["AI Productivity Tools", 12],
  ["AI for Business & MSMEs", 10],
  ["No-Code AI Automation", 20],
  ["AI Agents & Business Workflows", 20],
  ["Career Readiness", 10],
  ["Capstone Project", 20],
  ["AI-Powered Digital Marketing & Content Creation", 25],
  ["Data Analytics using Excel, SQL & Power BI", 12],
  ["Python Programming for AI & Data Science", 15],
  ["Cloud Computing using AWS, Azure & Google Cloud", 12],
  ["Full Stack Web Development with AI Tools", 10],
  ["UI/UX Design with AI Tools", 20],
  ["Business Analytics using Power BI & Tableau", 20],
  ["AI for Finance, Accounting & Banking", 10],
  ["Entrepreneurship, Startup & Innovation Management", 20],
  ["Job Readiness Program with AI, Communication & Interview Preparation", 12],
];

export const curriculumHours = modules.reduce((sum, [, h]) => sum + h, 0);

/** Every program a learner can enroll in: the flagship first, then the catalogue. */
export const enrollablePrograms: Course[] = [
  {
    slug: flagship.slug,
    title: flagship.title,
    cat: "genai",
    duration: `${flagship.hours} hours`,
    level: "Beginner",
    blurb: "Our flagship program, from AI fundamentals to a capstone project.",
  },
  ...courses,
];

export const getProgram = (slug: string | null | undefined) =>
  enrollablePrograms.find((c) => c.slug === slug);

export const getCategory = (id: CategoryId) => categories.find((c) => c.id === id)!;

export const coursesIn = (id: CategoryId) => courses.filter((c) => c.cat === id);
