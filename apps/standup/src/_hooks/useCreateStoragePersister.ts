import { useEffect, useState } from 'react'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

function usePersister() {
    const [storage, setStorage] = useState<Storage | null>(null)

    useEffect(() => {
        setStorage(window.localStorage)
    }, [])

    if (!storage) return null

    return createSyncStoragePersister({
        storage,
    })
}

export default usePersister
