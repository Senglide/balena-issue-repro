import { bytesToSize } from '../files'

test("that 'bytesToSize' return the correct values.", () => {
    const size = bytesToSize(1024)
    expect(size).toEqual('1 KB')
})
