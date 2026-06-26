const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // 缩进 2 空格
      indent: ["warn", 2],
      // 双引号
      quotes: ["warn", "double", { avoidEscape: true }],
      // 必须加分号
      semi: ["warn", "always"],
      // 多行时末尾加逗号
      "comma-dangle": ["warn", "always-multiline"],
      // 禁止未使用的变量
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // 允许 console.log
      "no-console": "off",
      // 禁止 var
      "no-var": "error",
      // 优先使用 const
      "prefer-const": "error",
      // 必须使用 ===
      eqeqeq: ["error", "always"],
      // 禁止行尾空格
      "no-trailing-spaces": "warn",
      // 文件末尾保留换行
      "eol-last": ["warn", "always"],
    },
  },
  {
    // 不检查的文件
    ignores: ["node_modules/", "data/"],
  },
];
