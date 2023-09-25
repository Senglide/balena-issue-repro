import type { Config } from 'jest'

export default {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    globalSetup: './jest.globalSetup.ts',
    reporters: ['default', 'github-actions'],
    testTimeout: 100000,
    preset: 'ts-jest/presets/js-with-ts-esm',
    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest',
    },
} satisfies Config
