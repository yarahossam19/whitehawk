import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

export default tseslint.config(
  { ignores: [".next", "node_modules"] },
  { extends: [js.configs.recommended, ...tseslint.configs.recommended] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  eslintPluginPrettier,
);
