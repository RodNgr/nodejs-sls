import stylisticEslintPluginTs from '@stylistic/eslint-plugin-ts'
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
})

export default [
    ...compat.extends(),
    {
        plugins: {
            '@stylistic/ts': stylisticEslintPluginTs,
            '@typescript-eslint': typescriptEslintEslintPlugin,
        },

        languageOptions: {
            globals: {
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },

        rules: {
            '@stylistic/ts/semi': ['error', 'never'],
            '@stylistic/ts/indent': ['error', 4],
            '@stylistic/ts/quotes': ['error', 'single'],

            '@stylistic/ts/comma-spacing': [
                'error',
                {
                    before: false,
                    after: true,
                },
            ],

            '@stylistic/ts/object-curly-spacing': ['error', 'always'],

            '@stylistic/ts/keyword-spacing': [
                'error',
                {
                    after: true,
                    before: true,
                },
            ],

            '@stylistic/ts/space-before-function-paren': [
                'error',
                {
                    anonymous: 'always',
                    named: 'always',
                    asyncArrow: 'always',
                },
            ],

            '@stylistic/ts/space-infix-ops': 'error',

            '@stylistic/ts/space-before-blocks': [
                'error',
                {
                    functions: 'always',
                    keywords: 'always',
                    classes: 'always',
                },
            ],

            '@stylistic/ts/no-extra-parens': [
                'error',
                'all',
                {
                    returnAssign: true,
                    enforceForArrowConditionals: true,
                },
            ],
        },
    },
    {
        files: ['**/*.md', '**/*.ts'],
    },
    {
        ignores: [
            '**/node_modules/',
            '**/.build',
            '**/.husky',
            '**/.serverless',
            '**/.vscode',
            '**/coverage/',
            '**/.eslintrc.json',
            '**/serverless-checkov/',
        ],
    },
]
