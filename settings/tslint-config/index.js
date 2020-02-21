const path = require('path');

module.exports = {
  extends: [
    'tslint:latest',
    'tslint:recommended',
    'tslint-react',
    'tslint-config-prettier'
  ],
  rulesDirectory: [
    path.resolve(process.cwd(), 'node_modules/tslint-import-rules/dist/rules')
  ],
  rules: {
    // TypeScript specific
    'ban-types': false,
    'member-ordering': [
      true,
      {
        order: [
          'private-instance-field',
          'protected-instance-field',
          'public-instance-field',
          'constructor',
          'private-instance-method',
          'protected-instance-method',
          'public-instance-method',
          'private-static-method',
          'protected-static-method',
          'public-static-method'
        ]
      }
    ],
    "no-implicit-dependencies": false,
    'member-access': [true, 'no-public'],
    'no-internal-module': true,
    'no-string-literal': true,
    'no-namespace': [true, 'allow-declarations'],
    'typedef-whitespace': [
      true,
      {
        'call-signature': 'nospace',
        'index-signature': 'nospace',
        parameter: 'nospace',
        'property-declaration': 'nospace',
        'variable-declaration': 'nospace'
      },
      {
        'call-signature': 'onespace',
        'index-signature': 'onespace',
        parameter: 'onespace',
        'property-declaration': 'onespace',
        'variable-declaration': 'onespace'
      }
    ],
    'interface-name': false,
    'array-type': false,

    // TSLint general code style
    'import-spacing': false,
    'space-before-function-paren': false,
    'no-var-requires': false,
    eofline: false,
    'object-literal-shorthand': false,
    'no-shadowed-variable': false,
    'object-literal-sort-keys': false,
    'ordered-imports': false,
    'switch-default': true,
    'triple-equals': [true, 'allow-null-check'],
    'no-consecutive-blank-lines': [true, 1],
    forin: true,
    'no-arg': true,
    'no-submodule-imports': false,
    'no-switch-case-fall-through': true,
    'no-duplicate-variable': true,
    'no-unused-expression': true,
    'variable-name': [true, 'ban-keywords', 'allow-pascal-case'],
    'no-trailing-whitespace': false,
    'no-var-keyword': true,
    'jsdoc-format': true,
    'new-parens': true,
    'one-variable-per-declaration': [true, 'ignore-for-loop'],
    'one-line': [
      true,
      'check-catch',
      'check-finally',
      'check-else',
      'check-open-brace'
    ],
    whitespace: [
      true,
      'check-branch',
      'check-decl',
      'check-operator',
      'check-separator',
      'check-type',
      'check-preblock'
    ],
    semicolon: false,
    quotemark: false,
    'max-line-length': false,
    'prefer-template': [true, 'allow-single-concat'],
    'object-literal-key-quotes': [true, 'as-needed'],
    'trailing-comma': [
      true,
      {
        multiline: 'never',
        singleline: 'never'
      }
    ],
    'no-empty': true,
    'no-irregular-whitespace': true,
    'no-sparse-arrays': true,
    'use-isnan': true,
    'no-console': false,
    curly: true,
    'no-eval': true,
    radix: true,
    indent: [true, 'spaces', 4],
    'jsx-no-lambda': false,
    'jsx-no-string-ref': true,
    'jsx-no-bind': false,
    'jsx-alignment': false,
    'jsx-curly-spacing': false,
    'jsx-equals-spacing': false,
    'jsx-ban-elements': false,
    'jsx-use-translation-function': false,
    'jsx-space-before-trailing-slash': false,
    'jsx-no-multiline-js': false,
    'jsx-wrap-multiline': true,
    'jsx-self-close': true,
    'jsx-key': true
  }
};
