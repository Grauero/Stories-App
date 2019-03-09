module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'comma-dangle': 0,
    'linebreak-style': 0,
    'object-curly-newline': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'global-require': 0,
    'prefer-destructuring': 0,
    eqeqeq: 0
  }
};
