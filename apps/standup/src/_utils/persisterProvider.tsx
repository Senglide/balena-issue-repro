'use client'

import React from 'react'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import usePersister from '../_hooks/useCreateStoragePersister'

function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                cacheTime: 1000 * 60 * 60 * 24,
            },
        },
    })

    const persister = usePersister()

    // TODO: log to sentry persister failed
    if (!persister) return children

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{
                persister,
            }}
        >
            {children}
        </PersistQueryClientProvider>
    )
}

export default Providers
