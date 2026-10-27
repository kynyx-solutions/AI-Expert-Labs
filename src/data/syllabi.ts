import type { CourseDetails } from "./courses";

// Program syllabi, keyed by course title (must match the titles in courses.ts).
// DRAFT: written as a starting point for the academic team to review and edit.
// `day` can be a single day ("03") or a range ("04–06") for longer programs.
export const syllabi: Record<string, CourseDetails> = {
  // ─── AI & ML Program ───────────────────────────────────────────
  "Python for AI Beginners": {
    summary:
      "Learn Python from zero and use it to work with data and build your first simple AI models, one hands-on exercise at a time.",
    audience: "Students, graduates and professionals who want to start coding for data and AI.",
    prereq: "None. Comfort with basic computer use is enough.",
    tools: ["Python", "Jupyter Notebook", "Google Colab", "pandas", "Matplotlib", "scikit-learn"],
    outcomes: [
      "Write and run Python programs with confidence",
      "Use variables, loops, functions and data structures",
      "Load, clean and analyse data with pandas",
      "Visualise data with clear charts",
      "Train and evaluate a simple machine learning model",
      "Complete a small end-to-end AI project",
    ],
    plan: [
      { day: "01–02", title: "Getting started with Python", detail: "Installing tools, Colab notebooks, variables, data types and input/output." },
      { day: "03–04", title: "Control flow", detail: "Conditions, loops and writing small programs that make decisions." },
      { day: "05–06", title: "Functions and data structures", detail: "Lists, dictionaries, tuples, sets and reusable functions." },
      { day: "07–08", title: "Working with files and libraries", detail: "Reading files, error handling and using Python packages." },
      { day: "09–10", title: "Data analysis with pandas", detail: "Loading CSV/Excel data, cleaning, filtering and summarising." },
      { day: "11", title: "Data visualisation", detail: "Line, bar and scatter charts with Matplotlib to tell a story with data." },
      { day: "12–13", title: "Introduction to machine learning", detail: "How models learn, train/test split, and a first model with scikit-learn." },
      { day: "14–15", title: "Capstone project and assessment", detail: "Build an end-to-end mini project, present it and take the final test." },
    ],
  },
  "AI Engineering with Large Language Models (LLMs)": {
    summary:
      "Understand how large language models work and how to build reliable applications on top of them using APIs, prompts and evaluation.",
    audience: "Developers and technical professionals who want to build LLM-powered applications.",
    prereq: "Working knowledge of Python and basic programming concepts.",
    tools: ["OpenAI API", "Claude API", "Python", "LangChain", "Postman"],
    outcomes: [
      "Explain how LLMs generate text and where they fail",
      "Call LLM APIs and control output with parameters",
      "Design system prompts and structured outputs",
      "Add guardrails against wrong or unsafe answers",
      "Evaluate and compare LLM responses",
      "Ship a small working LLM application",
    ],
    plan: [
      { day: "01", title: "How LLMs work and how to call them", detail: "Tokens, context windows, temperature, API calls, system prompts and structured (JSON) output." },
      { day: "02", title: "Building reliable LLM apps", detail: "Guardrails, evaluation, cost and latency, then build and demo a small LLM app." },
    ],
  },
  "Agentic AI & Autonomous Systems": {
    summary:
      "Learn how AI agents plan, use tools and take multi-step actions, and how to build them safely with human oversight.",
    audience: "Developers, AI practitioners and tech leads exploring autonomous AI systems.",
    prereq: "Python basics and some experience with LLM APIs.",
    tools: ["Python", "LangGraph", "OpenAI Agents SDK", "Claude API", "n8n"],
    outcomes: [
      "Explain what makes an AI system agentic",
      "Give agents tools such as search, code and APIs",
      "Design multi-step plans with memory and state",
      "Coordinate multiple agents on one task",
      "Add human approval and safety checks",
      "Build and test a working agent",
    ],
    plan: [
      { day: "01", title: "Foundations of agentic AI", detail: "Agents vs chatbots, the reason–act loop, tool calling and memory." },
      { day: "02", title: "Building agents with tools", detail: "Connect search, files and APIs; handle errors and multi-step plans." },
      { day: "03", title: "Multi-agent systems and oversight", detail: "Agent teams, human-in-the-loop approval, safety limits, and a capstone agent." },
    ],
  },
  "Retrieval Augmented Generation (RAG) & Vector Databases": {
    summary:
      "Ground AI answers in your own documents and data by building retrieval-augmented generation (RAG) pipelines with vector databases.",
    audience: "Developers and data professionals building AI assistants on company knowledge.",
    prereq: "Python basics and familiarity with LLM APIs.",
    tools: ["Python", "LangChain", "LlamaIndex", "ChromaDB", "Pinecone", "OpenAI Embeddings"],
    outcomes: [
      "Explain why RAG reduces hallucinations",
      "Split documents into useful chunks",
      "Create embeddings and store them in a vector database",
      "Retrieve the most relevant context for a question",
      "Measure answer quality and improve retrieval",
      "Build a chat-with-your-documents assistant",
    ],
    plan: [
      { day: "01", title: "Why RAG", detail: "LLM limits, hallucinations, and the retrieve-then-generate pattern." },
      { day: "02", title: "Embeddings and vector databases", detail: "How embeddings work, similarity search, and setting up ChromaDB and Pinecone." },
      { day: "03", title: "Building the pipeline", detail: "Loading documents, chunking strategies, retrieval and prompt assembly." },
      { day: "04", title: "Improving quality", detail: "Re-ranking, hybrid search, citations and evaluating answers." },
      { day: "05", title: "Capstone and assessment", detail: "Build a document Q&A assistant on your own data and present it." },
    ],
  },

  // ─── Generative AI ─────────────────────────────────────────────
  "ChatGPT & Generative AI for Beginners": {
    summary:
      "Take your first hands-on steps with ChatGPT and other generative AI tools, and learn to use them safely for study, work and everyday tasks.",
    audience: "Complete beginners: students, professionals, homemakers and business owners.",
    prereq: "None. A smartphone or laptop and an email account.",
    tools: ["ChatGPT", "Gemini", "Microsoft Copilot", "Canva AI"],
    outcomes: [
      "Explain what generative AI is in simple terms",
      "Hold useful conversations with ChatGPT and Gemini",
      "Use AI to write, summarise and translate",
      "Create simple images and designs with AI",
      "Spot wrong answers and check facts",
      "Use AI responsibly and protect your data",
    ],
    plan: [
      { day: "01", title: "Meet generative AI", detail: "What GenAI is, popular tools, creating accounts and your first conversations." },
      { day: "02", title: "AI for everyday tasks", detail: "Writing, summarising, translating, planning and learning with AI." },
      { day: "03", title: "Creating with AI and staying safe", detail: "AI images and designs, fact-checking, privacy, and a hands-on assessment." },
    ],
  },
  "Prompt Engineering Masterclass": {
    summary:
      "Learn to write prompts that give accurate, reliable and reusable results, and build a personal prompt toolkit for study, work and business.",
    audience:
      "Students, working professionals, MSME owners, teachers and anyone who uses AI tools and wants better results from them.",
    prereq: "None. Basic computer use and a Gmail account.",
    tools: ["ChatGPT", "Gemini", "Claude", "Perplexity", "NotebookLM"],
    outcomes: [
      "Explain how AI chat tools read and respond to prompts",
      "Structure prompts with role, context, task and format",
      "Use examples and step-by-step reasoning for accuracy",
      "Get tables, templates and structured output on demand",
      "Apply prompts to email, reports, research and marketing",
      "Build and reuse your own prompt library",
    ],
    plan: [
      { day: "01", title: "How AI reads your prompt", detail: "How large language models work, their limits, and the anatomy of a good prompt." },
      { day: "02", title: "Core prompting techniques", detail: "Roles, context, constraints, few-shot examples and step-by-step instructions." },
      { day: "03", title: "Structured output", detail: "Tables, checklists, templates and formats you can paste straight into your work." },
      { day: "04", title: "Prompts for real work", detail: "Emails, reports, research with sources, data summaries and marketing content." },
      { day: "05", title: "Capstone and assessment", detail: "Build your prompt toolkit for a real use case, submit the project and take the test." },
    ],
  },
  "Generative AI Application Development (No-Code)": {
    summary:
      "Design and build working generative AI applications, from chatbots to content generators, without writing code.",
    audience: "Entrepreneurs, product thinkers, freelancers and professionals who want to build AI apps.",
    prereq: "Comfort with AI chat tools. No coding required.",
    tools: ["Bubble", "Glide", "FlowiseAI", "Voiceflow", "Zapier", "OpenAI API"],
    outcomes: [
      "Turn a business idea into an AI app plan",
      "Build chatbots trained on your own content",
      "Create text and image generator apps",
      "Connect apps to forms, sheets and other tools",
      "Design simple, user-friendly app screens",
      "Launch and share a working no-code AI app",
    ],
    plan: [
      { day: "01–02", title: "GenAI app foundations", detail: "How AI apps work, use cases, and planning your app from idea to features." },
      { day: "03–04", title: "No-code platforms", detail: "Getting started with Bubble and Glide: screens, data and user flows." },
      { day: "05–06", title: "Connecting AI models", detail: "Using AI APIs inside no-code tools, prompts as app logic, and API keys." },
      { day: "07–08", title: "Chatbots on your content", detail: "Build knowledge-base chatbots with FlowiseAI and Voiceflow." },
      { day: "09–10", title: "Generator apps", detail: "Text, image and document generators with templates and user inputs." },
      { day: "11–12", title: "Integrations and automation", detail: "Connect apps to Google Sheets, forms, email and WhatsApp via Zapier." },
      { day: "13", title: "Testing and polish", detail: "Usability testing, error handling, costs and responsible AI checks." },
      { day: "14–15", title: "Capstone and assessment", detail: "Build, launch and present your own no-code AI app." },
    ],
  },
  "AI Agent Development using No-Code Tools": {
    summary:
      "Design AI agents that research, respond to customers and complete tasks on their own, using visual no-code tools.",
    audience: "Business owners, operations teams, freelancers and anyone automating work with AI.",
    prereq: "Comfort with AI chat tools. No coding required.",
    tools: ["n8n", "Make", "Zapier", "Voiceflow", "Relevance AI", "OpenAI API"],
    outcomes: [
      "Explain how AI agents plan and act",
      "Build agents with tools, memory and triggers",
      "Create customer support and lead-handling agents",
      "Build research and reporting agents",
      "Connect agents to email, WhatsApp and CRMs",
      "Monitor agents and keep a human in control",
    ],
    plan: [
      { day: "01–02", title: "Understanding AI agents", detail: "Agents vs automations, the reason–act loop, and real business examples." },
      { day: "03–04", title: "Your first agent in n8n", detail: "Triggers, AI nodes, tools and memory in a visual workflow." },
      { day: "05–06", title: "Customer support agents", detail: "Agents that answer FAQs from your documents and hand off to humans." },
      { day: "07–08", title: "Sales and lead agents", detail: "Qualify leads, send follow-ups and update a CRM automatically." },
      { day: "09–10", title: "Research and reporting agents", detail: "Agents that search the web, summarise findings and write reports." },
      { day: "11–12", title: "Multi-step and multi-agent workflows", detail: "Chaining agents, approvals and error handling with Make and Zapier." },
      { day: "13", title: "Safety and monitoring", detail: "Guardrails, logging, costs and human-in-the-loop review." },
      { day: "14–15", title: "Capstone and assessment", detail: "Build and demo an agent that solves a real business task." },
    ],
  },
  "AI Content Creation & Social Media": {
    summary:
      "Create posts, images, short videos and captions with AI, and plan consistent social media content for yourself or a brand.",
    audience: "Creators, freelancers, small business owners, marketers and students.",
    prereq: "None. A smartphone or laptop.",
    tools: ["ChatGPT", "Canva AI", "Adobe Firefly", "CapCut", "Meta AI", "Buffer"],
    outcomes: [
      "Plan a month of content with AI",
      "Write captions, hooks and scripts that engage",
      "Create on-brand images and graphics",
      "Edit short videos and reels with AI tools",
      "Schedule posts and track what works",
      "Use AI content ethically and legally",
    ],
    plan: [
      { day: "01", title: "Content strategy with AI", detail: "Audience, content pillars and a monthly content calendar." },
      { day: "02", title: "Writing for social", detail: "Captions, hooks, hashtags and short-video scripts with AI." },
      { day: "03", title: "Visuals with AI", detail: "Images, carousels and brand templates with Canva AI and Firefly." },
      { day: "04", title: "Short video and reels", detail: "AI-assisted editing, subtitles and voiceovers in CapCut." },
      { day: "05", title: "Publishing, analytics and capstone", detail: "Scheduling, reading analytics, copyright basics and a content portfolio." },
    ],
  },

  // ─── Data Science ──────────────────────────────────────────────
  "Data Analytics using Excel & AI": {
    summary:
      "Clean, analyse and present data faster by combining Excel's power features with AI assistants like Copilot and ChatGPT.",
    audience: "Students, job seekers, accountants, analysts and office professionals.",
    prereq: "Basic familiarity with Excel or Google Sheets.",
    tools: ["Microsoft Excel", "Microsoft Copilot", "ChatGPT", "Google Sheets"],
    outcomes: [
      "Clean messy data quickly and reliably",
      "Use key formulas like XLOOKUP, IF and SUMIFS",
      "Summarise data with pivot tables",
      "Build clear charts and simple dashboards",
      "Use AI to write formulas and explain data",
      "Present insights in a short report",
    ],
    plan: [
      { day: "01", title: "Excel foundations for analysis", detail: "Tables, sorting, filtering and data types." },
      { day: "02", title: "Cleaning data", detail: "Removing duplicates, text functions, Power Query basics." },
      { day: "03", title: "Essential formulas", detail: "IF, XLOOKUP, SUMIFS, COUNTIFS and date functions." },
      { day: "04", title: "Pivot tables", detail: "Summarising and slicing data to answer business questions." },
      { day: "05", title: "Charts and dashboards", detail: "Choosing the right chart and building a one-page dashboard." },
      { day: "06", title: "AI for analysis", detail: "Copilot and ChatGPT to write formulas, find patterns and explain results." },
      { day: "07", title: "Capstone and assessment", detail: "Analyse a real dataset and present your findings." },
    ],
  },
  "Power BI with AI Insights": {
    summary:
      "Build interactive Power BI dashboards and use its built-in AI features to uncover and explain business insights.",
    audience: "Analysts, MIS executives, managers and anyone who reports on data.",
    prereq: "Comfort with Excel. Basic data analysis helps.",
    tools: ["Power BI Desktop", "Power Query", "DAX", "Copilot in Power BI", "Excel"],
    outcomes: [
      "Connect Power BI to Excel, CSV and online data",
      "Clean and shape data with Power Query",
      "Model data with relationships",
      "Write useful DAX measures",
      "Design interactive dashboards",
      "Use AI visuals and Q&A to explain trends",
    ],
    plan: [
      { day: "01", title: "Getting started with Power BI", detail: "Interface, connecting data sources and your first report." },
      { day: "02", title: "Power Query", detail: "Cleaning, merging and transforming data." },
      { day: "03", title: "Data modelling", detail: "Tables, relationships and star schema basics." },
      { day: "04", title: "DAX essentials", detail: "Calculated columns, measures, CALCULATE and time intelligence." },
      { day: "05", title: "Dashboard design", detail: "Visuals, slicers, drill-through and design best practice." },
      { day: "06", title: "AI insights", detail: "Q&A, key influencers, smart narratives and Copilot." },
      { day: "07", title: "Publishing and capstone", detail: "Sharing via Power BI Service and presenting a business dashboard." },
    ],
  },

  // ─── Cloud Computing ───────────────────────────────────────────
  "MLOps & AI Model Deployment": {
    summary:
      "Take machine learning models from a notebook to production, and keep them monitored, versioned and healthy.",
    audience: "Data scientists, ML engineers and developers deploying AI models.",
    prereq: "Python and basic machine learning experience.",
    tools: ["Python", "FastAPI", "Docker", "MLflow", "GitHub Actions", "AWS / Azure"],
    outcomes: [
      "Package a model as an API",
      "Containerise apps with Docker",
      "Track experiments and model versions with MLflow",
      "Automate testing and deployment with CI/CD",
      "Deploy to a cloud platform",
      "Monitor models for drift and failures",
    ],
    plan: [
      { day: "01", title: "MLOps foundations", detail: "The ML lifecycle, why models fail in production, and key practices." },
      { day: "02", title: "Serving models", detail: "Building a prediction API with FastAPI and packaging it with Docker." },
      { day: "03", title: "Tracking and versioning", detail: "Experiments, model registry and reproducibility with MLflow." },
      { day: "04", title: "CI/CD and cloud deployment", detail: "GitHub Actions pipelines and deploying to AWS or Azure." },
      { day: "05", title: "Monitoring and capstone", detail: "Logging, drift detection, retraining triggers and a full deployment project." },
    ],
  },

  // ─── AI Foundations & Career Skills ────────────────────────────
  "AI Literacy & Digital Productivity": {
    summary:
      "Understand what AI is, how it affects your work and life, and use everyday digital and AI tools with confidence.",
    audience: "Anyone new to AI: students, homemakers, senior professionals and first-time users.",
    prereq: "None.",
    tools: ["ChatGPT", "Gemini", "Google Workspace", "Google Lens"],
    outcomes: [
      "Explain AI, machine learning and generative AI simply",
      "Use AI assistants for daily tasks",
      "Organise work with digital productivity tools",
      "Search, verify and evaluate information online",
      "Stay safe from scams, deepfakes and data misuse",
      "Plan how AI can help in your own work",
    ],
    plan: [
      { day: "01", title: "Understanding AI", detail: "What AI is and isn't, everyday examples, and hands-on with AI assistants." },
      { day: "02", title: "Digital productivity and safety", detail: "Productivity tools, information checking, online safety, and a practical assessment." },
    ],
  },
  "AI Tools for Office Productivity": {
    summary:
      "Use AI inside documents, spreadsheets, email and presentations to cut routine office work from hours to minutes.",
    audience: "Office staff, managers, teachers, government employees and professionals.",
    prereq: "Basic use of Word/Docs, Excel/Sheets and email.",
    tools: ["Microsoft Copilot", "Gemini for Google Workspace", "ChatGPT", "Gamma", "Otter.ai"],
    outcomes: [
      "Draft and edit documents with AI",
      "Analyse spreadsheets and write formulas with AI",
      "Write and manage email faster",
      "Create presentations in minutes",
      "Summarise meetings and action points",
      "Build a personal AI workflow for your role",
    ],
    plan: [
      { day: "01", title: "AI for documents", detail: "Drafting, rewriting, summarising and formatting letters and reports." },
      { day: "02", title: "AI for spreadsheets", detail: "Formulas, data cleaning, summaries and charts with AI help." },
      { day: "03", title: "AI for email and communication", detail: "Replies, follow-ups, tone and inbox management." },
      { day: "04", title: "AI for presentations and meetings", detail: "Slide decks with Gamma and Copilot, meeting notes and minutes." },
      { day: "05", title: "Your AI workflow and assessment", detail: "Combine tools into a daily routine for your job and complete the project." },
    ],
  },
  "Future Skills Program (AI, IoT, Blockchain & Robotics)": {
    summary:
      "A practical introduction to AI, the Internet of Things, blockchain and robotics, and the careers they are creating.",
    audience: "School and college students, teachers and curious learners.",
    prereq: "None.",
    tools: ["Teachable Machine", "Tinkercad Circuits", "Arduino (simulated)", "Blockchain demo tools"],
    outcomes: [
      "Explain AI, IoT, blockchain and robotics simply",
      "Train a simple AI model without code",
      "Simulate an IoT sensor project",
      "Understand how blockchain records are secured",
      "See how robots sense and act",
      "Map future career paths in these fields",
    ],
    plan: [
      { day: "01", title: "AI and IoT", detail: "Train an image model with Teachable Machine; simulate sensors in Tinkercad." },
      { day: "02", title: "Blockchain, robotics and careers", detail: "How blockchain works, robot basics, career paths, and a mini project." },
    ],
  },
  "AI Resume Building & Career Accelerator": {
    summary:
      "Build an AI-assisted, ATS-friendly resume and LinkedIn profile, and a clear job search plan you can start using right away.",
    audience: "Students, freshers, job seekers and professionals changing roles.",
    prereq: "None. Bring your current resume if you have one.",
    tools: ["ChatGPT", "Canva", "LinkedIn", "Resume checkers (ATS)"],
    outcomes: [
      "Write an ATS-friendly resume with AI",
      "Tailor your resume to each job",
      "Optimise your LinkedIn profile",
      "Write strong cover letters and outreach messages",
      "Find and track relevant job openings",
      "Follow a 30-day job search plan",
    ],
    plan: [
      { day: "01", title: "Resume with AI", detail: "How ATS works, resume structure, impact bullets and tailoring with AI." },
      { day: "02", title: "LinkedIn and job search", detail: "Profile optimisation, networking messages, job tracking and your 30-day plan." },
    ],
  },
  "Job Readiness Program with AI, Communication & Interview Preparation": {
    summary:
      "Build the communication skills, confidence and interview practice you need to get hired, with AI as your practice partner.",
    audience: "Final-year students, freshers and job seekers.",
    prereq: "None.",
    tools: ["ChatGPT", "Google Interview Warmup", "LinkedIn", "Canva"],
    outcomes: [
      "Introduce yourself clearly and confidently",
      "Communicate professionally in email and calls",
      "Answer common HR and behavioural questions",
      "Practise technical and role-specific interviews with AI",
      "Handle group discussions",
      "Present a job-ready resume and profile",
    ],
    plan: [
      { day: "01", title: "Professional communication", detail: "Self-introduction, email etiquette, phone and video call skills." },
      { day: "02", title: "Interview preparation", detail: "HR and behavioural questions, the STAR method and AI mock interviews." },
      { day: "03", title: "Group discussion and final mock", detail: "GD practice, body language, and a full mock interview with feedback." },
    ],
  },

  // ─── AI for Business & Entrepreneurship ────────────────────────
  "Business Automation using AI": {
    summary:
      "Automate repetitive work across sales, HR, accounts and customer support by combining AI with no-code automation tools.",
    audience: "MSME owners, operations managers, admin teams and freelancers.",
    prereq: "Comfort with email, spreadsheets and AI chat tools.",
    tools: ["Zapier", "Make", "n8n", "ChatGPT", "Google Workspace", "WhatsApp Business"],
    outcomes: [
      "Spot tasks that are worth automating",
      "Build multi-step automations without code",
      "Add AI steps to classify, summarise and reply",
      "Automate sales, HR and accounts workflows",
      "Connect WhatsApp, email and spreadsheets",
      "Measure time saved and maintain automations",
    ],
    plan: [
      { day: "01", title: "Automation thinking", detail: "Mapping processes, finding repetitive work and estimating ROI." },
      { day: "02", title: "First automations", detail: "Triggers, actions and filters with Zapier and Make." },
      { day: "03", title: "Adding AI", detail: "AI steps to read, classify, summarise and draft responses." },
      { day: "04", title: "Sales and customer workflows", detail: "Lead capture, follow-ups, WhatsApp replies and CRM updates." },
      { day: "05", title: "HR and accounts workflows", detail: "Onboarding, leave requests, invoice processing and reminders." },
      { day: "06", title: "Reliability and scale", detail: "Error handling, logs, costs and keeping a human in the loop." },
      { day: "07", title: "Capstone and assessment", detail: "Automate a real process from your business and present it." },
    ],
  },
  "AI for MSMEs & Small Businesses": {
    summary:
      "Practical, low-cost ways to use AI in marketing, customer service and daily operations of a small business.",
    audience: "MSME owners, shopkeepers, startup founders and small business teams.",
    prereq: "None. A smartphone or laptop.",
    tools: ["ChatGPT", "Canva AI", "WhatsApp Business", "Google Business Profile", "Gemini"],
    outcomes: [
      "Identify where AI helps your business most",
      "Create marketing posts and offers with AI",
      "Set up quick replies and catalogues on WhatsApp",
      "Improve your Google Business Profile",
      "Use AI for quotes, invoices and documents",
      "Make a 90-day AI adoption plan",
    ],
    plan: [
      { day: "01", title: "AI for marketing", detail: "Posts, offers, product descriptions and your Google Business Profile." },
      { day: "02", title: "AI for customers and operations", detail: "WhatsApp Business automation, customer replies, quotes and documents." },
      { day: "03", title: "Your AI plan", detail: "Costs, data safety, government schemes, and a 90-day plan for your business." },
    ],
  },
  "AI Powered Digital Marketing": {
    summary:
      "Plan, create and optimise digital marketing campaigns with AI across search, social, email and ads.",
    audience: "Marketers, business owners, freelancers and students entering marketing.",
    prereq: "Basic familiarity with social media.",
    tools: ["ChatGPT", "Canva AI", "Google Ads", "Meta Ads Manager", "Google Analytics", "Mailchimp"],
    outcomes: [
      "Build a digital marketing strategy with AI",
      "Do keyword research and write SEO content",
      "Create social media campaigns",
      "Write and test ad copy",
      "Run email marketing automations",
      "Read analytics and improve results",
    ],
    plan: [
      { day: "01", title: "Strategy and audience", detail: "Personas, positioning and campaign planning with AI." },
      { day: "02", title: "SEO with AI", detail: "Keyword research, on-page SEO and blog content." },
      { day: "03", title: "Social media marketing", detail: "Content calendars, creatives and community management." },
      { day: "04", title: "Paid ads", detail: "Google and Meta ads: targeting, budgets and AI-written ad copy." },
      { day: "05", title: "Email and automation", detail: "Newsletters, drip sequences and segmentation." },
      { day: "06", title: "Analytics and optimisation", detail: "Google Analytics, A/B testing and reading campaign data." },
      { day: "07", title: "Capstone and assessment", detail: "Plan and present a full AI-assisted campaign." },
    ],
  },
  "AI for Finance & Accounting": {
    summary:
      "Use AI to speed up bookkeeping, reconciliation, reporting and financial analysis, while keeping accuracy and compliance in check.",
    audience: "Accountants, finance teams, CA/CS students and business owners.",
    prereq: "Basic accounting knowledge and Excel.",
    tools: ["Microsoft Excel", "Copilot", "ChatGPT", "Tally Prime", "Zoho Books"],
    outcomes: [
      "Automate data entry and categorisation",
      "Reconcile bank and ledger entries faster",
      "Prepare reports and MIS with AI help",
      "Analyse financial statements and ratios",
      "Draft GST and compliance summaries for review",
      "Know where AI needs a human check",
    ],
    plan: [
      { day: "01", title: "AI in finance", detail: "Use cases, limits and data privacy in financial work." },
      { day: "02", title: "Bookkeeping and data entry", detail: "Extracting invoice data, categorising transactions and Tally/Zoho workflows." },
      { day: "03", title: "Reconciliation and reporting", detail: "Bank reconciliation, MIS reports and Excel with Copilot." },
      { day: "04", title: "Analysis and forecasting", detail: "Ratio analysis, budgets, cash-flow forecasts and variance explanations." },
      { day: "05", title: "Compliance and capstone", detail: "GST summaries, audit trails, review checklists and a finance automation project." },
    ],
  },
  "AI Entrepreneurship Bootcamp": {
    summary:
      "Turn an AI-powered idea into a business you can test quickly: from problem and customer to prototype and pitch.",
    audience: "Aspiring founders, students, freelancers and intrapreneurs.",
    prereq: "None. Bring an idea or a problem you want to solve.",
    tools: ["ChatGPT", "Perplexity", "Canva", "Glide", "Google Forms"],
    outcomes: [
      "Find AI business opportunities",
      "Validate a problem with real customers",
      "Build a no-code prototype",
      "Shape a simple business model",
      "Estimate costs and pricing",
      "Pitch your idea in three minutes",
    ],
    plan: [
      { day: "01", title: "From idea to validation", detail: "AI opportunities, customer interviews, market research and a no-code prototype." },
      { day: "02", title: "Business model and pitch", detail: "Lean canvas, pricing, funding options and final pitches with feedback." },
    ],
  },
  "Entrepreneurship, Startup & Innovation Management": {
    summary:
      "Go from idea validation to building, funding and growing a startup, including government schemes and support for new ventures.",
    audience: "Aspiring and early-stage founders, students and MSME owners planning new ventures.",
    prereq: "None.",
    tools: ["Lean Canvas", "ChatGPT", "Google Sheets", "Canva", "Startup India portal"],
    outcomes: [
      "Validate an idea using lean methods",
      "Build a business model and financial plan",
      "Understand company registration and compliance",
      "Know funding options and government schemes",
      "Plan go-to-market and growth",
      "Create and deliver an investor pitch",
    ],
    plan: [
      { day: "01", title: "Innovation and ideas", detail: "Design thinking, problem discovery and opportunity spotting." },
      { day: "02", title: "Validation and business model", detail: "Customer discovery, MVPs and the lean canvas." },
      { day: "03", title: "Setting up and finances", detail: "Registration, compliance, unit economics and a simple financial plan." },
      { day: "04", title: "Funding and schemes", detail: "Bootstrapping, angels, VCs and government schemes for startups and MSMEs." },
      { day: "05", title: "Growth and pitch", detail: "Go-to-market, marketing on a budget, and pitch presentations." },
    ],
  },
  "Executive Program on AI Leadership & Digital Transformation": {
    summary:
      "Lead AI adoption and digital transformation in your organisation, from strategy and governance to people and measurable results.",
    audience: "Business owners, CXOs, senior managers, department heads and government officers.",
    prereq: "Management experience. No technical background needed.",
    tools: ["ChatGPT Enterprise", "Microsoft Copilot", "AI strategy canvases", "Case studies"],
    outcomes: [
      "Understand what AI can and cannot do for your organisation",
      "Build an AI strategy linked to business goals",
      "Prioritise use cases by value and feasibility",
      "Set up AI governance, risk and ethics policies",
      "Lead teams through change and reskilling",
      "Measure ROI and scale successful pilots",
    ],
    plan: [
      { day: "01", title: "AI for leaders", detail: "The AI landscape, myths and realities, and industry case studies." },
      { day: "02", title: "Strategy", detail: "Linking AI to business goals and building a transformation roadmap." },
      { day: "03", title: "Use cases", detail: "Finding, scoring and prioritising AI opportunities across functions." },
      { day: "04", title: "Data and technology", detail: "Data readiness, build vs buy, and choosing vendors and platforms." },
      { day: "05", title: "Governance and ethics", detail: "Risk, privacy, regulation and responsible AI policies." },
      { day: "06", title: "People and change", detail: "Culture, reskilling, change management and new ways of working." },
      { day: "07", title: "Roadmap and presentation", detail: "Measuring ROI, scaling pilots, and presenting your organisation's AI plan." },
    ],
  },

  // ─── AI for Industries ─────────────────────────────────────────
  "AI for Teachers & Educators": {
    summary:
      "Plan lessons, create teaching material and assess students faster with AI, while keeping learning honest and student-centred.",
    audience: "School teachers, college faculty, tutors and education coordinators.",
    prereq: "None.",
    tools: ["ChatGPT", "Gemini", "Canva for Education", "Google Forms", "Diksha"],
    outcomes: [
      "Plan lessons and units with AI",
      "Create worksheets, quizzes and activities",
      "Differentiate material for different learners",
      "Speed up assessment and feedback",
      "Guide students on responsible AI use",
      "Build a reusable AI toolkit for teaching",
    ],
    plan: [
      { day: "01", title: "AI for lesson planning", detail: "Lesson plans, explanations, examples and activities with AI." },
      { day: "02", title: "Materials and assessment", detail: "Worksheets, quizzes, rubrics and faster feedback." },
      { day: "03", title: "Responsible AI in the classroom", detail: "Academic integrity, student AI use policies, and your teaching toolkit." },
    ],
  },
  "AI in Education & EdTech": {
    summary:
      "Understand how AI is reshaping learning, institutions and EdTech products, and how to adopt it in your own institution or venture.",
    audience: "Principals, academic leaders, EdTech founders, teachers and education consultants.",
    prereq: "None.",
    tools: ["ChatGPT", "Khanmigo (demo)", "Google Classroom", "LMS platforms", "Analytics dashboards"],
    outcomes: [
      "Explain the main AI trends in education",
      "Evaluate AI tools for teaching and learning",
      "Use AI for personalised learning",
      "Apply learning analytics to student outcomes",
      "Plan AI adoption in an institution",
      "Assess EdTech product ideas",
    ],
    plan: [
      { day: "01", title: "AI and the future of learning", detail: "Trends, NEP 2020 context and global examples." },
      { day: "02", title: "AI tools for teaching", detail: "Tutors, content generators and assessment tools in practice." },
      { day: "03", title: "Personalised learning and analytics", detail: "Adaptive learning, dashboards and early-warning systems." },
      { day: "04", title: "Institutional adoption", detail: "Policies, teacher training, infrastructure and data privacy." },
      { day: "05", title: "EdTech and capstone", detail: "EdTech business models and an AI adoption plan for your institution." },
    ],
  },
  "AI in Healthcare & Life Sciences": {
    summary:
      "Explore real AI use cases in diagnostics, hospital operations and medical research, and the safety and ethics that govern them.",
    audience: "Doctors, nurses, hospital administrators, pharma and life-science professionals, and students.",
    prereq: "Background in healthcare or life sciences helps but is not required.",
    tools: ["ChatGPT", "Medical imaging AI demos", "Power BI", "Clinical documentation tools"],
    outcomes: [
      "Explain how AI is used in diagnosis and imaging",
      "Use AI for clinical documentation and summaries",
      "Improve hospital operations with data",
      "Understand AI in drug discovery and research",
      "Assess risks, bias and patient safety",
      "Know the key regulations and ethics",
    ],
    plan: [
      { day: "01", title: "AI in clinical care", detail: "Diagnostics, imaging, decision support and documentation." },
      { day: "02", title: "Operations and research", detail: "Hospital workflows, patient flow, and AI in drug discovery." },
      { day: "03", title: "Safety, ethics and case study", detail: "Bias, privacy, regulation, and a healthcare AI case study." },
    ],
  },
  "AI for Agriculture & Smart Farming": {
    summary:
      "Use AI for crop advisory, weather, soil, pest and market insights, and make smarter farming decisions with mobile tools.",
    audience: "Farmers, FPO members, agri-entrepreneurs, extension workers and agriculture students.",
    prereq: "None. A smartphone.",
    tools: ["Kisan apps", "Plantix", "Google Lens", "Weather and mandi price apps", "ChatGPT"],
    outcomes: [
      "Use AI apps for crop advice",
      "Detect pests and diseases from photos",
      "Plan with weather forecasts",
      "Understand soil health data",
      "Track mandi prices and sell better",
      "Know agri-tech schemes and support",
    ],
    plan: [
      { day: "01", title: "AI in agriculture", detail: "How AI helps farming today, and using AI on your smartphone." },
      { day: "02", title: "Crop and soil advisory", detail: "Crop planning, soil health cards and AI recommendations." },
      { day: "03", title: "Pest and disease detection", detail: "Diagnosing problems from photos and choosing treatments." },
      { day: "04", title: "Weather and irrigation", detail: "Forecast-based planning and smart irrigation basics." },
      { day: "05", title: "Markets and selling", detail: "Mandi prices, e-NAM and AI for better selling decisions." },
      { day: "06", title: "Drones, IoT and schemes", detail: "Smart farming technology and government agri-tech schemes." },
      { day: "07", title: "Field plan and assessment", detail: "Build an AI-assisted plan for your own farm or FPO." },
    ],
  },
  "AI for Manufacturing & Industry 4.0": {
    summary:
      "See how AI powers quality checks, predictive maintenance and smart factories, and where to start in your own plant.",
    audience: "Plant managers, engineers, supervisors, MSME manufacturers and engineering students.",
    prereq: "Familiarity with manufacturing or engineering processes helps.",
    tools: ["Computer vision demos", "IoT sensor dashboards", "Excel / Power BI", "ChatGPT"],
    outcomes: [
      "Explain Industry 4.0 and the role of AI",
      "Understand AI-based visual quality inspection",
      "Use sensor data for predictive maintenance",
      "Optimise production and supply chains with data",
      "Identify high-value AI use cases in a plant",
      "Plan a first AI pilot",
    ],
    plan: [
      { day: "01", title: "Industry 4.0 and quality", detail: "Smart factories, IoT, and AI-based visual inspection." },
      { day: "02", title: "Maintenance, operations and pilots", detail: "Predictive maintenance, production optimisation and planning an AI pilot." },
    ],
  },
  "AI for Government & Smart Governance": {
    summary:
      "Apply AI to citizen services, records, grievance handling and data-driven decisions in government departments.",
    audience: "Government officers, public sector employees, municipal staff and policy professionals.",
    prereq: "None.",
    tools: ["ChatGPT", "Bhashini", "Microsoft Copilot", "Power BI", "Government AI portals"],
    outcomes: [
      "Understand AI opportunities in public services",
      "Use AI for drafting letters, notes and reports",
      "Digitise and search records efficiently",
      "Improve grievance and citizen service handling",
      "Use dashboards for data-driven decisions",
      "Follow responsible AI and data protection rules",
    ],
    plan: [
      { day: "01", title: "AI in governance", detail: "Global and Indian examples, Digital India and IndiaAI initiatives." },
      { day: "02", title: "AI for office work", detail: "Drafting notes, letters, minutes and reports with AI." },
      { day: "03", title: "Records and documents", detail: "Digitisation, search, summarisation and translation with Bhashini." },
      { day: "04", title: "Citizen services", detail: "Chatbots, grievance redressal and multilingual service delivery." },
      { day: "05", title: "Data-driven decisions", detail: "Dashboards, scheme monitoring and evidence-based planning." },
      { day: "06", title: "Responsible AI", detail: "Data protection (DPDP Act), bias, transparency and procurement." },
      { day: "07", title: "Department plan and assessment", detail: "Design an AI improvement plan for your own department." },
    ],
  },
};
