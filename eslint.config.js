import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([".next/", "out/", "dist/", "next-env.d.ts"]),
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, nextVitals, nextTs],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
      // Section titles are intentionally rendered as literal `// 01. SECTION` text.
      "react/jsx-no-comment-textnodes": "off",
    },
  },
  {
    // App Router files legitimately export metadata, generateStaticParams and
    // other non-component values alongside their default export.
    files: ["src/app/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    // Upstream shadcn/ui source, kept as-is so it stays easy to re-generate.
    files: ["src/components/ui/**/*.{ts,tsx}", "src/hooks/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  eslintPluginPrettier,
]);
