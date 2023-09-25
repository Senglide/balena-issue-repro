import type { Config } from 'tailwindcss'

export default {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        '../../packages/components/src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            zIndex: {
                '-1': '-1',
                0: '0',
                1: '1',
                header: '2',
                modals: '3',
                popovers: '4',
                tooltips: '5',
                notifications: '6',
                auto: 'auto',
            },
            fontFamily: {
                sensei: ['Sensei'],
                sans: ['Open Sans'],
            },
            colors: {
                white: {
                    DEFAULT: '#FFF',
                    neutral: '#FAFAFA',
                },
                grey: {
                    'extra-light': '#F2F2F2',
                    light: '#E9E9E9',
                    DEFAULT: '#969696',
                    dark: '#555',
                    'extra-dark': '#333',
                },
                black: {
                    DEFAULT: '#000',
                    neutral: {
                        light: '#2E2E2E',
                        DEFAULT: '#0D0A0A',
                    },
                },
                blue: {
                    light: '#BAE3F0',
                    DEFAULT: '#4EABD2',
                },
                yellow: {
                    light: '#F8ECC9',
                    DEFAULT: '#F2CB57',
                    dark: '#DAB74E',
                },
                red: {
                    'extra-light': '#F4B9B8',
                    light: '#F5C5B4',
                    DEFAULT: '#D94D1A',
                    dark: '#C15552',
                },
                teal: {
                    light: '#AFE2DE',
                    DEFAULT: '#00A99D',
                },
                green: {
                    'extra-light': '#E5F1EC',
                    light: '#CFE9DF',
                    DEFAULT: '#79C1A6',
                    dark: '#619984',
                    'extra-dark': '#78BFA5',
                },
                brown: {
                    light: '#E5A188',
                    DEFAULT: '#AE923E',
                },
                orange: {
                    DEFAULT: '#EDA44E',
                },
            },
        },
    },
    plugins: [],
} satisfies Config
