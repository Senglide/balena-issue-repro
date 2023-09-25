'use client'

import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import superjson from 'superjson'
import { AppRouter as ApiAppRouter } from '@dripl/api/src/server/trpc'

export const trpcApi = createTRPCNext<ApiAppRouter>({
    config() {
        return {
            transformer: superjson,
            links: [
                httpBatchLink({
                    url:
                        process.env.TRPC_API_HOST ??
                        'http://localhost:3000/trpc',

                    // You can pass any HTTP headers you wish here
                    async headers() {
                        return {
                            // authorization: getAuthCookie(),
                        }
                    },
                }),
            ],
        }
    },
    /**
     * @link https://trpc.io/docs/ssr
     * */
    ssr: false,
})
