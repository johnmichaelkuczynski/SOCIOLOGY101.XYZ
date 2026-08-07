// ---------------------------------------------------------------------------
// Original content for the embedded diagnostic reasoning assessments.
//
// Two instruments, each offered at FOUR time-points (phases) so a student can
// gauge themselves before, during, and after the course:
//   - subject  — Sociology 101 subject-specific reasoning. Realistic short
//     cases about the course material (sociology); the best-supported
//     answer is keyed first.
//   - general  — General Reasoning. Genuine reasoning items spanning analysis,
//     inference, evaluation, deduction, and induction (NOT a "docility"/agree-
//     with-authority test).
//
// Each (instrument, phase) is offered in THREE selectable answer formats that
// share the same kind of questions:
//   - mcq     — pick the single best option.
//   - hybrid  — pick the best option AND (optionally) write a short note.
//   - written — no options shown; write a short answer in your own words.
//
// These diagnostics are UNGRADED practice: takeable anytime, unlimited times,
// and they never affect the course grade. Every time a test is started, fresh
// questions are generated (see reasoning.ts) so questions never repeat. The
// items below are the structural BLUEPRINT (style + fallback) for that
// generation, grounded per phase by GEN_SPECS.
//
// All items are ORIGINAL. For every item the correct option is written FIRST;
// at seed time options are rotated so the correct answer lands at a varied
// index (see seedDiagnostics.ts). `modelAnswer` is the ideal short written
// response used to grade the written/hybrid formats.
// ---------------------------------------------------------------------------

export type SkillArea =
  | "analysis"
  | "inference"
  | "evaluation"
  | "deduction"
  | "induction";

export type Instrument = "subject" | "general";

export type Phase = "before" | "third" | "twothirds" | "after";

export type DiagFormat = "mcq" | "hybrid" | "written";

// A single unified diagnostic item. The correct option is listed FIRST and is
// rotated to a random index at seed time. `modelAnswer` is the reference answer
// for grading the written/hybrid formats.
export type DiagItem = {
  prompt: string;
  options: string[];
  modelAnswer: string;
  skillArea?: SkillArea;
};

export type DiagnosticSeed = {
  instrument: Instrument;
  phase: Phase;
  format: DiagFormat;
  title: string;
  subtitle: string;
  instructions: string;
  items: DiagItem[];
};

// ===========================================================================
// Phase metadata
// ===========================================================================

export const PHASE_ORDER: Phase[] = ["before", "third", "twothirds", "after"];

export const PHASE_LABEL: Record<Phase, string> = {
  before: "Before the course",
  third: "One-third of the way through",
  twothirds: "Two-thirds of the way through",
  after: "After the course",
};

// ===========================================================================
// Per-(instrument, phase) generation specs
// Used by reasoning.ts to generate fresh, never-repeating questions grounded in
// the right scope for the chosen time-point. `topicFocus` describes WHAT to ask
// about; `level` nudges difficulty for the time-point.
// ===========================================================================

export type GenSpec = { topicFocus: string; level: string };

const SUBJECT_SPECS: Record<Phase, GenSpec> = {
  before: {
    level:
      "Intro level: answerable by a thoughtful newcomer reasoning carefully, BEFORE any lessons. Do not assume prior course knowledge or technical terms. Reward plain-language reasoning and common sense about how societies and social life work.",
    topicFocus:
      "What sociology is and how it differs from common sense: that the sociological imagination means seeing the general (social patterns and forces) in the particular (individual lives and troubles); that society itself can be studied scientifically as an object, rather than explained by individual choice or human nature alone; that behaviour reflects social context, structure, and group membership, not just personality; and that sociologists look for patterns across people and situations rather than treating each case as unique.",
  },
  third: {
    level:
      "Early course level: covers roughly Week 1 (the sociological perspective — the first seven topics). Plain language, short realistic social scenarios, no advanced theory jargon assumed.",
    topicFocus:
      "Week 1 topics — the sociological imagination (seeing the general in the particular, private troubles vs. public issues); sociology vs. common sense (society as an object of scientific study); the founders (Durkheim on social facts and solidarity, Marx on class conflict, Weber on rationalization and meaning); the three theoretical perspectives (functionalism, conflict theory, symbolic interactionism); doing sociology and the research process (question, hypothesis, evidence); research methods (surveys, experiments, fieldwork and what each is good for); and ethics and objectivity in social research (informed consent, bias, value neutrality).",
  },
  twothirds: {
    level:
      "Mid course level: covers roughly Weeks 1–2 (the first 14 topics). Realistic short social scenarios requiring a step of reasoning.",
    topicFocus:
      "Weeks 1–2 topics — everything from Week 1 PLUS what culture is (norms, values, symbols, folkways vs. mores); language, subcultures, and cultural diversity (cultural relativism vs. ethnocentrism); socialization (how we become social beings, nature vs. nurture); agents of socialization (family, school, media, peers); the social construction of the self (Cooley's looking-glass self, Mead's I and me); social interaction in everyday life (roles, status, Goffman's dramaturgy and impression management); and groups, organizations, and bureaucracy (primary vs. secondary groups, Weber's ideal bureaucracy and its dysfunctions).",
  },
  after: {
    level:
      "End-of-course level: covers the whole four-week course. Integrative social scenarios that apply more than one idea.",
    topicFocus:
      "The full four-week course — all of Weeks 1–2 PLUS Week 3 (social stratification and how societies rank people; social class in America and social mobility; global stratification of rich and poor nations; race and ethnicity as concepts and social realities; prejudice, discrimination, and racism; sex, gender, and gender inequality; deviance, crime, and social control) and Week 4 (family and marriage; education and religion as institutions; the economy and work; power, politics, and the state; population, urbanization, and the environment; collective behavior and social movements; and social change in the modern world).",
  },
};

const GENERAL_SPECS: Record<Phase, GenSpec> = {
  before: {
    level: "Everyday, accessible reasoning. One step of inference per item.",
    topicFocus:
      "General reasoning on everyday, neutral topics: identifying assumptions and conclusions, what evidence does and does not support, judging the strength of sources, valid vs. invalid deduction, and the strength of generalizations.",
  },
  third: {
    level: "Everyday reasoning, slightly more demanding than the baseline.",
    topicFocus:
      "General reasoning on everyday, neutral topics: assumptions/conclusions, supported inferences, source quality, deductive validity, and inductive strength.",
  },
  twothirds: {
    level: "Moderately demanding reasoning, sometimes two steps.",
    topicFocus:
      "General reasoning on everyday, neutral topics: assumptions/conclusions, supported inferences, source quality, deductive validity, and inductive strength.",
  },
  after: {
    level: "More demanding, multi-step reasoning where appropriate.",
    topicFocus:
      "General reasoning on everyday, neutral topics: assumptions/conclusions, supported inferences, source quality, deductive validity, and inductive strength.",
  },
};

export function genSpecFor(instrument: Instrument, phase: Phase): GenSpec {
  return instrument === "subject"
    ? SUBJECT_SPECS[phase]
    : GENERAL_SPECS[phase];
}

// ===========================================================================
// Format-specific instructions
// ===========================================================================

const FORMAT_LABEL: Record<DiagFormat, string> = {
  mcq: "Multiple Choice",
  hybrid: "Hybrid",
  written: "Written",
};

function instructionsFor(instrument: Instrument, format: DiagFormat): string {
  const subject =
    instrument === "subject"
      ? "Answer each question about sociology — these reward careful reasoning about realistic social scenarios, not memorized facts"
      : "Answer each reasoning question — these measure how you think, not what you recall";
  const body =
    format === "mcq"
      ? `${subject} by selecting the single best option.`
      : format === "hybrid"
        ? `${subject} by selecting the best option. You can add a quick note on your reasoning if you like — it's optional and a few words is plenty.`
        : `${subject}. No answer options are shown — just jot a brief answer in your own words. One or two sentences is plenty; there's no need to write a lot.`;
  return `${body} This is ungraded practice — take it anytime, as many times as you like; it never affects your course grade. Submitting shows your results with written feedback.`;
}

// ===========================================================================
// SUBJECT — Sociology 101 blueprint cases (best answer keyed FIRST)
// ===========================================================================

const SUBJECT_BEFORE: DiagItem[] = [
  {
    prompt:
      "A friend says, 'When someone loses their job, that's really just about them — their choices, their work ethic, their luck.' How would someone who thinks sociologically most likely respond?",
    options: [
      "Not entirely — when unemployment is widespread across a whole industry or era, it reflects social forces (the economy, labor markets, policy), not just individual choices; the sociological imagination connects private troubles to public issues",
      "That's right; joblessness is always a matter of personal responsibility and nothing more",
      "It depends — losing a job is social only for people in cities, not for everyone",
      "True, but only if the person had never held a job before",
    ],
    modelAnswer:
      "A sociologist would look beyond the individual to the social context: when many people in the same situation lose work, that pattern points to structural forces like economic downturns or labor-market shifts. The sociological imagination reframes a private trouble as a public issue.",
  },
  {
    prompt:
      "A commuter notices that almost everyone on a crowded elevator faces the doors, stands apart, and avoids eye contact. A friend says, 'That's just human nature.' A sociologist would more likely say:",
    options: [
      "This is a learned social pattern — an unwritten norm people follow in that setting; behavior this consistent across strangers reflects shared social rules, not fixed instinct",
      "It proves people are naturally afraid of one another in enclosed spaces",
      "It is random chance that happens to look orderly on this particular ride",
      "It shows the commuters must all know each other personally",
    ],
    modelAnswer:
      "The regularity of the behavior across unrelated strangers signals a shared, learned norm about how to act in that setting, not biological instinct. Sociology treats such patterned behavior as socially produced rather than natural.",
  },
  {
    prompt:
      "Why do sociologists study society scientifically instead of just relying on common sense about 'how people are'?",
    options: [
      "Because common-sense beliefs are often untested, contradictory, or shaped by our own group's viewpoint; systematic evidence lets sociologists check which claims about society actually hold up",
      "Because common sense is always wrong and science is always right",
      "Because sociologists are required to disagree with whatever ordinary people believe",
      "Because society cannot be observed at all without special equipment",
    ],
    modelAnswer:
      "Common-sense claims about society are frequently untested and colored by personal or cultural bias, and they often contradict one another. Treating society as an object of scientific study lets sociologists gather systematic evidence and see which claims survive scrutiny.",
  },
];

const SUBJECT_THIRD: DiagItem[] = [
  {
    prompt:
      "Durkheim found that suicide rates stayed remarkably stable year to year within a country, and differed consistently between countries, even though the specific people involved changed. A student concludes suicide must therefore be caused by each individual's private despair alone. What is the flaw in that conclusion?",
    options: [
      "It ignores what Durkheim showed — that stable, patterned rates across a whole society point to social facts (like integration and regulation) shaping the rate, beyond any one person's private reasons",
      "There is no flaw; suicide is purely psychological and has nothing to do with society",
      "The flaw is that Durkheim never actually collected any data on suicide",
      "The flaw is that suicide rates are random and cannot be studied at all",
    ],
    modelAnswer:
      "If rates are stable and vary systematically between societies, something social — Durkheim's 'social facts' such as levels of integration and regulation — must be shaping them. Explaining the pattern by individual despair alone misses the social forces the regularity reveals.",
    skillArea: "analysis",
  },
  {
    prompt:
      "A researcher wants to understand how gang members actually see loyalty and risk in daily life, in their own terms. Which research method fits this goal best, and why?",
    options: [
      "Fieldwork (participant observation) — spending extended time with the group lets the researcher observe meanings and interactions in their natural setting, which surveys and lab experiments can't capture",
      "A large mailed survey, because it reaches the most people quickly",
      "A controlled laboratory experiment, because it isolates a single cause",
      "Reading government crime statistics, because numbers are always the strongest evidence",
    ],
    modelAnswer:
      "To grasp insiders' own meanings and everyday interactions, fieldwork/participant observation is best: it captures context and interpretation that fixed-choice surveys or artificial lab experiments cannot. The question is about understanding meaning, which is fieldwork's strength.",
    skillArea: "inference",
  },
  {
    prompt:
      "Two analysts look at the same fact — schools teach punctuality, obedience, and shared knowledge. One says schools help society run smoothly by transmitting skills and norms; the other says schools mainly reproduce class advantage by rewarding the already-privileged. A student asks which analyst is 'using theory.' The best answer is:",
    options: [
      "Both are — the first applies a functionalist lens (institutions meet society's needs), the second a conflict lens (institutions serve the powerful); they interpret the same fact through different theoretical perspectives",
      "Only the second one, because conflict theory is the only real sociological theory",
      "Neither, because describing what schools do is just common sense, not theory",
      "Only the first one, because functionalism is the official view of sociology",
    ],
    modelAnswer:
      "Each analyst is applying a theoretical perspective: functionalism sees schools meeting shared needs, conflict theory sees them reproducing inequality. The same social fact looks different through each lens, which is exactly what a theoretical perspective does.",
    skillArea: "evaluation",
  },
];

const SUBJECT_TWOTHIRDS: DiagItem[] = [
  {
    prompt:
      "A traveler is disgusted that people in another country eat insects, calling it 'primitive.' A classmate says this reaction itself is worth examining sociologically. What concept best names the traveler's stance, and what is the sociological corrective?",
    options: [
      "It's ethnocentrism — judging another culture by one's own standards; the corrective is cultural relativism, understanding a practice within its own cultural context before judging it",
      "It's cultural relativism, and the corrective is to insist every culture is identical",
      "It's a subculture, and the corrective is to eat insects yourself",
      "It's a social fact, and there is no corrective because tastes are purely biological",
    ],
    modelAnswer:
      "Judging another culture by the standards of one's own is ethnocentrism. Sociologists counter it with cultural relativism: understanding a practice, like eating insects, within its own cultural context and meaning before evaluating it.",
    skillArea: "analysis",
  },
  {
    prompt:
      "A teenager who grew up praised at home for being 'the responsible one' behaves cautiously and takes on caretaker roles even among new friends. Using the idea of the looking-glass self, what is the best sociological reading?",
    options: [
      "The teen's self-image formed partly by imagining how others (family) see them and internalizing that reflection, then carrying it into new settings — the self is built through social interaction",
      "The teen was simply born cautious; family had nothing to do with it",
      "The behavior proves the teen has no real self at all, only random reactions",
      "The teen is faking caution to manipulate new friends and feels nothing inside",
    ],
    modelAnswer:
      "Cooley's looking-glass self holds that we form our self-concept by imagining how others perceive us and absorbing that image. The teen internalized the 'responsible one' reflection from family and now carries that socially built self into new relationships.",
    skillArea: "inference",
  },
  {
    prompt:
      "At a job interview, a candidate wears a suit, controls their tone, and highlights only their strengths. Applying Goffman's dramaturgy, how should we understand this?",
    options: [
      "It's impression management — the candidate is putting on a 'front stage' performance, managing the impression they give off, which is a normal and routine part of social interaction",
      "It's dishonesty that only con artists engage in; ordinary people never manage impressions",
      "It proves the candidate has multiple separate personalities",
      "It shows social interaction has no rules and is completely spontaneous",
    ],
    modelAnswer:
      "Goffman likens social life to theater: the candidate is giving a front-stage performance, managing the impression they present. Impression management is a routine feature of everyday interaction, not evidence of deceit.",
    skillArea: "evaluation",
  },
];

const SUBJECT_AFTER: DiagItem[] = [
  {
    prompt:
      "Two neighborhoods have identical average test scores, but children in the wealthier one are far more likely to end up in high-status careers. A commentator says schooling is therefore irrelevant to who gets ahead. Drawing on stratification and social mobility, what is the stronger analysis?",
    options: [
      "Schooling isn't irrelevant, but it operates within a stratified system — inherited advantages (networks, wealth, cultural capital) shape opportunities beyond test scores, so similar scores can still yield unequal mobility",
      "The commentator is right; where someone ends up is pure individual talent and nothing structural",
      "Test scores are the only thing that determines careers, so the difference must be a measurement error",
      "Neighborhoods have no effect on life chances of any kind",
    ],
    modelAnswer:
      "Equal test scores don't produce equal outcomes because stratification channels opportunity through resources beyond schooling — social networks, family wealth, and cultural capital. Mobility reflects structural advantage, not just individual achievement, so schooling matters but doesn't erase inherited inequality.",
    skillArea: "evaluation",
  },
  {
    prompt:
      "During a natural disaster, thousands of strangers suddenly coordinate to share supplies, form rescue crews, and enforce new informal rules — behavior no one planned in advance. Integrating collective behavior and norms, how is this best understood?",
    options: [
      "It's emergent collective behavior — in an unstructured situation people rapidly generate new norms and roles, showing that social order can arise from interaction, not only from established institutions",
      "It proves that without government people always descend into total chaos",
      "It shows the strangers must all secretly belong to the same organization",
      "It is meaningless coincidence with no sociological pattern behind it",
    ],
    modelAnswer:
      "Faced with an unstructured crisis, people improvise new norms and roles — classic emergent collective behavior. It illustrates that social order can be generated through interaction in the moment, not only handed down by standing institutions.",
    skillArea: "inference",
  },
  {
    prompt:
      "An official argues that because a country's laws treat all citizens equally, race and gender no longer shape people's life chances there. Combining ideas about institutional discrimination and inequality, what is the strongest sociological objection?",
    options: [
      "Formal legal equality doesn't guarantee equal outcomes — discrimination can persist through institutional practices, unequal starting resources, and everyday bias, so gaps by race and gender can remain even under equal laws",
      "The official is correct; once laws are equal, all social inequality automatically disappears",
      "The objection is that laws don't exist, so equality can't be measured",
      "Race and gender are purely biological and unaffected by any social arrangement",
    ],
    modelAnswer:
      "Equal laws address formal, not substantive, equality: discrimination can continue through institutional routines, unequal accumulated resources, and pervasive everyday bias. So persistent gaps by race and gender are fully compatible with equal treatment on paper, which is the sociologist's key objection.",
    skillArea: "evaluation",
  },
];

// ===========================================================================
// GENERAL — reasoning blueprint (analysis / inference / evaluation /
// deduction / induction). Shared across phases; difficulty is nudged per phase
// at generation time (see GEN_SPECS.level).
// ===========================================================================

const GENERAL_BLUEPRINT: DiagItem[] = [
  {
    prompt:
      "Consider: 'All students who studied passed the exam. Maria studied. So Maria passed.' Which unstated assumption does the argument rely on?",
    options: [
      "Maria is among the students the first statement describes.",
      "Studying is the only way to pass the exam.",
      "Maria always studies for her exams.",
      "The exam was unusually difficult.",
    ],
    modelAnswer:
      "It assumes Maria is one of the students covered by 'all students who studied' — that her studying puts her in the group described.",
    skillArea: "analysis",
  },
  {
    prompt:
      "A survey finds 70% of people who exercise daily report good sleep, versus 30% of those who never exercise. Which conclusion is best supported?",
    options: [
      "People who exercise daily are more likely to report good sleep than those who never exercise.",
      "Exercise guarantees good sleep for everyone.",
      "Poor sleep is what causes people to stop exercising.",
      "Anyone who wants good sleep must exercise daily.",
    ],
    modelAnswer:
      "Only that daily exercisers are more likely to report good sleep — an association, not a guarantee or a proven cause.",
    skillArea: "inference",
  },
  {
    prompt: "Which source would most strengthen the claim 'this medication is safe'?",
    options: [
      "A large, peer-reviewed clinical trial.",
      "A testimonial from one satisfied customer.",
      "An advertisement produced by the manufacturer.",
      "A popular wellness blog post.",
    ],
    modelAnswer:
      "A large, peer-reviewed clinical trial — independent, systematic evidence is far stronger than a testimonial, an ad, or a blog.",
    skillArea: "evaluation",
  },
  {
    prompt:
      "'If it rained, the streets are wet. The streets are not wet.' What necessarily follows?",
    options: [
      "It did not rain.",
      "It rained.",
      "The streets are dry for some other reason.",
      "Nothing at all follows.",
    ],
    modelAnswer:
      "It did not rain — if rain would have made the streets wet and they are not wet, then it cannot have rained.",
    skillArea: "deduction",
  },
  {
    prompt:
      "Plants given a new fertilizer grew taller than otherwise identical plants without it, all else held equal. The best-supported conclusion is:",
    options: [
      "The fertilizer probably caused the extra growth.",
      "Taller plants attract more fertilizer.",
      "Fertilizer is required for any plant growth at all.",
      "The result was pure coincidence.",
    ],
    modelAnswer:
      "Because everything else was held equal, the fertilizer probably caused the extra growth.",
    skillArea: "induction",
  },
  {
    prompt:
      "A report notes that ice-cream sales and drowning deaths rise in the same months. A careful reader should infer that:",
    options: [
      "Both may be linked to a third factor, such as hot weather.",
      "Eating ice cream causes drowning.",
      "Drowning incidents cause ice-cream sales.",
      "The data must simply be mistaken.",
    ],
    modelAnswer:
      "That both probably rise because of a shared third factor such as hot weather — correlation doesn't mean one causes the other.",
    skillArea: "inference",
  },
];

// ===========================================================================
// Seed expansion — each (instrument, phase) in all three formats
// ===========================================================================

type BaseContent = {
  instrument: Instrument;
  phase: Phase;
  baseTitle: string;
  items: DiagItem[];
};

const BASE_CONTENT: BaseContent[] = PHASE_ORDER.flatMap((phase) => {
  const subjectItems: Record<Phase, DiagItem[]> = {
    before: SUBJECT_BEFORE,
    third: SUBJECT_THIRD,
    twothirds: SUBJECT_TWOTHIRDS,
    after: SUBJECT_AFTER,
  };
  return [
    {
      instrument: "subject" as const,
      phase,
      baseTitle: `Sociology Check — ${PHASE_LABEL[phase]}`,
      items: subjectItems[phase],
    },
    {
      instrument: "general" as const,
      phase,
      baseTitle: `General Reasoning Check — ${PHASE_LABEL[phase]}`,
      items: GENERAL_BLUEPRINT,
    },
  ];
});

const FORMATS: DiagFormat[] = ["mcq", "hybrid", "written"];

export const DIAGNOSTIC_SEED: DiagnosticSeed[] = BASE_CONTENT.flatMap((base) =>
  FORMATS.map((format) => ({
    instrument: base.instrument,
    phase: base.phase,
    format,
    title: `${base.baseTitle} · ${FORMAT_LABEL[format]}`,
    subtitle: PHASE_LABEL[base.phase],
    instructions: instructionsFor(base.instrument, format),
    items: base.items,
  })),
);
