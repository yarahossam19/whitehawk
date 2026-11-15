# Blog article QA checklist

Use this list to compare a published article with the reference file, `egypt-data-protection-law-blog.html`.

**Setup**
- Open the reference and the published page side by side in the same browser.
- In DevTools responsive mode, check each width: **375, 768, 1024, 1280, 1440 and 1920 px**.
- Do every check on the English page (`/blog/<slug>`) and the Arabic page (`/ar/blog/<slug>`).

**Expected differences (not bugs)**
- The site header and footer surround the article.
- The sidebar table of contents sticks 84px from the top instead of 20px, so it clears the 64px site header.
- The dark CTA band appears below the article. It's the only section there.

## Every width, both languages

**Hero**
- [ ] The panel has rounded corners, a blue-white gradient, and a dot pattern that fades in toward the image side.
- [ ] The eyebrow is blue. In English it's uppercase and widely spaced; in Arabic it's normal case with no extra spacing.
- [ ] The title lead is bold navy, and the rest of the title is on its own line, lighter, in blue (`#0a6fae`).
- [ ] The gradient rule sits under the title.
- [ ] The excerpt appears under the gradient rule (not in the reference).
- [ ] The meta line shows the date, a grey dot, then the read time.
- [ ] The cover image sits on the image side and blends into the panel. A white or transparent background is needed for the blend.

**Body**
- [ ] Text is 16px, line height 30px (Arabic: 32px).
- [ ] H2 is 24px, weight 500, navy. H3 is 18px, weight 600.
- [ ] Bulleted lists show bullets and numbered lists show numbers, indented 24px on the reading-start side.
- [ ] Links are blue with no underline.

**Key takeaways box**
- [ ] It has a gradient background and an inset border.
- [ ] The title is a small blue label.
- [ ] Each point has a blue check mark, on the right in Arabic.

**Tables**
- [ ] They have a rounded border and a light navy header row.
- [ ] Text starts on the reading-start side (left in English, right in Arabic).
- [ ] The last row has no bottom border.

**Figures**
- [ ] The panel has a gradient and a dot pattern.
- [ ] The image is centred, with a maximum width of 480px.
- [ ] The caption, if there is one, is centred under the image in grey.

## Blog index (/blog and /ar/blog)

- [ ] The featured card at the top is the newest post, shown in the same hero as the top of the article.
- [ ] A post with a cover shows it on the image side. A post without one shows a text-only hero, with no empty image box.
- [ ] The card ends with "Read article" (Arabic: "اقرأ المقال") and links to the post. Hovering lifts it slightly.

## By width

**1440 and 1920 px**
- [ ] The container is 1320px wide.
- [ ] The sidebar table of contents is 232px, with a 71px gap before the text column.

**1280 px**
- [ ] The container is 1140px wide and the hero title is 42px.

**1024 px**
- [ ] The two-column layout is still shown.
- [ ] The container is 960px wide and the hero title is 34px (because the width is below 1200px).

**1023 px and below** (check at 768)
- [ ] The sidebar disappears.
- [ ] The collapsible **Contents** box appears above the text.
- [ ] The box opens and closes, and its chevron flips.

**768 px**
- [ ] The container is 720px wide and the hero title is 28px.

**375 px**
- [ ] The hero is a single column: text, then the image (maximum 420px).
- [ ] The H2 is 21px and body text has a 28px line height (Arabic: 30px).
- [ ] Wide tables scroll sideways, and a shadow shows on the side with more content.
- [ ] There's no horizontal scroll on the page itself.

## Collapsible sections (not in the reference)

- [ ] Every H2 section starts closed, with a chevron pointing down at the end of the heading (on the left in Arabic).
- [ ] Clicking the heading opens the section and turns the chevron upward. Clicking it again closes it.
- [ ] The intro and takeaways box above the first H2 are always visible.
- [ ] Sections are separated by thin lines.
- [ ] Opening a link like `/blog/<slug>#the-72-hour-breach-clock` opens that section and scrolls to it.
- [ ] Print preview shows every section open.

## Table of contents

- [ ] Every H2 appears in the list, using its short label when one is set.
- [ ] Clicking a label opens its section and scrolls to the heading. The heading isn't hidden under the site header.
- [ ] Clicking the same label again closes the section. This works in both the sidebar and the phone Contents box.
- [ ] While scrolling, the active link (navy, with an underline) follows the section on screen.
- [ ] Arabic headings have non-empty ids (`#قانون-…`), and the links work.

## Arabic only

- [ ] The article area is right-to-left: text column on the right, sidebar on the left of it.
- [ ] Hero: the text is on the right, and the image and dot pattern are on the left. The gradient darkens toward the image.
- [ ] The sidebar chevrons point left.
- [ ] Arabic text uses IBM Plex Sans Arabic, and Latin words (PDPC, GDPR) use Plus Jakarta Sans.
- [ ] The date and read time use Arabic-Indic numerals (١٢ نوفمبر ٢٠٢٦ · ١ دقيقة قراءة).

## Page source

- [ ] `<time datetime="YYYY-MM-DD">` in the hero.
- [ ] When both language versions are published, both pages have `<link rel="alternate" hreflang="en|ar|x-default">`.
- [ ] `og:locale` is `en_US` on English pages and `ar_EG` on Arabic pages.
- [ ] `/sitemap.xml` lists both URLs. It refreshes hourly.
