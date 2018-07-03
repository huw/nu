module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  globals: {
    graphql: false,
    __PREFIX_PATHS__: false,
    __PATH_PREFIX__: false,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'react/jsx-filename-extension': 'off',
  },
};
