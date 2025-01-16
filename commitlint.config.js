export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "chore", "hotfix"]],
    "subject-case": [0],
  },
};
