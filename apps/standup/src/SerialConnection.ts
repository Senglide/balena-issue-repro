import {ReadlineParser, SerialPort} from 'serialport'
import {MockBinding} from '@serialport/binding-mock'
import {parseBytes} from "@/utils";

type SerialMessage = {
    headerA: [number, number, number]
    headerB: [number, number, number]
}

const TEST_MESSAGE_1: SerialMessage = {
    headerA: [0x73, 0x00, 0x01],
    headerB: [0x44, 0x41, 0x00],
}
const TEST_MESSAGE_2: SerialMessage = {
    headerA: [0x73, 0x00, 0x03],
    headerB: [0x44, 0x42, 0x00],
}

export default class SerialConnection {
    // eslint-disable-next-line no-use-before-define
    static instance: SerialConnection | null = null
    port: SerialPort
    parser: ReadlineParser

    constructor() {
        try {
            const {SERIAL_PORT_PATH = '', NODE_ENV} = process.env

            const options = {
                path: "/dev/ttyUSB0",
                baudRate: 115200,
                autoOpen: false,
            }
            if (NODE_ENV === 'test') {
                MockBinding.createPort(SERIAL_PORT_PATH, {
                    echo: true,
                    record: true,
                })
                options.binding = MockBinding
            }
            this.port = new SerialPort(options)
            this.parser = this.port.pipe(new ReadlineParser({delimiter: '\r\n'}))
        } catch (error) {
            console.error("Could not open serial port: ", error);
        }
    }

    static getInstance() {
        if (!SerialConnection.instance) {
            SerialConnection.instance = new SerialConnection()
        }
        return SerialConnection.instance
    }

    async init() {
        return new Promise<void>((resolve, reject) => {
            this.port.open((error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })
        })
    }

    destroy() {
        return new Promise<void>((resolve, reject) => {
            this.port.close((error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })
        })
    }

    async write(message: SerialMessage) {
        return new Promise((resolve, reject) => {
            const data = [
                0x81,
                ...parseBytes(...message.headerA),
                0x9d,
                ...parseBytes(...message.headerB),
                0x84,
            ]
            const waitForResponse = (response: Buffer) => {
                resolve(response.toString('hex'))
                this.port.removeListener('data', waitForResponse)
            }
            this.port.addListener('data', waitForResponse)
            this.port.write(Buffer.from(data), (err) => {
                if (err) {
                    reject(err)
                }
            })
        })
    }

    writeTestMessageWithNoDataInResponse() {
        return this.write(TEST_MESSAGE_1)
    }

    writeTestMessageWithDataInResponse() {
        return this.write(TEST_MESSAGE_2)
    }
}
