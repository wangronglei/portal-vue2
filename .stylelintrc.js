module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  rules: {
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['mso-hide'],
      },
    ],
    indentation: [2, { baseIndentLevel: 0 }],
    'no-descending-specificity': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
  },
}
