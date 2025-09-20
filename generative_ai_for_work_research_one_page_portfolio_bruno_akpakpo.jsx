import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Brain, Calendar, CheckCircle2, ExternalLink, FileText, GraduationCap, LayoutGrid, LineChart, Link as LinkIcon, Moon, Sun, Zap } from "lucide-react";

/**
 * One‑page portfolio for the "Generative AI for Work & Research" course.
 * Built for: Dr Bruno Akpakpo (MD, MPH)
 * Note: Per request, NO email address is displayed on this page.
 * TailwindCSS is available by default in this environment.
 */

const modules = [
  {
    id: 1,
    title: "Websites, Documents & Presentations",
    blurb:
      "Learn how LLMs work and use them to generate structured outputs (Markdown, LaTeX, HTML), build simple research sites, and design clear scientific presentations.",
  },
  {
    id: 2,
    title: "AI‑Automated Data Analysis",
    blurb:
      "Use AI tools (e.g., Code Interpreter) for quick analysis, dashboards, file processing, and automated reports & visualizations.",
  },
  {
    id: 3,
    title: "GenAI for Research & Text Analysis",
    blurb:
      "Literature reviews with AI, text classification, sentiment analysis, knowledge maps, summarization and information synthesis.",
  },
  {
    id: 4,
    title: "Custom GPTs and Chatbots",
    blurb:
      "Build focused assistants and RAG systems, integrate knowledge bases, and design helpful research chatbots.",
  },
  {
    id: 5,
    title: "AI for Task Automation",
    blurb:
      "Automation strategies and agents for recurring workflows including browser control and response automations.",
  },
  {
    id: 6,
    title: "GenAI for Communication & Outreach",
    blurb:
      "AI‑assisted research dissemination: figures, diagrams, video abstracts, visualization prompts, and content scheduling.",
  },
  {
    id: 7,
    title: "Capstone Project & Showcase",
    blurb:
      "Project coaching, peer feedback, final presentation and public Q&A.",
  },
  {
    id: 8,
    title: "Assessment & Reflection",
    blurb:
      "Wrap‑up, reflections, and polish for the portfolio of weekly submissions.",
  },
];

const features = [
  { icon: <Calendar className="h-5 w-5" />, text: "8‑week live cohort" },
  { icon: <Zap className="h-5 w-5" />, text: "No‑code AI tools for automation" },
  { icon: <CheckCircle2 className="h-5 w-5" />, text: "Weekly workshops + help sessions" },
  { icon: <LayoutGrid className="h-5 w-5" />, text: "Private community & feedback" },
  { icon: <GraduationCap className="h-5 w-5" />, text: "Capstone coaching & certificate" },
  { icon: <BookOpen className="h-5 w-5" />, text: "Lifetime access to tutorials" },
];

const grading = [
  { label: "Online quizzes", weight: 15 },
  { label: "Workshop assignments", weight: 35 },
  { label: "Attendance & participation", weight: 10 },
  { label: "Final project", weight: 40 },
];

const weeks = modules.map((m, i) => ({
  week: i + 1,
  title: m.title,
  status: "Pending link",
  href: "#", // Replace later with actual links to weekly submissions.
}));

function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("theme") || "light" : "light"
  );
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);
  return { theme, setTheme };
}

function NavLink({ href, children, active }) {
  return (
    <a
      href={href}
      className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
        active
          ? "bg-black/10 dark:bg-white/10 text-black dark:text-white"
          : "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
      }`}
    >
      {children}
    </a>
  );
}

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState("about");

  const sections = useMemo(
    () => [
      { id: "about", label: "About me" },
      { id: "course", label: "About the course" },
      { id: "submissions", label: "Weekly submissions" },
    ],
    []
  );

  // Intersection Observer to highlight current section in the navbar
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      {/* Header / Hero */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500" />
              <div>
                <p className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400">Portfolio</p>
                <h1 className="text-lg font-semibold leading-none">Dr Bruno Akpakpo</h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-1 rounded-2xl bg-slate-100/70 dark:bg-slate-800/70 p-1">
              {sections.map((s) => (
                <NavLink key={s.id} href={`#${s.id}`} active={active === s.id}>
                  {s.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button
                aria-label="Toggle theme"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"} mode</span>
              </button>
            </div>
          </div>
        </div>
        <div className="border-b border-slate-200 dark:border-slate-800" />
      </header>

      {/* Hero banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(99,102,241,0.15),rgba(0,0,0,0))]" />
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-3 py-1 text-xs font-medium">
                <Brain className="h-4 w-4" />
                Generative AI for Work & Research — Portfolio
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Building practical, ethical AI workflows for public health impact
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300 md:text-lg">
                A curated record of learning and deliverables from an 8‑week live cohort on no‑code AI tools, data analysis, automation, and research communication.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Program M&E",
                  "Epidemiology",
                  "Surveillance",
                  "R, Stata, SPSS",
                  "Health Systems",
                  "AI Automation",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-6 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 text-indigo-600 dark:text-indigo-400">{f.icon}</div>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{f.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-xl bg-slate-50 dark:bg-slate-800 p-4">
                  <p className="text-xs text-slate-500">Grading rubric</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {grading.map((g) => (
                      <li key={g.label} className="flex items-center justify-between">
                        <span>{g.label}</span>
                        <span className="font-semibold">{g.weight}%</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-slate-500">Passing grade: 80%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About me */}
      <section id="about" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <div className="md:col-span-1">
              <h3 className="text-2xl md:text-3xl font-bold">About me</h3>
              <p className="mt-2 text-slate-500">MD, MPH • Geneva, Switzerland</p>
            </div>
            <div className="md:col-span-2 space-y-4">
              <p>
                I am a Public Health & Monitoring/Evaluation specialist with extensive experience in HIV, TB and malaria programs, health systems strengthening, and community health. I currently support results‑driven RSSH investments across multiple African portfolios at the Global Fund.
              </p>
              <p>
                My background spans epidemiology and biostatistics, data quality audits, surveillance system evaluations, and quality assurance of national assessments. I’ve worked with ministries of health, NGOs, and academic partners to design strategic plans, mobilize resources, and translate data into action.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Card title="Core strengths" items={["Program M&E", "Epidemiology & Biostats", "Surveillance & HMIS", "Quality Assurance (HFA/QoC/DQR)"]} />
                <Card title="Tools & languages" items={["R, Stata, SPSS, EpiInfo", "French (native)", "English (fluent)"]} />
              </div>
              <p className="text-sm text-slate-500">
                Note: This site intentionally omits direct email to reduce spam. For professional inquiries, please reach out through standard professional channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About the course */}
      <section id="course" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="flex items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">About the course</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-3xl">
                An 8‑week, live cohort on no‑code AI tools for work and research. The curriculum covers practical GenAI for literature and text analysis, data workflows, automation, custom GPTs, and impactful research communication.
              </p>
            </div>
            <a
              href="https://thegraphcourses.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Visit course site <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {modules.map((m) => (
              <div
                key={m.id}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="text-lg font-semibold">
                  <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-300 font-bold">{m.id}</span>
                  {m.title}
                </h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{m.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly submissions */}
      <section id="submissions" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">My weekly submissions</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Placeholders for now — links will be added as each artefact is finalized.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {weeks.map((w) => (
              <article
                key={w.week}
                className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-500">Week {w.week}</p>
                    <h4 className="mt-1 text-lg font-semibold leading-snug">{w.title}</h4>
                  </div>
                  <div className="ml-4 mt-1">
                    <FileText className="h-5 w-5 text-indigo-500" />
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                  Submission link: <em>{w.status}</em>
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    disabled
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-2 text-sm text-slate-500"
                    title="Link coming soon"
                  >
                    <LinkIcon className="h-4 w-4" /> Add link later
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} Bruno Akpakpo — Generative AI for Work & Research. This page intentionally omits direct email to reduce spam.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Card({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-5">
      <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</h5>
      <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
