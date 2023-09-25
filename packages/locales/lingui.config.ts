import { formatter } from '@lingui/format-json'

const config = {
    locales: ['en', 'nl'],
    sourceLocale: 'en',
    catalogs: [
        {
            path: '{locale}/messages',
            include: [
                '../../apps/api/src',
                '../../apps/mini/src',
                '../../apps/admin/src',
                '../../apps/standup/src',
                '../../packages/components/src',
            ],
        },
    ],
    format: formatter({ style: 'lingui' }),
}

export default config
