export const getFirmwareData = async <T>({
    endpoint,
    queryParams,
}: {
    endpoint: string
    queryParams?: Record<string, unknown>
}): Promise<T> => {
    let url = `${process.env.NEXT_PUBLIC_APP_FIRMWARE_HOST}${endpoint}`

    // Append query parameters if they exist
    if (queryParams) {
        const queryString = new URLSearchParams(
            queryParams as Record<string, string>,
        ).toString()
        url = `${url}?${queryString}`
    }

    const response = await fetch(url, { method: 'GET' })

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
    }

    return response.json()
}
