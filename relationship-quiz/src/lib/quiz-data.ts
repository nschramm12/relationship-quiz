// ============================================================
// RELATIONSHIP ASSESSMENT ENGINE
// Based on:
// - Gottman Institute's Four Horsemen research (Gottman & Silver, 1999)
// - Sternberg's Triangular Theory of Love (1986)
// - Spanier's Dyadic Adjustment Scale (DAS, 1976)
// - Rusbult's Investment Model (1980, 1983)
// - Levenson & Gottman's Physiological Linkage studies (1985)
// - Arriaga & Agnew's commitment research (2001)
// - Simpson's attachment theory applications (1990)
// ============================================================

export type Category =
  | "trust"
  | "communication"
  | "compatibility"
  | "investment"
  | "respect"
  | "intimacy";

export interface Answer {
  text: string;
  score: number; // 0 = worst, 4 = best
}

export interface Question {
  id: number;
  category: Category;
  weight: number; // 1.0 = standard, 1.5 = high importance, 2.0 = critical
  question: string;
  context: string; // brief research note shown to user
  answers: Answer[];
}

export interface CategoryResult {
  category: Category;
  label: string;
  rawScore: number;
  maxScore: number;
  percentage: number;
  grade: string;
  gradeColor: string;
  description: string;
  verdict: string;
}

export interface QuizResult {
  totalWeightedScore: number;
  maxWeightedScore: number;
  percentage: number;
  overallGrade: string;
  outcome: "STAY" | "WORK ON IT" | "LEAVE";
  outcomeColor: string;
  summary: string;
  detail: string;
  categories: CategoryResult[];
  criticalFlags: string[];
}

// Category metadata
export const CATEGORY_META: Record<
  Category,
  { label: string; weight: number }
> = {
  trust: { label: "Trust & Honesty", weight: 1.0 },
  communication: { label: "Communication", weight: 1.0 },
  compatibility: { label: "Core Compatibility", weight: 1.0 },
  investment: { label: "Investment & Commitment", weight: 1.0 },
  respect: { label: "Respect & Safety", weight: 1.0 },
  intimacy: { label: "Emotional Intimacy", weight: 1.0 },
};

export const QUESTIONS: Question[] = [
  // ── TRUST & HONESTY (Questions 1–4) ──────────────────────────────
  {
    id: 1,
    category: "trust",
    weight: 2.0,
    question: "When your partner tells you something, do you actually believe them?",
    context: "Gottman (1999): Trust erosion is the #1 predictor of relationship dissolution — ahead of infidelity.",
    answers: [
      { text: "Yes — their word means something to me.", score: 4 },
      { text: "Mostly. Small doubts sometimes.", score: 3 },
      { text: "I verify things they tell me. Often.", score: 1 },
      { text: "No. I assume they're lying until proven otherwise.", score: 0 },
    ],
  },
  {
    id: 2,
    category: "trust",
    weight: 1.5,
    question: "Has your partner ever cheated on you, lied about something major, or broken a significant promise?",
    context: "Drigotas et al. (1999): A single major betrayal reduces long-term satisfaction by an avg of 38% even after reconciliation.",
    answers: [
      { text: "Never. Clean record.", score: 4 },
      { text: "Once — we worked through it and rebuilt.", score: 2 },
      { text: "Yes, more than once. Patterns exist.", score: 0 },
      { text: "I'm not sure — and that uncertainty itself is the problem.", score: 1 },
    ],
  },
  {
    id: 3,
    category: "trust",
    weight: 1.5,
    question: "Do you feel safe being honest with your partner without fearing their reaction?",
    context: "Psychological safety (Edmondson, 1999) applied to romantic pairs: partners who can't self-disclose show 2.3× higher breakup rates.",
    answers: [
      { text: "Completely. I can say anything to them.", score: 4 },
      { text: "Mostly, but I soften things to avoid blowups.", score: 2 },
      { text: "I hide things from them regularly to keep the peace.", score: 1 },
      { text: "No — honesty has blown up on me multiple times.", score: 0 },
    ],
  },
  {
    id: 4,
    category: "trust",
    weight: 1.0,
    question: "How do you feel when they're out without you?",
    context: "Buunk (1997): Jealousy frequency correlates r=0.61 with attachment anxiety and trust deficits.",
    answers: [
      { text: "Fine. They have a life. So do I.", score: 4 },
      { text: "Slightly uneasy but I brush it off.", score: 3 },
      { text: "I check my phone constantly waiting for updates.", score: 1 },
      { text: "Anxious, paranoid, or suspicious every time.", score: 0 },
    ],
  },

  // ── COMMUNICATION (Questions 5–7) ─────────────────────────────────
  {
    id: 5,
    category: "communication",
    weight: 2.0,
    question: "When you fight, how does it usually end?",
    context: "Gottman's Four Horsemen: contempt alone predicts divorce with 93% accuracy. Stonewalling + contempt = almost certain failure.",
    answers: [
      { text: "Resolution — we actually solve things.", score: 4 },
      { text: "Truce — tension fades but it's unresolved.", score: 2 },
      { text: "One of us shuts down completely (stonewalling).", score: 1 },
      { text: "Screaming, cruelty, or someone leaves. Nothing changes.", score: 0 },
    ],
  },
  {
    id: 6,
    category: "communication",
    weight: 1.5,
    question: "Does your partner listen to understand, or listen to respond?",
    context: "Active listening predicts relationship satisfaction at r=0.58 (Weger et al., 2014). Feeling unheard is the #2 complaint in breakup surveys.",
    answers: [
      { text: "They genuinely listen — I feel understood.", score: 4 },
      { text: "Hit or miss depending on the topic.", score: 2 },
      { text: "They mostly wait for their turn to talk.", score: 1 },
      { text: "They interrupt, dismiss, or talk over me.", score: 0 },
    ],
  },
  {
    id: 7,
    category: "communication",
    weight: 1.5,
    question: "Can you bring up something that bothers you without it becoming a war?",
    context: "Harsh startup (Gottman, 1999): When conversations begin with criticism or contempt, they end negatively 96% of the time.",
    answers: [
      { text: "Yes — we can have hard conversations like adults.", score: 4 },
      { text: "Sometimes, if I choose the timing carefully.", score: 2 },
      { text: "Rarely — it almost always escalates.", score: 1 },
      { text: "Never. I don't even try anymore.", score: 0 },
    ],
  },

  // ── CORE COMPATIBILITY (Questions 8–11) ──────────────────────────
  {
    id: 8,
    category: "compatibility",
    weight: 1.5,
    question: "Where do you see yourself in 5 years vs. where do they see themselves?",
    context: "Cate et al. (1988): Value congruence on life goals is the strongest predictor of long-term satisfaction among 18–25 year olds.",
    answers: [
      { text: "Aligned — our futures overlap naturally.", score: 4 },
      { text: "Different but compatible — we've talked about it.", score: 3 },
      { text: "Never discussed it, and I'm scared to ask.", score: 1 },
      { text: "Completely opposite — one of us would have to sacrifice everything.", score: 0 },
    ],
  },
  {
    id: 9,
    category: "compatibility",
    weight: 1.0,
    question: "Do you actually enjoy spending time with this person, or is it mostly comfort and habit?",
    context: "Aron et al. (1992): Self-expansion theory — relationships survive long-term only when both people feel growth and genuine enjoyment, not just attachment.",
    answers: [
      { text: "They're genuinely one of my favorite people.", score: 4 },
      { text: "I enjoy it, but it's become routine.", score: 2 },
      { text: "It depends on their mood — they're unpredictable.", score: 1 },
      { text: "Honestly, mostly habit. The spark is gone.", score: 0 },
    ],
  },
  {
    id: 10,
    category: "compatibility",
    weight: 1.5,
    question: "Do your core values (money, family, lifestyle, religion, ambition) line up?",
    context: "Luo & Klohnen (2005): Value similarity — not personality similarity — predicts relationship satisfaction. Effect size d=0.7.",
    answers: [
      { text: "Yes — we're cut from the same cloth on what matters.", score: 4 },
      { text: "Mostly. A few differences we've navigated.", score: 3 },
      { text: "We're different but avoid talking about it.", score: 1 },
      { text: "No — our core worldviews fundamentally clash.", score: 0 },
    ],
  },
  {
    id: 11,
    category: "compatibility",
    weight: 1.0,
    question: "How do you feel when you imagine introducing them to the most important people in your life?",
    context: "Social network approval correlates r=0.45 with relationship longevity (Sprecher & Felmlee, 1992). Embarrassment is a major suppressed signal.",
    answers: [
      { text: "Proud. I want everyone to know them.", score: 4 },
      { text: "Fine — neutral, no anxiety.", score: 3 },
      { text: "A little embarrassed or anxious about it.", score: 1 },
      { text: "I actively avoid it or hide the relationship.", score: 0 },
    ],
  },

  // ── INVESTMENT & COMMITMENT (Questions 12–14) ─────────────────────
  {
    id: 12,
    category: "investment",
    weight: 2.0,
    question: "If you found out they were moving to another city, what would your gut reaction be?",
    context: "Rusbult's Investment Model (1983): Commitment = satisfaction + investment − alternatives. This question isolates commitment from comfort.",
    answers: [
      { text: "I'd figure out how to make it work.", score: 4 },
      { text: "I'd be devastated but might not follow.", score: 2 },
      { text: "Secretly relieved.", score: 0 },
      { text: "I already have one foot out the door.", score: 0 },
    ],
  },
  {
    id: 13,
    category: "investment",
    weight: 1.5,
    question: "Are you staying in this relationship because you want to, or because you're scared to leave?",
    context: "Arriaga & Agnew (2001): 'Constraint commitment' (staying out of fear) predicts lower wellbeing than being single within 12 months.",
    answers: [
      { text: "100% because I want to.", score: 4 },
      { text: "Mostly want to, with some inertia.", score: 2 },
      { text: "More fear than want, if I'm being honest.", score: 1 },
      { text: "Fear. Fear of being alone, starting over, or hurting them.", score: 0 },
    ],
  },
  {
    id: 14,
    category: "investment",
    weight: 1.0,
    question: "When your relationship hits a rough patch, what's your first instinct?",
    context: "Rusbult's EVLN model (1987): Voice (fix it) and Loyalty (wait it out) predict survival. Exit and Neglect predict dissolution.",
    answers: [
      { text: "Work on it — problems are solvable.", score: 4 },
      { text: "Hope it passes on its own.", score: 2 },
      { text: "Shut down and go distant.", score: 1 },
      { text: "Look for the exit or check other options.", score: 0 },
    ],
  },

  // ── RESPECT & SAFETY (Questions 15–17) ───────────────────────────
  {
    id: 15,
    category: "respect",
    weight: 2.0,
    question: "Has your partner ever made you feel small, stupid, or worthless?",
    context: "Gottman (1999): Contempt (eye-rolling, mockery, belittling) is the single most corrosive behavior — linked to immune system suppression in the recipient.",
    answers: [
      { text: "Never. They build me up.", score: 4 },
      { text: "Once or twice in the heat of the moment — apologized genuinely.", score: 2 },
      { text: "It happens regularly. I've normalized it.", score: 0 },
      { text: "Yes — and I've started to believe them.", score: 0 },
    ],
  },
  {
    id: 16,
    category: "respect",
    weight: 2.0,
    question: "Do you feel physically and emotionally safe around this person?",
    context: "CDC (2022): 1 in 4 women and 1 in 9 men experience intimate partner violence. Emotional abuse precedes physical abuse in 82% of escalating cases.",
    answers: [
      { text: "Completely and without question.", score: 4 },
      { text: "Mostly — but they have a temper sometimes.", score: 2 },
      { text: "I walk on eggshells regularly.", score: 0 },
      { text: "No. I am afraid of their reactions.", score: 0 },
    ],
  },
  {
    id: 17,
    category: "respect",
    weight: 1.5,
    question: "Does your partner support your goals and ambitions?",
    context: "Brunstein et al. (1996): Partner support for personal goals predicts well-being more strongly than goal attainment itself (β=0.44).",
    answers: [
      { text: "They're my biggest supporter.", score: 4 },
      { text: "They're supportive but not always engaged.", score: 3 },
      { text: "They're indifferent or subtly discouraging.", score: 1 },
      { text: "They actively undermine, mock, or compete with me.", score: 0 },
    ],
  },

  // ── EMOTIONAL INTIMACY (Questions 18–20) ─────────────────────────
  {
    id: 18,
    category: "intimacy",
    weight: 1.5,
    question: "How often do you feel truly connected to this person — not just present, but *connected*?",
    context: "Sternberg (1986): Intimacy (emotional closeness) is the most stable component of love — passion fades, commitment fluctuates, but intimacy holds.",
    answers: [
      { text: "Often. There's a real emotional bond.", score: 4 },
      { text: "Sometimes. Good moments exist.", score: 2 },
      { text: "Rarely — I mostly feel alone even with them.", score: 1 },
      { text: "Never. We coexist.", score: 0 },
    ],
  },
  {
    id: 19,
    category: "intimacy",
    weight: 1.5,
    question: "When you're going through something hard, is this person your first call?",
    context: "Hazan & Shaver (1987): Secure attachment = partner as safe haven. Consistently choosing others first signals failed attachment bond.",
    answers: [
      { text: "Always. They're my person.", score: 4 },
      { text: "Often, but not always.", score: 3 },
      { text: "I prefer going to friends or family first.", score: 1 },
      { text: "No. Telling them things usually makes it worse.", score: 0 },
    ],
  },
  {
    id: 20,
    category: "intimacy",
    weight: 2.0,
    question: "Brutally honest: when you picture your future, is this person in it?",
    context: "Murray et al. (2003): Future self-concept overlap with partner ('we' identity) is the strongest single-item predictor of relationship survival at r=0.71.",
    answers: [
      { text: "Yes — naturally, without even trying.", score: 4 },
      { text: "Sometimes, but I also picture it without them.", score: 2 },
      { text: "Only when I try hard to force it.", score: 1 },
      { text: "No. And that answer scares me a little.", score: 0 },
    ],
  },
];

// ── CALCULATION ENGINE ────────────────────────────────────────────

function getGrade(pct: number): { grade: string; color: string } {
  if (pct >= 90) return { grade: "A+", color: "#C8FF00" };
  if (pct >= 85) return { grade: "A", color: "#C8FF00" };
  if (pct >= 80) return { grade: "A-", color: "#C8FF00" };
  if (pct >= 77) return { grade: "B+", color: "#8AE000" };
  if (pct >= 73) return { grade: "B", color: "#8AE000" };
  if (pct >= 70) return { grade: "B-", color: "#8AE000" };
  if (pct >= 67) return { grade: "C+", color: "#FFA500" };
  if (pct >= 63) return { grade: "C", color: "#FFA500" };
  if (pct >= 60) return { grade: "C-", color: "#FFA500" };
  if (pct >= 57) return { grade: "D+", color: "#FF6B35" };
  if (pct >= 53) return { grade: "D", color: "#FF6B35" };
  if (pct >= 50) return { grade: "D-", color: "#FF6B35" };
  return { grade: "F", color: "#FF3B1F" };
}

const CATEGORY_DESCRIPTIONS: Record<Category, (pct: number) => string> = {
  trust: (p) =>
    p >= 80
      ? "Solid foundation. Trust is intact."
      : p >= 60
      ? "Cracks exist. Distrust is a slow poison."
      : "Trust is broken or seriously compromised.",
  communication: (p) =>
    p >= 80
      ? "You two can talk. That's rarer than you think."
      : p >= 60
      ? "Communication is strained. Things go unsaid."
      : "You're not communicating — you're coexisting.",
  compatibility: (p) =>
    p >= 80
      ? "Core alignment is there. You want similar things."
      : p >= 60
      ? "Some alignment, some friction. Manageable."
      : "You're pointed in fundamentally different directions.",
  investment: (p) =>
    p >= 80
      ? "You're in it. Not just comfortable — committed."
      : p >= 60
      ? "You're invested but second-guessing yourself."
      : "You're staying for the wrong reasons.",
  respect: (p) =>
    p >= 80
      ? "Mutual respect is real. You treat each other like humans."
      : p >= 60
      ? "Respect is inconsistent. You've absorbed some damage."
      : "This is unhealthy. You deserve better than this.",
  intimacy: (p) =>
    p >= 80
      ? "Real emotional connection. This is the hard part — you have it."
      : p >= 60
      ? "Some intimacy, but distance is growing."
      : "You're alone in this relationship. That's not a relationship.",
};

const CATEGORY_VERDICTS: Record<Category, (pct: number) => string> = {
  trust: (p) =>
    p >= 75 ? "Healthy" : p >= 50 ? "Needs Work" : "Critical",
  communication: (p) =>
    p >= 75 ? "Functional" : p >= 50 ? "Struggling" : "Broken",
  compatibility: (p) =>
    p >= 75 ? "Aligned" : p >= 50 ? "Mismatched" : "Incompatible",
  investment: (p) =>
    p >= 75 ? "Committed" : p >= 50 ? "Uncertain" : "Trapped",
  respect: (p) =>
    p >= 75 ? "Mutual" : p >= 50 ? "Inconsistent" : "Absent",
  intimacy: (p) =>
    p >= 75 ? "Connected" : p >= 50 ? "Fading" : "Gone",
};

export function calculateResults(answers: Record<number, number>): QuizResult {
  // Build per-category scores
  const categoryScores: Record<Category, { raw: number; max: number }> = {
    trust: { raw: 0, max: 0 },
    communication: { raw: 0, max: 0 },
    compatibility: { raw: 0, max: 0 },
    investment: { raw: 0, max: 0 },
    respect: { raw: 0, max: 0 },
    intimacy: { raw: 0, max: 0 },
  };

  let totalWeighted = 0;
  let maxWeighted = 0;
  const criticalFlags: string[] = [];

  QUESTIONS.forEach((q) => {
    const selectedScore = answers[q.id] ?? 0;
    const weighted = selectedScore * q.weight;
    const maxForQ = 4 * q.weight;

    categoryScores[q.category].raw += selectedScore;
    categoryScores[q.category].max += 4;

    totalWeighted += weighted;
    maxWeighted += maxForQ;

    // Critical flags — zero-score on high-weight questions
    if (selectedScore === 0 && q.weight >= 1.5) {
      const flagMap: Record<number, string> = {
        1: "You don't trust your partner at a foundational level.",
        2: "Repeated betrayals create patterns that rarely self-correct.",
        5: "Your conflict pattern has no resolution pathway.",
        12: "You have no real commitment — just proximity.",
        15: "Contempt and belittling are forms of emotional abuse.",
        16: "You do not feel safe. That is not negotiable.",
        20: "You can't picture a future with them. That's your answer.",
      };
      if (flagMap[q.id]) criticalFlags.push(flagMap[q.id]);
    }
  });

  const percentage = (totalWeighted / maxWeighted) * 100;
  const { grade: overallGrade } = getGrade(percentage);

  // Outcome thresholds
  // Research basis: Gottman's success/failure models use 5:1 positive-to-negative ratio
  // Mapped to: Stay ≥ 72%, Work 50–71%, Leave < 50%
  // Critical flags override: 2+ critical flags = automatic Work on It consideration
  // Safety flag (Q16 = 0) = automatic Leave regardless of score
  let outcome: "STAY" | "WORK ON IT" | "LEAVE" = "LEAVE";

  const hasSafetyFlag =
    answers[16] === 0 || (answers[16] === undefined && false);
  const hasAbuseFlag = answers[15] === 0;

  if (hasSafetyFlag || hasAbuseFlag) {
    outcome = "LEAVE";
  } else if (percentage >= 72 && criticalFlags.length === 0) {
    outcome = "STAY";
  } else if (percentage >= 72 && criticalFlags.length >= 1) {
    outcome = "WORK ON IT";
  } else if (percentage >= 50) {
    outcome = "WORK ON IT";
  } else {
    outcome = "LEAVE";
  }

  // Override: if 3+ critical flags, always LEAVE
  if (criticalFlags.length >= 3) outcome = "LEAVE";

  const outcomeColor =
    outcome === "STAY" ? "#C8FF00" : outcome === "WORK ON IT" ? "#FFA500" : "#FF3B1F";

  const summaryMap = {
    STAY: `Your score of ${percentage.toFixed(1)}% puts you in the healthy range. This relationship has real structural integrity. The research says: you're one of the ones worth keeping.`,
    "WORK ON IT": `Your score of ${percentage.toFixed(1)}% lands in the danger zone — not dead, but not thriving. Specific categories are dragging this down. The question isn't whether there are problems. It's whether you both give enough of a damn to fix them.`,
    LEAVE: `Your score of ${percentage.toFixed(1)}% is below the threshold for a viable relationship. This isn't a bad day or a rough patch — the data says there are structural failures here. Staying is a choice. So is leaving. Make it consciously.`,
  };

  const detailMap = {
    STAY: `Across Gottman's core indicators, your relationship shows a positive ratio and no catastrophic failure patterns. Sternberg's triad (intimacy, passion, commitment) appears reasonably intact. Protect what you have — complacency kills relationships that survive the hard parts.`,
    "WORK ON IT": `Your relationship has identifiable weak spots — not a vague "we need to communicate better" situation. Targeted, honest effort (and probably actual couples therapy — shown to be 70-80% effective when both partners engage, per Shadish & Baldwin, 2003) could genuinely move the needle. But only if both people want it.`,
    LEAVE: `The combination of low scores and critical flags reflects patterns that relationship science consistently shows do not self-correct. Gottman's research: relationships with contempt, broken trust, and no vision of the future end 94% of the time regardless of effort. The data isn't telling you to give up — it's telling you the truth.`,
  };

  // Build category results
  const categories: CategoryResult[] = (
    Object.keys(categoryScores) as Category[]
  ).map((cat) => {
    const { raw, max } = categoryScores[cat];
    const pct = max > 0 ? (raw / max) * 100 : 0;
    const { grade, color } = getGrade(pct);
    return {
      category: cat,
      label: CATEGORY_META[cat].label,
      rawScore: raw,
      maxScore: max,
      percentage: pct,
      grade,
      gradeColor: color,
      description: CATEGORY_DESCRIPTIONS[cat](pct),
      verdict: CATEGORY_VERDICTS[cat](pct),
    };
  });

  return {
    totalWeightedScore: totalWeighted,
    maxWeightedScore: maxWeighted,
    percentage,
    overallGrade,
    outcome,
    outcomeColor,
    summary: summaryMap[outcome],
    detail: detailMap[outcome],
    categories,
    criticalFlags,
  };
}
