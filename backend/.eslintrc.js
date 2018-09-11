module.exports = {
  extends: 'airbnb-base',
  env: {
    node: true,
  },
  rules: {
    'prefer-template': 'off',
    'function-paren-newline': ['error', { minItems: 5 }],
    'consistent-return': 'off',
    'prefer-destructuring': 'off',
    'arrow-body-style': 'off',
    'no-unused-expressions': 'off',
    'prefer-arrow-callback': ['error', { allowUnboundThis: true }],
    'func-names': 'off',
    'no-param-reassign': ['error', { props: false }],
  },
};
