
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    ml5: 'readonly',
    p5: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'brace-style': ['error', 'stroustrup'],
    // 'camelcase': 0,
    // 'default-case': 0,
    'indent': ['error',
      4,
      { 'SwitchCase': 1 }
    ],
    // 'new-cap': 0,
    'max-len': 0,
    'new-cap': 0,
    // 'no-bitwise': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'no-restricted-globals': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    // 'prefer-destructuring': 0,
    // 'prefer-template': 0,
    'semi': 0,
    'semi-style': ['error', 'first'],
  },
};
