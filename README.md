# Should You Stay? — Relationship Assessment

A brutally honest, research-backed relationship assessment built for the 18–25 age group.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zero external dependencies

## Research Foundation
- Gottman Institute's Four Horsemen (Gottman & Silver, 1999)
- Sternberg's Triangular Theory of Love (1986)
- Rusbult's Investment Model (1980, 1983)
- Spanier's Dyadic Adjustment Scale (1976)
- Hazan & Shaver Attachment Theory (1987)
- Arriaga & Agnew Commitment Research (2001)

## Scoring System
- 20 questions across 6 weighted categories
- Standard questions: 1.0× weight
- High-importance questions: 1.5× weight
- Critical questions: 2.0× weight
- Safety override: Q15/Q16 scoring 0 triggers Leave regardless of total
- 3+ critical flags forces Leave outcome
- Thresholds: Stay ≥72% | Work on It 50–71% | Leave <50%

## Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm install
npm run build
npx vercel --prod
```

### Option 2: GitHub + Vercel Dashboard
1. Push to GitHub
2. Import repo at vercel.com/new
3. Framework: Next.js (auto-detected)
4. Deploy

### Option 3: Local Dev
```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Structure
```
src/
  app/
    layout.tsx      # Root layout + Google Fonts
    page.tsx        # Entry point
  components/
    Quiz.tsx        # All UI screens (Landing, Question, Results)
  lib/
    quiz-data.ts    # Questions, scoring engine, calculation logic
  styles/
    globals.css     # Global styles, animations, noise texture
```
