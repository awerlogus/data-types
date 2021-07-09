const N = require('./nullable')

// SECTION Utils

/** @type {(x: number) => number} */
const add1 = x => x + 1

/** @type {(x: number) => N.Nullable<number>} */
const checkNonZero = x => x === 0 ? null : N.some(x)

/** @type {() => 0} */
const getZero = () => 0

// SECTION Tests

describe('isNull function', () => {
  it('should return true if Null passed', () => {
    expect(N.isNull(null)).toBe(true)
  })

  it('should return false if Some data passed', () => {
    expect(N.isNull(N.some(0))).toBe(false)
  })
})

describe('isSome function', () => {
  it('should return true if Some data passed', () => {
    expect(N.isSome(N.some(0))).toBe(true)
  })

  it('should return false if Null value passed', () => {
    expect(N.isSome(null)).toBe(false)
  })
})

describe('map function', () => {
  it('should return Null if Null value passed', () => {
    expect(N.map(add1)(null)).toBeNull()
  })

  it('should apply function if Some data passed', () => {
    expect(N.map(add1)(N.some(0))).toBe(N.some(1))
  })
})

describe('chain function', () => {
  it('should return Null if Null value passed', () => {
    expect(N.chain(checkNonZero)(null)).toBeNull()
  })

  it('should return Null if function returned Null', () => {
    expect(N.chain(checkNonZero)(N.some(0))).toBeNull()
  })

  it('should return Some data if function returned Some', () => {
    expect(N.chain(checkNonZero)(N.some(1))).toBe(N.some(1))
  })
})

describe('getOrElse function', () => {
  it('should return initial Some data', () => {
    expect(N.getOrElse(getZero)(N.some(1))).toBe(1)
  })

  it('should return alter data if Null passed', () => {
    expect(N.getOrElse(getZero)(null)).toBe(0)
  })
})

describe('fold function', () => {
  it('should map value with first function on data is Some', () => {
    expect(N.fold(add1, 0)(N.some(0))).toBe(1)
  })

  it('should return default value on data is Null', () => {
    expect(N.fold(add1, 0)(null)).toBe(0)
  })
})

describe('foldL function', () => {
  it('should map value with first function on data is Some', () => {
    expect(N.foldL(add1, getZero)(N.some(0))).toBe(1)
  })

  it('should return default value on data is Null', () => {
    expect(N.foldL(add1, getZero)(null)).toBe(0)
  })
})
