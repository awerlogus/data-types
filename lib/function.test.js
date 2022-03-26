const F = require('./function')

// SECTION Utils

/** @type {(number: number) => number} */
function double (number) { return number << 1 }

/** @type {(number: number) => number} */
function increment (number) { return number + 1 }

// SECTION Tests

describe('flow function', () => {
  it('should return function that applies second function to result of first', () => {
    expect(F.flow(double, increment)(1)).toBe(3)

    expect(F.flow(increment, double)(1)).toBe(4)

    expect(F.flow(double, double)(1)).toBe(4)

    expect(F.flow(increment, increment)(1)).toBe(3)

    expect(F.flow(F.flow(double, double), double)(1)).toBe(8)
  })
})

describe('id function', () => {
  it('should return the same value as passed', () => {
    expect(F.id(0)).toBe(0)

    expect(F.id('')).toBe('')

    expect(F.id(false)).toBe(false)
  })
})

describe('noop function', () => {
  it('should return undefined', () => {
    expect(F.noop()).toBeUndefined()
  })
})

describe('noopA function', () => {
  it('should return promise of undefined', async () => {
    expect(await F.noopA()).toBeUndefined()
  })
})
