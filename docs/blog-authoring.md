# Writing a blog post

Every article you publish from the admin gets the same design automatically: the hero panel, the table of contents, takeaway boxes, tables and figures. You only write the content. You never need to type HTML.

Open the admin at `/admin/blog` and sign in.

## 1. Start a post

1. Click **New article**.
2. Fill in the left column:
   - **Title.** The part before the first colon is shown in bold, and the rest goes on a new line in a lighter blue. For "Egypt Data Protection Law: What the PDPC Expects From Your Company Now", the bold part is "Egypt Data Protection Law:". The line under the field shows how the title will be split.
   - **Excerpt.** One or two sentences. Shown in the hero under the title, on the blog index cards, and in search and social previews.
   - **Body.** The article itself (see section 2).
3. Fill in the right column:
   - **Language.** English or Arabic.
   - **Slug.** The end of the web address (`/blog/<slug>`). Lowercase letters, numbers and dashes. Filled in from the title for new English posts.
   - **Hero label.** The small blue text above the title, for example "PDPL guide 2026". If you leave it empty, the category is shown instead (for example "Insights").
   - **Bold part of the title (optional).** Only needed when the split at the colon isn't the one you want. It must be the exact start of the title.
   - **Category, tags, author.**
   - **Cover / hero image.** Upload or paste a link. Images with a white or transparent background blend into the hero panel best.
   - **Read time.** Calculated from your text. You can't edit it.
4. Click **Save**. Tick **Published** when the post should go live. Pages refresh within seconds of saving.

## 2. Write the body

The body editor looks like the published article: same fonts, spacing, boxes and tables.

| To add | Do this |
|---|---|
| A section | Click **H2** in the toolbar. Every H2 appears in the table of contents automatically. On the published page, each H2 section starts closed; readers open or close it by clicking the heading or its entry in the table of contents. Anything you write before the first H2 (intro, takeaways box) is always visible. |
| A sub-section | Click **H3**. H3 headings don't appear in the table of contents. |
| Bold, italic | Select text, then **B** or **I**. |
| A link | Select text, click the link button, paste the address, then **Apply**. You can use `https://…`, a page on this site such as `/contact`, a section of the same article such as `#faq`, or `mailto:`. Leave the box empty and click Apply to remove a link. |
| A list | The bulleted or numbered list button. A numbered list keeps its starting number. |
| A key takeaways box | **Takeaways**. Type one point per bullet. |
| A table | **Table**. The first row is the header row. |
| An image | **Image**, then pick a file (5 MB maximum). Type the caption directly under the image. |
| A quote | The quote button. |

Pasting from Word or Google Docs keeps headings, lists, links, bold, italic and tables. Anything else (colours, fonts, images pasted inline) is dropped. Upload images with the **Image** button instead.

## 3. Block options

Click inside a block and its options appear in the grey bar above the text:

- **Section heading (H2).** Set a **short label** to use a shorter name in the table of contents, for example "At a glance" instead of "Egypt's data protection law at a glance".
- **Image.**
  - Write the **alt text**: a short description for people using screen readers.
  - Use **Replace image** or **Remove image** to change or delete it.
- **Takeaways box.** Change the box title, or remove the box.
- **Table.**
  - Add or delete rows and columns.
  - Tick **Wide table** for tables with three or more columns. On phones, a wide table scrolls sideways instead of squeezing the columns.

## 4. Check before publishing

Click **Preview** to see the full article as readers will see it. Click **Editor** to go back; nothing is lost.

## 5. Add the Arabic version

1. In the post list, click **Add Arabic version** under the English post.
2. The slug, category, tags, cover and author are copied from the English post. Keep the slug the same: that's how the two versions are linked, and how search engines learn they are translations.
3. Write the Arabic title, excerpt, eyebrow and body. The editor switches to right-to-left automatically.
4. Save and publish. The Arabic page is at `/ar/blog/<slug>`.

Notes for Arabic:
- In the takeaways box, the title defaults to "أهم النقاط".
- Dates and the read time are shown with Arabic numerals (١٦).
- English words such as PDPC or GDPR are fine inside Arabic text.

The sections below the article (author, call to action, related posts, newsletter) stay in English on Arabic pages. That's intended.

## Posts written before the visual editor

Older posts were written in Markdown. They already show in the new design without any changes. When you open one, the editor converts it and shows a notice. Saving stores the post in the new format.
