import {
  BarChart3,
  BookOpen,
  MessagesSquare,
  Target,
  ClipboardCheck,
  ShieldCheck,
  Search,
} from "lucide-react";
import { Link } from "wouter";
import { TopicList, DownloadCourseButtons } from "@/components/TopicList";

const features = [
  {
    icon: BookOpen,
    title: "Three-Depth Lessons",
    body: "Read any topic Short, Medium, or Long — same ideas, your pace.",
  },
  {
    icon: MessagesSquare,
    title: "Section-Scoped Tutor",
    body: "Ask about the exact passage you're on and get a live, grounded answer.",
  },
  {
    icon: Target,
    title: "Adaptive Practice",
    body: "Questions that get harder on a streak and ease off after a miss.",
  },
  {
    icon: ClipboardCheck,
    title: "AI-Graded Work",
    body: "Homework, a unit test, and a final — each with written feedback.",
  },
  {
    icon: ShieldCheck,
    title: "Built-In Integrity",
    body: "Every submission is screened for AI authorship, with a clear verdict.",
  },
  {
    icon: BarChart3,
    title: "Four Weeks, 28 Topics",
    body: "From the sociological imagination through culture, structure, and social change.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
            <Search className="w-4 h-4" />
          </div>
          <span className="font-serif font-semibold text-lg tracking-tight">
            Sociology 101
          </span>
        </div>
        <Link href="/dashboard">
          <button
            className="px-4 py-2 rounded-md text-sm font-medium border border-border hover:bg-secondary transition-colors"
            data-testid="button-open-course"
          >
            Open course
          </button>
        </Link>
      </header>

      <main className="flex-1">
        <div className="px-6 pt-6 flex flex-col md:flex-row md:items-start gap-8">
          <aside className="shrink-0">
            <TopicList />
            <DownloadCourseButtons />
          </aside>
          <div className="flex-1 min-w-0">
        <section className="max-w-4xl mx-auto px-6 pt-14 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-6">
            <BarChart3 className="w-3.5 h-3.5" />
            A complete, four-week introduction to the sociological perspective
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary leading-tight mb-5">
            See the world sociologically — from private troubles to public issues.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            A self-paced course that teaches, tutors, drills, and grades you — the
            sociological perspective built carefully from first principles, for
            undergraduates, graduate students, researchers, and faculty entering the
            discipline.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/dashboard">
              <button
                className="px-6 py-3 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                data-testid="button-cta-start"
              >
                Start the course
              </button>
            </Link>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-border bg-card p-6 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center text-primary">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-semibold text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

          </div>
        </div>
      </main>

      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
        Sociology 101 — where the curriculum, the tutor, the grader, and the
        integrity check all live in one room.
      </footer>
    </div>
  );
}
