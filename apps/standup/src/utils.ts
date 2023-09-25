/* eslint-disable no-plusplus */
/* eslint-disable no-cond-assign */
/* eslint-disable no-bitwise */
const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const atob = (input = '') => {
    const str = input.replace(/=+$/, '')
    let output = ''
    if (str.length % 4 === 1) {
        throw new Error(
            "'atob' failed: The string to be decoded is not correctly encoded.",
        )
    }
    for (
        let bc = 0, bs = 0, buffer, i = 0;
        (buffer = str.charAt(i++));
        ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
            ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
            : 0
    ) {
        buffer = chars.indexOf(buffer)
    }
    return output
}

export const base64ToBinary = (input: string) => {
    const raw = atob(input)
    const rawLength = raw.length
    const array = new Uint8Array(new ArrayBuffer(rawLength))
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i)
    }
    return array
}

export function hexToBinary(hex: string) {
    return parseInt(hex, 16).toString(2).padStart(8, '0')
}

export const base64ToHex = (str: string) => {
    const hex = []
    const bin = atob(str.replace(/[ \r\n]+$/, ''))
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < bin.length; ++i) {
        let tmp = bin.charCodeAt(i).toString(16)
        if (tmp.length === 1) {
            tmp = `0${tmp}`
        }
        hex[hex.length] = tmp
    }
    return hex
}

export const hexToAscii = (hex: string) => {
    let str = ''
    for (let n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
    }
    return str
}

export function parseBytes(in1: number, in2: number, in3: number) {
    const out1 = in1 >> 1
    const out2 = (in2 >> 2) + ((in1 & 1) << 6)
    const out3 = (in3 >> 3) + ((in2 & 3) << 5)
    const temp4 = (in3 & 7) << 4
    const out4 =
        ((out1 & 0xf0) >> 4) ^
        (out1 & 0x0f) ^
        (((out2 & 0xf0) >> 4) ^ (out2 & 0x0f)) ^
        (((out3 & 0xf0) >> 4) ^ (out3 & 0x0f)) ^
        (((temp4 & 0xf0) >> 4) + temp4)

    return [out1, out2, out3, out4]
}
