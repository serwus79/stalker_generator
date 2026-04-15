module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: ['./tsconfig.eslint.json'],
  },
  plugins: ['@typescript-eslint', 'vue'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^h$' }],
      },
    },
  ],
  settings: {
    'vue/setup-compiler-macros': true,
  },
}
