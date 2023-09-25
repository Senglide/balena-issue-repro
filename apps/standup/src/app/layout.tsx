'use client'

import './globals.css'
import { I18nProvider } from '@lingui/react'
import { setupLocales } from '@dripl/locales/util'
import { DEFAULT_LANGUAGE } from '@dripl/constants'
import { trpcApi } from '../_utils/trpc'
import PersisterProvider from '../_utils/persisterProvider'

function RootLayout({ children }: { children: React.ReactNode }) {
    const i18n = setupLocales(DEFAULT_LANGUAGE)

    return (
        <html lang="en">
            <body className="h-screen">
                <PersisterProvider>
                    <I18nProvider i18n={i18n}>{children}</I18nProvider>
                </PersisterProvider>
            </body>
        </html>
    )
}

export default trpcApi.withTRPC(RootLayout)
