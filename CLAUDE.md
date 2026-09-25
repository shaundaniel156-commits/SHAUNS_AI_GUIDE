# Sangyin AI — project rules (shared by all agents)

**Product:** Sangyin AI — *AI-Guided Adaptive Education System* — Performance-Driven Curriculum & Teaching Guidance Platform.
Roles: Teacher, School Administrator, Parent, Student. Frameworks: Uganda National Curriculum, Cambridge International Curriculum.

## Current phase: UI / FRONTEND PROTOTYPE ONLY
- Work only in `frontend/` (React + TypeScript + Tailwind CSS v4, Vite). Do not change the stack.
- No backend, database, API endpoints, real authentication, AI API calls, SMS/USSD, or real offline sync —
  until the user explicitly says **"Now start the backend."**
- No Bootstrap, Material UI, other CSS frameworks, Next.js, Vue, Angular. Avoid new dependencies unless
  genuinely necessary — ask the user first.
- Do not invent features, roles, business rules, organisations, partnerships, statistics or official curriculum
  content. Mock data must be clearly demo ("Demo Student 01", "Demo School", "Sample Class", "Example …").
- Parent/student screens use plain, non-technical language (no AI jargon or confidence scores).

## Code conventions
- Mock data lives only in `frontend/src/data/*` and is read through getters/selectors (future API seam).
- Shared types: `frontend/src/types/index.ts`.
- Colours: use the semantic tokens in `frontend/src/index.css` (`bg-surface`, `text-ink-2`, `border-line`,
  `brand-*`, `good/warn/bad` + `-soft`/`-ink`) — never raw palette colours — so dark mode keeps working.
- Reuse components in `src/components/{ui,layout,charts,domain}` before creating new ones.
- Prototype-only actions give feedback via `useToast()` and/or `<DemoNotice>`; never pretend data was saved.
- Responsive (phone-first for parent/student), accessible semantic HTML, keyboard focus visible.

## Verify before finishing
```bash
cd frontend && npx tsc -b && npm run lint && npm run build
```
Folder map and screen list: `frontend/README.md`.
