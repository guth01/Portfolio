import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { DotsPattern } from "@/components/DotsPattern";
import { LogoOutline } from "@/components/Logo";
import { IntroTransition } from "@/components/IntroTransition";
import { RotatingTypewriter } from "@/components/RotatingTypewriter";
import {
  Github,
  Linkedin,
  Code,
  Trophy,
  Plane,
  Award,
  type LucideIcon,
  Code2,
  GraduationCap,
  Wrench,
  Briefcase,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "cortex-ai",
    title: "Cortex AI — AI Agent Study Platform",
    period: "June 2026",
    summary:
      "Self-directed study assistant built on agentic RAG — ingests PDFs, searches the web, and auto-schedules review sessions.",
    tags: ["React", "FastAPI", "LangGraph", "Gemini", "Groq", "ChromaDB", "Cloudinary"],
    highlights: [
      "Pipelines uploaded documents through ChromaDB while Tavily supplies fresh context from the open web.",
      "Rotates between multiple Gemini API keys and Groq to stay under rate limits during long reasoning chains.",
      "LangGraph orchestrates flashcard generation and drops optimised study blocks into Google Calendar; live on Vercel and Render.",
    ],
    gradient: "bg-gradient-to-br from-indigo-700/90 via-portfolio-primary/80 to-violet-950/90",
    repo: "https://github.com/guth01/cortex-ai",
  },
  {
    id: "taskforge",
    title: "TaskForge — Gamified Task Management",
    period: "May 2026",
    summary:
      "Gamified Kanban board where GenAI breaks down goals into subtasks and streak mechanics keep momentum high.",
    tags: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
    highlights: [
      "Google Generative AI splits large tasks into manageable steps behind a fluid drag-and-drop board.",
      "Express API backed by PostgreSQL persistence and Redis caching for snappy reads.",
      "XP-style progress visuals and animated feedback loops; Dockerised and shipped on Railway.",
    ],
    gradient: "bg-gradient-to-br from-emerald-700/90 via-teal-800/80 to-slate-900/90",
    repo: "https://github.com/guth01/TaskForge",
  },
  {
    id: "eventsorg-mcp",
    title: "EventsOrg MCP — AI Event Management System",
    period: "March 2026",
    summary:
      "MCP server toolkit that lets language models run live event operations through 20+ callable tools.",
    tags: ["TypeScript", "Node.js", "SQLite", "MCP SDK", "Twilio"],
    highlights: [
      "Runs over stdio for Claude Desktop or HTTP/SSE for remote clients — same tool surface either way.",
      "Feeds the agent live Sheets data, walking directions, and weather alerts alongside Twilio SMS.",
      "Handles volunteer swaps, vendor cancellations, and status sync without manual intervention.",
    ],
    gradient: "bg-gradient-to-br from-amber-700/90 via-orange-900/80 to-slate-950/90",
    repo: "https://github.com/guth01/EventsOrg-MCP",
  },
  {
    id: "deskguardian",
    title: "DeskGuardian — Desktop Wellness Monitor",
    period: "Jan 2026",
    summary:
      "PyQt5 desktop app that watches posture through a webcam, estimates burnout risk with ML, and nudges you with live alerts and trend charts.",
    tags: ["Python", "PyQt5", "OpenCV", "MediaPipe", "scikit-learn", "SQLite", "Matplotlib", "PyInstaller"],
    highlights: [
      "Classifies sitting posture in real time using ISO 11226 angle thresholds from webcam pose landmarks.",
      "Logistic regression model scores burnout likelihood from screen time, posture habits, and break frequency.",
      "PBKDF2-secured multi-user auth, six-table SQLite schema, five-tab analytics dashboard, and a bundled Windows .exe.",
    ],
    gradient: "bg-gradient-to-br from-sky-700/90 via-cyan-900/80 to-slate-950/90",
    repo: "https://github.com/guth01/DeskGuardian",
  },
  {
    id: "basketball-cv",
    title: "Basketball Analytics — Computer Vision",
    period: "Dec 2025",
    summary:
      "Video analytics stack that tracks players, classifies teams by jersey, and scores shots automatically.",
    tags: ["YOLOv5", "ByteTrack", "FashionCLIP", "RF-DETR"],
    highlights: [
      "YOLOv5 plus ByteTrack for detection and tracking; FashionCLIP separates teams; RF-DETR flags makes and misses.",
      "Derives possession, pass counts, steals, jersey numbers, and speed overlays burned into output footage.",
    ],
    gradient: "bg-gradient-to-br from-violet-600/90 via-portfolio-primary/80 to-fuchsia-900/90",
    repo: "https://github.com/guth01/Basketball-Analysis-CV/tree/test-branch",
  },
];

const experience = [
  {
    company: "Retailcloud",
    role: "Software Engineering Intern",
    period: "Jun 2026 — Jul 2026",
    highlights: [
      "Rotated through Angular frontends, Spring Boot services, Kotlin Android apps, QA, and DevOps — shipping features and automation scripts with production-grade tooling.",
      "Delivered apps spanning REST APIs with JWT auth, reactive forms, MVVM on mobile, Dockerised deployments, and Ansible playbooks.",
    ],
  },
];

const certifications: {
  title: string;
  issuer: string;
  date: string;
  url?: string;
}[] = [
  {
    title: "AWS Cloud Quest: Cloud Practitioner Training",
    issuer: "AWS Skill Builder",
    date: "Jun 2026",
    url: "https://www.credly.com/badges/32c109a2-fd8c-43af-b70d-db49b1f36892/public_url",
  },
  {
    title: "McKinsey Forward Learner's Program",
    issuer: "McKinsey & Company",
    date: "Jun 2026",
  },
  {
    title: "GEN AI Using IBM WatsonX",
    issuer: "IBM",
    date: "Jun 2025",
    url: "https://courses.vit.skillsnetwork.site/certificates/93a8e757f0e44b0a840db7777350a668",
  },
  {
    title: "Fundamentals of Deep Learning",
    issuer: "NVIDIA",
    date: "Sep 2024",
    url: "https://learn.nvidia.com/certificates?id=aQ6dtfbySq2g3BSbsANDbg",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI · Stanford University",
    date: "Jul 2024",
    url: "https://www.coursera.org/account/accomplishments/specialization/QPUPWCKHTAHJ",
  },
];

const extracurriculars: {
  icon: LucideIcon;
  title: string;
  detail: string;
}[] = [
  {
    icon: Code2,
    title: "350+ problems on LeetCode",
    detail:
      "Regular competitive programming practice — building fluency with patterns, data structures, and timed problem-solving.",
  },
  {
    icon: Wrench,
    title: "Senior Core — CodeChef VIT Student Chapter",
    detail:
      "Built responsive UIs and a Chrome extension that extended the campus portal. Also prototyped Arduino hardware and helped run Clueminati during Gravitas.",
  },
  {
    icon: Trophy,
    title: "1st Place — ACM Code2Create Hackathon 2025",
    detail:
      "Won first place with Awaaz — a VR rehearsal coach where AI NPCs critique your presentation in real time. Stack: React, Node, Unity OpenXR, Supabase, OpenAI, and ElevenLabs.",
  },
  {
    icon: GraduationCap,
    title: "Merit Rank Holder — CSE (VIT Vellore)",
    detail:
      "Named on the merit list for academic performance in the B.Tech Computer Science programme at VIT Vellore.",
  },
  {
    icon: Award,
    title: "Volunteer — Gravitas'24",
    detail: "Handled registration desks and guest reception during Gravitas'24, VIT's annual technology festival.",
  },
  {
    icon: Plane,
    title: "RoboFest 2018 — Bottle Sumo (Michigan, USA)",
    detail: "Represented at Lawrence Tech University in the Bottle Sumo robotics challenge.",
  },
];

const skillBlocks = [
  { title: "Languages", items: ["Python", "C", "C++", "Java", "SQL", "HTML", "CSS", "JavaScript"] },
  {
    title: "AI / ML",
    items: [
      "Exploratory Data Analysis",
      "Scikit-Learn",
      "Transformers",
      "Fine-tuning LLMs",
      "LangChain",
      "RAG",
      "LangGraph",
      "MCPs",
    ],
  },
  {
    title: "Web",
    items: ["React", "Node.js", "FastAPI", "Express.js", "Streamlit", "Angular", "Spring Boot"],
  },
  { title: "Tools", items: ["Git", "GitHub", "Jupyter Notebook", "Conda", "Postman", "Docker"] },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

export default function Index() {
  const [introDone, setIntroDone] = useState(false);
  const onIntroComplete = useCallback(() => setIntroDone(true), []);

  useEffect(() => {
    if (!introDone) return;
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [introDone]);

  return (
    <div className="noise-overlay min-h-screen bg-portfolio-bg">
      <IntroTransition onComplete={onIntroComplete} />
      <Header introComplete={introDone} />

      <main className="pb-32 pl-14 pr-4 pt-36 sm:pl-16 lg:ml-20 lg:pl-4 lg:pr-6">
        {/* Hero */}
        <motion.section
          id="home"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto mb-24 max-w-6xl scroll-mt-28 px-2 lg:px-4"
        >
          <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-portfolio-primary/15 blur-[100px]" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-violet-600/10 blur-[90px]" />

          <div className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: introDone ? 0 : 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 border border-portfolio-primary/40 bg-portfolio-primary/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-portfolio-primary"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-portfolio-primary shadow-[0_0_12px_#C778DD]" />
                Open to collaborations
              </motion.div>

              <RotatingTypewriter />

              <p className="max-w-2xl text-lg leading-relaxed text-portfolio-gray sm:text-xl">
                Building smart, efficient, and scalable software. I love bridging the gap between complex algorithms
                and elegant, real-world solutions, driven by a constant curiosity to learn, adapt, and build.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/Resume-Gautham.pdf"
                  download="Gautham_Praveen_Resume.pdf"
                  className="inline-flex items-center gap-2 border border-portfolio-gray/50 bg-[#2b3039]/50 px-5 py-3 font-mono text-sm font-medium text-white transition hover:border-portfolio-primary hover:text-portfolio-primary"
                >
                  Download résumé
                </a>
                <a
                  href="#contacts"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" });
                    window.history.replaceState(null, "", "#contacts");
                  }}
                  className="group relative inline-flex items-center justify-center overflow-hidden border-2 border-portfolio-primary bg-portfolio-primary/15 px-6 py-3 font-mono text-sm font-semibold text-white shadow-[0_0_32px_rgba(199,120,221,0.2)] transition hover:bg-portfolio-primary/25"
                >
                  <span className="relative z-10">Let&apos;s build something</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition group-hover:translate-x-full duration-700" />
                </a>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                    window.history.replaceState(null, "", "#projects");
                  }}
                  className="inline-flex items-center border border-portfolio-gray/40 px-6 py-3 font-mono text-sm font-medium text-white transition hover:border-portfolio-primary hover:text-portfolio-primary"
                >
                  View selected work
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
              className="relative flex min-h-[320px] justify-center lg:min-h-[420px]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-md overflow-hidden border-2 border-portfolio-primary/30 shadow-[0_0_60px_rgba(199,120,221,0.15)]">
                  <motion.img
                    src="/pic1.jpeg"
                    alt="Gautham Praveen"
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-portfolio-bg/80 via-transparent to-transparent" />
                </div>
              </div>
              <div className="absolute -right-4 top-4 hidden sm:block">
                <DotsPattern cols={5} rows={5} gap={20} className="opacity-40" />
              </div>
              <div className="absolute -bottom-8 left-0 hidden sm:block">
                <LogoOutline size={120} />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Quote */}
        <motion.section
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="mx-auto my-24 max-w-2xl px-2 lg:px-4"
        >
          <div className="border border-portfolio-primary/25 bg-gradient-to-br from-portfolio-primary/5 to-transparent p-8 shadow-[0_0_40px_rgba(199,120,221,0.08)]">
            <blockquote className="text-xl font-semibold leading-snug text-white sm:text-2xl">
            "Move fast and break things. Unless you are breaking things, you are not moving fast enough."
            </blockquote>
            <div className="mt-4 text-right text-sm text-portfolio-gray"> — Mark Zuckerberg</div>
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section
          id="projects"
          {...fadeUp}
          className="relative mx-auto mb-28 max-w-6xl scroll-mt-28 px-2 lg:px-4"
        >
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-portfolio-primary">#</span>
              <span className="text-white">projects</span>
            </h2>
            <p className="max-w-md font-mono text-sm text-portfolio-gray">
              AI agents, full-stack apps, desktop tools, and computer vision — a sample of what I ship.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                className="group flex flex-col overflow-hidden border border-portfolio-gray/25 bg-[#2b3039]/40 transition hover:border-portfolio-primary/60 hover:shadow-[0_12px_40px_rgba(199,120,221,0.12)]"
              >
                <div className={cn("relative min-h-[10rem] overflow-hidden p-6", project.gradient)}>
                  <p className="font-mono text-xs uppercase tracking-widest text-white/75">{project.period}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-white drop-shadow-md">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/85">{project.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2 border-b border-portfolio-gray/20 p-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs text-portfolio-gray">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <ul className="list-inside list-disc space-y-2 text-sm text-portfolio-gray marker:text-portfolio-primary">
                    {project.highlights.map((line, idx) => (
                      <li key={idx} className="pl-1">
                        {line}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex w-fit items-center gap-2 border border-portfolio-primary px-4 py-2 font-mono text-xs font-semibold text-white transition hover:bg-portfolio-primary/15"
                  >
                    <Github className="h-3.5 w-3.5" />
                    Repository
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* About */}
        <motion.section
          id="about-me"
          {...fadeUp}
          className="relative mx-auto mb-28 max-w-6xl scroll-mt-28 px-2 lg:px-4"
        >
          <div className="mb-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-portfolio-primary">#</span>
              <span className="text-white">about-me</span>
            </h2>
            <p className="mt-2 font-mono text-sm text-portfolio-gray">Background, mindset, and what I build for.</p>
          </div>

          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-xl font-semibold text-white sm:text-2xl">Hello, I&apos;m Gautham.</p>
              <p className="text-base leading-relaxed text-portfolio-gray sm:text-lg">
                Originally from <span className="text-white">Calicut, Kerala</span>, I am a 3rd-year Computer Science
                student at <span className="text-white">VIT Vellore</span> specializing in AI and Machine Learning.
                While I pride myself on remaining consistent academically, my true focus is turning theoretical
                concepts into robust, high-performance applications.
              </p>
              <p className="leading-relaxed text-portfolio-gray">
                I thrive at the intersection of different technical fields, developing everything from real-time
                computer vision pipelines and LLM-driven tools to the seamless full-stack web environments that support
                them.
              </p>
              <p className="leading-relaxed text-portfolio-gray">
                For me, it isn&apos;t just about writing code that functions—it is about engineering it beautifully.
                By prioritizing streamlined data processing and clean architecture, my ultimate objective is to deliver
                platforms that are highly optimized and future-proof.
              </p>
            </div>

            <div className="relative flex justify-center lg:mt-0">
              <div className="absolute left-6 top-0 hidden sm:block">
                <DotsPattern cols={5} rows={5} gap={20} className="opacity-40" />
              </div>
              <div className="absolute bottom-8 right-4 hidden sm:block">
                <DotsPattern cols={5} rows={4} gap={20} className="opacity-40" />
              </div>
              <motion.img
                src="/pic-2.jpeg"
                alt="Gautham Praveen"
                className="relative z-10 w-[85%] max-w-md border-b-2 border-portfolio-primary shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              />
            </div>
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section
          id="experience"
          {...fadeUp}
          className="relative mx-auto mb-28 max-w-6xl scroll-mt-28 px-2 lg:px-4"
        >
          <div className="mb-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-portfolio-primary">#</span>
              <span className="text-white">experience</span>
            </h2>
            <p className="mt-2 font-mono text-sm text-portfolio-gray">
              Industry internships and hands-on engineering across the stack.
            </p>
          </div>

          <div className="space-y-6">
            {experience.map((item, i) => (
              <motion.article
                key={item.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="border border-portfolio-gray/25 bg-[#2b3039]/30 p-6 transition hover:border-portfolio-primary/50 hover:bg-[#2b3039]/50"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-portfolio-primary/40 bg-portfolio-primary/10 text-portfolio-primary">
                      <Briefcase className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.company}</h3>
                      <p className="mt-1 text-sm text-portfolio-primary">{item.role}</p>
                    </div>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-widest text-portfolio-gray sm:pt-1">{item.period}</p>
                </div>
                <ul className="mt-5 list-inside list-disc space-y-2 pl-16 text-sm leading-relaxed text-portfolio-gray marker:text-portfolio-primary">
                  {item.highlights.map((line, idx) => (
                    <li key={idx} className="pl-1">
                      {line}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Extracurriculars */}
        <motion.section
          id="extracurriculars"
          {...fadeUp}
          className="relative mx-auto mb-28 max-w-6xl scroll-mt-28 px-2 lg:px-4"
        >
          <div className="mb-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-portfolio-primary">#</span>
              <span className="text-white">extracurriculars</span>
            </h2>
            <p className="mt-2 font-mono text-sm text-portfolio-gray">
              LeetCode, chapter leadership, academics, hackathons, and community work.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {extracurriculars.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className={cn(
                  "flex gap-5 border p-6 transition",
                  "border-portfolio-gray/25 bg-[#2b3039]/30 hover:border-portfolio-primary/50 hover:bg-[#2b3039]/50"
                )}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-portfolio-primary/40 bg-portfolio-primary/10 text-portfolio-primary">
                  <item.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-portfolio-gray">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section
          id="certifications"
          {...fadeUp}
          className="relative mx-auto mb-28 max-w-6xl scroll-mt-28 px-2 lg:px-4"
        >
          <div className="mb-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-portfolio-primary">#</span>
              <span className="text-white">certifications</span>
            </h2>
            <p className="mt-2 font-mono text-sm text-portfolio-gray">
              Cloud, consulting, generative AI, and machine learning credentials.
            </p>
          </div>

          <div className="space-y-3">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex flex-col gap-2 border border-portfolio-gray/25 bg-[#2b3039]/30 px-5 py-4 transition hover:border-portfolio-primary/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <Award className="mt-0.5 h-5 w-5 shrink-0 text-portfolio-primary" strokeWidth={1.75} />
                  <div>
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 font-semibold text-white transition hover:text-portfolio-primary"
                      >
                        {cert.title}
                        <ExternalLink className="h-3.5 w-3.5 opacity-60 transition group-hover:opacity-100" />
                      </a>
                    ) : (
                      <p className="font-semibold text-white">{cert.title}</p>
                    )}
                    <p className="mt-0.5 text-sm text-portfolio-gray">{cert.issuer}</p>
                  </div>
                </div>
                <p className="pl-8 font-mono text-xs uppercase tracking-widest text-portfolio-gray sm:pl-0">
                  {cert.date}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          id="skills"
          {...fadeUp}
          className="relative mx-auto mb-28 max-w-6xl scroll-mt-28 px-2 lg:px-4"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-portfolio-primary">#</span>
              <span className="text-white">skills</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillBlocks.map((block) => (
              <div
                key={block.title}
                className="border border-portfolio-gray/25 transition hover:border-portfolio-primary/50"
              >
                <div className="border-b border-portfolio-gray/25 px-3 py-2">
                  <h3 className="font-mono text-sm font-semibold text-white">{block.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 px-3 py-4">
                  {block.items.map((tag) => (
                    <span key={tag} className="font-mono text-xs text-portfolio-gray">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contacts */}
        <motion.section
          id="contacts"
          {...fadeUp}
          className="relative mx-auto max-w-6xl scroll-mt-28 px-2 lg:px-4"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-portfolio-primary">#</span>
              <span className="text-white">contacts</span>
            </h2>
            <p className="mt-2 font-mono text-sm text-portfolio-gray">
              Send a message — I read everything. Or reach me directly below.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <p className="leading-relaxed text-portfolio-gray">
                Open to internships, collaborations, and interesting problems at the intersection of full-stack
                engineering and AI/ML.
              </p>
              <div className="space-y-3">
                <h3 className="font-semibold text-white">Direct</h3>
                <ul className="space-y-2 font-mono text-sm">
                  <li>
                    <a
                      href="mailto:gauthampraveen76@gmail.com"
                      className="text-portfolio-gray transition hover:text-portfolio-primary"
                    >
                      gauthampraveen76@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+919400722621" className="text-portfolio-gray transition hover:text-portfolio-primary">
                      +91 9400722621
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/guth01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-gray transition hover:text-portfolio-primary"
                    >
                      github.com/guth01
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/gautham-praveen-63109328b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-gray transition hover:text-portfolio-primary"
                    >
                      LinkedIn profile
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border border-portfolio-gray/25 bg-[#2b3039]/25 p-6 lg:col-span-7">
              <h3 className="mb-6 font-semibold text-white">Contact form</h3>
              <ContactForm />
            </div>
          </div>
        </motion.section>
      </main>

      <div className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-8 pl-2 sm:flex">
        <div className="h-40 w-px bg-gradient-to-b from-transparent via-portfolio-primary/40 to-transparent" />
        <div className="flex flex-col items-center gap-6">
          <a
            href="https://github.com/guth01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ABB2BF] transition hover:scale-110 hover:text-portfolio-primary"
          >
            <Github size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/gautham-praveen-63109328b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ABB2BF] transition hover:scale-110 hover:text-portfolio-primary"
          >
            <Linkedin size={28} />
          </a>
          <a
            href="https://leetcode.com/gauth_am"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ABB2BF] transition hover:scale-110 hover:text-portfolio-primary"
          >
            <Code size={28} />
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
