module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    env: {
      commonjs: true,
      es6: true,
      node: true,
      'jest/globals': true,
    },
    plugins: ['prettier', 'jest'],
    extends: [
      'airbnb-base',
      'prettier',
      'plugin:jest/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
    ],
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
        },
      ],
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      'no-underscore-dangle': 'off',
      'object-shorthand': ['error', 'always'],
      'func-names': ['error', 'always'],
      'no-var': 'error',
      'no-useless-constructor': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'class-methods-use-this': 'off',
      'jest/no-focused-tests': 'warn',
      'jest/no-test-callback': 'off',
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'none',
        },
      ],
      'max-classes-per-file': 'off',
      'import/prefer-default-export': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          ts: 'never',
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {
          directory: `${__dirname}/tsconfig.json`,
        },
        node: {
          extensions: ['.js', '.ts'],
        },
      },
    },
  };
