const A = require('./async')

// SECTION Utils

/** @type {(x: number) => number} */
const add1 = x => x + 1

/** @type {(x: number) => Promise<number>} */
const add1Async = x => Promise.resolve(x + 1)

// SECTION Tests

describe('of function', () => {
  it('should wrap value in promise', async () => {
    expect(await A.of(0)).toBe(0)
  })
})

describe('map function', () => {
  it('should map promise with a function', async () => {
    const promise = Promise.resolve(0)

    const result = await A.map(promise, add1)

    expect(result).toBe(1)
  })
})

describe('mapC function', () => {
  it('should map promise with a function', async () => {
    const promise = Promise.resolve(0)

    const result = await A.mapC(add1)(promise)

    expect(result).toBe(1)
  })
})

describe('chain function', () => {
  it('should chain promise with a function', async () => {
    const promise = Promise.resolve(0)

    const result = await A.chain(promise, add1Async)

    expect(result).toBe(1)
  })
})

describe('chainC function', () => {
  it('should chain promise with a function', async () => {
    const promise = Promise.resolve(0)

    const result = await A.chainC(add1Async)(promise)

    expect(result).toBe(1)
  })
})
