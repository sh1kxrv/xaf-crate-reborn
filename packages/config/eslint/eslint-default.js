module.exports = (config_path) => {
  return {
    root: true,
    env: {
      es2021: true,
      node: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "plugin:@typescript-eslint/strict",
      "prettier",
    ],
    plugins: ["@typescript-eslint"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      tsconfigRootDir: config_path,
      project: ["./tsconfig.json"],
    },
    ignorePatterns: ["*.*", "!src/**/*", "packages/config/*"],
  };
};
