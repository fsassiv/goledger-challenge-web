// eslint.config.js
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // TypeScript recommended rules
      ...typescriptPlugin.configs.recommended.rules,
      // Prettier recommended rules
      ...prettierPlugin.configs.recommended.rules,

      // Custom rules
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "prettier/prettier": "error", // Enforce Prettier formatting as errors
      "@typescript-eslint/no-require-imports": "off",
    },
    ignores: [".eslintrc.js"], // Ignore patterns in the new format
  },
];
