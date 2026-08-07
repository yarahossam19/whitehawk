# Offensive Ticketing — Standalone Demo

A self-contained, backend-free copy of the offensive ticketing hub (table + kanban
view, filters, export/import/edit/delete popups), extracted for embedding in a
marketing site. All data is mocked; no network calls are made — export/import/edit/
delete actions simulate success via toast notifications instead of hitting an API.

This folder is meant to be **copied into another Next.js project's source tree**
and imported as a component. It has no `@/...` alias imports and no dependency on
a `public/` folder — every cross-file import is relative, and every icon is bundled
locally under `assets/icons/` and imported as a static asset, so it resolves
correctly no matter where you place the folder.

## 1. Copy the folder

Copy this entire `ticketing-offensive-demo/` folder into your Next.js project,
e.g. into `src/components/ticketing-offensive-demo/` (any location under `src/`
works — nothing here assumes a specific path).

## 2. Install dependencies

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities @floating-ui/react \
  @headlessui/react @radix-ui/react-label @radix-ui/react-popover \
  @radix-ui/react-select @radix-ui/react-slot @radix-ui/react-tabs \
  @radix-ui/react-tooltip @tanstack/react-table class-variance-authority clsx \
  lucide-react primereact react-day-picker sonner tailwind-merge uuid
```

If your project doesn't already have Sass and Tailwind CSS v4 set up:

```bash
npm install -D sass tailwindcss @tailwindcss/postcss tw-animate-css tailwindcss-animate
```

See `package-deps.json` in this folder for the exact versions this was built
and tested against.

**Not required:** `axios` (the real API layer was replaced with `mockApi.ts`) and
`chai` (a dead import from the source app, removed during extraction).

## 3. Import the theme once

Add this near the top of your project's global stylesheet (the same file that
has `@import "tailwindcss";`, typically `app/globals.css`):

```css
@import "tailwindcss";
@import "./components/ticketing-offensive-demo/theme.css"; /* adjust the path */
```

`theme.css` loads PrimeReact's CSS (needed by the popups' Dialog and the
MultiSelect filter field) and defines the CSS custom properties every
component reads — it does not apply any global reset, so importing it cannot
restyle unrelated parts of your page. See the comment at the top of that file
for the one caveat worth knowing (custom-property naming collisions if your
project already defines tokens like `--primary` or `--background`).

### Tailwind v3 or no Tailwind

The shadcn-style primitives in `components/ui/` use Tailwind utility classes
(`bg-primary`, `text-foreground`, etc.). `theme.css`'s `@theme inline` block
only works with Tailwind v4. If your project is on Tailwind v3, add the
equivalent color mappings to your `tailwind.config.js`'s `theme.extend.colors`
instead (map each `primary`/`background`/`border`/etc. key to
`"var(--primary)"`, `"var(--background)"`, `"var(--border)"`, and so on —
the variable names are all defined in `theme.css`). If your project has no
Tailwind at all, install it first — the primitives won't render correctly
without it.

## 4. Use it

```tsx
import OffensiveTicketingDemo from "@/components/ticketing-offensive-demo";
// (path depends on where you copied the folder, and whether "use client" already
// applies via a parent — this component itself declares "use client")

export default function Page() {
  return <OffensiveTicketingDemo />;
}
```

The default export renders the full page: KPI cards, the ticket table (with
table/kanban toggle, filters, search, column drag-reorder), and the create
ticket / export / import / edit / delete flows.

## What was changed from the source app

- **Mocked backend**: `mockApi.ts` replaces the real `VAApis()` network layer
  used by Export/Import popups — actions resolve locally with a toast instead
  of calling a server.
- **Fixed a broken import**: the source `ExportPopup.tsx` had a dead
  `import { use } from "chai"` (an uninstalled test library) — removed.
- **Fixed an internal Next.js import**: `ImportPopup.tsx` imported from
  `next/dist/client/link` instead of the public `next/link` API — corrected.
- **Fixed the kanban mock data**: the source demo's kanban cards used field
  names (`title`, `description`) that don't match what `KanbanCard` actually
  renders (`name`, `notes_count`, `attachments_count`, `comments_count`,
  `assignees`) — `mockKanbanData.ts` here uses the correct shape, so the
  kanban view actually shows content instead of blank cards.
- **Fixed a missing avatar asset**: the source mock data pointed at
  `/avatars/eleanor.png`, which doesn't exist — replaced with a self-contained
  inline SVG data URI, so no image asset needs to ship separately.
- **Removed dead code**: an unused `router` (`useRouter()`), an unused
  `AllTicketsCard` import, and an unused `FileUploader` import in
  `EditTicketPopup.tsx` were dropped.

## Folder structure

```
index.tsx                  — the default-exported demo component
mockData.ts                — mock ticket rows for the table
mockKanbanData.ts          — mock kanban columns/cards
mockApi.ts                 — no-backend replacement for the real ticket API
offensive.scss             — page-level layout styles
theme.css                  — design tokens + PrimeReact CSS (import once, see above)
package-deps.json           — reference list of exact dependency versions
lib/utils.ts                — cn() class-merging helper
utils/importErrorUtils.ts   — import-error formatting helpers
assets/icons/                — every icon used, as local static assets (no public/ dependency)
components/
  DataTable/                — the table, with column drag-reorder, filters, kanban toggle
  Kanban/                    — the kanban board renderer
  Popups/                    — Export/Import/Edit/Delete dialogs
  InputFields/               — Input/Date/Select/MultiSelect/FileUploader fields
  PrimaryButton/, TicketCards/, Filter/, Searchbar/, Tooltip/, tiptap-tooltip/
  ui/                        — shadcn/ui primitives (button, select, popover, tabs, etc.)
```
