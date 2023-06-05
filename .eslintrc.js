module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["jest", "prettier"],
  rules: {
    "new-cap": "warn",
    "no-undef": "warn",
    "no-shadow": "warn",
    "no-unused-vars": "warn",
    "prettier/prettier": "error",
    "require-jsdoc": 0,
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "always",
        mjs: "never",
        jsx: "never",
        css: "never",
      },
    ],
    "max-len": [
      "error",
      {
        code: 130,
        ignoreComments: true,
      },
    ],
  },
};
