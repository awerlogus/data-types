const F = require('./function')

// SECTION Utils

/** @type {(number: number) => number} */
function double (number) { return number << 1 }

/** @type {(number: number) => number} */
function increment (number) { return number + 1 }

/** @type {() => number} */
function lazyOne () { return 1 }

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

describe('flowC function', () => {
  it('should return function that applies second function to result of first', () => {
    expect(F.flowC(double)(increment)(1)).toBe(3)
    expect(F.flowC(increment)(double)(1)).toBe(4)
    expect(F.flowC(double)(double)(1)).toBe(4)
    expect(F.flowC(increment)(increment)(1)).toBe(3)
    expect(F.flowC(F.flowC(double)(double))(double)(1)).toBe(8)
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
    await expect(F.noopA()).resolves.toBeUndefined()
  })
})

describe('never function', () => {
  it('should throw an error when called', () => {
    expect(F.never).toThrow('')
  })
})

describe('absurd function', () => {
  it('should accept never value', () => {
    const a = 0

    expect(() => {
      // eslint-disable-next-line jest/no-conditional-in-test
      switch (a) {
        case 0: break
        default: F.absurd(a)
      }
    }).not.toThrow()
  })

  it('should not accept any values other than never', () => {
    // @ts-expect-error
    expect(() => F.absurd(0)).toThrow('')
  })
})

describe('call function', () => {
  it('should call function with no parameters if not passed and return result', () => {
    expect(F.call()(lazyOne)).toBe(1)
  })

  it('should call function with parameters bound and return result', () => {
    expect(F.call(1)(increment)).toBe(2)
  })
})

describe('callL function', () => {
  it('should call lazy function and return result', () => {
    expect(F.callL(lazyOne)).toBe(1)
  })
})
