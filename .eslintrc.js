module.exports = {
  root: true,
  plugins: [
    // plugins has no priority.
    'jsx-a11y',
    'import',
    'prettier',
  ],
  extends: [
    // extends has priority. Last index has the highest priority.
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'airbnb/hooks',
    'airbnb',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {},
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 15,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      // eslint-import-resolver-alias
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
};
