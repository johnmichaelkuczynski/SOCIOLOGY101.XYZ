# 🔎 Sociology 101

**A Self-Contained, Four-Week Introduction to Sociology That Teaches, Tutors, Drills, and Grades Itself**

---

## 🧩 Overview

Sociology 101 is a self-paced, single-user web course that delivers a complete introduction to sociology — the systematic study of social life, groups, institutions, and the forces that shape human behavior — taught, tutored, drilled, and graded entirely by AI, with built-in academic-integrity enforcement. It is an *introductory* course in the sense that it assumes no prior exposure to the subject and builds the whole discipline carefully from first principles.

It turns one powerful idea — *that our personal lives are shaped by social forces we rarely see* — into one product: read each lesson at the depth you want, ask a tutor scoped to the exact section you're on, drill questions whose difficulty adapts to you in real time, and submit homework, tests, and a final that are AI-graded with feedback and screened for AI-generated answers. The material is kept approachable and concrete — it shows how the sociological imagination reframes private troubles as public issues, how the founding thinkers explained social order and conflict, how sociologists gather evidence through surveys, experiments, and fieldwork, how culture and socialization make us who we are, how inequality is structured across class, race, and gender, and how institutions and social movements drive change.

The curriculum is organized into **four weeks and 28 topics**. **Week 1 — The sociological perspective:** the sociological imagination; sociology vs. common sense; Durkheim, Marx, and Weber; functionalism, conflict theory, and symbolic interaction; the research process; surveys, experiments, and fieldwork; research ethics. **Week 2 — Culture, self, and society:** norms, values, and symbols; language and subcultures; socialization; the agents of socialization; the social construction of the self; everyday interaction; groups and bureaucracy. **Week 3 — Inequality and social difference:** social stratification; class and mobility; global stratification; race and ethnicity; prejudice and racism; sex and gender inequality; deviance and social control. **Week 4 — Social institutions and change:** family and marriage; education and religion; economy and work; power and the state; population, urbanization, and the environment; social movements; social change.

Designed for **adults taking up the subject — undergraduates, graduate students, researchers, and faculty — plus instructors evaluating AI-taught coursework and researchers studying AI academic integrity**, Sociology 101 pairs a real curriculum with two layers of AI-authorship detection — surfacing not just *whether* the writing looks AI-generated, but whether the *act of producing it* did.

---

## 🧠 What It Does

- **Four-Week Structured Curriculum** — A complete plain-language intro syllabus across 28 topics, from "the sociological imagination" to social change. The course ships with lessons, weekly homework sets, timed tests, and a cumulative final exam.
- **Three-Depth Lessons** — Every lesson is available at **Short / Medium / Long** length, AI-rewritten while preserving the same examples and learning objectives. Skim the concept, expand it on demand, or read the deeper cut.
- **Section-Scoped AI Tutor** — Ask a question about the paragraph you're reading and the answer streams back token-by-token, grounded in that exact lecture section. Suggested starter questions are pre-generated per lecture.
- **Adaptive Topic Practice** — Generated problem sets that move difficulty up after a streak and down after a miss, with explanations on every answer. Per-session difficulty persists, so each drill picks up where the last one left off.
- **AI-Graded Assignments** — Homework, the tests, and the final are scored by an LLM grader that judges semantic equivalence to a model answer, returns per-problem correctness *plus* a written rationale, then rolls up to a percent score on the attempt.
- **Two-Layer AI Detection on Every Submission** — Each submitted answer is screened by both a static text classifier (GPTZero) and a diachronic keystroke-pattern detector. Each verdict ships with a human-readable rationale.
- **Diagnostic Reasoning Checks** — Two instruments (Sociology subject reasoning; and General Reasoning across analysis, inference, evaluation, deduction, and induction), each offered in three formats (multiple choice, hybrid, or written) and three lengths, at four points in the journey (before, one-third, two-thirds, and after the course). They are ungraded practice — takeable anytime, unlimited, with freshly generated questions every attempt — and never affect the grade (coursework is 100%).
- **Live Analytics** — Dashboard KPIs (attempts, accuracy, streak), per-topic mastery percentages, and a recent-activity feed — so progress, weak spots, and momentum are all visible at a glance.
- **Operator Diagnostics** — One-click self-tests (system health and synthetic-student end-to-end run) verify the entire stack — database, OpenAI integration, GPTZero, detection pipeline, and the practice/grade loop — before you trust a session.

---

## ⚙️ Technical Features

- **Two-Layer AI-Authorship Detection** —
  - **Static (GPTZero):** Every submitted answer is sent to GPTZero's `predict/text` endpoint; the per-document AI probability is blended `0.85 × GPTZero + 0.15 × structural-heuristic` for the final score. If GPTZero is unavailable, the system silently falls back to an LLM scorer plus heuristic — submissions never block.
  - **Diachronic (Keystroke Pattern):** The student textarea captures keystroke count, erase count, bulk-insert events, longest bulk insert, rewrite segments, and total duration. A scorer penalizes paste-then-reword behavior, low keystroke-to-output ratios, and impossibly sustained typing speeds — catching AI use even when the final text is reworded enough to pass GPTZero.
- **Diagnostic Self-Tests** —
  - **System Diagnostic** (`/diagnostics/system`): Ordered checks — environment, database round-trip, course-seed integrity, OpenAI chat completion, OpenAI JSON mode, detection pipeline, AI-positive control sample, and GPTZero connectivity. Each step returns pass/fail, timing, and a raw error string.
  - **Synthetic-Student Diagnostic** (`/diagnostics/synthetic-run`): Spins up a fake student, runs a practice session (wrong → adjust ↓ → right → adjust ↑), takes a full assignment attempt, submits it, and verifies grading + detection + analytics all reflect the run. End-to-end stack proof in one click.
- **Contract-First API** — A single OpenAPI document is the source of truth; React Query hooks for the UI and Zod validators for the server are generated from it. Request and response shapes can't drift between client and server because both come from the same spec.
- **Streaming AI Tutor** — Token-by-token Server-Sent-Event streaming for tutor answers, with a section-scoped system prompt so responses stay grounded in the lecture the student is reading.
- **Adaptive Practice Engine** — Per-session difficulty (1–4 continuous) adjusts after each attempt; the next-problem generator takes the current difficulty and the topic as input, so the question pool is generated on demand instead of pre-baked.
- **Operator Console** — A dedicated Diagnostics page in the student app surfaces both self-tests with one-click execution, per-step pass/fail rows, and raw error output for debugging.
- **Living README** — This README plus a companion `BLUEPRINT.md` architecture document are kept in lock-step with the code — short-form and long-form views of the same truth.

---

## 📊 Designed For

- **Adults Taking Up the Subject:** A complete, from-first-principles introduction to sociology delivered with on-demand tutoring and adaptive practice — no instructor required.
- **Instructors & Curriculum Designers:** A working reference for what AI-taught, AI-graded, AI-detection-screened coursework actually looks like end-to-end.
- **Academic-Integrity Researchers:** A live testbed for layered AI-authorship detection that combines text-based classification with behavioral keystroke evidence.
- **Product & Engineering Teams:** A reference implementation of contract-first full-stack architecture, streaming AI UX, and self-diagnostic operator tooling in a Replit pnpm monorepo.

---

## 💡 Core Idea

Sociology 101 reframes an AI-taught course as a *closed accountability loop*.

It doesn't just teach the material and grade the homework — it **teaches**, **tutors**, **drills**, **grades**, **detects misuse**, and **proves the whole pipeline still works** with a single click. The result is a self-paced course that students can actually trust to be fair, and that instructors can actually trust to be honest.

**Sociology 101 — where the curriculum, the tutor, the grader, and the integrity check all live in one room.**

---

## 👤 User preferences

- The user prefers to **convert the existing app in place** (e.g. replacing the prior course content/branding with the new subject) rather than create a standalone clone — keep all functionality and format intact when making content/branding changes.
