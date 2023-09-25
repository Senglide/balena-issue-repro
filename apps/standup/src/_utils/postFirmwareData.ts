export const postFirmwareData = async <T>({
    endpoint,
    data,
}: {
    endpoint: string
    data: Record<string, unknown>
}): Promise<T> => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_FIRMWARE_HOST}${endpoint}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        },
    )

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
    }

    return response.json()
}
