@AGENTS.md

# CLAUDE.md — Fancy-wedding

## Design System — MANDATORY, READ BEFORE ANY UI WORK

Before writing or editing any section, component, or style, read:
- `app/globals.css` — typography scale, heading system, spacing, motion/animation utilities, color tokens
- `components/ui/` — existing Button, NavBar, LanguageToggle, SearchBar, FilterBar, TemplateCard, Wordmark, Footer

**Source of truth upstream:** the Claude Design project "Glow Design System"
(`4cb58f53-bd6b-42af-b6f7-3e68153cab66`). `app/globals.css` is a port of its
`styles.css` + `tokens/*.css`. Read it with the `DesignSync` tool before
changing a token, so local and upstream don't drift.

**Two traps, both already hit once:**
1. Tailwind v4 derives every padding/margin utility from a single `--spacing`
   multiplier — there is no `--spacing-6`. Referencing one inside plain CSS is
   invalid at computed-value time and silently resolves to `0`. Use the
   `--space-1…10` scale defined in `globals.css` for CSS, Tailwind's numeric
   utilities in markup.
2. `Button` owns its own `display: inline-flex`. Passing `hidden` through
   `className` will not reliably win — wrap it instead.

**Rules:**
1. Reuse existing tokens and classes from `globals.css`. Never invent new font sizes, spacing values, colors, or animation timings that duplicate something already defined there.
2. Reuse existing components. Before creating a new Button/Card/Section/etc., check if one already exists and import it. Do not rewrite a component that already exists just because its exact variant wasn't found — extend the existing one with a prop/variant instead.
3. Never inline arbitrary values (e.g. `text-[17px]`, `duration-[420ms]`) when an equivalent token/class already exists.
4. If something genuinely doesn't exist yet, add it to `globals.css` or the shared components folder (not scoped locally), named consistently with existing patterns.
5. If unsure whether something exists, re-read the files above — don't assume or guess from memory of earlier turns in the session.
6. When the user reports a UI bug/issue without saying where to fix it, do NOT just patch the component. First check whether the root cause lives in a shared token/utility in `globals.css`, then ask the user: fix it locally in that particular section only, or fix it systematically in `globals.css` (which affects every section using it)? Wait for the answer before editing. Skip the question only if the user already specified the scope (e.g. explicitly mentioned `globals.css` or "only this section").
