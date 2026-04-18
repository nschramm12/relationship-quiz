"use client";

import { useState, useEffect } from "react";
import {
  QUESTIONS,
  calculateResults,
  type QuizResult,
  type Question,
  type Category,
} from "@/lib/quiz-data";

function LandingScreen({ onStart }: { onStart: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}>
      <div className="mb-10 text-center">
        <p className="text-[10px] tracking-[0.4em] text-[#555] uppercase font-body mb-3">
          Relationship Assessment Protocol
        </p>
        <div className="h-px w-24 bg-[#2a2a2a] mx-auto" />
      </div>

      <div className="text-center mb-4">
        <h1
          className="font-display leading-none tracking-tight text-[#F0EDE8] glitch"
          data-text="SHOULD"
          style={{ fontSize: "clamp(64px,16vw,160px)", lineHeight: "0.85" }}>
          SHOULD
        </h1>
        <h2
          className="font-display leading-none tracking-tight"
          style={{ fontSize: "clamp(40px,10vw,100px)", color: "#FF3B1F", lineHeight: "0.85" }}>
          YOU
        </h2>
        <h2
          className="font-display leading-none tracking-tight text-[#F0EDE8]"
          style={{ fontSize: "clamp(40px,10vw,100px)", lineHeight: "0.85" }}>
          STAY?
        </h2>
      </div>

      <div className="w-full max-w-md my-8 flex items-center gap-4">
        <div className="flex-1 h-px bg-[#2a2a2a]" />
        <span className="text-[#555] text-[10px] tracking-widest font-body">20 QUESTIONS</span>
        <div className="flex-1 h-px bg-[#2a2a2a]" />
      </div>

      <p className="text-center text-[#888] font-body text-sm max-w-sm leading-relaxed mb-2">
        Built on Gottman Institute research, Sternberg&apos;s Love Theory, and Rusbult&apos;s Investment Model.
        No comfort. No sugarcoating.
      </p>
      <p className="text-center font-body text-xs text-[#555] max-w-xs leading-relaxed mb-12">
        Six categories. Weighted scoring. A letter grade and a verdict you actually deserve to hear.
      </p>

      <button
        onClick={onStart}
        className="group relative font-display text-2xl tracking-widest px-12 py-5 border border-[#FF3B1F] text-[#FF3B1F] hover:bg-[#FF3B1F] hover:text-[#080808] transition-all duration-200"
        style={{ letterSpacing: "0.15em" }}>
        START THE TEST
        <div className="absolute inset-0 border border-[#FF3B1F] opacity-30 scale-105 group-hover:scale-110 transition-transform" />
      </button>

      <p className="mt-8 text-[10px] text-[#333] tracking-wider font-body text-center">
        NOT A SUBSTITUTE FOR THERAPY &middot; FOR EDUCATIONAL USE ONLY
      </p>
    </div>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = (current / total) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-body text-[#555] tracking-widest">{current}/{total}</span>
        <span className="text-[10px] font-body text-[#555] tracking-widest">{pct.toFixed(0)}%</span>
      </div>
      <div className="h-[2px] bg-[#1a1a1a] w-full">
        <div className="h-full progress-bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

const CAT_COLORS: Record<Category, string> = {
  trust: "#6B8CFF",
  communication: "#FF9F43",
  compatibility: "#C8FF00",
  investment: "#FF6B9D",
  respect: "#FF3B1F",
  intimacy: "#A29BFE",
};

const CAT_LABELS: Record<Category, string> = {
  trust: "TRUST",
  communication: "COMMUNICATION",
  compatibility: "COMPATIBILITY",
  investment: "INVESTMENT",
  respect: "RESPECT",
  intimacy: "INTIMACY",
};

function CategoryPill({ category }: { category: Category }) {
  const color = CAT_COLORS[category];
  return (
    <span
      className="text-[9px] font-body tracking-[0.3em] px-2 py-1 border"
      style={{ color, borderColor: color, opacity: 0.85 }}>
      {CAT_LABELS[category]}
    </span>
  );
}

function QuestionScreen({
  question, questionNumber, total, selectedIndex,
  onSelect, onNext, onPrev, isFirst, isLast,
}: {
  question: Question;
  questionNumber: number;
  total: number;
  selectedIndex: number | undefined;
  onSelect: (idx: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => { setAnimKey(k => k + 1); }, [question.id]);

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 max-w-2xl mx-auto w-full">
      <div className="mb-10">
        <ProgressBar current={questionNumber} total={total} />
      </div>

      <div key={animKey} className="animate-slide-up flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <CategoryPill category={question.category} />
          {question.weight >= 2.0 && (
            <span className="text-[9px] font-body tracking-widest text-[#FF3B1F] border border-[#FF3B1F]/40 px-2 py-1">
              HIGH WEIGHT
            </span>
          )}
        </div>

        <div className="flex items-start gap-4 mb-5">
          <span className="font-display text-5xl leading-none text-[#222] flex-shrink-0">
            {String(questionNumber).padStart(2, "0")}
          </span>
          <h2 className="font-serif text-xl leading-snug text-[#F0EDE8] pt-1">
            {question.question}
          </h2>
        </div>

        <p className="text-[11px] font-body text-[#555] leading-relaxed mb-8 border-l-2 border-[#2a2a2a] pl-4 italic">
          {question.context}
        </p>

        <div className="flex flex-col gap-3 flex-1">
          {question.answers.map((answer, i) => {
            const isSelected = selectedIndex === i;
            return (
              <button
                key={i}
                onClick={() => onSelect(i)}
                className={`answer-option text-left px-5 py-4 border font-body text-sm leading-relaxed transition-all ${
                  isSelected
                    ? "border-[#FF3B1F] text-[#F0EDE8]"
                    : "border-[#2a2a2a] text-[#888]"
                }`}
                style={isSelected ? { background: "rgba(255,59,31,0.08)" } : {}}>
                <span className="text-[#444] mr-3 text-xs">{String.fromCharCode(65 + i)}.</span>
                {answer.text}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#1a1a1a]">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className="font-body text-xs tracking-widest text-[#555] hover:text-[#F0EDE8] disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
            ← BACK
          </button>
          <button
            onClick={onNext}
            disabled={selectedIndex === undefined}
            className="font-display text-lg tracking-wider px-8 py-3 bg-[#FF3B1F] text-[#080808] disabled:opacity-25 disabled:cursor-not-allowed hover:bg-[#ff5540] transition-colors">
            {isLast ? "CALCULATE" : "NEXT →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultsScreen({ result, onRetake }: { result: QuizResult; onRetake: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setRevealed(true), 300);
    setTimeout(() => setBarsVisible(true), 900);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center pt-16 pb-12 px-6 text-center border-b border-[#1a1a1a]">
        <p className="text-[10px] font-body tracking-[0.4em] text-[#555] mb-6">ASSESSMENT COMPLETE</p>

        <div className={`transition-all duration-700 ${revealed ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <div
            className="font-display leading-none grade-badge"
            style={{ fontSize: "clamp(90px,28vw,200px)", color: result.outcomeColor, lineHeight: "1" }}>
            {result.overallGrade}
          </div>
        </div>

        <div className={`mt-4 mb-6 transition-all duration-700 delay-300 ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div
            className="font-display tracking-widest"
            style={{ fontSize: "clamp(28px,9vw,64px)", color: result.outcomeColor }}>
            {result.outcome}
          </div>
          <p className="text-[11px] font-body text-[#555] tracking-widest mt-1">
            {result.percentage.toFixed(1)}% WEIGHTED HEALTH SCORE
          </p>
        </div>

        <div className={`max-w-lg transition-all duration-700 delay-500 ${revealed ? "opacity-100" : "opacity-0"}`}>
          <p className="font-body text-[#888] text-sm leading-relaxed mb-3">{result.summary}</p>
          <p className="font-body text-[#555] text-xs leading-relaxed italic">{result.detail}</p>
        </div>
      </div>

      {/* Critical flags */}
      {result.criticalFlags.length > 0 && (
        <div className="mx-auto max-w-2xl px-6 mt-6">
          <div className="border border-[#FF3B1F]/30 p-5">
            <p className="text-[10px] font-body tracking-[0.3em] text-[#FF3B1F] mb-3">
              ⚠ CRITICAL FLAGS DETECTED
            </p>
            <div className="flex flex-col gap-2">
              {result.criticalFlags.map((flag, i) => (
                <p key={i} className="font-body text-xs text-[#FF6B4A] leading-relaxed">— {flag}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category breakdown */}
      <div className="px-6 py-8 max-w-2xl mx-auto w-full">
        <p className="text-[10px] font-body tracking-[0.4em] text-[#555] mb-6">CATEGORY BREAKDOWN</p>
        <div className="flex flex-col gap-7">
          {result.categories.map((cat, i) => (
            <div
              key={cat.category}
              className="transition-all duration-500"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${600 + i * 100}ms`,
              }}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-body text-xs text-[#F0EDE8] tracking-wider">{cat.label}</p>
                  <p className="font-body text-[10px] tracking-wider mt-0.5"
                    style={{ color: cat.gradeColor, opacity: 0.7 }}>
                    {cat.verdict.toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display text-3xl" style={{ color: cat.gradeColor }}>
                    {cat.grade}
                  </span>
                  <p className="text-[10px] font-body text-[#555]">{cat.percentage.toFixed(0)}%</p>
                </div>
              </div>

              <div className="category-bar mb-2">
                <div
                  className="category-bar-fill"
                  style={{
                    width: barsVisible ? `${cat.percentage}%` : "0%",
                    background: cat.gradeColor,
                    transitionDelay: `${900 + i * 120}ms`,
                  }} />
              </div>

              <p className="font-body text-[11px] text-[#555] leading-relaxed italic">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Score info */}
      <div className="border-t border-[#1a1a1a] px-6 py-6 max-w-2xl mx-auto w-full">
        <p className="text-[10px] font-body tracking-[0.3em] text-[#333] mb-2">SCORE CALCULATION</p>
        <p className="font-body text-xs text-[#333] leading-relaxed">
          Weighted score: {result.totalWeightedScore.toFixed(1)} / {result.maxWeightedScore.toFixed(1)} &middot;
          Stay ≥72% (no critical flags) &middot; Work on It 50–71% &middot; Leave &lt;50% or safety override &middot; 3+ critical flags force Leave
        </p>
      </div>

      {/* Methodology */}
      <div className="border-t border-[#1a1a1a] px-6 py-6 max-w-2xl mx-auto w-full">
        <p className="text-[10px] font-body tracking-[0.3em] text-[#333] mb-2">METHODOLOGY</p>
        <p className="font-body text-[11px] text-[#333] leading-relaxed">
          Scoring uses a weighted model across 6 dimensions derived from Gottman Institute research,
          Sternberg&apos;s Triangular Theory of Love (1986), Rusbult&apos;s Investment Model (1983),
          Spanier&apos;s Dyadic Adjustment Scale (1976), and attachment theory (Hazan &amp; Shaver, 1987).
          High-weight questions (2.0x) carry double scoring impact. Safety questions trigger override
          logic that supersedes aggregate scores. For educational and self-reflection use only.
        </p>
      </div>

      <div className="flex justify-center pb-16 px-6">
        <button
          onClick={onRetake}
          className="font-body text-xs tracking-widest text-[#555] border border-[#2a2a2a] px-6 py-3 hover:border-[#555] hover:text-[#888] transition-all">
          RETAKE ASSESSMENT
        </button>
      </div>
    </div>
  );
}

export default function Quiz() {
  const [screen, setScreen] = useState<"landing" | "quiz" | "results">("landing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { answerIndex: number; score: number }>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const currentQuestion = QUESTIONS[currentIndex];
  const currentAnswer = answers[currentQuestion?.id];

  const handleSelect = (answerIndex: number) => {
    const score = currentQuestion.answers[answerIndex].score;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: { answerIndex, score } }));
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const scoreMap: Record<number, number> = {};
      Object.entries(answers).forEach(([qid, val]) => { scoreMap[Number(qid)] = val.score; });
      const r = calculateResults(scoreMap);
      setResult(r);
      setScreen("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRetake = () => {
    setScreen("landing");
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (screen === "landing") return <LandingScreen onStart={() => setScreen("quiz")} />;
  if (screen === "results" && result) return <ResultsScreen result={result} onRetake={handleRetake} />;

  return (
    <QuestionScreen
      question={currentQuestion}
      questionNumber={currentIndex + 1}
      total={QUESTIONS.length}
      selectedIndex={currentAnswer?.answerIndex}
      onSelect={handleSelect}
      onNext={handleNext}
      onPrev={handlePrev}
      isFirst={currentIndex === 0}
      isLast={currentIndex === QUESTIONS.length - 1}
    />
  );
}
