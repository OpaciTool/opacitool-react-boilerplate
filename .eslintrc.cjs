module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:storybook/recommended"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "commitlint.config.js"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
      },
    ],
    "react/jsx-no-useless-fragment": "error",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-refresh/only-export-components": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
