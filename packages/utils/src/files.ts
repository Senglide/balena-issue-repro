/* eslint-disable import/prefer-default-export */
export const bytesToSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes <= 0) {
        return '0 Byte'
    }
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    const size = Math.round(bytes / 1024 ** i, 2)
    return `${size} ${sizes[i]}`
}
