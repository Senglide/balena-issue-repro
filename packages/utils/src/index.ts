export * from './files'

export function delay(time: number, value?: any) {
    return new Promise((resolve) => {
        setTimeout(resolve, time, value)
    })
}

export function deepMerge(target = {}, source = {}) {
    let result = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(source)) {
        const obj = source[key]
        if (!!obj && obj.constructor === Object) {
            result = {
                ...result,
                [key]: deepMerge(target[key], source[key]),
            }
        }
    }
    return {
        ...target,
        ...source,
        ...result,
    }
}
