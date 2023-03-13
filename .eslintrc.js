module.exports = {
  extends: ['plugin:vue/recommended', 'eslint:all', '@vue/prettier'],
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: 'node_modules/@vue/cli-service/webpack.config.js',
      },
    },
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  globals: {
    BUILD_TAG: true,
    jsToNative: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    semi: ['error', 'never'],
    'max-len': [
      'error',
      100,
      2,
      {
        ignoreUrls: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-alert': 'error',
    'no-debugger': 'error',
    'no-console': 'warn',
    'sort-keys': 'off',
    'no-magic-numbers': 'off',
    'sort-imports': 'off',
    'no-ternary': 'off',
    'capitalized-comments': 'off',
    'one-var': ['error', 'never'],
    'no-inline-comments': ['error'],
    'require-unicode-regexp': 'off',
    'prettier/prettier': 'error',
    'prefer-named-capture-group': 'off',
    'max-lines': 'off',
    'max-lines-per-function': 'off',
    'max-statements': 'off',
    complexity: 'off',
    camelcase: ['error', { properties: 'never' }],
    'id-length': 'off',
    'require-atomic-updates': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'multiline-comment-style': 'off',
    'no-bitwise': 'off',
    'no-undefined': 'off',
    'prefer-promise-reject-errors': 'off',
  },
  root: true,
}