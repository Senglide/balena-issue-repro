module.exports = {
    extends: [
        '@dashdot/eslint-config-react',
        'prettier',
        'next/core-web-vitals',
        'next',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['simple-import-sort', 'prettier', '@typescript-eslint'],
    rules: {
        'lines-between-class-members': [
            'error',
            'always',
            { exceptAfterSingleLine: true },
        ],
        'import/extensions': 'off',
        'react/require-default-props': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'warn',
        '@next/next/no-html-link-for-pages': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
    globals: {
        JSX: 'readonly',
    },
}
