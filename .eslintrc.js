module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  globals: {
    graphql: false,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
