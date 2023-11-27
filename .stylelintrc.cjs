module.exports = {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'selector-class-pattern': /^[-_a-zA-Z0-9]+$/,
  },
  ignoreFiles: ['_old/**/*'],
};
