import {
  BarChart3,
  BookOpen,
  MessagesSquare,
  Target,
  ClipboardCheck,
  ShieldCheck,
  Search,
} from "lucide-react";

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

const topics = [
  { n: "1.1", title: "The sociological imagination: private troubles and public issues" },
  { n: "1.2", title: "Seeing the social: how structure shapes everyday choices" },
  { n: "1.3", title: "The founding thinkers: Marx, Durkheim, and Weber" },
  { n: "1.4", title: "Three lenses: functionalism, conflict, and interactionism" },
  { n: "1.5", title: "Doing sociology: research questions and evidence" },
  { n: "1.6", title: "Methods: surveys, interviews, ethnography, and experiments" },
  { n: "1.7", title: "Reading data critically: correlation, cause, and bias" },
  { n: "2.1", title: "Culture: symbols, language, values, and norms" },
  { n: "2.2", title: "Subcultures, countercultures, and cultural change" },
  { n: "2.3", title: "Socialization: becoming a member of society" },
  { n: "2.4", title: "Agents of socialization: family, school, peers, and media" },
  { n: "2.5", title: "Roles, status, and the self in social life" },
  { n: "2.6", title: "Groups, networks, and organizations" },
  { n: "2.7", title: "Bureaucracy and the rationalization of modern life" },
  { n: "3.1", title: "Deviance: how societies define and respond to rule-breaking" },
  { n: "3.2", title: "Social control, labeling, and the making of crime" },
  { n: "3.3", title: "Social stratification: class and inequality" },
  { n: "3.4", title: "Life chances, mobility, and the reproduction of advantage" },
  { n: "3.5", title: "Race and ethnicity as social constructions" },
  { n: "3.6", title: "Gender, sexuality, and the social order" },
  { n: "3.7", title: "Intersecting inequalities in everyday institutions" },
  { n: "4.1", title: "Family: a changing social institution" },
  { n: "4.2", title: "Education and the sorting of opportunity" },
  { n: "4.3", title: "Religion, meaning, and social solidarity" },
  { n: "4.4", title: "Economy, work, and the changing labor market" },
  { n: "4.5", title: "Population, cities, and the environment" },
  { n: "4.6", title: "Social movements and collective action" },
  { n: "4.7", title: "Global change: where the sociological perspective leads next" },
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
        <div className="flex items-center gap-2">
          <a href="/api/auth/google">
            <button
              className="px-4 py-2 rounded-md text-sm font-medium border border-border hover:bg-secondary transition-colors"
              data-testid="button-sign-in"
            >
              Sign in with Google
            </button>
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
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
            <a href="/api/auth/google">
              <button
                className="px-6 py-3 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                data-testid="button-cta-start"
              >
                Sign in with Google to start
              </button>
            </a>
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

        <section className="max-w-4xl mx-auto px-6 pb-24">
          <h2 className="text-center font-serif font-semibold text-xl mb-6">
            The Curriculum
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topics.map((t) => (
              <div
                key={t.n}
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-5"
              >
                <div className="w-10 h-10 shrink-0 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold text-sm">
                  {t.n}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Topic {t.n}
                  </div>
                  <div className="font-medium">{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
        Sociology 101 — where the curriculum, the tutor, the grader, and the
        integrity check all live in one room.
      </footer>
    </div>
  );
}
