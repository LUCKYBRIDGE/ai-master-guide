# UI Design System & Interaction Rules
> Reference: `docs/design/tokens.md`

## 1. Design Principles
- **Visual Hierarchy**: Clean typography, intentional whitespace (4px grid system), clear focal points.
- **Brand Colors**: Toss Blue (`#3182F6`), Indigo Accent (`#6366F1`), Dark Slate Base (`#0F172A`), Card Surface (`#1E293B`).
- **Typography**: Pretendard, system-ui fallback. Headings bold/semibold, body 14px 1.5 line-height.
- **Micro-Interactions**: Smooth transitions (`transition-all duration-200`), subtle hover & active feedback, accessible focus rings.
- **Responsive Standard**: Mobile-first with breakpoints `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`.

## 2. Component Guidelines
- Use semantic HTML tags (`<main>`, `<section>`, `<header>`, `<button>`).
- Prefer Tailwind utility classes over inline styles.
- Buttons & Cards: `rounded-xl` (12px) for buttons, `rounded-2xl` (16px) for cards.
- Border accents: Subtle borders (`border border-slate-700/50` or `border-white/10`).
