# Vidal Health — Design System

Extracted from the Vidal Health TPA parent site (`vidal-health-app`, Tailwind v4 `@theme`)
and adapted for this Next.js product site.

The parent site is the brand's canonical expression. This document is the contract:
when a component and this doc disagree, the doc wins.

---

## 1. Color

### Brand

| Token | Hex | Use |
|---|---|---|
| `--brand` | `#007071` | Primary. CTAs, links, active states, eyebrows, icon fills. |
| `--brand-hover` | `#005C5D` | Hover/pressed state of any `--brand` surface. |
| `--brand-deep` | `#00494A` | Dense teal fields — footer, top utility bar. |
| `--brand-ink` | `#012E2F` | Darkest teal. Dashboard/panel backgrounds. |
| `--brand-lime` | `#72BF44` | Accent **only**. The highlighted word in a headline, success ticks, small emphasis marks. |
| `--brand-lime-deep` | `#4D9A2A` | Lime on light backgrounds where `#72BF44` fails contrast. |

**Rule:** lime is a spice, not a base. It appears roughly once per viewport — typically one
word of a headline. Never a button fill, never body text, never a large surface.

### Accent

| Token | Hex | Use |
|---|---|---|
| `--accent-amber` | `#F5A623` | Ratings, warnings, "pending". |
| `--accent-cyan` | `#23B5C9` | Data-viz secondary series only. |

### Surface

| Token | Hex | Use |
|---|---|---|
| `--surface-base` | `#FFFFFF` | Page default. |
| `--surface-section` | `#F3F6F4` | Alternating band. The workhorse — how sections separate. |
| `--surface-interactive` | `#EEF4F4` | Hover fill on list rows and tabs. |
| `--surface-highlight` | `#E8F2F2` | Selected / active chip. |
| `--surface-extralight` | `#EFF2F4` | Cool neutral band. |
| `--surface-lightblue` | `#CAEDED` | Illustration + empty-state fills. |
| `--surface-mint` | `#F2F9F4` | Success banners. |

Sections alternate `--surface-base` → `--surface-section`. Bands are **never** separated by
a rule; the tone change does the work.

### Content & border

| Token | Hex | Notes |
|---|---|---|
| `--content-primary` | `#1F2D2D` | All headings and body. Not pure black. |
| `--content-secondary` | `#627272` | Supporting copy. WCAG AA: 5.04:1 on white, 4.63:1 on `--surface-section`. |
| `--border-soft` | `#E6ECEC` | Effectively the only border in the system. |
| `--typography-gray` | `#7C7B7D` | Metadata. |
| `--typography-jetgray` | `#5E5E5F` | Dense secondary text. |
| `--typography-ashgray` | `#99989B` | Disabled / placeholder. |

---

## 2. Typography

Family: **Inter** — `"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif`, for both body
and display. Load weights 300–800 + italic 400.

Body sets `letter-spacing: -0.011em` and antialiased smoothing. `h1–h3` tighten to `-0.022em`;
the `.text-display` hero class goes to `-0.028em` / `line-height: 1.05` / weight 700.

### Heading scale

Set on the elements, so a bare `<h2>` is already correct. Lives in `@layer base`, so a
Tailwind `text-*` utility still overrides where a deliberate exception is needed.

| El | Mobile | ≥768px | Line height |
|---|---|---|---|
| `h1` | 30px | 42px | 1.12 |
| `h2` | 24px | 30px | 1.20 |
| `h3` | 16px | 18px | 1.35 |
| `h4` | 14px | 16px | 1.40 |

### Weight rules

- **`font-semibold` (600) is not in the system for headings** — use `font-medium` (500).
- `font-semibold` **is** permitted on buttons, CTAs, and interactive UI.
- `font-bold` (700) is reserved for `.text-display` heroes and stat numerals.

### Eyebrow

Every section opens with one. Use the utility — never hand-roll it.

```css
.eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; }
```

Colored `text-brand` above a section header, or `text-content-secondary` when it labels a
subordinate block.

---

## 3. Layout

| Property | Value |
|---|---|
| Container | `max-w-7xl mx-auto px-4 sm:px-6` (1280px) |
| Section rhythm | `py-14 md:py-16` — used by 30 of 37 sections |
| Compact strip | `py-7 md:py-9` |
| Navbar height | `72px` |
| Prose measure | `max-w-2xl` under a header, `max-w-xl` inside a card |

Section skeleton:

```jsx
<section className="w-full py-14 md:py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <p className="eyebrow text-brand mb-3">OUR SERVICES</p>
    <h2 className="font-medium">How can we help you today?</h2>
    <p className="text-content-secondary max-w-2xl mt-3">…</p>
  </div>
</section>
```

---

## 4. Radius, elevation, motion

**Radius** — four steps, in order of frequency:
`rounded-full` (pills, avatars, dots) · `rounded-2xl` (cards — the default) ·
`rounded-xl` (nested/inner elements) · `rounded-lg` (buttons, inputs).
`rounded-3xl` and above is out of system.

**Elevation** — the system is nearly flat. `shadow-sm` on resting cards; `shadow-lg`/`shadow-2xl`
only for genuinely floating layers (modals, dropdowns, the chat widget). **Cards do not lift
on hover** — the border changes to `--brand` instead.

**Motion** — `transition-all duration-200` for controls, `duration-300` for cards.
Named ambient animations: `.animate-cue` (1.8s scroll hint), `.animate-drift` (14s gradient
blobs), `.animate-marquee` (55s logo strip, paired with `.marquee-mask`).

---

## 5. Components

### Card — the primary unit

```jsx
<div className="bg-white border border-border-soft rounded-2xl p-6 md:p-8
                flex flex-col gap-4 h-full
                hover:border-brand transition-all duration-300">
```

Padding `p-5`→`p-8` by density. `h-full` always, so grid rows align.
Optional `shadow-sm` when the card sits on `--surface-section`.

### Buttons

| Variant | Classes |
|---|---|
| Primary | `bg-brand hover:bg-brand-hover text-white rounded-lg px-6 py-3 font-semibold inline-flex items-center gap-2 transition-all` |
| Secondary | `bg-white border border-border-soft hover:border-brand text-content-primary rounded-lg px-6 py-3 font-medium` |
| Ghost | `text-brand hover:bg-surface-interactive rounded-lg px-4 py-2.5 font-medium` |

Primary buttons carry a trailing `→` (`ArrowRight`, 16px). Secondary buttons carry a leading
contextual icon.

### Chip / tag

`text-[10px] font-medium text-brand bg-brand/8 px-2.5 py-1 rounded-full`

### Stat block

Numeral in `.text-display` weight 700 at `text-4xl md:text-5xl`, label beneath in
`text-content-secondary text-sm`. Separated by `divide-x divide-border-soft`, never by cards.

---

## 6. Checklist

- [ ] Section uses `py-14 md:py-16` and opens with an `.eyebrow`
- [ ] Headings are `font-medium`, not `font-semibold`
- [ ] Lime appears at most once in the viewport
- [ ] Borders are `--border-soft`; hover goes to `--brand`
- [ ] Cards are `rounded-2xl`, `h-full`, and do not lift
- [ ] Body text is `--content-secondary`, headings `--content-primary` — never pure black
