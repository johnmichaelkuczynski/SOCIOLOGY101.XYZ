// All 28 course topics as one plain vertical list — no unit/week markers,
// small but readable, meant to sit at the top-left of a page.
const TOPICS = [
  "The sociological imagination: private troubles and public issues",
  "Seeing the social: how structure shapes everyday choices",
  "The founding thinkers: Marx, Durkheim, and Weber",
  "Three lenses: functionalism, conflict, and interactionism",
  "Doing sociology: research questions and evidence",
  "Methods: surveys, interviews, ethnography, and experiments",
  "Reading data critically: correlation, cause, and bias",
  "Culture: symbols, language, values, and norms",
  "Subcultures, countercultures, and cultural change",
  "Socialization: becoming a member of society",
  "Agents of socialization: family, school, peers, and media",
  "Roles, status, and the self in social life",
  "Groups, networks, and organizations",
  "Bureaucracy and the rationalization of modern life",
  "Deviance: how societies define and respond to rule-breaking",
  "Social control, labeling, and the making of crime",
  "Social stratification: class and inequality",
  "Life chances, mobility, and the reproduction of advantage",
  "Race and ethnicity as social constructions",
  "Gender, sexuality, and the social order",
  "Intersecting inequalities in everyday institutions",
  "Family: a changing social institution",
  "Education and the sorting of opportunity",
  "Religion, meaning, and social solidarity",
  "Economy, work, and the changing labor market",
  "Population, cities, and the environment",
  "Social movements and collective action",
  "Global change: where the sociological perspective leads next",
];

export function TopicList() {
  return (
    <nav aria-label="Course topics" data-testid="topic-list" className="max-w-xs">
      <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        Course Topics
      </h2>
      <ul className="flex flex-col gap-1">
        {TOPICS.map((t) => (
          <li key={t} className="text-xs leading-snug text-foreground/80">
            {t}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function DownloadCourseButtons() {
  return (
    <div className="flex items-center gap-2 mt-4" data-testid="download-course">
      <span className="text-xs text-muted-foreground">Download the course:</span>
      <a
        href="/api/course/download?format=pdf"
        className="text-xs font-medium px-2.5 py-1 rounded border border-border hover:bg-secondary transition-colors"
        data-testid="button-download-pdf"
      >
        PDF
      </a>
      <a
        href="/api/course/download?format=txt"
        className="text-xs font-medium px-2.5 py-1 rounded border border-border hover:bg-secondary transition-colors"
        data-testid="button-download-txt"
      >
        TXT
      </a>
    </div>
  );
}
