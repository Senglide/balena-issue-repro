module.exports = {
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    plugins: ['prettier-plugin-tailwindcss'],
    tailwindConfig: './packages/components/tailwind.config.ts',
    tailwindFunctions: ['clsx', 'cx', 'cva'],
}
