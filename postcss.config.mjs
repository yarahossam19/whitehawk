// Re-added solely so Tailwind can process one scoped stylesheet:
// src/components/site/ui/ticketing-offensive-demo/tailwind-entry.css (which
// uses `@import "tailwindcss" source("./")` to limit utility-class generation
// to that folder). The rest of the site is SCSS Modules and does not import
// "tailwindcss", so this plugin has nothing to act on for those files.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
