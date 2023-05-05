/* eslint-env node */
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'react-refresh', 'import'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'import/no-unresolved': 0,
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    project: './tsconfig.json',
  },
};
