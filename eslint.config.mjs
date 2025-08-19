// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "eslint.config.mjs",
      "app/eslint.config.js",
      "dist/**",
      "node_modules/**"
    ],
  },

  // Base config (applies everywhere)
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  // Server-specific (Node)
  {
    files: ["server/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parserOptions: {
        project: "./server/tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.node,
      },
    },
  },

  // App-specific (React + Browser)
  {
    files: ["app/src/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parserOptions: {
        // point at the *real* project files instead of the bare composite
        project: [
          "./app/tsconfig.json"
        ],
        tsconfigRootDir: process.cwd(),
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off", // Vite/React 17+ doesn’t need React in scope
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // Overrides
  {
    // Ignore linting config files themselves
    files: ["eslint.config.*", "vite.config.*"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "import/no-extraneous-dependencies": "off",
    },
  },
  {
    // Example: disable target="_blank" rule if you don’t want to fix all anchors
    files: ["app/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "react/jsx-no-target-blank": "off"
    }
  }
]);