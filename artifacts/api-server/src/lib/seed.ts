import { db } from "@workspace/db";
import {
  topicsTable,
  lecturesTable,
  assignmentsTable,
  problemsTable,
  seedMetaTable,
} from "@workspace/db";
import { eq, sql, and, like, notInArray } from "drizzle-orm";
import { logger } from "./logger";

// Content version of the seeded curriculum. BUMP THIS whenever the TOPICS or
// ASSIGNMENTS content below changes. On boot, seedIfEmpty compares this against
// the value stored in seed_meta; a mismatch forces a full re-seed, so content
// edits self-heal in every environment (including a republished production)
// without a manual database wipe.
const SEED_CONTENT_VERSION = "2026-08-07-sociology-101-v1";

type SeedTopic = {
  slug: string;
  title: string;
  weekNumber: number;
  blurb: string;
  lectureTitle: string;
  body: string;
};

const TOPICS: SeedTopic[] = [
  // ── Week 1: The sociological perspective ────────────────────────────────
  {
    slug: "sociological-imagination",
    title: "The sociological imagination",
    weekNumber: 1,
    blurb: "The sociological imagination is the capacity to see how private lives are shaped by public forces — connecting personal biography to the structure and history of society.",
    lectureTitle: "1.1 The sociological imagination: seeing the general in the particular",
    body: `# The sociological imagination

In 1959 the American sociologist **C. Wright Mills** gave sociology its most enduring rallying cry: the **sociological imagination**, the ability to grasp the connection between "personal troubles" and "public issues." A person out of work experiences unemployment as a private failure — a bad interview, a thin résumé. But when a factory closes and ten thousand people lose their jobs at once, the cause is not ten thousand personal failings; it is a structural change in the economy. The sociological imagination is the mental habit of seeing the second picture inside the first.

## The general in the particular

Peter Berger described the core move of sociology as "seeing the general in the particular." Any single life looks unique from the inside, but sociologists notice that people in similar positions tend to live similar lives. Whether you marry, how many children you have, how long you live, what job you hold — these feel like personal choices, yet they pattern strongly by class, gender, race, and historical era. Recognizing those patterns does not deny individual agency; it reveals the social scaffolding within which choices are made.

## Troubles versus issues

Mills' key distinction is between a **personal trouble** — a difficulty located in the individual and their immediate relationships — and a **public issue** — a matter rooted in the organization of society itself. One person in debt has a trouble; a generation buried under student loans faces an issue. The sociological imagination refuses to reduce issues to troubles, because doing so blames individuals for outcomes produced by institutions.

## History and biography

Mills insisted that we cannot understand a life without understanding the historical moment it occupies. Someone who came of age during the Great Depression, someone who entered the workforce in a boom, and someone who graduated into a recession face structurally different worlds. The sociological imagination therefore always asks two questions at once: *Where does this person sit in the social structure?* and *At what point in history?*

## Why it matters

This perspective is unsettling because it dislodges the comforting belief that outcomes are simply earned. But it is also empowering: if problems are social in origin, they are potentially social in solution. Seeing suicide rates, divorce rates, or incarceration rates as products of social conditions rather than isolated moral failures is the first step toward studying — and changing — those conditions.`,
  },
  {
    slug: "sociology-vs-common-sense",
    title: "Sociology vs. common sense",
    weekNumber: 1,
    blurb: "Sociology treats society as an object of systematic study, testing claims against evidence rather than accepting the 'obvious' truths of common sense — which are often wrong.",
    lectureTitle: "1.2 Sociology vs. common sense: society as an object of study",
    body: `# Sociology vs. common sense

People have always had opinions about society. What makes sociology a discipline rather than a collection of opinions is that it treats society as an **object of systematic, empirical study** — subjecting claims to evidence rather than accepting them because they feel obviously true. Much of what "everyone knows" about social life turns out, on inspection, to be wrong.

## Common sense is often wrong

Common sense told earlier generations that women were unsuited to higher education, that poverty reflected laziness, and that opposites attract in marriage. Systematic study contradicts each claim: educational attainment responds to opportunity, not innate capacity; poverty tracks the availability of jobs and wages far more than individual effort; and people overwhelmingly marry others similar to themselves in class, education, and background (a pattern sociologists call **homogamy**). Common sense is a storehouse of a culture's assumptions, not a reliable guide to how society actually works.

## Society as an object of study

Treating society as an object means asking what can be observed, measured, and compared. Instead of asking "Is family life declining?" as a matter of opinion, a sociologist asks: how have marriage rates, household sizes, divorce rates, and time spent with children actually changed, and for whom? The question becomes answerable with data. This reorientation — from moral judgment to empirical description — is the hinge on which the discipline turns.

## The problem of the familiar

Studying society scientifically is harder than studying nature in one respect: we are all natives of the society we study. We take its arrangements for granted precisely because they are familiar. A sociologist must therefore cultivate what Peter Berger called the ability to be a "stranger" in one's own world — to make the familiar strange, questioning arrangements that seem too obvious to question, such as why we shake hands, why schools are age-graded, or why some work is paid and some is not.

## Debunking as a stance

Berger described sociology as having a built-in **debunking** tendency: it looks behind official accounts to the actual workings underneath. Organizations describe themselves in flattering language; sociology asks who really benefits, who decides, and what unstated rules govern behavior. This is not cynicism — it is the discipline's commitment to distinguishing what people say about social life from what the evidence shows is happening.

## From opinion to evidence

The lesson of this topic is not that common sense is always false but that it cannot be trusted without testing. Sociology's contribution is a method for finding out — replacing "it stands to reason" with "let us look and see."`,
  },
  {
    slug: "founders-durkheim-marx-weber",
    title: "The founders: Durkheim, Marx, and Weber",
    weekNumber: 1,
    blurb: "Émile Durkheim, Karl Marx, and Max Weber each answered a different question about modern society, and their ideas still frame how sociologists think today.",
    lectureTitle: "1.3 The founders: Durkheim, Marx, and Weber",
    body: `# The founders: Durkheim, Marx, and Weber

Sociology emerged in the nineteenth century as thinkers tried to understand the upheaval of industrialization, urbanization, and revolution. Three figures — **Émile Durkheim**, **Karl Marx**, and **Max Weber** — asked the foundational questions the discipline still works on. Understanding what each one saw is the fastest route into sociological thinking.

## Durkheim: what holds society together?

The French sociologist **Émile Durkheim** (1858–1917) wanted to establish that **social facts** — patterned ways of acting, thinking, and feeling that exist outside any individual and constrain them — are real and can be studied scientifically. His classic study *Suicide* (1897) showed that suicide rates vary systematically by group: they were higher among Protestants than Catholics, among the unmarried than the married, among people during economic upheaval. Because rates are stable properties of groups, the most private act imaginable turns out to have social causes. Durkheim traced this to **social integration** and regulation: too little belonging (anomie) raises the rate. His central concern was **solidarity** — the glue holding society together as it shifted from small traditional communities to large impersonal modern ones.

## Marx: what divides society?

The German thinker **Karl Marx** (1818–1883) saw society through the lens of **conflict** rooted in economics. For Marx, every era is defined by its mode of production and by the struggle between those who own the **means of production** (the bourgeoisie, under capitalism) and those who must sell their labor (the proletariat). He argued that owners extract profit by paying workers less than the value they produce, generating inequality and, eventually, class conflict. Concepts like **alienation** (workers estranged from the products and process of their labor) and **class consciousness** remain central. Whatever one thinks of his predictions, Marx put inequality and power at the heart of social analysis.

## Weber: what gives society its character?

The German sociologist **Max Weber** (1864–1920) resisted single-cause explanations. Against Marx's economic emphasis, Weber argued that **ideas** also shape history: in *The Protestant Ethic and the Spirit of Capitalism* he traced how a religious worldview helped make capitalist accumulation seem virtuous. Weber analyzed the growth of **rationalization** — the spread of calculated, efficiency-driven organization — and its purest form, **bureaucracy**. He also insisted sociologists practice *Verstehen*, the interpretive understanding of the meanings people attach to their actions.

## A shared inheritance

Durkheim, Marx, and Weber disagreed profoundly, and that is precisely why they are useful: each supplies a different question — about cohesion, about conflict, about meaning and rationality. Modern sociology's major perspectives descend directly from them, as the next topic shows.`,
  },
  {
    slug: "three-theoretical-perspectives",
    title: "The three theoretical perspectives",
    weekNumber: 1,
    blurb: "Functionalism, conflict theory, and symbolic interactionism are the three lenses sociologists use to explain social life — each highlighting something the others miss.",
    lectureTitle: "1.4 The three theoretical perspectives: functionalism, conflict, and symbolic interaction",
    body: `# The three theoretical perspectives

A **theoretical perspective** is a basic image of society that guides thinking and research — a lens that decides which questions get asked. Sociology relies mainly on three, descended from the founders. No single lens is complete; the mark of a good sociologist is knowing which one a problem calls for, and what each one leaves out.

## Structural functionalism

**Functionalism** views society as a complex system of interconnected parts, each performing a **function** that contributes to the stability of the whole. Descended from Durkheim, it asks of any social arrangement: what does it do for the system? The family socializes children; schools transmit skills; religion promotes solidarity. Robert Merton refined the view by distinguishing **manifest functions** (the intended, recognized consequences of a practice) from **latent functions** (the unintended ones) — a school's manifest function is education; a latent one is providing childcare and a marriage market. Merton also introduced **dysfunctions**: consequences that disrupt the system. The critique of functionalism is that, by emphasizing order and equilibrium, it can rationalize inequality and downplay conflict and change.

## Conflict theory

**Conflict theory**, descended from Marx, sees society not as a smoothly cooperating system but as an **arena of inequality and struggle** over scarce resources — wealth, power, prestige. It asks of any arrangement: who benefits, and at whose expense? A conflict theorist looks at schools and sees not neutral skill transmission but the reproduction of class advantage, as children of the wealthy pass their position to the next generation. Later conflict theorists extended the framework beyond economic class to gender (feminist theory) and race. The critique is that conflict theory can understate the genuine cooperation and shared values that also hold societies together.

## Symbolic interactionism

Where the first two perspectives operate at the **macro** level (large-scale structures), **symbolic interactionism** works at the **micro** level — face-to-face interaction. Descended from Weber's emphasis on meaning and developed by George Herbert Mead and Herbert Blumer, it holds that society is continually built up out of the meanings people create and exchange in interaction. A handshake, a diploma, or a wedding ring means something only because people jointly agree it does. Erving Goffman's **dramaturgical** analysis, which treats social life as theater with front-stage performances and back-stage relaxation, is a famous example. The critique is that interactionism can lose sight of the larger structures — class, power, institutions — that shape which interactions are even possible.

## Using the lenses together

Consider a single fact: standardized testing in schools. A functionalist asks how testing sorts talent for the labor market; a conflict theorist asks whose children the tests advantage; an interactionist asks how a test score becomes a label that shapes a student's identity and how teachers treat them. All three are true at once. Sociological skill lies in moving deliberately among the lenses rather than mistaking one for the whole picture.`,
  },
  {
    slug: "doing-sociology-research-process",
    title: "Doing sociology: the research process",
    weekNumber: 1,
    blurb: "Sociological research moves from question to theory to hypothesis to data and back — a systematic cycle that turns curiosity about society into defensible knowledge.",
    lectureTitle: "1.5 Doing sociology: the research process",
    body: `# Doing sociology: the research process

Sociology is an **empirical** discipline: its claims are meant to be checked against evidence gathered systematically. The **research process** is the structured path from a question to a defensible answer. Learning its steps is how you tell sociology from mere assertion — and how you evaluate the studies you read.

## From question to concept

Research begins with a **question** about social life: Does neighborhood poverty affect children's later earnings? Why do some social movements succeed? The next step is to define the **concepts** precisely. Everyday words like "poverty" or "success" are too vague to study, so researchers create **operational definitions** — specifications of exactly how a concept will be measured (e.g., poverty as household income below a defined threshold). A single concept can be operationalized many ways, and the choice shapes the findings.

## Variables and hypotheses

Sociologists think in terms of **variables** — measurable characteristics that vary across cases. A **hypothesis** is a testable statement about the relationship between an **independent variable** (the presumed cause) and a **dependent variable** (the presumed effect): "the more education a person has (independent), the higher their income (dependent)." Framing a question as a relationship between variables makes it answerable with data.

## Correlation and causation

A central lesson: **correlation is not causation.** Two variables can move together without one causing the other. Ice-cream sales and drowning deaths rise together — but because both rise in summer, not because ice cream causes drowning. Here summer is a **spurious** third factor. To claim causation, a researcher must show the variables are correlated, that the cause precedes the effect in time, and that no third variable explains the association. Much of research design exists to rule out spurious relationships.

## Theory and the research cycle

Research does not float free of ideas. **Deductive** research starts from a theory, derives a hypothesis, and tests it against data. **Inductive** research starts from observations and builds toward a theory (an approach called *grounded theory*). In practice the two form a cycle: theory suggests what to look for, data revise the theory, revised theory suggests new questions. Good research is explicit about which direction it is moving.

## Reliability and validity

Two standards judge any measure. **Reliability** asks whether the measure yields consistent results on repetition — would a second researcher, using the same procedure, get the same numbers? **Validity** asks whether the measure actually captures the concept it claims to — a reading test given in English to non-native speakers may reliably measure something, but not the reading ability it purports to. A finding is only as trustworthy as the reliability and validity of the measures behind it.`,
  },
  {
    slug: "research-methods",
    title: "Research methods",
    weekNumber: 1,
    blurb: "Surveys, experiments, and fieldwork are the main ways sociologists gather data — each with distinctive strengths and blind spots that make it suited to different questions.",
    lectureTitle: "1.6 Research methods: surveys, experiments, and fieldwork",
    body: `# Research methods: surveys, experiments, and fieldwork

There is no single "sociological method." Sociologists choose among several data-collection strategies depending on the question, and each method trades one strength for another. Knowing what each does well — and where each is blind — lets you judge whether a study's method fits its claims.

## Surveys

The **survey** is sociology's workhorse. A researcher asks a standardized set of questions of many people, using either a written questionnaire or a structured interview. Its great strength is **generalizability**: by drawing a **random sample** — one in which every member of the population has a known chance of selection — a researcher can generalize from a few thousand respondents to millions. Surveys excel at describing attitudes and self-reported behavior across large populations. Their weaknesses: question wording can steer answers, people misremember or misreport (especially on sensitive topics), and a survey captures what people *say* rather than what they *do*.

## Experiments

The **experiment** is the strongest design for establishing **causation**, because it controls the conditions. Subjects are randomly assigned to an **experimental group** that receives some treatment and a **control group** that does not; **random assignment** ensures the groups differ only by chance except for the treatment, so any later difference can be attributed to it. Sociology's classic cautionary tale is the **Hawthorne studies** at a Western Electric plant, where worker productivity rose no matter what researchers changed — because the workers knew they were being watched. This **Hawthorne effect** named a general hazard: the act of studying people can change their behavior. Experiments are powerful but often artificial and hard to apply to large-scale social questions.

## Fieldwork and participant observation

In **fieldwork**, the researcher enters a social setting and observes it directly, often as a **participant observer** who takes part in the group's life while studying it. The strength is depth and context — an understanding of meaning and process that no questionnaire captures. Classic examples include William Foote Whyte's *Street Corner Society* and later urban ethnographies. The trade-offs mirror the survey's: rich, valid detail about one setting, but limited generalizability and a real risk that the observer's presence, or their sympathies, colors what they see.

## Secondary and comparative analysis

Sociologists also reuse **existing data** — government statistics, historical records, other researchers' datasets. Durkheim's *Suicide* was built entirely from official records. This is efficient and enables historical and cross-national comparison, but the researcher is stuck with categories someone else defined for other purposes.

## Matching method to question

No method is best in the abstract. If you want to generalize attitudes across a nation, survey. If you want to prove a cause, run an experiment. If you want to understand how a subculture actually lives, do fieldwork. Sophisticated research often combines methods (**triangulation**) so the weaknesses of one are offset by the strengths of another.`,
  },
  {
    slug: "ethics-and-objectivity",
    title: "Ethics and objectivity in social research",
    weekNumber: 1,
    blurb: "Because sociologists study people, they face ethical obligations — consent, confidentiality, avoiding harm — and the hard challenge of keeping personal values from distorting their findings.",
    lectureTitle: "1.7 Ethics and objectivity in social research",
    body: `# Ethics and objectivity in social research

Sociologists study human beings, and that raises obligations no laboratory chemist faces. Research can expose, embarrass, or harm the people it studies, and the researcher's own convictions can quietly bend the findings. Two commitments — **ethics** and **objectivity** — are meant to guard against these dangers.

## The core ethical principles

Modern research ethics rest on a few principles, now enforced by university **Institutional Review Boards (IRBs)**. **Informed consent**: participants must understand what the study involves and agree freely. **Confidentiality and anonymity**: researchers protect participants' identities and sensitive data. **Avoiding harm**: the potential benefits of knowledge must outweigh any physical, psychological, or social risk to participants. **The right to withdraw**: participation is voluntary and can be ended at any time.

## Cautionary cases

These rules were written in response to abuses. In social psychology, Stanley Milgram's obedience experiments and Philip Zimbardo's Stanford prison experiment caused real distress to participants and are now taught as examples of why oversight is necessary. In sociology, Laud Humphreys' *Tearoom Trade* study gathered data on men's private sexual behavior without their knowledge and later traced their identities — a serious breach of consent and confidentiality that sharpened the discipline's ethical standards. Such cases show that good intentions do not substitute for ethical safeguards.

## The challenge of objectivity

**Objectivity** means keeping personal values from distorting the collection and interpretation of data. This is genuinely hard: sociologists study contested topics — inequality, crime, family — about which they have convictions. Max Weber's influential answer was **value-neutrality**: researchers should be honest about their values but must not let those values determine their findings, and must report evidence that cuts against their own beliefs. Complete detachment is impossible, so the discipline relies on **transparency** and **replication** instead — describe your methods fully enough that others can check, and let independent researchers try to reproduce the result.

## Values in the choice of questions

There is an important distinction between the *questions* a sociologist chooses and the *answers* they find. Values legitimately guide which problems seem worth studying — a researcher who cares about poverty will study poverty. What objectivity forbids is letting those same values predetermine the results. Studying a topic because you care about it is fine; concluding what you wanted to conclude regardless of the data is not.

## Why this matters for you

As a reader of research, these commitments give you a checklist. Were participants protected? Did the researcher disclose their methods and their standpoint? Has the finding survived replication? A study that cannot answer these questions asks for trust it has not earned — and recognizing that is itself a sociological skill.`,
  },

  // ── Week 2: Culture, self, and society ──────────────────────────────────
  {
    slug: "what-culture-is",
    title: "What culture is",
    weekNumber: 2,
    blurb: "Culture is the shared way of life of a group — its norms, values, symbols, and beliefs — that members learn and that feels natural precisely because it is so taken for granted.",
    lectureTitle: "2.1 What culture is: norms, values, and symbols",
    body: `# What culture is: norms, values, and symbols

**Culture** is the shared way of life of a group: the beliefs, values, norms, symbols, language, and material objects that its members learn and pass on. It is the lens through which people perceive the world — and because they acquire it so early and so completely, it feels not like one option among many but simply like reality. Making culture visible, so we can see it as a human creation rather than a fact of nature, is a central sociological task.

## Values and beliefs

**Values** are broad, abstract standards of what is good, desirable, and worth striving for — a culture's ideals. American culture, for instance, prizes achievement, individualism, and freedom. **Beliefs** are specific statements people hold to be true. Values give beliefs their charge: someone who values individual achievement is likely to believe that hard work pays off. Values are often in tension with one another (freedom versus equality, individualism versus community), and much cultural and political conflict is a clash of competing values.

## Norms

**Norms** are the rules and expectations that guide behavior in particular situations. Sociologist William Graham Sumner distinguished two kinds. **Folkways** are everyday norms of ordinary conduct — how to dress, how close to stand, when to say "please." Violating them makes you odd or rude, not evil. **Mores** are norms with strong moral significance, whose violation provokes serious condemnation — prohibitions on theft, violence, or incest. The most powerful mores are encoded as **laws**, backed by the formal power of the state. Norms are enforced through **sanctions**, positive (a compliment, a promotion) or negative (a frown, a fine, imprisonment).

## Symbols and language

Humans live in a world of **symbols** — anything that carries a shared meaning: a flag, a wedding ring, a red octagon, a raised middle finger. Nothing about the object requires its meaning; the meaning is a social agreement, which is why symbols vary across cultures and change over time. **Language** is the most important symbolic system, the vehicle by which a culture is stored and transmitted across generations. Without shared symbols, none of the coordinated activity we call society would be possible.

## Material and nonmaterial culture

Sociologists distinguish **nonmaterial culture** (the intangibles — ideas, values, norms, language) from **material culture** (the physical objects a society produces — tools, buildings, clothing, technology). The two are linked: a smartphone is material culture, but the etiquette of when it is rude to check it is nonmaterial. William Ogburn noted that material culture often changes faster than the norms governing it, producing a **culture lag** — the unsettled period, familiar from every new technology, before shared norms catch up.

## The taken-for-granted

The deepest feature of culture is its invisibility to insiders. We notice culture most when we encounter a different one — the moment of disorientation travelers call **culture shock**. That jolt is instructive: it reveals that our own arrangements, which felt like simple common sense, are one particular solution among many to the problem of living together.`,
  },
  {
    slug: "language-subcultures-diversity",
    title: "Language, subcultures, and cultural diversity",
    weekNumber: 2,
    blurb: "No large society shares one uniform culture; it contains subcultures and countercultures, and sociologists study this diversity while resisting both ethnocentrism and uncritical relativism.",
    lectureTitle: "2.2 Language, subcultures, and cultural diversity",
    body: `# Language, subcultures, and cultural diversity

A large modern society is not a single seamless culture but a patchwork of overlapping ways of life. This topic examines how language shapes thought, how groups within a society develop distinctive cultures of their own, and how sociologists judge cultural differences without falling into the traps of ethnocentrism or empty relativism.

## Language and the Sapir–Whorf hypothesis

Language does more than label a pre-existing world; it organizes perception. The **Sapir–Whorf hypothesis** (linguistic relativity) proposes that the language we speak shapes how we think and what we notice — speakers of languages with many words for a domain may perceive finer distinctions within it. The strong version (language wholly determines thought) is rejected, but a moderate version is well supported: language directs attention and makes some ideas easier to hold than others. This is why control over language — the terms allowed in a debate — is control over thought, a point that runs through the sociology of politics and media.

## Subcultures

A **subculture** is a group within a larger society whose members share values, norms, and a way of life that set them apart while remaining connected to the whole. Musicians, surfers, immigrant communities, gamers, and professions like medicine all develop subcultures with their own vocabulary, dress, and standards. Subcultures show that "American culture," or any national culture, is an umbrella over enormous internal variety, not a single template everyone follows.

## Countercultures

A **counterculture** goes further: it actively rejects and opposes the values of the dominant culture. The hippies of the 1960s, various religious and political movements, and radical groups define themselves against mainstream norms. Countercultures matter to sociologists because they reveal the dominant culture's values by negation — you learn what a society takes for granted by watching what its rebels refuse.

## Ethnocentrism and cultural relativism

When encountering an unfamiliar culture, the reflex is **ethnocentrism**: judging another culture by the standards of one's own and finding it deficient, strange, or inferior. Ethnocentrism is nearly universal and often invisible to the person practicing it. The sociological corrective is **cultural relativism**: the practice of understanding a culture on its own terms, in its own context, before judging it. Relativism is a research stance, not necessarily a moral one — understanding why a practice makes sense within a culture does not commit you to approving of it, and most sociologists reject the extreme claim that no cross-cultural judgment is ever possible (few would decline to condemn slavery or genocide).

## Cultural universals and variation

Anthropologist George Murdock catalogued **cultural universals** — general features found in every known society, such as family, funeral rites, jokes, and rules about marriage. But universals appear in wildly different forms: every society has marriage, yet who may marry whom, and how many spouses are allowed, varies enormously. This combination — universal functions, variable forms — captures the balance sociology strikes between our common humanity and our cultural diversity.`,
  },
  {
    slug: "socialization",
    title: "Socialization",
    weekNumber: 2,
    blurb: "Socialization is the lifelong process by which we learn our culture and become functioning members of society — the process that turns a biological human into a social self.",
    lectureTitle: "2.3 Socialization: becoming human",
    body: `# Socialization: becoming human

**Socialization** is the lifelong process by which people learn the culture of their society — its language, values, norms, and roles — and develop into functioning members of it. It is how a helpless infant becomes a competent adult, and how each generation transmits its way of life to the next. Sociology's striking claim is that even the most personal thing about us — our sense of self — is a social product.

## Nature and nurture

Human behavior arises from an interplay of biological potential and social experience. The evidence for the power of nurture is stark: cases of severely isolated children (such as the girl known as "Genie," discovered after years of confinement) show that without human interaction during early childhood, language and normal social functioning may never fully develop. Biology provides the raw capacity; socialization supplies the content. We are the species that must be taught how to be human.

## Cooley: the looking-glass self

Charles Horton Cooley proposed that we develop a self-image by imagining how we appear to others — the **looking-glass self**. It has three moments: we imagine how we appear to another person, we imagine that person's judgment of that appearance, and we feel some response (pride, shame) as a result. The self, in this view, is not something we possess independently; it is assembled from reflections in the "mirror" of other people's reactions.

## Mead: the social self

George Herbert Mead built the most influential theory of self-development. For Mead, the self emerges through social interaction, especially through learning to **take the role of the other** — to see oneself from another's point of view. Children first imitate, then play at being specific others (**play stage**, e.g., pretending to be a parent), then learn to coordinate many roles at once in organized activity like a team game (**game stage**). Finally they internalize the **generalized other** — the attitudes and expectations of society as a whole. Mead distinguished the **"I"** (the spontaneous, acting self) from the **"me"** (the socialized self that reflects society's expectations); the interplay of the two is what we experience as thinking.

## Freud and Piaget

Other traditions complement the sociological account. Sigmund Freud modeled the personality as a struggle among the *id* (drives), the *superego* (internalized social morality), and the *ego* (the mediator) — a picture of society entering the self as conscience. Jean Piaget mapped stages of cognitive development, showing that the *ability* to take others' perspectives itself develops with age.

## Socialization across the life course

Socialization is not confined to childhood. **Anticipatory socialization** prepares us for roles we expect to occupy (a student rehearsing a future profession). **Resocialization** — dramatic in **total institutions** like prisons, boot camps, or monasteries, as Erving Goffman described — strips away a prior identity and builds a new one. Because we continually enter new roles, workplaces, and life stages, socialization is a process that ends only with life itself.`,
  },
  {
    slug: "agents-of-socialization",
    title: "Agents of socialization",
    weekNumber: 2,
    blurb: "Family, school, peers, and the mass media are the major agents through which we learn our culture — each carrying different lessons and sometimes contradicting one another.",
    lectureTitle: "2.4 Agents of socialization: family, school, media, peers",
    body: `# Agents of socialization: family, school, media, peers

Socialization does not happen in the abstract; it is carried by specific people and institutions called **agents of socialization**. Four are especially powerful in modern societies — family, school, peer group, and mass media. Each teaches a distinct curriculum, and their lessons do not always agree, which is one reason socialization produces individuals rather than clones.

## The family

The **family** is the first and, for young children, the most important agent. Long before a child can reflect, the family transmits language, basic norms, and a sense of self. Crucially, families also transmit their **social location**: a child inherits not just genes but a class position, a religion, a race, and the life chances that come with them. Melvin Kohn's research showed that class shapes what parents emphasize — working-class parents, whose jobs demand following rules, tend to stress obedience, while middle-class parents, whose jobs reward initiative, tend to stress self-direction. The family thus quietly reproduces the class structure across generations.

## The school

The **school** takes over as children age. Its manifest function is to teach knowledge and skills. But schools also deliver a **hidden curriculum**: lessons never written in any syllabus — punctuality, obedience to authority, competition, standing in line, the discipline of the clock. Schools are also, for many children, the first place they are evaluated by universal standards and sorted by measured performance, a rehearsal for the bureaucratic and meritocratic order of adult life.

## The peer group

The **peer group** — people of similar age and status — becomes especially powerful in adolescence. Unlike family and school, it is a relationship among equals, and it is the one agent children can, to a degree, choose. Peers socialize members into their own norms, which may reinforce or directly contradict those of parents (music, dress, risk-taking, aspirations). The peer group gives young people a space to develop an identity somewhat independent of adult authority — a key step toward autonomy.

## The mass media

The **mass media** — television, film, advertising, and now the vast world of digital and social media — have become a pervasive agent. Media transmit values and norms, model behavior, and shape expectations, all while being driven largely by commercial interests. They are a central site where cultural ideas about gender, beauty, violence, consumption, and success are learned. Digital media add a new twist: audiences are not just receivers but participants, and algorithmic sorting personalizes the "culture" each person absorbs, fragmenting the shared media environment earlier generations experienced.

## Competing and cumulative lessons

Because these agents can conflict — a peer group that prizes rebellion against a family that prizes obedience, a media ideal at odds with a religious upbringing — individuals must negotiate among them. This negotiation is precisely where personal identity is forged, and it explains how socialization can transmit a culture while still producing genuine variation among the people it shapes.`,
  },
  {
    slug: "social-construction-of-self",
    title: "The social construction of the self",
    weekNumber: 2,
    blurb: "Categories we treat as natural facts — gender, race, even reality itself — are in large part social constructions, sustained by shared agreement and enacted in everyday life.",
    lectureTitle: "2.5 The social construction of the self",
    body: `# The social construction of the self

One of sociology's most powerful and unsettling ideas is that much of what we take to be natural, fixed, and given is in fact **socially constructed** — produced and sustained by human agreement rather than found in nature. This does not mean these things are fake; a social construction can be utterly real in its consequences. It means their reality depends on collective belief and ongoing enactment.

## The social construction of reality

Peter Berger and Thomas Luckmann's *The Social Construction of Reality* (1966) argued that everyday reality is built up through interaction. People act, others respond, patterns settle into habits, habits harden into institutions, and institutions come to seem like the natural order — a process they called **institutionalization**. What one generation invents, the next inherits as simply "the way things are." The Thomas theorem captures the practical force of this: "If people define situations as real, they are real in their consequences." A rumor of a bank collapse, though false, can cause the collapse when depositors act on it.

## The self as a social product

Building on Cooley and Mead, this perspective holds that the self is not a pre-formed essence that society merely decorates. It is assembled in interaction, from the reactions of others and the roles we are given to play. Change the social context — the audience, the expectations, the available roles — and the self on display changes too. This is why the same person can be a different self at work, at home, and among friends.

## Goffman and the presentation of self

Erving Goffman's **dramaturgical** approach treats social life as theater. We are all performers engaged in **impression management**, trying to control the impression others form of us. There is a **front stage**, where we perform for an audience (the polished server in a restaurant), and a **back stage**, where we drop the performance (the same server complaining in the kitchen). The self, for Goffman, is less the actor behind the mask than the *effect* produced by a successful performance — a social accomplishment rather than a private possession.

## Constructing categories: gender and race

The most consequential constructions are social categories. Sociologists distinguish **sex** (biological) from **gender** (the social meanings and expectations attached to it) precisely to show that masculinity and femininity are learned performances, not automatic expressions of biology — an idea developed further in Week 3. Likewise, **race** is a social construction: the biological variation among humans does not map onto the racial categories societies use, and those categories differ across societies and eras. Calling these constructions does not make them trivial — they organize opportunity, identity, and life chances profoundly.

## Why "constructed" does not mean "unreal"

The recurring misunderstanding is to hear "socially constructed" as "imaginary." Money is socially constructed — a dollar has value only because we collectively agree it does — yet it is entirely real in its power over your life. The sociological point is that such things can, in principle, be constructed differently, which is exactly why understanding their construction is the first step toward imagining social change.`,
  },
  {
    slug: "social-interaction-everyday-life",
    title: "Social interaction in everyday life",
    weekNumber: 2,
    blurb: "The micro-level order of face-to-face interaction — statuses, roles, and shared definitions of the situation — is the ground on which all larger social structures are built.",
    lectureTitle: "2.6 Social interaction in everyday life",
    body: `# Social interaction in everyday life

Large structures like the economy or the state can seem remote, but they exist only through countless small moments of **social interaction** — the ways people act toward and respond to one another face to face. This micro level is not trivial; it is the foundation on which everything larger is built. Sociologists have developed a precise vocabulary for the everyday order most people navigate without noticing.

## Status and role

A **status** is a position a person occupies in a social structure — student, mother, employee, citizen. Everyone holds many statuses at once, a **status set**. Sociologists distinguish an **ascribed status**, assigned at birth or involuntarily (age, sex, family of origin), from an **achieved status**, earned through effort or choice (occupation, degree, marital status). A **master status** is one that overrides the others in shaping how a person is treated — a disability, a criminal record, or a celebrated profession can become the lens through which everything else about someone is seen.

Attached to every status is a **role**: the behavior expected of someone in that position. A status is something you occupy; a role is something you perform. Because we hold many statuses, we experience **role strain** (competing demands within a single role — a professor as both mentor and grader) and **role conflict** (clashing demands of different roles — the working parent pulled between job and child).

## Defining the situation

Interaction runs smoothly only when people share a **definition of the situation** — an understanding of what kind of encounter this is and what the appropriate behavior is. A classroom, a funeral, a first date, and a job interview each summon a different definition and a different set of rules. Most of the time this alignment is automatic; the awkwardness we feel when someone "misreads" a situation reveals how much invisible coordination interaction requires.

## Ethnomethodology and background expectations

Harold Garfinkel's **ethnomethodology** studies the taken-for-granted rules that make interaction possible. His famous **breaching experiments** had students violate ordinary expectations — responding to "How are you?" by demanding to know precisely what was meant — to expose the vast web of unspoken assumptions we lean on. The intense discomfort such breaches produce demonstrates that social order is an ongoing accomplishment, constantly maintained by participants who mostly do not know they are maintaining it.

## Nonverbal communication and personal space

Much interaction is **nonverbal** — facial expression, gesture, posture, tone, eye contact. Edward Hall's study of **personal space** (proxemics) showed that people maintain culturally patterned distances — intimate, personal, social, public — and that violating the expected distance signals aggression, intimacy, or ineptitude. Because these codes are cultural, they are a frequent source of cross-cultural misunderstanding.

## From micro to macro

The reason this level matters to a discipline concerned with big structures is that structures are reproduced through interaction. Every time people enact their statuses and roles, honor the definition of the situation, and follow the background expectations, they rebuild the social order for another day. Change how people interact and, cumulatively, you change society.`,
  },
  {
    slug: "groups-organizations-bureaucracy",
    title: "Groups, organizations, and bureaucracy",
    weekNumber: 2,
    blurb: "From intimate primary groups to vast bureaucracies, the forms in which people associate shape behavior — and the modern world runs on large, rationalized, formal organizations.",
    lectureTitle: "2.7 Groups, organizations, and bureaucracy",
    body: `# Groups, organizations, and bureaucracy

Humans are group animals. The forms in which people associate — from a family at dinner to a multinational corporation — profoundly shape how they think and behave. This topic moves from the small, intimate groups of daily life to the large, formal organizations that dominate modern society, and to bureaucracy, the organizational form Weber saw as the signature of the modern age.

## Primary and secondary groups

Charles Horton Cooley distinguished two basic types. A **primary group** is small, intimate, and enduring, valued for its own sake — the family, close friends. Interaction is personal and total; you matter as a whole person. A **secondary group** is larger, more impersonal, and organized around a specific goal — a class, a workplace, a professional association. Interaction is partial and instrumental; you matter for what you contribute. Modern life has shifted enormous amounts of activity from primary to secondary groups, a change with consequences for how connected and how anonymous people feel.

## In-groups, reference groups, and group dynamics

People also distinguish an **in-group** (one they belong to and identify with) from an **out-group** (one they feel apart from or opposed to) — a distinction that fuels loyalty and, too easily, prejudice. A **reference group** is one people use as a standard to evaluate themselves, whether or not they belong to it. Group size matters: Georg Simmel showed that a **dyad** (two members) is intimate but fragile, while a **triad** (three) is more stable but allows coalitions. Solomon Asch's conformity experiments demonstrated how readily individuals will deny the evidence of their own eyes to agree with a unanimous group.

## Formal organizations

A **formal organization** is a large secondary group deliberately structured to achieve specific goals — a hospital, a university, a corporation, a government agency. Modern society is, to an unprecedented degree, organized through such bodies; we are born, educated, employed, and buried by formal organizations. Their rise is one of the defining features of modernity.

## Weber's bureaucracy

Max Weber identified **bureaucracy** as the organizational form best suited to large-scale rational coordination, defined by several ideal-type features: a clear **hierarchy** of offices, a **division of labor** with specialized roles, governance by **written rules and procedures**, **impersonality** (cases handled by rule, not by favoritism), and appointment and promotion by **technical qualification**. Weber admired bureaucracy's efficiency and fairness relative to rule by whim or kinship — but he also feared it, warning that rationalization could trap humanity in an "iron cage" of impersonal routine that crushes spontaneity and meaning.

## The dark and dysfunctional sides

Later sociologists documented bureaucracy's pathologies. Robert Merton described the **bureaucratic personality**, in which officials follow rules so rigidly that the rules defeat the organization's purpose. **Goal displacement** occurs when maintaining the organization replaces achieving its mission. **Oligarchy** tends to creep in — Robert Michels' "iron law of oligarchy" held that even democratic organizations drift toward control by a small leadership. Understanding these tendencies is essential, because the bureaucratic form now governs so much of collective life.`,
  },

  // ── Week 3: Inequality and social difference ────────────────────────────
  {
    slug: "social-stratification",
    title: "Social stratification",
    weekNumber: 3,
    blurb: "Every society ranks its members into a hierarchy of unequal positions — social stratification — and the theories explaining it disagree sharply about whether inequality is necessary or unjust.",
    lectureTitle: "3.1 Social stratification: how societies rank people",
    body: `# Social stratification: how societies rank people

**Social stratification** is the systematic ranking of categories of people in a hierarchy of unequal access to valued resources — wealth, power, and prestige. It is a property not of individuals but of societies, and it persists across generations, shaping the life chances of people who have not yet been born. Understanding stratification is understanding how advantage and disadvantage are structured and reproduced.

## Four principles of stratification

Sociologists note that stratification: (1) is a trait of **society**, not simply of individual differences in talent or effort; (2) **persists across generations**, as parents pass their position to children; (3) is **universal but variable**, appearing in every society yet taking different forms; and (4) is supported by **beliefs** — every stratified society develops an ideology explaining why its particular inequalities are fair or natural. Recognizing that fourth point — that inequality is always accompanied by a story justifying it — is a key sociological insight.

## Closed and open systems

Stratification systems range from **closed** to **open**. A closed system permits little movement between strata and fixes position at birth; the **caste system**, historically associated with India, is the classic case, with status ascribed, rigidly bounded, and enforced by custom and religion. An **open system**, the **class system** of modern industrial societies, permits movement based (at least in principle) on achievement, and boundaries between strata are blurrier. No real society is perfectly open; all class systems retain strong elements of inheritance.

## The functionalist account: Davis and Moore

Kingsley Davis and Wilbert Moore offered a **functionalist** explanation: stratification is universal because it is *useful*. Society must fill its most important and demanding positions (surgeon, engineer) with its most capable people, and it does so by attaching greater rewards to those positions, motivating talented people to undergo the necessary training. Inequality, in this view, is society's way of ensuring that critical jobs get done well.

## The conflict critique: Tumin and Marx

Melvin Tumin and other **conflict theorists** attacked the Davis–Moore thesis. How do we know which positions are "most important" — is a surgeon really more essential than a farmer or a sanitation worker? Rewards often track power, not importance: the highly paid are frequently those able to protect their advantage, not those doing the most vital work. And inequality is dysfunctional too, they argued, because it wastes the talent of those denied the chance to develop it. From Marx's standpoint, stratification is not a functional necessity but the institutionalized dominance of one class over another.

## Ideology and legitimation

Both camps agree that stratified societies generate ideologies to legitimate their inequalities — the divine right of kings, karma and caste, or the modern **meritocracy** narrative that success reflects individual talent and effort. Sociology's task is to ask how well such stories match the evidence, and whose interests they serve. That question sets up the rest of the week.`,
  },
  {
    slug: "social-class-and-mobility",
    title: "Social class and mobility",
    weekNumber: 3,
    blurb: "Social class shapes nearly every dimension of American life, and though the ideal of mobility is central to national identity, the reality is more constrained than the myth suggests.",
    lectureTitle: "3.2 Social class in America and social mobility",
    body: `# Social class in America and social mobility

Americans often describe their society as classless or overwhelmingly middle-class, yet class shapes health, education, family life, politics, and longevity in profound and measurable ways. This topic examines what class is, how sociologists define it, and how much movement between classes actually occurs behind the powerful national myth of the self-made success.

## What is class? Marx versus Weber

For **Marx**, class is defined by one thing: your relationship to the **means of production** — you either own productive property or you sell your labor. **Weber** argued class is more multidimensional, distinguishing three overlapping hierarchies: **class** (economic position, or "life chances" in the market), **status** (social honor or prestige), and **party** (power, the ability to achieve one's will). Weber's model explains anomalies Marx's cannot — the wealthy but low-status "new money," or the prestigious but poorly paid professor — and it dominates contemporary analysis.

## Wealth versus income

A crucial distinction: **income** is the flow of money received (wages, salary, returns) over a period, while **wealth** is the total value of assets owned minus debts. Wealth is far more unequally distributed than income and is what carries advantage across generations. Income inequality in the United States has risen sharply since the 1970s, and wealth inequality is more extreme still, with the top few percent of households holding a large share of total assets. Because wealth is inherited, it is a central engine of stratification's persistence.

## The American class structure

Sociologists commonly sketch a rough structure: an **upper class** (a small, wealthy elite, subdivided into old-money "upper-upper" and new-money "lower-upper"), a **middle class** (a large but internally divided group, from secure professionals down to lower-middle white-collar workers), a **working class** (skilled and semi-skilled manual and service labor, with less security), and a **lower class** or the poor (those in and near poverty, often in insecure work or excluded from it). The boundaries are fuzzy and contested, but the categories capture real differences in resources and life chances.

## Social mobility

**Social mobility** is movement between positions in the stratification system. **Intergenerational mobility** compares a person's position to their parents'; **intragenerational mobility** tracks change over a single career. Mobility can be **vertical** (up or down) or **horizontal** (a lateral move at the same level). Much apparent mobility is **structural mobility** — driven by economy-wide changes, such as the twentieth-century shift from farm and factory work to white-collar jobs, that lifted whole cohorts regardless of individual merit.

## The myth and the evidence

The **meritocracy** narrative holds that America is uniquely open, that anyone can rise through talent and effort. The evidence is sobering. There is real mobility, but a child's eventual position remains strongly predicted by their parents' position, and cross-national studies find the United States is *less* mobile than several European societies that Americans imagine as more class-bound. Family background shapes education, networks, and inherited wealth in ways that heavily condition "individual" achievement. Mobility is real, but the playing field is far from level — and mistaking the myth for the reality is exactly the error the sociological imagination is meant to correct.`,
  },
  {
    slug: "global-stratification",
    title: "Global stratification",
    weekNumber: 3,
    blurb: "Inequality exists not only within nations but between them; competing theories explain why some nations are rich and others poor, with real consequences for billions of lives.",
    lectureTitle: "3.3 Global stratification: rich and poor nations",
    body: `# Global stratification: rich and poor nations

Stratification operates not only within societies but *among* them. The gap between the world's richest and poorest nations dwarfs the inequality inside most single countries and determines, more than almost anything else, whether a person born today will be well fed, educated, and long-lived, or none of these. This topic examines global inequality and the rival explanations for why it exists.

## Measuring global inequality

The scale is staggering: a large share of humanity lives on very low incomes, while a minority in wealthy nations command a hugely disproportionate share of global resources. Sociologists distinguish **absolute poverty** — a lack of resources so severe it threatens survival (inadequate food, clean water, shelter) — from **relative poverty** — deprivation measured against the standard of one's own society. Absolute poverty is concentrated in the poorest nations; relative poverty exists even in the richest.

## Ways of classifying nations

Older schemes ranked nations as "First, Second, and Third World"; contemporary sociologists prefer economic language: **high-income**, **middle-income**, and **low-income** nations. However labeled, the categories capture enormous differences in life expectancy, child mortality, education, and material security that follow directly from a nation's position in the global hierarchy.

## Modernization theory

One major explanation, **modernization theory** (associated with W.W. Rostow), locates the cause of poverty *inside* poor nations: they are poor because they have not yet developed the technology, institutions, and cultural values — entrepreneurship, saving, achievement orientation — that produced wealth in the West. Development, in this view, is a series of stages every nation can climb, and rich nations help by exporting capital and know-how. Critics charge that the theory is ethnocentric, treating the Western path as the only route to development, and that it ignores how poor nations were actively shaped by richer ones.

## Dependency and world-systems theory

The main rival, **dependency theory**, locates the cause of poverty in *relationships between* nations. Poor nations are not simply "behind"; they were **underdeveloped** by centuries of colonial extraction and remain locked into disadvantageous positions in the global economy, supplying cheap raw materials and labor to rich nations. Immanuel Wallerstein's **world-systems theory** extends this, dividing the globe into a wealthy **core**, an impoverished **periphery**, and an intermediate **semi-periphery**, all bound into a single capitalist system that channels wealth from periphery to core. Critics note that some formerly poor nations (parts of East Asia) have risen despite the theory's pessimism.

## Why the debate matters

The two frameworks are not merely academic; they imply opposite policies. If modernization theory is right, the remedy is more investment, trade, and technology transfer. If dependency theory is right, the remedy is restructuring the global relationships that keep poor nations poor — debt relief, fairer trade terms, an end to exploitative extraction. As with class within nations, the explanation you accept for global inequality determines what you think should be done about it.`,
  },
  {
    slug: "race-and-ethnicity",
    title: "Race and ethnicity",
    weekNumber: 3,
    blurb: "Race is a social construction rather than a biological fact, and ethnicity marks shared cultural heritage; both organize identity, opportunity, and inequality in powerful ways.",
    lectureTitle: "3.4 Race and ethnicity: concepts and realities",
    body: `# Race and ethnicity: concepts and realities

Few social categories feel more like natural facts than race, and few are more thoroughly social in origin. Sociology draws a sharp line between the popular belief that race is a fixed biological reality and the evidence that it is a **social construction** — a category humans invented, whose boundaries and meanings have shifted repeatedly across time and place, yet which shapes lives with brutal reality.

## Race as a social construction

Biologically, humans are one of the least genetically varied of species, and the visible traits used to sort people into races — skin color, hair texture — vary continuously and do not cluster into the discrete "races" that societies name. There is more genetic variation *within* any so-called race than *between* races. That racial categories are constructed, not discovered, is shown by how they change: groups once considered separate races (various European immigrant groups) were later folded into "white"; the very categories used in the census have shifted from decade to decade. Race is real as a social fact, not as a biological one.

## Ethnicity

**Ethnicity** refers to shared **cultural heritage** — common ancestry, language, religion, national origin, and traditions — with which people identify. Where race is (falsely) imagined as rooted in biology, ethnicity is understood as cultural. The two can overlap and are often confused, but they are analytically distinct: people of the same race may belong to very different ethnic groups, and ethnic identity can be claimed, emphasized, or set aside in ways racial classification, imposed from outside, often cannot.

## Minority groups

A **minority group**, in sociological usage, is not defined by numbers but by **disadvantage and distinctiveness**: a category of people, set apart by physical or cultural traits, who are socially disadvantaged and treated as a collectivity regardless of their individual qualities. By this definition a minority can even be a numerical majority — as under apartheid South Africa, where the disadvantaged group vastly outnumbered the dominant one. Two features define minority status: unequal treatment and a shared sense of collective identity, often heightened by that very treatment.

## Patterns of intergroup relations

Sociologists describe several patterns in how dominant and minority groups relate. **Assimilation** is the process by which minorities adopt the dominant culture and blend in (the "melting pot" image). **Pluralism** is a state in which groups retain distinct identities while participating as equals (the "salad bowl"). **Segregation** is the physical and social separation of groups, whether by law (*de jure*) or by practice (*de facto*). At the extremes lie **genocide**, the systematic annihilation of a group, and forced expulsion — reminders that intergroup relations can turn catastrophic.

## Constructed but consequential

The recurring lesson from Week 2 applies with full force here: to say race is socially constructed is emphatically *not* to say it is unimportant. Constructed categories organize housing, employment, wealth, health, policing, and life expectancy. The construction is precisely what makes racial inequality a social problem with social causes — and therefore, in principle, a social problem with social remedies. The mechanisms that produce that inequality are the subject of the next topic.`,
  },
  {
    slug: "prejudice-discrimination-racism",
    title: "Prejudice, discrimination, and racism",
    weekNumber: 3,
    blurb: "Prejudice is a biased attitude, discrimination is biased action, and racism can operate through institutions even without prejudiced individuals — distinctions essential to understanding inequality.",
    lectureTitle: "3.5 Prejudice, discrimination, and racism",
    body: `# Prejudice, discrimination, and racism

To analyze racial and ethnic inequality, sociologists insist on distinctions that everyday language blurs. **Prejudice** is an attitude; **discrimination** is a behavior; **racism** can be a property of individuals or, crucially, of institutions that produce unequal outcomes even without any prejudiced person involved. Keeping these apart is the key to understanding how inequality persists.

## Prejudice and stereotypes

**Prejudice** is a rigid, generalized attitude — usually negative — toward an entire category of people, held in advance of or in defiance of the evidence. Its cognitive core is the **stereotype**: an exaggerated, oversimplified generalization applied to every member of a group. Prejudice is an attitude in the head; it need not, by itself, produce action.

## Discrimination

**Discrimination** is unequal *treatment* of people based on the category they belong to — action rather than attitude. The distinction matters because the two do not always travel together. Sociologist Robert Merton's classic typology crossed the two dimensions and produced four types: the **all-weather bigot** (prejudiced and discriminates), the **all-weather liberal** (unprejudiced and does not discriminate), the **timid bigot** (prejudiced but refrains from discriminating, perhaps for fear of sanction), and the **fair-weather liberal** (unprejudiced but discriminates anyway, going along with expectations). The lesson: attitudes and behavior can diverge, and changing one does not automatically change the other.

## Institutional discrimination

The most important sociological concept here is **institutional discrimination** (or institutional racism): bias built into the ordinary, routine workings of social institutions, producing unequal outcomes *even when no individual acts from prejudice*. A hiring rule requiring a credential that some groups have historically been denied access to, a lending pattern that follows residential lines shaped by past segregation, a school-funding formula tied to local property wealth — each can systematically disadvantage a group without any bigot pulling a lever. This is why racial inequality can persist long after overt prejudice declines: it has become embedded in the structure itself.

## Explaining prejudice

Sociologists offer several accounts. **Scapegoat theory** holds that frustrated people redirect hostility onto a vulnerable out-group. **Authoritarian personality** theory (Adorno) links prejudice to a rigid personality type formed in harsh upbringing. **Culture** theories note that prejudice is learned and transmitted like any other cultural content — the finding that prejudice runs along consistent lines within a society suggests it is social, not merely idiosyncratic. **Conflict** theories argue prejudice is generated and sustained because it serves the interests of dominant groups, justifying the exploitation of others and dividing those who might otherwise unite.

## Consequences: the self-fulfilling prophecy

Prejudice and discrimination can create the very reality they claim to describe. If a group is stereotyped as less capable and therefore denied good schooling and jobs, its members' resulting disadvantage is then cited as proof of the stereotype — a **self-fulfilling prophecy** rooted in the Thomas theorem from Week 2. Breaking this cycle requires intervening not just in individual attitudes but in the institutional arrangements that convert prejudice into durable inequality.`,
  },
  {
    slug: "sex-gender-inequality",
    title: "Sex, gender, and gender inequality",
    weekNumber: 3,
    blurb: "Sex is biological while gender is socially constructed; gender organizes societies into unequal hierarchies through patriarchy, socialization, and institutions like work and family.",
    lectureTitle: "3.6 Sex, gender, and gender inequality",
    body: `# Sex, gender, and gender inequality

Gender is among the most pervasive axes of stratification, organizing societies in ways so familiar they are hard to see. Sociology's foundational move is to separate **sex** — the biological distinction — from **gender** — the social meanings, expectations, and inequalities built upon it. That distinction reveals masculinity and femininity as human creations rather than automatic expressions of biology.

## Sex versus gender

**Sex** refers to the biological and physiological characteristics that distinguish males and females. **Gender** refers to the culturally constructed attitudes, behaviors, roles, and identities a society attaches to sex — what it means to be "masculine" or "feminine." The evidence that gender is constructed rather than biologically fixed comes largely from **cross-cultural variation**: what counts as properly masculine or feminine work, dress, and temperament differs dramatically across societies, as Margaret Mead documented in her studies of gender roles in different cultures. If gender were simple biology, it would not vary so widely.

## Gender socialization

Gender is learned from birth through the agents of socialization from Week 2. Families dress and handle infants differently by sex; toys, media, schools, and peers all transmit gender expectations. This lifelong process produces **gender roles** — the behaviors expected of people based on their perceived sex — that come to feel natural precisely because they were absorbed so early. "Doing gender," in the phrase of West and Zimmerman, is an ongoing performance we enact in nearly every interaction, and one others hold us accountable to.

## Patriarchy and gender stratification

**Gender stratification** is the unequal distribution of wealth, power, and privilege between men and women. Most known societies have been **patriarchal** — organized so that men, as a category, hold disproportionate power. This inequality is not merely attitudinal; it is built into institutions. The **gender pay gap**, occupational **sex segregation** (the concentration of women and men in different kinds of jobs), the **glass ceiling** (invisible barriers to women's advancement), and the unequal division of unpaid household and care labor (the **"second shift"** documented by Arlie Hochschild) are structural features, not the sum of individual choices.

## Feminist theory

**Feminism** is both a social movement and a body of sociological theory analyzing gender inequality and seeking to end it. It is not a single position: **liberal feminism** seeks equal opportunity and legal reform within existing institutions; **socialist/Marxist feminism** ties gender inequality to capitalism and the economic exploitation of women's labor; **radical feminism** locates the root in patriarchy itself as the most fundamental form of domination. Later work on **intersectionality** (Kimberlé Crenshaw) insists that gender cannot be analyzed in isolation — it combines with race, class, and other categories so that, for example, the experience of a working-class woman of color cannot be understood by adding "gender" and "race" separately.

## Gender as a structuring force

The payoff of the sex/gender distinction is analytical leverage: because gender is constructed and institutionalized rather than biologically fixed, gender inequality is a social arrangement that can, in principle, be arranged differently. Recognizing that is the first step toward explaining both its remarkable persistence and the significant changes in gender relations over the past century.`,
  },
  {
    slug: "deviance-crime-social-control",
    title: "Deviance, crime, and social control",
    weekNumber: 3,
    blurb: "Deviance is behavior that violates social norms; what counts as deviant is socially defined, and the study of crime and its control reveals how societies enforce their boundaries.",
    lectureTitle: "3.7 Deviance, crime, and social control",
    body: `# Deviance, crime, and social control

**Deviance** is any behavior, belief, or condition that violates the norms of a group and provokes a negative reaction. **Crime** is the narrower category of deviance that violates laws enacted by the state. The sociological surprise is that deviance is not simply a property of an act — it is a matter of social **definition**. The same behavior can be normal in one setting and deviant in another, celebrated in one era and punished in the next.

## Durkheim: deviance is normal and functional

Émile Durkheim argued, counterintuitively, that deviance is a normal and even necessary feature of every society. It performs **functions**: punishing deviance affirms shared values and clarifies moral boundaries; responding to it promotes social **solidarity**, uniting the community against the offender; and deviance can drive social **change**, as yesterday's rebels become tomorrow's reformers. Durkheim's insight is that a society with *no* deviance is impossible — in a "society of saints," minor faults would be treated as grave offenses. Deviance is defined into existence by the drawing of moral lines.

## Strain theory

Robert Merton's **strain theory** explains deviance as a gap between culturally approved **goals** (in America, material success) and the legitimate **means** to reach them, which are unequally distributed. People respond in patterned ways: **conformists** accept both goals and means; **innovators** accept the goals but turn to illegitimate means (crime for money); **ritualists** abandon the goals but rigidly follow the rules; **retreatists** reject both (dropping out); and **rebels** reject both and seek to replace them with new ones. Strain theory ties deviance directly to the stratification system: those blocked from legitimate opportunity are pushed toward innovation.

## Labeling theory

**Labeling theory**, a symbolic-interactionist approach (Howard Becker), shifts attention from the act to the *reaction*. Deviance, Becker wrote, is not a quality of the act but a consequence of others applying rules and sanctions to an "offender" — "the deviant is one to whom the label has successfully been applied." Edwin Lemert distinguished **primary deviance** (an initial rule-breaking that carries little consequence for identity) from **secondary deviance** (deviance that follows from being labeled, as a person adopts a deviant self-concept and is pushed into a deviant career). Labeling directs us to ask *who* has the power to label whom — because the powerful are far better able to resist labels and apply them to others.

## Conflict theory and crime

**Conflict theory** argues that both the content of the law and its enforcement reflect the interests of the powerful. The behaviors of the disadvantaged (street crime) are heavily policed and harshly punished, while the harms of the powerful (corporate fraud, environmental damage — **white-collar crime**, in Edwin Sutherland's term) are under-defined as crime and under-punished. This helps explain why the criminal justice system falls so unequally by class and race.

## Social control

**Social control** is the set of means by which a society secures conformity. **Informal** control operates through everyday sanctions — approval and disapproval, gossip, praise, shaming. **Formal** control operates through official institutions — police, courts, prisons. Sociologists debate the purposes of punishment: **retribution**, **deterrence**, **rehabilitation**, and **incapacitation**. The scale of a society's formal control — how many it imprisons, and who — is itself a revealing social fact, and one closely tied to the inequalities examined throughout this week.`,
  },

  // ── Week 4: Social institutions and change ──────────────────────────────
  {
    slug: "family-and-marriage",
    title: "Family and marriage",
    weekNumber: 4,
    blurb: "The family is a universal institution that takes strikingly varied forms across cultures and eras; sociology examines its functions, its inequalities, and its ongoing transformation.",
    lectureTitle: "4.1 Family and marriage",
    body: `# Family and marriage

The **family** is a social institution found in every known society, yet its forms vary so widely that no single definition fits all cases. Sociologists define it broadly as a social group whose members are bound by ties of descent, marriage, or adoption and who typically share resources and responsibility for the young. Studying the family reveals how an institution can be universal in function while enormously variable in form.

## Varieties of family

Sociologists distinguish the **nuclear family** (parents and their children) from the **extended family** (a wider network of kin — grandparents, aunts, cousins — living together or in close cooperation). Rules of **marriage** vary too: **monogamy** (one spouse) and **polygamy** (multiple spouses, most often polygyny) mark one axis; **endogamy** (marrying within one's group) and **exogamy** (marrying outside it) another. Rules of **descent** (patrilineal, matrilineal, bilateral) and **residence** (where a couple lives after marriage) differ across societies. This variation dismantles the assumption that any one family form is "natural."

## Theoretical perspectives on the family

**Functionalists** ask what the family does for society, identifying core functions: regulating sexual activity, reproducing and socializing the next generation, providing emotional support, and conferring social position. **Conflict theorists** counter that the family also reproduces inequality — transmitting class advantage across generations and, historically, subordinating women through the control of property and labor. **Feminist** analysis highlights the unequal division of domestic and care work within households. **Symbolic interactionists** examine family life as it is actually lived and negotiated, day to day, through interaction.

## Marriage and change

Marriage and family patterns have changed dramatically in recent generations in industrialized societies: later ages at first marriage, higher divorce rates (though these have stabilized), more cohabitation, more single-parent and blended families, fewer children, and rising numbers living alone. The legal recognition of same-sex marriage in many countries marks a significant redefinition of the institution. Sociologists debate whether these trends represent the **decline** of the family or its **transformation** into new, more diverse forms — a debate that turns, as always, on how one defines the institution in the first place.

## Class, race, and family life

Family experience is powerfully shaped by position in the stratification systems of Week 3. Economic security affects marriage rates, divorce risk, and children's outcomes; Annette Lareau's research showed how middle-class and working-class parents pursue systematically different child-rearing strategies ("concerted cultivation" versus "the accomplishment of natural growth"), each transmitting the parents' class position. Family is thus not a refuge from social forces but one of the main channels through which they flow.

## The family as a mirror of society

Because the family sits at the intersection of the personal and the structural, it is one of sociology's richest subjects. Changes in the economy, in gender relations, in the law, and in cultural values all register in family life — which is why C. Wright Mills' distinction between private troubles and public issues (Week 1) applies to family matters as sharply as to any topic in the course.`,
  },
  {
    slug: "education-and-religion",
    title: "Education and religion",
    weekNumber: 4,
    blurb: "Education and religion are institutions that transmit culture and shape identity; sociology asks what they do for society and how they reproduce inequality and meaning.",
    lectureTitle: "4.2 Education and religion",
    body: `# Education and religion

Education and religion are two great institutions charged with transmitting a society's knowledge, values, and sense of meaning across generations. Sociology examines both not in terms of whether their teachings are true, but in terms of what they *do* — the functions they serve, the inequalities they reproduce, and the meanings they generate.

## The functions of education

From a **functionalist** view, formal education serves manifest functions — transmitting knowledge and skills, preparing people for work — and latent ones: providing childcare, delaying entry into the labor market, forming social networks, and serving as a "marriage market." Émile Durkheim emphasized education's role in transmitting shared values and integrating individuals into society. Education also performs **social placement**, sorting people into positions in the occupational hierarchy.

## Education and inequality

**Conflict theorists** argue that schools reproduce inequality more than they cure it. Through the **hidden curriculum** (Week 2), through **tracking** (sorting students into ability groups that shape their futures), and through the tight link between school funding and local wealth, education tends to confer advantage on those who already have it. Pierre Bourdieu's concept of **cultural capital** — the tastes, knowledge, and dispositions of the dominant class that schools reward — explains how children of privileged families are "fluent" in the very things schools value, while equally able children from other backgrounds are not. Samuel Bowles and Herbert Gintis argued that schools mirror the workplace, teaching the obedience and punctuality that employers demand. The apparent **meritocracy** of schooling can thus legitimate inequality by making inherited advantage look like earned achievement.

## Defining religion sociologically

Sociology studies religion without ruling on the truth of any faith. Durkheim defined **religion** as a unified system of beliefs and practices relative to **sacred** things — set-apart objects of reverence — as opposed to the **profane** (the ordinary, everyday world). For Durkheim, the central sociological fact about religion is that it binds people into a **moral community**; in worshiping the sacred, he argued, a society is in a sense worshiping itself, reaffirming the collective bonds that hold it together.

## Theories of religion

**Functionalists**, following Durkheim, emphasize religion's contributions to social **cohesion**, meaning, and social control. **Conflict theorists**, following Marx — who called religion "the opium of the people" — argue that religion can pacify the disadvantaged, encouraging acceptance of earthly suffering in hope of heavenly reward and thereby legitimating inequality. **Max Weber** showed the opposite is also possible: in *The Protestant Ethic and the Spirit of Capitalism*, religious ideas became a force for profound economic and social change. Religion, then, can be either a brake on change or an engine of it.

## Secularization and its limits

The **secularization thesis** predicted that modernization would steadily erode religion's social influence as science and rational organization advanced. The reality is more complicated: religious participation has declined in some societies while religion remains vital, and even resurgent, in others, and new forms of spirituality continue to emerge. Like the family, religion illustrates that institutions do not simply decline under modernity — they transform, and their trajectory is an empirical question, not a foregone conclusion.`,
  },
  {
    slug: "economy-and-work",
    title: "The economy and work",
    weekNumber: 4,
    blurb: "The economy is the institution organizing the production and distribution of goods and services; how a society structures work profoundly shapes its members' lives and identities.",
    lectureTitle: "4.3 The economy and work",
    body: `# The economy and work

The **economy** is the social institution that organizes the production, distribution, and consumption of goods and services. Because work occupies so much of adult life and so strongly shapes identity, status, and life chances, the economy is one of the most consequential institutions sociology studies. This topic traces how economies and work have changed and what those changes mean for the people living through them.

## Sectors and economic revolutions

Sociologists divide economic activity into three sectors: the **primary sector** (drawing raw materials from nature — farming, mining, fishing), the **secondary sector** (manufacturing raw materials into goods), and the **tertiary sector** (services — retail, health, education, finance, information). Societies have moved through great transformations: the **Agricultural Revolution**, the **Industrial Revolution** that shifted labor from farm to factory, and the more recent **post-industrial** or **Information Revolution** that has shifted labor from factory to service and knowledge work in the wealthy nations.

## Capitalism and socialism

Modern economies are organized largely along a spectrum between two ideal types. **Capitalism** is based on private ownership of the means of production, the pursuit of profit, and market competition. **Socialism** is based on collective (typically state) ownership, production for use rather than profit, and central coordination. In practice, all real economies are **mixed**, combining market mechanisms with government regulation and provision; the debate is over the balance. Each system tends to prioritize a different value — capitalism liberty and efficiency, socialism equality — and each generates characteristic problems.

## The changing nature of work

Work has been transformed repeatedly. The rise of the **corporation** concentrated economic power in large formal organizations (Week 2). **Deindustrialization** in wealthy nations moved manufacturing offshore, eroding the secure, well-paid factory jobs that once anchored the working class. **Globalization** knit national economies into a single interdependent system. More recently, **automation** and the **gig economy** — short-term, app-mediated, contingent labor — have again reshaped what work is, often shifting risk from employers onto workers. Each shift produces winners and losers, and the losses fall unevenly across the stratification system.

## Alienation and the experience of work

Marx's concept of **alienation** (Week 1) remains a central tool for analyzing the *experience* of work: workers can feel estranged from the product they make, from the act of working, from their own human potential, and from one another when labor is fragmented, monotonous, and controlled from above. Later research on the **labor process** and on service and emotional labor (Arlie Hochschild's study of flight attendants managing their feelings for pay) extends the question: what does a given organization of work do to the people who perform it?

## Work, identity, and the future

In modern societies, "What do you do?" is often the first question strangers ask — a sign of how thoroughly occupation confers identity and status. As the economy continues to change, sociologists ask urgent questions: Will automation create mass unemployment or new kinds of work? Will contingent labor become the norm? How will the rewards of a changing economy be distributed? These are not merely economic questions but questions about the shape of society itself.`,
  },
  {
    slug: "power-politics-state",
    title: "Power, politics, and the state",
    weekNumber: 4,
    blurb: "Politics concerns the distribution of power in society; sociology examines the state, the sources of legitimate authority, and competing theories of who really rules.",
    lectureTitle: "4.4 Power, politics, and the state",
    body: `# Power, politics, and the state

**Politics** is the social institution concerned with the distribution and exercise of **power** — the capacity to achieve one's will even against resistance. The central political institution of modern society is the **state**, and the central sociological questions are: what makes power legitimate, how is the state organized, and who actually rules? These questions run straight back to Weber and Marx.

## Power and authority

Max Weber defined **power** as the ability to carry out one's will despite opposition, and distinguished it from **authority** — power that is regarded as **legitimate**, accepted as rightful by those subject to it. Weber identified three pure types of legitimate authority. **Traditional authority** rests on long-established custom and inheritance (a king rules because kings have always ruled). **Charismatic authority** rests on the extraordinary personal qualities of a leader who inspires devotion (a prophet, a revolutionary). **Rational-legal authority** rests on impersonal, written rules and offices (a president's power flows from the constitutional office, not the person). Modern states rest primarily on rational-legal authority, though charisma and tradition persist.

## The state and its monopoly

Weber famously defined the **state** as the organization that successfully claims a **monopoly on the legitimate use of physical force** within a territory. Only the state may rightfully imprison, tax, and wage war; when others use force, we call it crime or rebellion. This definition captures what distinguishes the state from every other organization and why control of the state is the supreme political prize.

## Types of political systems

Political systems range along a spectrum. **Democracy** vests power, in principle, in the citizenry, exercised through representatives and protected by rights and the rule of law. **Authoritarianism** concentrates power in rulers who deny ordinary people a share in it. **Totalitarianism** goes further, seeking to control not only public life but private belief and every institution. **Monarchy** locates authority in a royal family. Real systems mix elements and change over time.

## Who rules? Competing theories

Sociologists disagree profoundly about where power really lies in a modern democracy. **Pluralist theory** (Robert Dahl) holds that power is dispersed among many competing interest groups, none dominant, so that policy emerges from bargaining and no single group rules. **Power-elite theory** (C. Wright Mills) argues the opposite: a small, interlocking elite atop the economic, political, and military institutions makes the decisions that matter, while ordinary democratic politics operates at a less consequential level. **Marxist/ruling-class theory** goes further still, contending that the state, whatever its democratic form, ultimately serves the interests of the capitalist class that dominates the economy. Which theory best fits the evidence is among the discipline's most enduring debates.

## Why the question matters

The three theories are not merely academic; they imply different diagnoses of democracy's health and different remedies for its failures. If pluralism is right, democracy works roughly as advertised; if the power-elite or ruling-class views are right, formal democracy may mask a concentration of real power. Deciding among them requires exactly the sociological tools — evidence, theory, and skepticism toward official accounts — developed across this course.`,
  },
  {
    slug: "population-urbanization-environment",
    title: "Population, urbanization, and the environment",
    weekNumber: 4,
    blurb: "Demography studies how populations grow and move; urbanization has reshaped human life; and the environmental consequences of both are now central sociological concerns.",
    lectureTitle: "4.5 Population, urbanization, and the environment",
    body: `# Population, urbanization, and the environment

Some of the largest forces shaping social life are demographic and ecological: how many people there are, where they live, and what their way of life does to the natural world. **Demography** (the study of population), **urbanization** (the growth of cities), and **environmental sociology** together examine changes operating at the scale of whole societies and the planet.

## The tools of demography

Demographers track population change through a few basic measures: the **birth rate** and **death rate** (per thousand people), the **fertility rate** (children per woman), **life expectancy**, and **migration**. A population grows or shrinks according to the balance of births, deaths, and net migration. In 1798 Thomas Malthus warned that population, growing geometrically, would outrun food supply, growing only arithmetically, producing catastrophe. His pessimism has so far been confounded by technological and social change, but the Malthusian question — can growth continue indefinitely on a finite planet? — remains alive.

## The demographic transition

The **demographic transition theory** describes a pattern many societies have followed as they industrialize. In stage one (pre-industrial), high birth rates and high death rates keep population roughly stable. In stage two (early industrial), death rates fall as sanitation, food supply, and medicine improve, while birth rates stay high — producing rapid population growth. In stage three, birth rates fall too, as children shift from an economic asset to a cost and as women's roles change. In stage four (post-industrial), low birth and death rates restore near-stability, sometimes with population decline and aging. The theory explains both the population explosion of the past two centuries and the aging, shrinking populations of the wealthiest societies today.

## Urbanization

For nearly all of human history, most people lived on the land; today, most of humanity lives in cities, a historic reversal. **Urbanization** transformed social life, and early sociologists rushed to understand it. Ferdinand Tönnies contrasted **Gemeinschaft** (community — the intimate, personal bonds of the village) with **Gesellschaft** (association — the impersonal, instrumental ties of the city). Georg Simmel analyzed the psychological effects of urban overstimulation. The **Chicago School** (Louis Wirth and others) studied the city as a distinctive way of life marked by size, density, and diversity, producing both freedom and anonymity, tolerance and isolation.

## Environmental sociology

**Environmental sociology** studies the interaction between societies and the natural environment, insisting that ecological problems are **social** problems — produced by human institutions and distributed unequally. Climate change, pollution, resource depletion, and biodiversity loss all arise from patterns of production and consumption. **Environmental justice** research documents that the burdens of environmental harm (toxic sites, pollution, climate risk) fall disproportionately on poor communities and racial minorities, tying ecology directly to the stratification of Week 3. Sociologists debate whether meaningful sustainability is possible within current economic arrangements or requires deeper structural change.

## Global interdependence

Population, urbanization, and environment are increasingly global. A high-consumption lifestyle in one nation affects the climate of all; population and migration patterns cross borders; environmental crises respect no boundaries. These topics thus return us to the global stratification of Week 3 and set up the course's final theme: how whole societies change.`,
  },
  {
    slug: "collective-behavior-social-movements",
    title: "Collective behavior and social movements",
    weekNumber: 4,
    blurb: "From crowds and panics to organized social movements, collective action is how people acting together produce social change — and sociology explains when and why it succeeds.",
    lectureTitle: "4.6 Collective behavior and social movements",
    body: `# Collective behavior and social movements

Societies change not only through slow structural drift but through people acting together deliberately. **Collective behavior** refers to relatively spontaneous, unstructured group action — crowds, panics, rumors, fads — while **social movements** are sustained, organized efforts to promote or resist change. Together they are among the most important engines of the social change examined in the next topic.

## Forms of collective behavior

Sociologists study several forms of relatively spontaneous group action. **Crowds** gather in one place and can range from casual to expressive to acting (a mob). **Panics** and **mass hysteria** spread fear and disorganized flight. **Rumors** are unverified information that spreads rapidly where facts are scarce and anxiety high. **Fads** and **fashions** are short-lived and longer-lived patterns of enthusiasm. **Public opinion** is the aggregated attitudes of a dispersed public. Early "contagion" theories (Gustave Le Bon) portrayed crowds as irrational; later work stressed that crowd behavior often follows norms and can be quite purposive.

## What is a social movement?

A **social movement** is an organized, sustained collective effort by a large number of people to bring about or resist social change. Movements differ in scope and aim: **reform movements** seek limited change within the existing order (a movement for a specific law); **revolutionary movements** seek to transform the whole system; **resistance movements** seek to block or reverse change. The civil rights movement, the labor movement, the women's movement, and environmental movements have all reshaped society, showing that ordinary people acting together can alter the very institutions studied throughout this course.

## Explaining social movements

Several theories explain why movements arise and succeed. **Relative deprivation** theory holds that movements grow not from absolute misery but from a felt gap between what people expect and what they get — deprivation *relative* to an expectation or to others. **Resource mobilization** theory shifts the focus from grievances (which are always present) to **resources**: movements succeed when they can mobilize money, members, organization, leadership, and media attention. **Political process** theory adds the importance of **political opportunity** — movements advance when the political environment opens (divisions among elites, expanding rights, sympathetic allies). **New social movement** theory notes that many contemporary movements center on identity, quality of life, and culture rather than purely economic demands.

## The life course of movements

Movements often pass through stages: **emergence** (initial awareness of a problem), **coalescence** (organization, leadership, and strategy develop), **bureaucratization** (the movement institutionalizes into formal organizations), and **decline** — which can mean failure, repression, co-optation, success (the goal is achieved), or transformation into something new. Understanding this life course helps explain why some movements flare and vanish while others reshape the social landscape for generations.

## Movements and the sociological imagination

Social movements are where the sociological imagination becomes practical. They are the mechanism by which private troubles, recognized as shared public issues (Week 1), are converted into collective demands for change. Studying them closes a circle the course opened: if social problems are social in origin, then collective action is how societies confront and, sometimes, remake them.`,
  },
  {
    slug: "social-change-modern-world",
    title: "Social change and the modern world",
    weekNumber: 4,
    blurb: "Social change is the transformation of culture and institutions over time; understanding its sources — technology, conflict, ideas, and movements — brings the whole course together.",
    lectureTitle: "4.7 Social change and the modern world",
    body: `# Social change and the modern world

**Social change** is the transformation of a society's culture, structure, and institutions over time. Every topic in this course — from the founders' attempts to understand industrial upheaval to social movements' deliberate efforts to remake institutions — has been, at bottom, about change. This final topic draws the threads together by asking what drives social change and how sociologists interpret the modern world it has produced.

## Sources of social change

No single factor explains social change; sociologists point to several interacting sources. **Technology** and material invention reshape how people live and work (recall Ogburn's *culture lag* from Week 2, the gap between material change and normative adjustment). **Conflict and inequality** generate pressure for change, as Marx emphasized. **Ideas and ideologies**, as Weber showed, can transform whole societies. **Social movements** convert grievances into organized demands. **Demographic and environmental** shifts (Week 4) alter the conditions of social life. And **diffusion** — the spread of cultural traits, technologies, and ideas from one society to another — accelerates change everywhere, especially under globalization.

## Modernity and its theorists

The great classical sociologists were all, in effect, theorists of **modernity** — the sweeping transformation from small, traditional, agrarian communities to large, industrial, urban, bureaucratic societies. Each named its defining feature: Durkheim, the shift from **mechanical solidarity** (based on likeness) to **organic solidarity** (based on the interdependence of a complex division of labor); Marx, the rise of industrial **capitalism** and class conflict; Weber, the spread of **rationalization** and bureaucracy, with its threat of the "iron cage." Tönnies' *Gemeinschaft*-to-*Gesellschaft* shift (Week 4) names the same great transition. Modernity brought unprecedented freedom, prosperity, and individualism — and also new forms of alienation, anonymity, and control.

## Postmodernity and globalization

Some contemporary theorists argue we have entered a **postmodern** era, marked by the fragmentation of shared narratives, the centrality of media and consumption, and heightened uncertainty about identity and knowledge. Others speak of **late** or **liquid modernity** (Zygmunt Bauman), stressing the accelerating pace of change and the dissolution of once-stable structures. **Globalization** — the growing interconnection of the world's economies, cultures, and politics — is a defining feature of the present, tying the fate of distant societies together and raising anew every question about inequality, culture, and power the course has examined.

## Progress, or just change?

A recurring question is whether social change amounts to **progress**. Early evolutionary theories assumed societies advance toward ever-higher stages, a view now rejected as ethnocentric and naive. Change brings gains and losses together: the same modernity that delivered medicine and democracy also produced industrial warfare and ecological crisis. Sociology resists both uncritical optimism and reflexive nostalgia, insisting instead on empirical analysis of who gains and who loses from any given change.

## Bringing the course together

We end where we began, with the **sociological imagination**. Its promise was to connect private lives to public forces, biography to history and structure. Social change is that connection in motion: the historical transformation of the very structures that shape individual lives. To think sociologically about the modern world is to see that the arrangements we inherit are neither natural nor permanent — they were made by human beings acting under particular conditions, and they can be remade. That recognition is the enduring gift of the discipline.`,
  },
];

type SeedAssignment = {
  kind: "homework" | "test" | "midterm" | "final";
  title: string;
  weekNumber: number;
  isTimed: boolean;
  timeLimitMinutes: number | null;
  instructions: string;
  problems: Array<{
    topicSlug: string;
    prompt: string;
    correctAnswer: string;
    explanation: string;
    hint?: string;
  }>;
};

const ASSIGNMENTS: SeedAssignment[] = [
  // ── Week 1 ───────────────────────────────────────────────────────────────
  {
    kind: "homework",
    title: "Homework 1.1 — The sociological perspective and its founders",
    weekNumber: 1,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Untimed practice covering sections 1.1–1.4. Answer each question in a few sentences (about 3–5) in your own words. Explain your reasoning, not just the answer. One-word or one-line answers won't receive credit.",
    problems: [
      {
        topicSlug: "sociological-imagination",
        prompt:
          "A newspaper columnist writes that the surge in a city's evictions is simply the result of individual tenants failing to budget responsibly. Using C. Wright Mills' distinction between personal troubles and public issues, explain why a sociologist would find this account incomplete and what the columnist is overlooking. (3–5 sentences.)",
        correctAnswer:
          "Mills distinguished a personal trouble, located in the individual and their immediate situation, from a public issue, rooted in the structure of society. One tenant's eviction might be a personal trouble, but a citywide surge affecting thousands at once is a public issue whose causes lie in structural forces — rising rents, stagnant wages, a shortage of affordable housing, or changes in the local economy. The columnist commits the error the sociological imagination warns against: reducing a public issue to the sum of many personal failings, which blames individuals for outcomes produced by institutions. A sociologist would ask about the historical and structural context — what changed in the housing market and economy — rather than about each tenant's budgeting. Seeing the general pattern inside the many particular cases is exactly the move the sociological imagination requires.",
        explanation:
          "Full credit: applies the troubles/issues distinction, identifies the citywide pattern as a structural public issue, and explains that reducing it to individual failings ignores institutional causes.",
      },
      {
        topicSlug: "sociology-vs-common-sense",
        prompt:
          "At a family dinner, a relative insists 'everyone knows that opposites attract in relationships' and that sociology just confirms common sense. Explain why a sociologist would be skeptical of this claim and how treating society as an object of study leads to a different conclusion. (3–5 sentences.)",
        correctAnswer:
          "A sociologist is skeptical because common sense is a storehouse of a culture's assumptions, not a reliable account of how society works, and much of what 'everyone knows' turns out to be wrong when tested. Treating society as an object of study means checking the claim against evidence rather than accepting it because it feels obvious. The evidence on mate selection actually contradicts the 'opposites attract' belief: people overwhelmingly partner with others similar to themselves in class, education, religion, and background, a pattern sociologists call homogamy. This example shows that sociology does not merely confirm common sense; it frequently overturns it. The relative's mistake is treating an intuitive saying as established fact without any test.",
        explanation:
          "Full credit: explains that common sense is often wrong and untested, contrasts it with empirical study, and cites the homogamy evidence that contradicts 'opposites attract.'",
      },
      {
        topicSlug: "founders-durkheim-marx-weber",
        prompt:
          "A researcher finds that suicide rates in a region rose sharply during a period of sudden economic upheaval, even though most affected individuals had no obvious personal crisis. Which founder's ideas best explain this pattern, and what concept would that founder use? (3–5 sentences.)",
        correctAnswer:
          "This pattern is best explained by Émile Durkheim, whose study of suicide showed that the most private act imaginable has social causes visible in group rates. Durkheim argued that suicide rates rise when social integration and regulation break down, and he named the condition of normlessness produced by sudden social or economic disruption anomie. During upheaval, the taken-for-granted rules and expectations that ordinarily regulate people's desires and anchor them to society weaken, and the suicide rate climbs even among individuals with no evident personal crisis. The key insight is that the rate is a social fact — a property of the group that exists outside any individual and constrains them. That the cause is structural, not merely personal, is precisely Durkheim's point.",
        explanation:
          "Full credit: identifies Durkheim, connects economic upheaval to anomie and weakened integration/regulation, and explains suicide rates as social facts with structural causes.",
      },
      {
        topicSlug: "three-theoretical-perspectives",
        prompt:
          "A city introduces standardized testing to decide which students enter its most competitive high schools. Explain how a functionalist, a conflict theorist, and a symbolic interactionist would each interpret this policy differently. (3–5 sentences.)",
        correctAnswer:
          "A functionalist would see the testing as a mechanism that sorts talent efficiently, matching the most capable students to the most demanding schools and thereby helping the whole system fill important positions well. A conflict theorist would ask who the tests actually advantage and argue that wealthier families, with tutoring, test prep, and cultural resources, can convert their advantage into high scores, so the policy reproduces existing class inequality under the appearance of neutral merit. A symbolic interactionist would focus on the micro level, examining how a test score becomes a label that shapes a student's self-image and how teachers treat those sorted into 'gifted' versus ordinary tracks. All three interpretations can be true at once, and the sociological skill lies in moving deliberately among the lenses. Each highlights something the others miss: function, power, and meaning.",
        explanation:
          "Full credit: gives a distinct, accurate interpretation from each of the three perspectives (functionalist sorting/function, conflict reproduction of inequality, interactionist labeling/meaning).",
      },
    ],
  },
  {
    kind: "homework",
    title: "Homework 1.2 — Research methods and ethics",
    weekNumber: 1,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Untimed practice covering sections 1.5–1.7. Answer each question in a few sentences (about 3–5) in your own words. One-word or one-line answers won't receive credit.",
    problems: [
      {
        topicSlug: "doing-sociology-research-process",
        prompt:
          "A news story reports that cities with more ice-cream shops have higher crime rates and suggests ice cream may somehow encourage crime. Using what you know about the research process, explain what error this reasoning makes and how a sociologist would investigate the relationship properly. (3–5 sentences.)",
        correctAnswer:
          "The story confuses correlation with causation: two variables moving together does not mean one causes the other. Here the association is almost certainly spurious, produced by a third variable — warmer weather and more people outdoors in summer — that independently raises both ice-cream sales and opportunities for crime. To claim ice cream causes crime, a researcher would have to show they are correlated, that the supposed cause precedes the effect in time, and, crucially, that no third factor explains the association. A sociologist would test whether the relationship survives once temperature and season are controlled for; it would not. Ruling out spurious relationships is exactly what careful research design is for.",
        explanation:
          "Full credit: identifies the correlation-is-not-causation error, names the spurious third variable (season/temperature), and describes controlling for it to test the relationship.",
      },
      {
        topicSlug: "research-methods",
        prompt:
          "A sociologist wants to understand how members of a close-knit religious commune actually experience daily life and make decisions together. A colleague suggests mailing them a standardized survey instead. Explain which method fits this question better and what each method's strengths and weaknesses are here. (3–5 sentences.)",
        correctAnswer:
          "Fieldwork with participant observation fits this question far better than a survey, because the goal is to understand the meaning and process of daily life from the inside — depth and context that a questionnaire cannot capture. Living among the members would let the researcher observe how decisions are actually made rather than how members describe them, yielding high validity about this one setting. The trade-offs are that fieldwork generalizes poorly beyond the group studied and risks the observer's presence or sympathies coloring what is seen. A survey's strength is generalizability across large populations through random sampling, but it captures only what people say, in pre-set categories, missing the lived texture of the commune. Matching method to question is the key point: use fieldwork for depth of meaning, surveys for breadth of self-report.",
        explanation:
          "Full credit: chooses fieldwork/participant observation, explains its depth/validity strength and generalizability/observer-effect weakness, and contrasts it with the survey's breadth-versus-depth trade-off.",
      },
      {
        topicSlug: "ethics-and-objectivity",
        prompt:
          "A graduate student proposes to secretly record conversations in a support group without telling members, arguing that the knowledge gained will help many people. Explain what ethical principles this violates and how the study should be redesigned. (3–5 sentences.)",
        correctAnswer:
          "The proposal violates informed consent, because members must understand what the study involves and agree freely rather than being recorded without their knowledge. It also breaches confidentiality and the participants' right to decline or withdraw, and it exposes them to potential social and psychological harm by capturing sensitive disclosures. The 'it will help many people' justification does not override these obligations; potential benefits do not license deceiving and endangering the very people being studied, a lesson dramatized by cases like the Tearoom Trade study. To redesign it ethically, the researcher should seek Institutional Review Board approval, obtain informed consent from participants, protect their anonymity and data, and allow anyone to withdraw at any time. Good intentions are not a substitute for ethical safeguards.",
        explanation:
          "Full credit: identifies violations of informed consent, confidentiality, and avoiding harm; rejects the ends-justify-means argument; and redesigns with IRB review, consent, anonymity, and right to withdraw.",
      },
    ],
  },
  {
    kind: "test",
    title: "Week 1 Test — The Sociological Perspective",
    weekNumber: 1,
    isTimed: true,
    timeLimitMinutes: 35,
    instructions:
      "Timed. 35 minutes. Covers sections 1.1–1.7. Answer each question in a few sentences (about 4–6) in your own words. Reason from the scenario to the relevant concepts; explain your thinking clearly. Pasting is disabled; keystrokes are screened for AI use.",
    problems: [
      {
        topicSlug: "sociological-imagination",
        prompt:
          "A politician argues that because some people escape poverty through hard work, anyone who remains poor simply isn't trying hard enough. Using the sociological imagination and the distinction between biography and history/structure, explain what is wrong with this reasoning. (4–6 sentences.)",
        correctAnswer:
          "The sociological imagination is the capacity to connect private lives to public forces — to see how individual outcomes are shaped by social structure and historical moment, not by effort alone. The politician commits the error of reducing a public issue to personal troubles, treating poverty as if it were entirely a matter of individual willpower. Mills would insist that whether people can escape poverty depends heavily on where they sit in the social structure (class, race, the schools and jobs available to them) and on the historical moment (a booming versus a collapsing economy). The existence of some individual success stories does not disprove structural constraint, just as some people surviving a shipwreck does not mean the ship was seaworthy. The reasoning also relies on a legitimating ideology that makes inequality look like the fair result of individual merit. A sociologist would ask about the patterned rates of mobility across groups, not just the exceptional cases.",
        explanation:
          "Full credit: defines the sociological imagination, applies the troubles/issues and biography/structure distinctions, and explains that individual exceptions do not disprove structural constraint on poverty.",
      },
      {
        topicSlug: "sociology-vs-common-sense",
        prompt:
          "A student says, 'Sociology is just common sense with fancy words — we already know how society works from living in it.' Using the ideas of debunking, the problem of the familiar, and the difference between opinion and evidence, explain why this view is mistaken. (4–6 sentences.)",
        correctAnswer:
          "The view is mistaken because common sense is a store of cultural assumptions, frequently wrong, whereas sociology tests claims against systematic evidence rather than accepting what feels obvious. Living inside a society is actually a handicap for understanding it: the problem of the familiar means we take our arrangements for granted precisely because they are so ordinary, so the sociologist must work to make the familiar strange and question what seems too obvious to question. Sociology also has a built-in debunking tendency, looking behind official and commonsense accounts to the actual workings underneath — asking who really benefits and what unstated rules govern behavior. Because we are natives of the world we study, our intuitions are shaped by that world and cannot be trusted without testing. The discipline replaces 'it stands to reason' with 'let us look and see,' which is exactly what distinguishes evidence from opinion. That is why sociology regularly overturns beliefs everyone 'knows' to be true.",
        explanation:
          "Full credit: distinguishes evidence from opinion, explains the problem of the familiar and the debunking stance, and argues that being a native of one's society makes intuition unreliable rather than authoritative.",
      },
      {
        topicSlug: "founders-durkheim-marx-weber",
        prompt:
          "Two analysts examine a factory town. One focuses on how owners profit by paying workers less than the value they produce; the other focuses on how a religious work ethic made hard labor feel virtuous. Identify which founder each analyst most resembles and explain the different questions each founder brought to the study of modern society. (4–6 sentences.)",
        correctAnswer:
          "The first analyst most resembles Karl Marx, who saw society through economic conflict between those who own the means of production and those who must sell their labor, and who argued owners extract profit by paying workers less than the value they create — generating alienation and class conflict. The second analyst most resembles Max Weber, who insisted that ideas as well as economics shape history, showing in The Protestant Ethic how a religious worldview helped make disciplined labor and accumulation seem virtuous. The founders brought different core questions: Marx asked what divides society and who exploits whom; Weber asked what gives society its character, emphasizing meaning, rationalization, and multiple causes rather than economics alone. A third founder, Durkheim, would have asked yet another question — what holds the town together, its solidarity and integration. The value of the founders is precisely that each supplies a distinct question, and the factory town can be analyzed through all of them at once.",
        explanation:
          "Full credit: matches the profit/exploitation analyst to Marx and the work-ethic analyst to Weber, and articulates each founder's guiding question (conflict/exploitation for Marx, meaning/ideas/rationalization for Weber, with Durkheim's solidarity as contrast).",
      },
      {
        topicSlug: "three-theoretical-perspectives",
        prompt:
          "A sociologist studies why weddings involve expensive rings, formal ceremonies, and elaborate rituals. Show how functionalism, conflict theory, and symbolic interactionism would each analyze the institution of the wedding, and explain what each perspective would miss on its own. (4–6 sentences.)",
        correctAnswer:
          "A functionalist would ask what weddings do for society, identifying functions such as publicly marking a stable union, integrating two families, and reinforcing shared values around commitment and reproduction. A conflict theorist would ask who benefits and at whose expense, noting how the wedding industry profits, how lavish ceremonies display and reproduce class advantage, and how the institution has historically regulated property and women's subordination. A symbolic interactionist would work at the micro level, analyzing how a ring or a vow carries shared meaning only because people jointly agree it does, and how the ceremony performs and confirms new identities as spouses. Each lens misses what the others catch: functionalism can rationalize the arrangement and ignore its inequalities; conflict theory can understate the genuine shared values and cooperation involved; interactionism can lose sight of the larger economic and institutional structures shaping which weddings are even possible. The sociological skill is to move among the three rather than mistaking one for the whole.",
        explanation:
          "Full credit: gives a distinct, accurate analysis from each perspective and identifies a specific limitation of each (functionalism ignores conflict, conflict understates cooperation, interactionism neglects macro structure).",
      },
      {
        topicSlug: "doing-sociology-research-process",
        prompt:
          "A researcher claims that 'attending college causes higher lifetime happiness,' based on a survey showing college graduates report being happier. Walk through what would need to be true to support a causal claim here, and identify at least one alternative explanation the researcher must rule out. (4–6 sentences.)",
        correctAnswer:
          "To support a causal claim, the researcher must first define and operationalize the concepts, such as measuring 'happiness' with a specific, reliable, and valid instrument rather than a vague self-report. Establishing causation then requires three things: a genuine correlation between attending college and later happiness, evidence that college attendance precedes the happiness in time, and the elimination of spurious third variables that could explain both. A strong alternative explanation is family background or wealth: people who attend college disproportionately come from more advantaged families, and that prior advantage — not the college experience itself — could produce both college attendance and greater later happiness. The researcher must control for such factors to see whether the relationship survives. Because a simple survey correlation cannot rule these out, the causal claim is premature. This is a direct application of the rule that correlation is not causation and the need to test for reliability, validity, and spuriousness.",
        explanation:
          "Full credit: states the correlation-plus-time-order-plus-no-spurious-variable requirements, raises a plausible confound (e.g., family background/wealth) that must be controlled, and notes the need for valid measurement.",
      },
      {
        topicSlug: "research-methods",
        prompt:
          "A company reports that after it announced it was 'studying employee productivity,' output rose regardless of which changes it made to the workplace. Explain what classic sociological finding this illustrates, why it is a hazard for research, and how a researcher might guard against it. (4–6 sentences.)",
        correctAnswer:
          "This illustrates the Hawthorne effect, named for the Western Electric studies in which worker productivity rose no matter what conditions researchers changed, because the workers knew they were being observed. The general hazard is reactivity: the act of studying people can itself alter their behavior, so a researcher may attribute a change to the treatment when it was really caused by the subjects' awareness of being watched. This threatens the validity of experiments, since the whole point of an experimental design is to isolate the effect of the treatment. A researcher might guard against it by using a control group that is also observed (so both groups share the awareness), by conducting less obtrusive or blind observation, or by allowing time for the novelty of being studied to wear off. Recognizing that observation can contaminate results is essential to interpreting the company's report — the productivity gain may have nothing to do with the specific workplace changes. It is a reminder that method shapes findings.",
        explanation:
          "Full credit: names the Hawthorne effect, explains reactivity as a threat to validity, and offers a reasonable safeguard (control group also observed, unobtrusive/blind observation, or habituation).",
      },
      {
        topicSlug: "ethics-and-objectivity",
        prompt:
          "A sociologist who is a committed activist wants to study whether a policy she personally opposes actually harms communities. A skeptic says she cannot possibly be objective, so her research is worthless. Using Weber's idea of value-neutrality and the distinction between choosing questions and reaching conclusions, evaluate the skeptic's argument. (4–6 sentences.)",
        correctAnswer:
          "The skeptic conflates two different things: the values that guide which questions a sociologist chooses to study, and the objectivity required in reaching conclusions. Weber's principle of value-neutrality holds that researchers should be honest about their values but must not let those values determine their findings, and must report evidence that cuts against their own beliefs. It is entirely legitimate for the activist's convictions to lead her to study a policy she cares about; what objectivity forbids is predetermining the result regardless of the data. Complete detachment is impossible, so the discipline relies instead on transparency of methods and on replication by independent researchers to catch bias. If she discloses her methods fully and others can reproduce her findings, her activism does not make the research worthless. The skeptic's blanket claim is therefore mistaken: caring about a topic is not the same as biasing the answer.",
        explanation:
          "Full credit: distinguishes value-laden choice of questions from value-neutral analysis, invokes Weber's value-neutrality, and explains that transparency and replication (not impossible total detachment) safeguard objectivity.",
      },
    ],
  },

  // ── Week 2 ───────────────────────────────────────────────────────────────
  {
    kind: "homework",
    title: "Homework 2.1 — Culture, diversity, and socialization",
    weekNumber: 2,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Untimed practice covering sections 2.1–2.3. Answer each question in a few sentences (about 3–5) in your own words.",
    problems: [
      {
        topicSlug: "what-culture-is",
        prompt:
          "A traveler returns home frustrated that in the country she visited, people stood 'too close' when talking and considered it rude to refuse a second helping of food. Using the concepts of norms, folkways, and the taken-for-granted nature of culture, explain what she experienced. (3–5 sentences.)",
        correctAnswer:
          "The traveler experienced culture shock, the disorientation that comes from encountering norms different from one's own. The behaviors she found strange — standing close and pressing food on guests — are folkways, everyday norms of ordinary conduct that differ from one culture to another; violating them makes a person seem rude or odd rather than immoral. Her frustration reveals the taken-for-granted nature of culture: her own norms about personal space and politeness felt like simple common sense rather than one particular cultural solution among many. Encountering a different culture made her own norms visible to her for the first time. The experience shows that what seems 'natural' conduct is in fact learned and culturally specific.",
        explanation:
          "Full credit: identifies culture shock, classifies the behaviors as folkways/norms, and explains that the reaction reveals the normally invisible, taken-for-granted quality of one's own culture.",
      },
      {
        topicSlug: "language-subcultures-diversity",
        prompt:
          "A newcomer to an online gaming community is baffled by its slang, insider rules, and shared values, and privately judges the group as 'weird' compared with how normal people behave. Explain this situation using the concepts of subculture and ethnocentrism, and describe the stance a sociologist would take instead. (3–5 sentences.)",
        correctAnswer:
          "The gaming community is a subculture: a group within the larger society that shares distinctive values, norms, and a specialized vocabulary while remaining connected to the whole. The newcomer's reaction — judging the group as 'weird' by the standard of 'normal people' — is ethnocentrism, evaluating another culture by the standards of one's own and finding it deficient. A sociologist would instead adopt cultural relativism, seeking to understand the community's slang and rules on their own terms and in their own context before judging them. This means asking what functions the insider language and norms serve for members rather than dismissing them. Relativism here is a research stance: understanding why the practices make sense to members, not necessarily approving of them.",
        explanation:
          "Full credit: identifies the group as a subculture, names the newcomer's reaction as ethnocentrism, and prescribes cultural relativism (understanding on the group's own terms) as the sociological stance.",
      },
      {
        topicSlug: "socialization",
        prompt:
          "A child raised in extreme isolation, with almost no human contact until age ten, is later found to have never developed language or normal social skills. Using what you know about socialization and the nature/nurture question, explain what this case demonstrates. (3–5 sentences.)",
        correctAnswer:
          "This case demonstrates that socialization — the lifelong process of learning one's culture and becoming a functioning member of society — is essential to becoming fully human, not merely an add-on to biology. Cases of severely isolated children show that without human interaction during early childhood, capacities like language and normal social functioning may never fully develop. Biology provides the raw potential, but social experience supplies the content; we are the species that must be taught how to be human. The child's inability to develop language despite being biologically human shows the decisive role of nurture. This is why sociologists argue that even the most personal features of a person, including the self, are social products.",
        explanation:
          "Full credit: uses the isolation case to show socialization is necessary to human development, and explains the nature/nurture interplay (biological potential requires social experience to be realized).",
      },
    ],
  },
  {
    kind: "homework",
    title: "Homework 2.2 — Self, interaction, and organizations",
    weekNumber: 2,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Untimed practice covering sections 2.4–2.7. Answer each question in a few sentences (about 3–5) in your own words.",
    problems: [
      {
        topicSlug: "agents-of-socialization",
        prompt:
          "A teenager's parents stress obedience and following rules, but his friend group prizes taking risks and questioning authority, and he finds himself pulled between the two. Using the concept of agents of socialization, explain what is happening and why this kind of tension can actually help form his identity. (3–5 sentences.)",
        correctAnswer:
          "The teenager is caught between two agents of socialization — the family and the peer group — that are transmitting conflicting norms and values. The family, the first and earliest agent, has stressed obedience, while the peer group, especially powerful in adolescence and one of the few agents a young person can choose, prizes risk-taking and questioning authority. Because these agents' lessons conflict, he must negotiate among them rather than simply absorbing one. That negotiation is precisely where personal identity is forged: by weighing competing expectations, he develops a sense of self somewhat independent of any single source. This is why socialization can transmit a culture and still produce genuine individual variation rather than identical people.",
        explanation:
          "Full credit: identifies family and peer group as competing agents of socialization, explains the conflict, and explains that negotiating between agents is how individual identity is formed.",
      },
      {
        topicSlug: "social-construction-of-self",
        prompt:
          "A false rumor spreads that a healthy bank is about to collapse; panicked customers withdraw their money all at once, and the bank actually fails. Explain this outcome using the Thomas theorem and the idea of the social construction of reality. (3–5 sentences.)",
        correctAnswer:
          "This is a textbook illustration of the Thomas theorem: if people define situations as real, they are real in their consequences. The belief that the bank would collapse was false, but because customers acted on their definition of the situation as if it were true, their collective behavior — a rush of withdrawals — produced the very collapse they feared. This shows how reality is socially constructed: a shared definition, even a mistaken one, can reshape the material world through the actions it prompts. The bank's failure was not caused by any prior financial weakness but by the self-fulfilling consequences of a shared belief. It demonstrates that 'socially constructed' does not mean 'imaginary' — constructions can be entirely real in their effects.",
        explanation:
          "Full credit: invokes the Thomas theorem, explains that acting on a false definition produced the real collapse, and connects this to reality being socially constructed yet consequential.",
      },
      {
        topicSlug: "groups-organizations-bureaucracy",
        prompt:
          "At a government agency, a clerk refuses to help a desperate applicant because a required form has a small formatting error, even though everyone can see the applicant qualifies. Using Weber's account of bureaucracy and Merton's critique, explain both the intended logic and the dysfunction on display. (3–5 sentences.)",
        correctAnswer:
          "Weber described bureaucracy as governance by impersonal, written rules applied uniformly, which is meant to ensure fairness by treating cases by rule rather than by favoritism. The clerk's insistence on the correct form reflects that intended logic of impersonality and adherence to procedure. But the situation also displays what Merton called the bureaucratic personality: officials follow rules so rigidly that the rules defeat the organization's actual purpose. Here, blocking a clearly qualified applicant over a trivial formatting error is a case of goal displacement, where following the procedure has replaced serving the mission the procedure was meant to advance. The scene captures Weber's ambivalence — bureaucracy's rule-bound fairness can harden into the dehumanizing rigidity he feared as the 'iron cage.'",
        explanation:
          "Full credit: explains bureaucracy's impersonal rule-following as the intended logic, and identifies the rigidity as Merton's bureaucratic personality / goal displacement (the rule defeating the purpose).",
      },
    ],
  },
  {
    kind: "test",
    title: "Week 2 Test — Culture, Self, and Society",
    weekNumber: 2,
    isTimed: true,
    timeLimitMinutes: 35,
    instructions:
      "Timed. 35 minutes. Covers sections 2.1–2.7. Answer each question in 4–6 sentences, reasoning from the scenario to the relevant concepts. Pasting is disabled; keystrokes are screened for AI use.",
    problems: [
      {
        topicSlug: "what-culture-is",
        prompt:
          "A new social media platform spreads rapidly, but for years there are no shared norms about what is rude to post, when to respond, or how private a message is, and people constantly offend one another by accident. Using the concepts of material and nonmaterial culture and culture lag, explain what is happening. (4–6 sentences.)",
        correctAnswer:
          "The platform itself is material culture — a physical technology and its products — while the norms governing how to use it politely are nonmaterial culture, the intangible rules and expectations of conduct. The constant accidental offense arises because the two are out of sync: William Ogburn's concept of culture lag describes exactly this, the period in which material culture changes faster than the norms needed to regulate it catch up. The technology arrived almost instantly, but shared folkways about posting, responding, and privacy had not yet formed, so people had no agreed standards to follow. Over time, as with every new technology, norms will emerge and the lag will close. Until then, the absence of settled norms produces friction and misunderstanding. This shows that norms are learned social agreements, not automatic features of any technology.",
        explanation:
          "Full credit: distinguishes the platform (material culture) from usage norms (nonmaterial culture), and applies culture lag to explain the gap producing accidental offense.",
      },
      {
        topicSlug: "language-subcultures-diversity",
        prompt:
          "In a debate, one side succeeds in getting everyone to describe a policy using its preferred terms, and afterward observers notice the whole discussion seems framed in that side's favor. Using the Sapir-Whorf hypothesis (linguistic relativity), explain how controlling language can shape thought, and note the difference between the strong and moderate versions of the idea. (4–6 sentences.)",
        correctAnswer:
          "The Sapir-Whorf hypothesis, or linguistic relativity, proposes that the language we use shapes how we think and what we notice, rather than merely labeling a pre-existing world. By getting everyone to adopt its preferred terms, one side directed attention and made certain ideas easier to hold and others harder, so the framing of the debate tilted in its favor — an illustration that control over language can be control over thought. It is important to distinguish two versions of the idea: the strong version, that language wholly determines thought, is rejected by researchers, while the moderate version, that language directs attention and makes some ideas more accessible, is well supported. The debate scenario fits the moderate version: the terms did not make opposing thoughts impossible, but they made the favored interpretation more natural and salient. This is why struggles over the vocabulary of a public issue are so consequential. Whoever sets the terms shapes the reasoning.",
        explanation:
          "Full credit: explains linguistic relativity (language shapes/directs thought), applies it to the framing effect of controlling terms, and correctly distinguishes the rejected strong version from the supported moderate version.",
      },
      {
        topicSlug: "socialization",
        prompt:
          "A young man practices the vocabulary, dress, and demeanor of a profession he hopes to enter, long before he is hired. Later he joins a strict military academy that strips away his old habits and rebuilds his identity. Identify the two socialization processes at work and explain each, including the role of Mead's 'taking the role of the other.' (4–6 sentences.)",
        correctAnswer:
          "The first process is anticipatory socialization: the young man is learning and rehearsing the behaviors, dress, and demeanor of a role he expects to occupy in the future, preparing himself in advance for a status he does not yet hold. The second is resocialization, dramatic in what Goffman called total institutions like a military academy, where a prior identity is deliberately stripped away and a new one is built in its place. Mead's concept of taking the role of the other underlies both: to rehearse a profession or to be remade by an institution, the individual must be able to see himself from others' points of view and internalize their expectations. In anticipatory socialization he imagines how future colleagues will see him; in resocialization the academy forces him to adopt the generalized other of the new institution. Both show that socialization continues across the life course, not just in childhood. The self is continually reshaped as a person enters new roles and settings.",
        explanation:
          "Full credit: identifies anticipatory socialization (rehearsing a future role) and resocialization (identity stripped and rebuilt, total institution), and connects both to Mead's role-taking / internalizing others' expectations.",
      },
      {
        topicSlug: "agents-of-socialization",
        prompt:
          "Two equally bright children grow up in different homes: in one, the parents (who work jobs requiring rule-following) stress obedience; in the other, the parents (who work jobs rewarding initiative) stress self-direction. Using the concept of agents of socialization and research on class and child-rearing, explain how the family reproduces the class structure. (4–6 sentences.)",
        correctAnswer:
          "The family is the first and most important agent of socialization, transmitting not only language and basic norms but also the child's social location — including class position. Melvin Kohn's research showed that class shapes what parents emphasize: working-class parents, whose jobs demand following rules, tend to stress obedience, while middle-class parents, whose jobs reward initiative, tend to stress self-direction. The two bright children are therefore being prepared for different kinds of work and different positions in the occupational hierarchy, matching their parents' own. In this way the family quietly reproduces the class structure across generations, conferring on each child dispositions suited to the class they were born into rather than to some other. The children's equal ability does not equalize their preparation, because socialization channels them differently. This is how inequality persists through an institution that appears simply to be raising children.",
        explanation:
          "Full credit: identifies the family as an agent transmitting class location, cites the class difference in child-rearing emphasis (obedience vs. self-direction), and explains this as reproduction of the class structure across generations.",
      },
      {
        topicSlug: "social-construction-of-self",
        prompt:
          "A restaurant server is warm and cheerful while taking orders but, the moment she steps into the kitchen, complains bitterly about the same customers. Using Goffman's dramaturgical approach — front stage, back stage, and impression management — explain what is happening and what it reveals about the self. (4–6 sentences.)",
        correctAnswer:
          "Goffman's dramaturgical approach treats social life as theater, and the server's behavior illustrates it precisely. On the front stage — the dining room, where she performs for an audience of customers — she engages in impression management, presenting a warm, cheerful self appropriate to her role. In the kitchen, the back stage where the audience cannot see, she drops the performance and relaxes, complaining freely about the very customers she just charmed. The contrast is not hypocrisy but the normal structure of social performance: nearly everyone maintains different presentations for different audiences and settings. For Goffman, this reveals that the self is less a fixed essence behind the mask than the effect produced by a successful performance — a social accomplishment that shifts with the audience. The server has not two selves in the sense of deception, but a self that is constructed differently front stage and back stage.",
        explanation:
          "Full credit: applies front stage / back stage and impression management to the scenario, and draws the conclusion that the self is a performed social accomplishment rather than a fixed inner essence.",
      },
      {
        topicSlug: "social-interaction-everyday-life",
        prompt:
          "A woman is simultaneously a surgeon, a mother, and the only child of an ailing parent, and she constantly feels torn between the demands of these positions. Separately, patients relate to her almost entirely through her being a surgeon. Using status set, role conflict, and master status, analyze her situation. (4–6 sentences.)",
        correctAnswer:
          "The woman occupies several statuses at once — surgeon, mother, adult child — which together make up her status set, since everyone holds many positions in the social structure simultaneously. The feeling of being torn among the clashing demands of these different positions is role conflict: the competing obligations of separate roles (the operating schedule versus the child's needs versus the ailing parent) pull against one another. In the hospital, being a surgeon functions as a master status — the one position that overrides the others in shaping how people treat her, so patients relate to her almost entirely through that single role and see her other statuses hardly at all. The analysis shows how the micro-level order of statuses and roles structures even a demanding professional life. It also illustrates that a master status is context-dependent: what dominates in the hospital may recede at home. These concepts give precise names to a very common experience of being pulled in several directions.",
        explanation:
          "Full credit: correctly applies status set (multiple statuses), role conflict (clashing demands across roles), and master status (surgeon overriding other statuses in how patients treat her).",
      },
      {
        topicSlug: "groups-organizations-bureaucracy",
        prompt:
          "In a study, subjects looking at obviously unequal lines nonetheless agree with a unanimous group that the lines are equal. Separately, a charitable organization gradually spends more effort preserving itself than helping anyone. Identify the group dynamic in the first case and the organizational problem in the second, and explain each. (4–6 sentences.)",
        correctAnswer:
          "The first case is conformity, demonstrated by Solomon Asch's experiments, in which individuals denied the clear evidence of their own eyes to agree with a unanimous group. It shows the power of the group over individual judgment, especially the pressure exerted by an in-group whose approval members seek; people will publicly go along with an obviously wrong majority to avoid standing alone. The second case is goal displacement in a formal organization: the means (maintaining the organization) has come to replace the end (helping people) it was created to serve. This connects to Weber's analysis of bureaucracy and Michels' 'iron law of oligarchy,' the tendency of organizations to drift toward preserving themselves and their leadership. In both cases, the collective — group or organization — exerts a force that redirects behavior away from what isolated individuals or the original mission would dictate. The scenarios illustrate how membership in groups and organizations shapes conduct in ways individuals often fail to notice.",
        explanation:
          "Full credit: identifies conformity (Asch) and explains group pressure in the first case, and identifies goal displacement / organizational self-preservation (Weber/Michels) in the second, with a correct explanation of each.",
      },
    ],
  },

  // ── Week 3 ───────────────────────────────────────────────────────────────
  {
    kind: "homework",
    title: "Homework 3.1 — Stratification, class, global inequality, and race",
    weekNumber: 3,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Untimed practice covering sections 3.1–3.4. Answer each question in a few sentences (about 3–5) in your own words.",
    problems: [
      {
        topicSlug: "social-stratification",
        prompt:
          "A commentator argues that surgeons are paid so much more than farmworkers because society rationally rewards its most important jobs to make sure they get filled. Using the Davis-Moore thesis and Tumin's critique, evaluate this claim. (3–5 sentences.)",
        correctAnswer:
          "The commentator is stating the functionalist Davis-Moore thesis, which holds that stratification is useful because society must attach greater rewards to its most important and demanding positions to motivate talented people to fill them. Tumin's conflict critique challenges this on several points. First, it is unclear how we decide which jobs are 'most important' — food production is at least as essential to survival as surgery, yet farmworkers are poorly paid — so importance and reward do not reliably match. Second, rewards often track power rather than importance: the highly paid are frequently those able to protect their advantage, not those doing the most vital work. Third, inequality is also dysfunctional because it wastes the talent of those denied the chance to develop it. The claim therefore assumes what it needs to prove — that pay measures social importance — which the evidence does not support.",
        explanation:
          "Full credit: identifies the Davis-Moore functionalist thesis, then applies Tumin's critique (importance is hard to define, rewards track power not importance, inequality wastes talent) to evaluate it.",
      },
      {
        topicSlug: "social-class-and-mobility",
        prompt:
          "Two workers earn the same salary, but one inherited a paid-off house and a portfolio of investments while the other has heavy debt and no assets. A politician says they are 'in the same class.' Using the distinction between income and wealth, and Weber's multidimensional view of class, explain why this is misleading. (3–5 sentences.)",
        correctAnswer:
          "The politician confuses income with wealth. Income is the flow of money received over a period, and here it is equal, but wealth is the total value of assets owned minus debts, and it differs enormously between the two workers. Wealth is far more unequally distributed than income and is what carries advantage across generations and provides security, so the worker with an inherited house and investments has vastly greater life chances than the indebted one despite their identical salaries. Weber's multidimensional view reinforces the point: class involves economic 'life chances' in the market, not just current earnings, and the wealthier worker's assets translate into greater power and security. Because wealth is often inherited, it is a central engine of stratification's persistence. Treating the two as 'the same class' obscures precisely the inequality that matters most.",
        explanation:
          "Full credit: distinguishes income (flow) from wealth (assets minus debts), notes wealth's greater inequality and intergenerational transmission, and connects to Weber's life-chances view of class.",
      },
      {
        topicSlug: "global-stratification",
        prompt:
          "A student argues that poor nations are poor simply because they lack modern technology and a culture of hard work, and that Western aid and investment will fix this. Contrast this with the dependency/world-systems explanation, and note what each view implies for policy. (3–5 sentences.)",
        correctAnswer:
          "The student is stating modernization theory, which locates the cause of poverty inside poor nations — a lack of technology, institutions, and achievement-oriented cultural values — and prescribes investment and technology transfer from rich nations as the remedy. Dependency and world-systems theory reject this, locating the cause in relationships between nations: poor nations were actively underdeveloped by colonial extraction and remain locked into disadvantageous positions, supplying cheap materials and labor to a wealthy 'core' from an impoverished 'periphery' within a single capitalist system. The two views imply opposite policies: if modernization theory is right, more aid, trade, and investment will help; if dependency theory is right, the remedy is restructuring the exploitative global relationships themselves through debt relief, fairer trade terms, and an end to extraction. Critics note each view has weaknesses — modernization theory is ethnocentric, while dependency theory struggles to explain nations that rose despite it. The explanation one accepts determines what one thinks should be done.",
        explanation:
          "Full credit: identifies the student's view as modernization theory, contrasts it with dependency/world-systems (core-periphery, underdevelopment through colonial extraction), and draws out the opposing policy implications.",
      },
      {
        topicSlug: "race-and-ethnicity",
        prompt:
          "A student insists that race must be a fixed biological fact because people can often be sorted by appearance. A classmate replies that the racial categories on the census have changed repeatedly over the past century. Using the idea that race is socially constructed, adjudicate this disagreement. (3–5 sentences.)",
        correctAnswer:
          "The classmate is closer to the sociological position: race is a social construction, not a fixed biological fact. Biologically, humans are among the least genetically varied species, the visible traits used to sort people vary continuously rather than clustering into discrete races, and there is more genetic variation within any so-called race than between races. The strongest evidence that the categories are constructed is exactly what the classmate cites — they change: groups once counted as separate races were later folded into 'white,' and the census categories themselves have shifted from decade to decade. That people can be sorted by appearance shows only that societies have agreed to treat certain visible traits as meaningful, not that the categories are natural kinds. Race is entirely real as a social fact with profound consequences, but its reality is social, not biological.",
        explanation:
          "Full credit: sides with the constructionist view, cites biological evidence (continuous variation, within-vs-between-group variation) and the historical instability of categories, and distinguishes social reality from biological fact.",
      },
    ],
  },
  {
    kind: "homework",
    title: "Homework 3.2 — Prejudice, gender, and deviance",
    weekNumber: 3,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Untimed practice covering sections 3.5–3.7. Answer each question in a few sentences (about 3–5) in your own words.",
    problems: [
      {
        topicSlug: "prejudice-discrimination-racism",
        prompt:
          "A company's leaders sincerely hold no bias, yet the firm hires almost no one from a particular minority group because it recruits only through employee referrals and its current staff are nearly all from one background. Using the distinction between prejudice, discrimination, and institutional discrimination, explain how unequal outcomes arise without prejudiced individuals. (3–5 sentences.)",
        correctAnswer:
          "This is a clear case of institutional discrimination: bias built into the ordinary, routine workings of an organization that produces unequal outcomes even when no individual acts from prejudice. Prejudice is a biased attitude in the head, and discrimination is biased action by individuals — but here the leaders are sincerely unprejudiced, so neither of those explains the pattern. Instead, the referral-only recruiting policy, applied to a workforce that is already homogeneous, systematically reproduces that homogeneity by drawing new hires from the existing staff's networks. The mechanism is structural, not attitudinal, which is why unequal outcomes persist without any bigot pulling a lever. This example shows why racial inequality can continue long after overt prejudice declines — because it has become embedded in the routine procedures of institutions themselves.",
        explanation:
          "Full credit: distinguishes prejudice (attitude) and discrimination (individual action) from institutional discrimination, and explains how the referral policy produces unequal outcomes structurally without prejudiced individuals.",
      },
      {
        topicSlug: "sex-gender-inequality",
        prompt:
          "A relative claims that men and women 'naturally' prefer different kinds of work, which is why occupations are so segregated by sex. Using the distinction between sex and gender and evidence from cross-cultural variation, explain why a sociologist would challenge the word 'naturally.' (3–5 sentences.)",
        correctAnswer:
          "A sociologist would challenge 'naturally' by distinguishing sex — the biological characteristics that distinguish males and females — from gender, the culturally constructed roles, behaviors, and expectations a society attaches to sex. The claim that occupational preferences are natural mistakes gender for biology. The strongest evidence that gender is constructed rather than biologically fixed is cross-cultural variation: what counts as properly masculine or feminine work differs dramatically across societies, as Margaret Mead documented, so if these preferences were simple biology they would not vary so widely. Occupational sex segregation is better explained by gender socialization from birth and by institutional barriers than by innate preference. The relative's word 'naturally' hides a social arrangement — one that, because it is constructed and institutionalized, could in principle be arranged differently.",
        explanation:
          "Full credit: distinguishes sex (biological) from gender (constructed), uses cross-cultural variation as evidence that gendered work preferences are not natural, and attributes occupational segregation to socialization/institutions.",
      },
      {
        topicSlug: "deviance-crime-social-control",
        prompt:
          "A teenager caught shoplifting once is publicly labeled a 'delinquent,' treated with suspicion by teachers and neighbors, and within a year has fallen in with others so labeled and begun committing more crimes. Using labeling theory and the distinction between primary and secondary deviance, explain this trajectory. (3–5 sentences.)",
        correctAnswer:
          "Labeling theory, from the symbolic-interactionist tradition, holds that deviance is not simply a quality of an act but a consequence of others applying a label and sanctions to an 'offender.' The single shoplifting incident was primary deviance — an initial rule-breaking that, by itself, carried little consequence for the teenager's identity. What changed his trajectory was the reaction: being publicly labeled a 'delinquent' and treated with suspicion pushed him toward secondary deviance, in which he adopts a deviant self-concept and is channeled into a deviant career, including association with others who share the label. The label became a master status shaping how everyone saw and treated him, and he lived up to it. This shows why labeling theory directs attention to who has the power to label whom, since the reaction, not just the original act, produced the escalating deviance.",
        explanation:
          "Full credit: applies labeling theory (reaction defines deviance), distinguishes primary deviance (initial act) from secondary deviance (deviant career following the label), and explains the self-fulfilling escalation.",
      },
    ],
  },
  {
    kind: "test",
    title: "Week 3 Test — Inequality and Social Difference",
    weekNumber: 3,
    isTimed: true,
    timeLimitMinutes: 35,
    instructions:
      "Timed. 35 minutes. Covers sections 3.1–3.7. Answer each question in 4–6 sentences, reasoning from the scenario to the relevant concepts. Pasting is disabled; keystrokes are screened for AI use.",
    problems: [
      {
        topicSlug: "social-stratification",
        prompt:
          "In two societies, a person's lifelong position is fixed at birth by the family they are born into in one, while in the other people can in principle move up or down based on achievement. Both societies, however, tell a story explaining why their inequalities are fair. Using the concepts of closed versus open systems and the role of ideology, analyze this. (4–6 sentences.)",
        correctAnswer:
          "The first society exemplifies a closed stratification system, which permits little movement between strata and ascribes position at birth — the caste system is the classic case, with status fixed, rigidly bounded, and enforced by custom. The second exemplifies an open system, the class system of modern industrial societies, which permits movement based, at least in principle, on achievement and has blurrier boundaries. Yet the scenario highlights a feature common to both: every stratified society develops an ideology that explains why its particular inequalities are fair or natural — divine right and karma in closed systems, meritocracy in open ones. Recognizing that inequality is always accompanied by a legitimating story is a key sociological insight, because it shows the beliefs are not neutral descriptions but supports for the existing order. A sociologist would ask how well each story matches the evidence and whose interests it serves. No real society is perfectly open, so even the achievement-based society retains strong elements of inheritance beneath its meritocratic narrative.",
        explanation:
          "Full credit: correctly classifies the two as closed (caste, ascribed) and open (class, achievement) systems, and analyzes the legitimating ideology both use, noting that sociologists question how well such stories fit the evidence.",
      },
      {
        topicSlug: "social-class-and-mobility",
        prompt:
          "A nation celebrates itself as the ultimate land of opportunity where anyone can rise, yet research shows a child's adult income is strongly predicted by their parents', and that several other countries have more mobility. Using the meritocracy narrative, structural versus individual mobility, and the wealth-versus-income distinction, explain the gap between the myth and the evidence. (4–6 sentences.)",
        correctAnswer:
          "The nation's self-image rests on the meritocracy narrative — the belief that success reflects individual talent and effort and that anyone can rise. The evidence complicates this: a child's eventual position remains strongly predicted by their parents', and cross-national studies find this nation is actually less mobile than several others imagined as more class-bound. Part of the confusion comes from structural mobility, in which economy-wide changes lift whole cohorts regardless of individual merit, which can be mistaken for individual achievement. The wealth-versus-income distinction is also central: because wealth is inherited and far more unequal than income, family background shapes education, networks, and starting capital in ways that heavily condition supposedly individual success. Real mobility exists, but the playing field is far from level, so the myth overstates how open the society is. Mistaking the meritocracy narrative for the reality is precisely the error the sociological imagination is meant to correct.",
        explanation:
          "Full credit: explains the meritocracy narrative, uses the parent-child correlation and cross-national comparison as counterevidence, and invokes structural mobility and inherited wealth to explain the myth/reality gap.",
      },
      {
        topicSlug: "global-stratification",
        prompt:
          "A family in the poorest region of the world lacks clean water, adequate food, and shelter, while a family in a wealthy nation is considered 'poor' because it cannot afford a car or annual vacations. Using absolute versus relative poverty and one theory of global stratification, explain how both can be called poor and why global inequality is so consequential. (4–6 sentences.)",
        correctAnswer:
          "The two families illustrate the distinction between absolute and relative poverty. Absolute poverty is a lack of resources so severe it threatens survival — inadequate food, clean water, and shelter — and describes the first family, concentrated in the poorest nations. Relative poverty is deprivation measured against the ordinary standard of one's own society, which describes the second family, deprived by the standards of a wealthy nation even though its basic survival is not at risk. Both are meaningfully 'poor,' but the stakes differ enormously, which is why a nation's position in the global hierarchy matters so much for life expectancy, child mortality, and material security. A world-systems account would explain the first family's plight by their nation's position in the impoverished periphery, from which wealth is channeled to the wealthy core within a single global capitalist system. Global inequality is consequential precisely because where one is born determines, more than almost anything else, whether one faces absolute or merely relative deprivation.",
        explanation:
          "Full credit: distinguishes absolute poverty (survival-threatening) from relative poverty (deprivation relative to one's society), applies each family correctly, and uses a global-stratification theory (e.g., world-systems core/periphery) to explain the difference and its stakes.",
      },
      {
        topicSlug: "race-and-ethnicity",
        prompt:
          "Under a former regime, a group that made up the overwhelming numerical majority of the population was denied rights, segregated, and treated as a collectivity by a small dominant group. A student objects that a majority cannot be a 'minority group.' Resolve the confusion using the sociological definition of a minority group and the concept of segregation. (4–6 sentences.)",
        correctAnswer:
          "The student is using 'minority' in its everyday numerical sense, but sociology defines a minority group not by numbers but by disadvantage and distinctiveness: a category of people, set apart by physical or cultural traits, who are socially disadvantaged and treated as a collectivity regardless of their individual qualities. By this definition a numerical majority can indeed be a minority group, as under apartheid South Africa, where the disadvantaged group vastly outnumbered the dominant one. Two features define minority status — unequal treatment and a shared sense of collective identity, often heightened by that very treatment — and both were present here. The regime also practiced segregation, the physical and social separation of groups, in this case enforced by law (de jure). Resolving the confusion requires seeing that minority status is about power and disadvantage, not headcount. The example shows why sociological definitions often depart from ordinary usage.",
        explanation:
          "Full credit: gives the sociological definition of a minority group (disadvantage + collective treatment, not numbers), applies it to the majority-that-is-a-minority case, and correctly invokes (de jure) segregation.",
      },
      {
        topicSlug: "prejudice-discrimination-racism",
        prompt:
          "A manager privately holds negative stereotypes about a group but treats them fairly at work for fear of losing his job; a different manager holds no bias at all but routinely passes them over because 'that's how things are done here.' Using Merton's typology of prejudice and discrimination, classify each manager and explain why attitudes and behavior can diverge. (4–6 sentences.)",
        correctAnswer:
          "Merton's typology crosses two dimensions — whether a person is prejudiced (attitude) and whether they discriminate (behavior) — producing four types. The first manager is prejudiced but refrains from discriminating, which Merton calls the timid bigot, holding negative stereotypes yet acting fairly out of fear of sanction. The second manager is unprejudiced but discriminates anyway by going along with the organization's expectations, which Merton calls the fair-weather liberal. The scenario illustrates Merton's central lesson: prejudice and discrimination do not always travel together, so attitudes and behavior can diverge in either direction. This matters because changing one does not automatically change the other — reducing prejudice will not fix the fair-weather liberal's discrimination, which is driven by institutional expectations rather than personal bias. It shows why analyzing inequality requires separating what people feel from what they do. Merton's framework gives precise names to these otherwise puzzling combinations.",
        explanation:
          "Full credit: identifies the first manager as the timid bigot (prejudiced, does not discriminate) and the second as the fair-weather liberal (unprejudiced, discriminates), and explains that attitudes and behavior diverge so changing one need not change the other.",
      },
      {
        topicSlug: "sex-gender-inequality",
        prompt:
          "A woman is promoted to a demanding job but still does most of the housework and childcare at home, works within a company where an invisible barrier keeps women out of the top posts, and earns less than male peers. A colleague says these are just her personal choices. Using the second shift, the glass ceiling, the gender pay gap, and the idea that gender inequality is structural, respond. (4–6 sentences.)",
        correctAnswer:
          "The colleague reduces to personal choice what are in fact structural features of gender stratification — the unequal distribution of wealth, power, and privilege between men and women that is built into institutions, not merely the sum of individual decisions. Her doing most of the housework and childcare despite a demanding job is the 'second shift' documented by Arlie Hochschild, the unequal division of unpaid domestic and care labor that burdens working women. The invisible barrier keeping women out of top posts is the glass ceiling, and her lower pay relative to male peers reflects the gender pay gap, both patterned outcomes rather than personal quirks. Occupational sex segregation and these institutional arrangements shape the 'choices' available to her, so calling them free personal choices ignores the structure within which they are made. Because gender is constructed and institutionalized rather than biologically fixed, this inequality is a social arrangement that could be organized differently. The sociological point is to see the structure behind the appearance of individual choice.",
        explanation:
          "Full credit: correctly applies the second shift, glass ceiling, and gender pay gap, and argues that these are structural/institutional features of gender stratification rather than individual choices.",
      },
      {
        topicSlug: "deviance-crime-social-control",
        prompt:
          "A society heavily polices and harshly punishes street theft committed by the poor, while large-scale corporate fraud that harms thousands is rarely prosecuted and lightly sanctioned. Using conflict theory, the concept of white-collar crime, and Merton's strain theory, analyze this pattern. (4–6 sentences.)",
        correctAnswer:
          "Conflict theory argues that both the content of the law and its enforcement reflect the interests of the powerful, which explains why the street crimes of the disadvantaged are heavily policed and harshly punished while the harms of the powerful are under-defined as crime and under-punished. The corporate fraud is a case of white-collar crime, Edwin Sutherland's term for offenses committed by respectable, high-status people in the course of their occupations, which the system treats far more leniently than street theft. Merton's strain theory adds a further layer: when culturally approved goals like material success are widely shared but legitimate means to reach them are unequally distributed, those blocked from legitimate opportunity are pushed toward 'innovation' — crime for money — so street theft is partly a product of the same stratification the justice system then punishes. Together these ideas explain why the criminal justice system falls so unequally by class. The pattern is not a neutral response to harm but a reflection of who has the power to define and enforce the law.",
        explanation:
          "Full credit: applies conflict theory (law and enforcement serve the powerful), correctly uses white-collar crime for the corporate fraud, and invokes Merton's strain theory (blocked opportunity pushing the poor toward 'innovation') to analyze the unequal pattern.",
      },
    ],
  },

  // ── Week 4 ───────────────────────────────────────────────────────────────
  {
    kind: "homework",
    title: "Homework 4.1 — Family, education, economy, and the state",
    weekNumber: 4,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Untimed practice covering sections 4.1–4.4. Answer each question in a few sentences (about 3–5) in your own words.",
    problems: [
      {
        topicSlug: "family-and-marriage",
        prompt:
          "A commentator laments that with more single-parent households, later marriages, and the recognition of same-sex marriage, 'the family is dying.' Using the debate over the decline versus transformation of the family, and one theoretical perspective, offer a sociological response. (3–5 sentences.)",
        correctAnswer:
          "A sociologist would note that the commentator assumes one particular family form — the mid-century nuclear family — is the family, when in fact the family is a universal institution that takes strikingly varied forms across cultures and history. The trends cited are better read through the transformation-versus-decline debate: rather than dying, the family is changing into new and more diverse forms, including later marriages, blended and single-parent households, and same-sex marriage. Whether one calls this 'decline' or 'transformation' turns largely on how one defines the institution in the first place. A functionalist would ask whether the core functions — socializing children, providing emotional support, conferring social position — are still being performed, and they are, if in new arrangements. The commentator mistakes a change in form for the disappearance of the institution.",
        explanation:
          "Full credit: challenges the assumption that one form is 'the family,' frames the trends via the decline-vs-transformation debate, and applies a perspective (e.g., functionalist analysis of whether core functions persist).",
      },
      {
        topicSlug: "education-and-religion",
        prompt:
          "Two equally intelligent students attend schools funded very differently by local wealth; the wealthier school's students are also more 'fluent' in the tastes and knowledge their teachers reward. Using the hidden curriculum, cultural capital, and the idea that schooling can legitimate inequality, explain how education reproduces advantage. (3–5 sentences.)",
        correctAnswer:
          "A conflict analysis shows that schooling here reproduces inequality rather than curing it. Because school funding is tied to local wealth, the wealthier school commands more resources, giving its equally intelligent students an advantage unrelated to ability. Bourdieu's concept of cultural capital explains the second effect: the tastes, knowledge, and dispositions of the dominant class are exactly what schools reward, so privileged children are already 'fluent' in what teachers value while equally able children from other backgrounds are not. The hidden curriculum reinforces this, transmitting unwritten lessons that advantage those already familiar with them. The danger is that this inherited advantage is then mistaken for earned merit: the apparent meritocracy of schooling legitimates inequality by making a head start look like individual achievement. Education thus confers advantage on those who already have it while presenting the outcome as fair.",
        explanation:
          "Full credit: applies unequal funding, cultural capital (dominant-class dispositions rewarded by schools), and the hidden curriculum, and explains how this reproduces advantage while legitimating it as merit.",
      },
      {
        topicSlug: "economy-and-work",
        prompt:
          "Over a few decades, a region's secure, well-paid factory jobs disappear as manufacturing moves overseas, replaced by short-term, app-based gig work with no benefits. Using the concepts of deindustrialization, the shift among economic sectors, and Marx's idea of alienation, analyze what has happened to workers. (3–5 sentences.)",
        correctAnswer:
          "The region has undergone deindustrialization: manufacturing in the secondary sector has moved offshore under globalization, eroding the secure, well-paid factory jobs that once anchored the working class. The replacement work reflects a shift toward the tertiary (service) sector and, specifically, the gig economy of short-term, app-mediated labor that shifts risk from employers onto workers by stripping away benefits and security. Marx's concept of alienation illuminates the human experience of this change: fragmented, precarious, externally controlled work can leave people estranged from the products and process of their labor, from their own potential, and from one another. Each such economic shift produces winners and losers, and here the losses fall heavily on workers lower in the stratification system. What looks like impersonal economic progress is, for these workers, a downgrade in security, autonomy, and meaning.",
        explanation:
          "Full credit: identifies deindustrialization and the secondary-to-tertiary/gig shift, and applies alienation to describe the degraded experience of precarious, controlled work, noting uneven winners and losers.",
      },
      {
        topicSlug: "power-politics-state",
        prompt:
          "Three leaders each command obedience: a queen whose family has always ruled, a revolutionary who inspires devotion through his personal magnetism, and an elected official whose power comes from the constitutional office she holds. Using Weber's three types of legitimate authority, classify each and explain the basis of each one's authority. (3–5 sentences.)",
        correctAnswer:
          "Weber distinguished three pure types of legitimate authority — power accepted as rightful — by the source of their legitimacy. The queen exercises traditional authority, resting on long-established custom and inheritance: she rules because her family has always ruled and people accept that custom. The revolutionary exercises charismatic authority, resting on his extraordinary personal qualities, which inspire devotion in followers independent of any office or tradition. The elected official exercises rational-legal authority, resting on impersonal written rules and offices, so her power flows from the constitutional position she occupies rather than from her person or lineage. Modern states rest primarily on rational-legal authority, though traditional and charismatic forms persist alongside it. Classifying leaders this way clarifies why obedience is granted and how fragile or durable each basis of authority tends to be.",
        explanation:
          "Full credit: correctly classifies the queen (traditional), the revolutionary (charismatic), and the official (rational-legal), and explains the distinct basis of each type of legitimate authority.",
      },
    ],
  },
  {
    kind: "homework",
    title: "Homework 4.2 — Population, movements, and social change",
    weekNumber: 4,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Untimed practice covering sections 4.5–4.7. Answer each question in a few sentences (about 3–5) in your own words.",
    problems: [
      {
        topicSlug: "population-urbanization-environment",
        prompt:
          "A country's death rate has fallen sharply thanks to better medicine and sanitation, but its birth rate remains high, and its population is growing explosively. Decades later, birth rates fall too and growth levels off. Using demographic transition theory, explain these stages and what typically drives the eventual fall in birth rates. (3–5 sentences.)",
        correctAnswer:
          "Demographic transition theory describes exactly this pattern as a society industrializes. The country is in the early-industrial stage (stage two), in which death rates fall as sanitation, food supply, and medicine improve while birth rates remain high, producing rapid population growth. The later leveling-off is the transition to stage three and then stage four, in which birth rates also fall and population growth slows toward stability. The typical drivers of the falling birth rate are social: as societies industrialize and urbanize, children shift from an economic asset (farm labor) to a cost, child mortality drops so families need fewer births to reach a desired family size, and women's roles and access to education and employment change. This theory explains both the population explosion of the past two centuries and the aging, stabilizing populations of the wealthiest societies today. The key point is that demographic change is driven by social transformation, not biology alone.",
        explanation:
          "Full credit: places the country in stage two of the demographic transition, explains the later fall in birth rates (stages three/four), and identifies social drivers (children becoming a cost, falling mortality, changing roles of women).",
      },
      {
        topicSlug: "collective-behavior-social-movements",
        prompt:
          "Two groups share the same grievance, but one — with money, organizers, media contacts, and a moment of division among elites — grows into an effective movement, while the other fizzles. Using resource mobilization theory and political process theory, explain why grievance alone does not determine a movement's success. (3–5 sentences.)",
        correctAnswer:
          "Resource mobilization theory shifts the focus from grievances, which are almost always present, to resources: movements succeed when they can mobilize money, members, organization, leadership, and media attention. That explains why the first group, equipped with funds, organizers, and media contacts, grew into an effective movement while the equally aggrieved second group, lacking these, fizzled. Political process theory adds the importance of political opportunity — movements advance when the political environment opens, for example through divisions among elites or sympathetic allies, exactly the moment the first group exploited. Together the two theories explain why identical grievances produce very different outcomes: what differs is not how aggrieved people are but what resources and openings they can seize. Grievance is a necessary backdrop, but resources and opportunity are what convert it into an effective movement. This is why studying movements means studying organization and timing, not just discontent.",
        explanation:
          "Full credit: applies resource mobilization theory (money, organization, leadership, media) and political process theory (political opportunity, elite divisions) to explain why grievance alone is insufficient for success.",
      },
      {
        topicSlug: "social-change-modern-world",
        prompt:
          "A new communication technology spreads worldwide within a few years, but laws, etiquette, and institutions struggle for a decade to adjust, and the technology also spreads ideas that fuel movements for change. Using at least two sources of social change (e.g., technology, culture lag, diffusion, social movements), analyze this. (3–5 sentences.)",
        correctAnswer:
          "Several interacting sources of social change are visible here. Technology is one engine: a new communication tool reshapes how people live and interact almost overnight. The decade-long struggle of laws, etiquette, and institutions to catch up is Ogburn's culture lag, the gap in which material culture changes faster than the norms and institutions needed to regulate it. Diffusion is also at work, as the technology and the ideas it carries spread rapidly from one society to another, accelerating change everywhere under globalization. Finally, by spreading ideas that fuel movements, the technology feeds social movements, which convert grievances into organized demands for change. No single factor explains the transformation; technology, culture lag, diffusion, and movements interact. This illustrates the general sociological point that social change flows from multiple, interacting sources rather than any one cause.",
        explanation:
          "Full credit: identifies at least two sources of social change (e.g., technology, culture lag, diffusion, social movements) and correctly applies them to the scenario, noting their interaction.",
      },
    ],
  },
  {
    kind: "test",
    title: "Week 4 Test — Social Institutions and Change",
    weekNumber: 4,
    isTimed: true,
    timeLimitMinutes: 35,
    instructions:
      "Timed. 35 minutes. Covers sections 4.1–4.7. Answer each question in 4–6 sentences, reasoning from the scenario to the relevant concepts. Pasting is disabled; keystrokes are screened for AI use.",
    problems: [
      {
        topicSlug: "family-and-marriage",
        prompt:
          "Two families raise their children very differently: middle-class parents fill their children's time with organized activities, reason with them, and cultivate their skills, while working-class parents give children more unstructured time and expect obedience to adults. Using Annette Lareau's research and the idea that the family channels social forces, explain how these strategies transmit class. (4–6 sentences.)",
        correctAnswer:
          "Annette Lareau's research identified two class-patterned child-rearing strategies matching this scenario. Middle-class parents practice 'concerted cultivation,' actively developing their children's talents through organized activities, reasoning, and negotiation with adults, while working-class parents practice 'the accomplishment of natural growth,' providing more unstructured time and emphasizing obedience to authority. Each strategy transmits the parents' own class position: concerted cultivation instills a sense of entitlement and the skills to navigate institutions like schools and workplaces, while the working-class approach fosters different, less institutionally rewarded dispositions. Because schools and employers reward exactly the skills concerted cultivation builds, the middle-class children gain an advantage that looks like personal merit but is actually inherited. This shows that the family is not a refuge from social forces but one of the main channels through which they flow, quietly reproducing the class structure across generations. The children's outcomes are shaped by structure operating through the intimate setting of the home.",
        explanation:
          "Full credit: identifies Lareau's concerted cultivation vs. accomplishment of natural growth, explains how each transmits class-linked dispositions rewarded (or not) by institutions, and concludes the family reproduces the class structure.",
      },
      {
        topicSlug: "education-and-religion",
        prompt:
          "In one community, religion binds people into a tight moral community and discourages challenging the social order; in a historical case, religious ideas instead inspired believers to transform their economic behavior and society. Using Durkheim's view of religion, Marx's critique, and Weber's Protestant ethic, explain how religion can be both a brake on and an engine of change. (4–6 sentences.)",
        correctAnswer:
          "Durkheim defined religion as a system of beliefs and practices relative to sacred things that binds people into a moral community, and from a functionalist view it promotes cohesion, meaning, and social control — the first community illustrates this integrating, order-affirming role. Marx's critique explains why religion can also be a brake on change: by encouraging acceptance of earthly suffering in hope of heavenly reward, religion can pacify the disadvantaged and legitimate inequality, which is what he meant by calling it 'the opium of the people.' Weber's study of the Protestant ethic shows the opposite possibility: religious ideas became a force for profound economic and social transformation, as a worldview that made disciplined labor and accumulation seem virtuous helped give rise to capitalism. Taken together, these thinkers show that religion is not inherently conservative or radical; depending on its content and context, it can reinforce the existing order or drive its transformation. The two cases in the scenario are simply religion operating in its two possible directions. This is why sociologists study what religion does socially rather than judging its doctrines.",
        explanation:
          "Full credit: uses Durkheim (moral community/cohesion), Marx (opium of the people, legitimating inequality — brake), and Weber (Protestant ethic driving capitalism — engine) to explain religion's dual capacity for stability and change.",
      },
      {
        topicSlug: "economy-and-work",
        prompt:
          "A flight attendant is required not just to serve passengers but to appear genuinely cheerful and manage her own emotions to make customers feel cared for, and she finds this emotional performance exhausting. Using Hochschild's concept of emotional labor and the broader idea of how the organization of work shapes the worker, analyze this. (4–6 sentences.)",
        correctAnswer:
          "This scenario illustrates Arlie Hochschild's concept of emotional labor, which she developed precisely through her study of flight attendants: workers are required to manage and display particular feelings — here, genuine-seeming cheerfulness — as part of the job, selling not only their physical labor but their emotions. What makes this exhausting is that the worker must regulate her inner emotional life to meet the organization's demands, an effort that can leave her estranged from her own feelings. This extends Marx's insight that the organization of work shapes the worker: just as fragmented factory labor produced alienation, service work that commodifies emotion produces its own form of estrangement, now from one's own emotional life. The broader lesson is that different organizations of work do different things to the people who perform them, so the question of what a given job requires is also a question about its human effects. Analyzing work sociologically means asking not just what is produced but what the labor process does to the laborer. The flight attendant's exhaustion is a structural feature of emotional labor, not a personal failing.",
        explanation:
          "Full credit: correctly identifies emotional labor (Hochschild, flight attendants), explains the required management of feeling and its estranging effect, and connects it to the broader idea that the organization of work shapes/alienates the worker.",
      },
      {
        topicSlug: "power-politics-state",
        prompt:
          "In a democracy, one analyst argues that policy simply reflects bargaining among many competing interest groups, none dominant; another argues that a small interlocking elite atop the economy, government, and military makes the decisions that really matter. Identify these two theories, explain the disagreement, and note what is at stake in deciding between them. (4–6 sentences.)",
        correctAnswer:
          "The first analyst holds pluralist theory (associated with Robert Dahl), which argues that power is dispersed among many competing interest groups, none dominant, so policy emerges from bargaining and no single group rules. The second holds power-elite theory (associated with C. Wright Mills), which argues that a small, interlocking elite atop the economic, political, and military institutions makes the decisions that matter, while ordinary democratic politics operates at a less consequential level. The disagreement is fundamentally about where real power lies in a modern democracy — widely distributed, or concentrated at the top. What is at stake is nothing less than a diagnosis of democracy's health: if pluralism is right, democracy works roughly as advertised, but if the power-elite view is right, formal democracy may mask a concentration of real power in few hands. A related Marxist ruling-class theory would go further, holding that the state ultimately serves the dominant economic class regardless of democratic form. Deciding among them requires exactly the sociological tools of evidence, theory, and skepticism toward official accounts that the course has stressed.",
        explanation:
          "Full credit: identifies pluralist theory (Dahl, dispersed power) and power-elite theory (Mills, concentrated elite), explains the core disagreement, and states the stakes (competing diagnoses of whether democracy functions as advertised).",
      },
      {
        topicSlug: "population-urbanization-environment",
        prompt:
          "A community study finds that a toxic waste facility and heavy pollution are located disproportionately in poor, minority neighborhoods, whose residents bear the health burdens while wealthier areas do not. Using environmental sociology and the concept of environmental justice, explain why this is a sociological problem and how it connects to stratification. (4–6 sentences.)",
        correctAnswer:
          "Environmental sociology insists that ecological problems are social problems — produced by human institutions and distributed unequally — rather than purely natural or technical matters. The pattern in the study is a classic case of environmental injustice: research on environmental justice documents that the burdens of environmental harm, such as toxic sites and pollution, fall disproportionately on poor communities and racial minorities. This is a sociological problem because the unequal distribution of harm is not accidental but tied to the stratification system examined in Week 3: groups with less wealth and power are less able to resist having hazards sited near them and have fewer resources to relocate or obtain redress. The health burdens borne by these residents thus reflect and deepen existing class and racial inequalities. Environmental sociologists debate whether meaningful remedies are possible within current economic arrangements or require deeper structural change. Seeing pollution as a matter of power and inequality, not just chemistry, is the core sociological insight here.",
        explanation:
          "Full credit: explains that environmental sociology treats ecological harm as a social problem, applies environmental justice to the unequal siting of hazards, and connects the pattern to class and racial stratification (differences in power to resist harm).",
      },
      {
        topicSlug: "collective-behavior-social-movements",
        prompt:
          "A movement begins as scattered people becoming aware of a shared problem, then develops leaders, organization, and strategy, then becomes a formal established organization, and finally either achieves its goals, is repressed, or is absorbed into the mainstream. Identify the stages in the life course of a social movement and explain what can happen at the final stage. (4–6 sentences.)",
        correctAnswer:
          "The scenario traces the typical life course of a social movement through its stages. It begins with emergence, the initial awareness of a problem among scattered people. It then moves to coalescence, as leadership, organization, and strategy develop and the movement becomes a coordinated force. Next comes bureaucratization, in which the movement institutionalizes into formal, established organizations with defined roles and procedures. The final stage is decline, which — importantly — does not necessarily mean failure: a movement can decline because it is repressed, because it succeeds and its goal is achieved, because it is co-opted or absorbed into the mainstream, or because it transforms into something new. Recognizing these varied endings explains why some movements flare and vanish while others reshape society for generations. The life-course model shows that a movement's trajectory is patterned, and that even 'decline' can represent victory rather than defeat.",
        explanation:
          "Full credit: names the stages (emergence, coalescence, bureaucratization, decline) and explains that the final stage can mean success, failure, repression, co-optation, or transformation — not simply defeat.",
      },
      {
        topicSlug: "social-change-modern-world",
        prompt:
          "A society transforms over a century from small, close-knit agrarian villages where people were bound by shared likeness into a vast, impersonal, urban, industrial order held together by the interdependence of specialized roles. Using Durkheim's and Tönnies's accounts of modernity, and the question of whether change is 'progress,' analyze this transformation. (4–6 sentences.)",
        correctAnswer:
          "This transformation is the great transition to modernity that the classical sociologists sought to understand. Durkheim described it as a shift from mechanical solidarity, based on the likeness of people in small traditional communities, to organic solidarity, based on the interdependence of a complex division of labor in large modern societies — exactly the move from shared likeness to specialized, interdependent roles in the scenario. Tönnies named the same transition a shift from Gemeinschaft, the intimate personal bonds of the village, to Gesellschaft, the impersonal instrumental ties of the urban industrial order. On the question of whether this change is 'progress,' sociology resists both uncritical optimism and reflexive nostalgia: modernity brought unprecedented freedom, prosperity, and individualism, but also new forms of alienation, anonymity, and control. Early evolutionary theories that assumed societies simply advance to higher stages are now rejected as ethnocentric and naive. The sociological approach is to analyze empirically who gains and who loses from the change rather than to assume it is simply improvement or decline.",
        explanation:
          "Full credit: applies Durkheim's mechanical-to-organic solidarity and Tönnies's Gemeinschaft-to-Gesellschaft to the transition, and addresses the progress question by noting change brings gains and losses and rejecting naive evolutionary assumptions.",
      },
    ],
  },

  // ── Final ────────────────────────────────────────────────────────────────
  {
    kind: "final",
    title: "Final — Sociology 101: The Sociological Study of Society",
    weekNumber: 4,
    isTimed: true,
    timeLimitMinutes: 50,
    instructions:
      "Timed cumulative final. 50 minutes. Covers the whole course (sections 1.1–4.7). Answer each question in a paragraph (about 5–7 sentences) in your own words, reasoning from the scenario to the relevant concepts. Pasting is disabled; keystrokes are screened for AI use.",
    problems: [
      {
        topicSlug: "social-change-modern-world",
        prompt:
          "A city faces a wave of home foreclosures. Trace how the major tools of this course would build a complete analysis: start from the sociological imagination, then bring in a theoretical perspective, a form of stratification, an institution, and the possibility of collective action. Show how at least four ideas connect into a coherent sociological account of the situation. (5–7 sentences.)",
        correctAnswer:
          "The sociological imagination is the starting point: rather than treating each foreclosure as one family's personal trouble, it sees a citywide wave as a public issue rooted in social structure and the historical moment — a change in the economy, lending practices, or housing policy. A theoretical perspective then frames the analysis: a conflict theorist would ask who benefits from the lending and foreclosure system and how the losses fall on those with least power, while a functionalist would ask how the disruption affects the stability of the whole. Stratification enters because the burden falls unequally: class and the wealth-versus-income distinction mean families with no assets to fall back on, disproportionately poorer and minority households, are hit hardest, deepening existing inequality. Institutions are central too — the economy organizes the lending and labor markets, the family absorbs the shock, and the state's policies shape both the crisis and any response. Finally, collective action shows how change might come: if enough affected people recognize their shared trouble as a common public issue, they can organize a social movement, mobilizing resources and seizing political opportunity to demand reform. These ideas connect into a single account: structural forces produce a patterned harm, distributed by stratification, channeled through institutions, and potentially answered by organized collective action. That progression from private trouble to public issue to possible remedy is the sociological imagination in motion.",
        explanation:
          "Full credit: connects at least four course ideas — the sociological imagination, a theoretical perspective, stratification, an institution, and collective action/social movements — into a coherent analysis of the foreclosure wave.",
      },
      {
        topicSlug: "three-theoretical-perspectives",
        prompt:
          "A classmate says, 'The three theoretical perspectives are just opinions — you pick the one you like and ignore the others.' Using a single concrete example (such as standardized testing, the family, or crime), argue why a sociologist uses all three perspectives deliberately and what would be lost by relying on only one. (5–7 sentences.)",
        correctAnswer:
          "The classmate misunderstands what a theoretical perspective is: it is not a mere opinion but a lens that determines which questions get asked and which features of a phenomenon become visible. Take standardized testing. A functionalist asks what testing does for the system — how it sorts talent to fill important positions — and would miss, if used alone, the way testing advantages already-advantaged children. A conflict theorist asks who benefits and shows how testing reproduces class advantage, but used alone would understate the genuine coordinating functions testing performs and the shared values around merit. A symbolic interactionist asks how a test score becomes a label that shapes a student's identity and how teachers treat them, capturing the micro level the other two ignore, but used alone would lose sight of the large structures — class, institutions — that decide which interactions are even possible. All three interpretations are true at once, so relying on only one yields a partial, distorted picture. The sociological skill lies precisely in moving deliberately among the lenses rather than mistaking one for the whole. That is why the perspectives are analytical tools, not competing opinions to choose between on taste.",
        explanation:
          "Full credit: explains that perspectives are analytical lenses shaping which questions are asked, applies all three to one concrete example, and identifies a specific blind spot of relying on any single perspective.",
      },
      {
        topicSlug: "socialization",
        prompt:
          "A friend insists, 'People are just born the way they are — society doesn't really shape who you become.' Using evidence and concepts from the course (such as cases of isolation, Cooley's looking-glass self, Mead's role-taking, and the agents of socialization), construct a sociological rebuttal. (5–7 sentences.)",
        correctAnswer:
          "The friend overstates biology and ignores the overwhelming evidence that the self is a social product built through socialization. Cases of severely isolated children who never developed language or normal social functioning show that without human interaction in early childhood, even basic human capacities fail to emerge — biology provides potential, but social experience supplies the content. Cooley's looking-glass self shows that our very self-image is assembled from how we imagine we appear to others and their judgments of us, so the self is formed in the 'mirror' of other people. Mead deepened this: the self develops through learning to take the role of the other and internalizing the generalized other, the attitudes of society as a whole, so that thinking itself is an internalized social conversation between the 'I' and the 'me.' The agents of socialization — family, school, peers, media — transmit language, values, norms, and even one's class position and identity throughout life. Socialization does not end in childhood but continues through anticipatory socialization and resocialization as people enter new roles. Far from being merely 'born the way they are,' people become who they are through a lifelong social process — which is why the same biological human raised in different societies becomes a profoundly different person.",
        explanation:
          "Full credit: rebuts biological determinism using at least three course ideas (isolation cases, looking-glass self, Mead's role-taking/generalized other, agents of socialization) to argue the self is a lifelong social product.",
      },
      {
        topicSlug: "prejudice-discrimination-racism",
        prompt:
          "A policymaker says, 'Now that overt bigotry is far less common than it used to be, racial inequality should simply fade away on its own.' Using the distinction between prejudice and discrimination, the concept of institutional discrimination, and the self-fulfilling prophecy, explain why this prediction is likely wrong. (5–7 sentences.)",
        correctAnswer:
          "The policymaker assumes that racial inequality is driven mainly by individual prejudice, so that reducing bigoted attitudes will erase it, but the course shows this reasoning is flawed. Prejudice is a biased attitude while discrimination is biased action, and Merton's typology shows the two do not always travel together, so reducing prejudice does not automatically end discriminatory behavior. More importantly, institutional discrimination means bias can be built into the ordinary, routine workings of institutions — hiring rules, lending patterns, school funding tied to local wealth — producing unequal outcomes even when no individual acts from prejudice. Because these mechanisms are structural, racial inequality can persist, and even deepen, long after overt bigotry declines. The self-fulfilling prophecy compounds this: if a group is disadvantaged by institutions and then judged by the resulting disadvantage, the stereotype appears confirmed and the cycle continues, rooted in the Thomas theorem. Breaking the cycle therefore requires changing institutional arrangements, not merely individual attitudes. The prediction that inequality will fade on its own mistakes a structural problem for a purely attitudinal one.",
        explanation:
          "Full credit: distinguishes prejudice from discrimination, explains institutional discrimination as producing inequality without prejudiced individuals, and uses the self-fulfilling prophecy to argue inequality won't fade merely because attitudes improve.",
      },
      {
        topicSlug: "sociology-vs-common-sense",
        prompt:
          "A commentator dismisses a surprising sociological finding by saying, 'That's just common sense — sociologists spend money to prove the obvious.' Using the difference between common sense and evidence, the problem of the familiar, and the requirements of good research (correlation vs. causation, reliability, validity), explain why this dismissal is unfounded. (5–7 sentences.)",
        correctAnswer:
          "The dismissal is unfounded because common sense is a storehouse of a culture's assumptions, frequently wrong, whereas sociology tests claims against systematic evidence rather than accepting what merely feels obvious — findings that everyone 'knows' are true (opposites attract, poverty reflects laziness) are regularly overturned by data. The 'it's just common sense' reaction is often hindsight: many findings seem obvious only after they are demonstrated, and opposite 'commonsense' predictions frequently feel equally obvious before the evidence is in. The problem of the familiar makes this worse — because we are natives of the society we study, our intuitions are shaped by it and cannot be trusted without testing, so the sociologist must work to make the familiar strange. Good research is also far more demanding than intuition: establishing a claim requires distinguishing correlation from causation, ruling out spurious third variables, and ensuring the measures are reliable (consistent on repetition) and valid (actually capturing the concept). A commonsense hunch offers none of these safeguards. What sociology adds is precisely the method for finding out — replacing 'it stands to reason' with 'let us look and see' — which is why its findings, even when they later seem obvious, are knowledge rather than mere opinion.",
        explanation:
          "Full credit: contrasts tested evidence with untested common sense (noting hindsight bias), invokes the problem of the familiar, and cites research requirements (correlation vs. causation, reliability, validity) to show why the dismissal fails.",
      },
    ],
  },
];

type SeedPrimer = SeedTopic;

const REASONING_PRIMERS: SeedPrimer[] = [
  {
    slug: "reasoning-primer-subject",
    title: "How to reason about sociology cases",
    weekNumber: 1,
    blurb:
      "Diagnostic primer: applying the sociological perspective to concrete situations about culture, socialization, inequality, institutions, and social change.",
    lectureTitle: "Primer: How to reason about sociology cases",
    body: `# How to reason about sociology cases

This short primer prepares you for the **Sociology** diagnostic. That check is *ungraded practice* — it never affects your course grade. It is drawn from the four weeks of this course and asks you to *apply* what you have learned to a specific situation, not to recite a definition.

## It tests application, not memorization

A diagnostic question gives you a small, concrete scenario — a citywide pattern being blamed on individuals, a group judged by an outsider's standards, an inequality defended as natural, an institution reproducing advantage — and asks what the course's ideas tell you about it. Knowing the words "sociological imagination" or "institutional discrimination" is not enough; the question wants you to recognize *which* idea fits and *why* it matters in this specific case.

## What the questions reward

- **Reaching for the right concept** — match the situation to the idea that explains it: private troubles connect to public issues, culture is learned and taken for granted, the self is socially constructed, stratification is structural and legitimated by ideology, institutions reproduce inequality, and social change flows from multiple sources.
- **Using evidence from the scenario** — point to the detail that decides it (is a public issue being reduced to personal failings? is an outsider judging by their own standards? is inherited advantage being mistaken for merit?) rather than answering from a general impression.
- **Avoiding the first reflex** — careful reasoning about the specific situation beats pattern-matching to a vaguely similar example from memory, and beats the commonsense answer the course is designed to question.

## How to do this activity well

1. **Read the situation first**, then ask which topic or concept it belongs to.
2. **Find the detail that decides it** — the specific fact, pattern, or behavior that makes one answer better than another.
3. For written items, **give the core idea in a sentence or two** — clear and correct beats long and padded.

Take it as often as you like; the questions are freshly generated every time, and there is no penalty for any answer.`,
  },
  {
    slug: "reasoning-primer-general",
    title: "Core reasoning skills",
    weekNumber: 1,
    blurb:
      "Diagnostic primer: analysis, inference, evaluation, deduction, and induction.",
    lectureTitle: "Primer: Core reasoning skills",
    body: `# Core reasoning skills

This short primer prepares you for the **General Reasoning** diagnostic — an *ungraded* check that tests five genuine reasoning skills. These are the same skills you use to decide what a set of facts really shows, so they matter directly for thinking clearly about sociological evidence and everything else.

## The five skills

- **Analysis** — break an argument into parts: find its **point** (the conclusion), the **reasons** given for it, and any hidden assumption it leans on. Ask: "What is this trying to convince me of, and what does it take for granted?"
- **Inference** — work out what *follows* from what you're told, and how strongly. Tell apart what *must* be true, what is *likely*, and what is only *possible*.
- **Evaluation** — judge how much the reasons actually support the point. Notice when evidence is beside the point, a source isn't trustworthy, or a step doesn't really connect.
- **Deduction** — reasoning where true starting facts *guarantee* the conclusion. If the starting facts are true, the conclusion can't be false. Watch for sneaky forms that only *look* airtight.
- **Induction** — reasoning from a few examples to a *probable* general rule or prediction. Strong induction uses many fair examples; weak induction over-generalizes from too few.

## A recurring trap: things that move together

Most wrong answers are statements that *sound* reasonable but are **not actually backed up by what you were told**. The discipline this check rewards is the same one careful sociological thinking demands: keep apart what the facts **show**, what you're **assuming**, and what only *sounds* right. Two things happening together does not prove one causes the other — correlation is not causation.

## How to do this activity well

1. Find the **point** (conclusion) first, then the reasons.
2. Ask which of the five skills the question is testing.
3. Pick the option that follows **only** from what you were given — not the one that merely sounds true or appealing.

Take it as often as you like; the questions are freshly generated every time, and it never affects your grade.`,
  },
];

// Insert any teaching-to-the-test primer lectures whose slug is not yet present.
// Safe to run on every boot: it only adds what is missing.
export async function seedReasoningPrimersIfMissing(): Promise<void> {
  const currentSlugs = REASONING_PRIMERS.map((p) => p.slug);
  const stale = await db
    .delete(topicsTable)
    .where(
      and(
        like(topicsTable.slug, "reasoning-primer-%"),
        notInArray(topicsTable.slug, currentSlugs),
      ),
    )
    .returning({ slug: topicsTable.slug });
  if (stale.length > 0) {
    logger.info(
      { removed: stale.map((s) => s.slug) },
      "Reasoning primers: removed obsolete primers",
    );
  }
  let added = 0;
  for (let i = 0; i < REASONING_PRIMERS.length; i++) {
    const t = REASONING_PRIMERS[i]!;
    const existing = await db
      .select({ id: topicsTable.id })
      .from(topicsTable)
      .where(eq(topicsTable.slug, t.slug));
    if (existing.length > 0) continue;
    const [inserted] = await db
      .insert(topicsTable)
      .values({
        slug: t.slug,
        title: t.title,
        weekNumber: t.weekNumber,
        blurb: t.blurb,
        position: 900 + i,
      })
      .returning();
    if (!inserted) throw new Error(`Failed to insert primer ${t.slug}`);
    await db.insert(lecturesTable).values({
      topicId: inserted.id,
      weekNumber: t.weekNumber,
      title: t.lectureTitle,
      body: t.body,
    });
    added += 1;
  }
  if (added > 0) {
    logger.info({ added }, "Reasoning primers seeded");
  } else {
    logger.info("Reasoning primers: already present, skipping");
  }
}

export async function seedIfEmpty(): Promise<void> {
  const markerTopic = await db
    .select({ id: topicsTable.id })
    .from(topicsTable)
    .where(eq(topicsTable.slug, "sociological-imagination"));
  let currentVersion: string | null = null;
  try {
    const storedVersion = await db
      .select({ value: seedMetaTable.value })
      .from(seedMetaTable)
      .where(eq(seedMetaTable.key, "content_version"));
    currentVersion = storedVersion[0]?.value ?? null;
  } catch (err) {
    logger.warn({ err: (err as Error).message }, "Seed: seed_meta unavailable, treating version as unset");
    currentVersion = null;
  }
  if (markerTopic.length > 0 && currentVersion === SEED_CONTENT_VERSION) {
    logger.info("Seed: course content present and current, skipping");
    return;
  }
  if (markerTopic.length > 0) {
    logger.warn(
      { storedVersion: currentVersion, expected: SEED_CONTENT_VERSION },
      "Seed: course content present but out of date — re-seeding with the current curriculum",
    );
  }

  await db.transaction(async (tx) => {
    const existing = await tx.execute(sql`select count(*)::int as n from topics`);
    const row = (existing.rows[0] ?? {}) as { n?: number };
    if ((row.n ?? 0) > 0) {
      logger.warn(
        "Seed: stale course content detected — replacing with the Sociology 101 curriculum",
      );
      await tx.execute(
        sql`TRUNCATE TABLE answers, attempts, practice_attempts, practice_problems, practice_sessions, problems, assignments, lectures, topics, diagnostic_responses, diagnostic_attempts, diagnostic_items, diagnostic_assessments RESTART IDENTITY CASCADE`,
      );
    } else {
      logger.info("Seed: populating course content");
    }

    const slugToTopicId = new Map<string, number>();
    for (let i = 0; i < TOPICS.length; i++) {
      const t = TOPICS[i]!;
      const [inserted] = await tx
        .insert(topicsTable)
        .values({
          slug: t.slug,
          title: t.title,
          weekNumber: t.weekNumber,
          blurb: t.blurb,
          position: i,
        })
        .returning();
      if (!inserted) throw new Error(`Failed to insert topic ${t.slug}`);
      slugToTopicId.set(t.slug, inserted.id);
      await tx.insert(lecturesTable).values({
        topicId: inserted.id,
        weekNumber: t.weekNumber,
        title: t.lectureTitle,
        body: t.body,
      });
    }

    for (let i = 0; i < ASSIGNMENTS.length; i++) {
      const a = ASSIGNMENTS[i]!;
      const [inserted] = await tx
        .insert(assignmentsTable)
        .values({
          kind: a.kind,
          title: a.title,
          weekNumber: a.weekNumber,
          position: i,
          isTimed: a.isTimed,
          timeLimitMinutes: a.timeLimitMinutes,
          instructions: a.instructions,
        })
        .returning();
      if (!inserted) throw new Error(`Failed to insert assignment ${a.title}`);
      for (let p = 0; p < a.problems.length; p++) {
        const prob = a.problems[p]!;
        const topicId = slugToTopicId.get(prob.topicSlug);
        if (!topicId) throw new Error(`Unknown topic slug ${prob.topicSlug}`);
        await tx.insert(problemsTable).values({
          assignmentId: inserted.id,
          topicId,
          position: p,
          prompt: prob.prompt,
          correctAnswer: prob.correctAnswer,
          explanation: prob.explanation,
          hint: prob.hint ?? null,
        });
      }
    }

    await tx
      .insert(seedMetaTable)
      .values({ key: "content_version", value: SEED_CONTENT_VERSION })
      .onConflictDoUpdate({
        target: seedMetaTable.key,
        set: { value: SEED_CONTENT_VERSION, updatedAt: new Date() },
      });
  });

  logger.info(
    { topics: TOPICS.length, assignments: ASSIGNMENTS.length, version: SEED_CONTENT_VERSION },
    "Seed complete",
  );
}
