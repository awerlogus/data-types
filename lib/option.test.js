const O = require('./option')

// SECTION Utils

/** @type {(x: number) => number} */
const add1 = x => x + 1

/** @type {(x: number) => O.Option<number>} */
const checkNonZero = x => x === 0 ? O.none : O.some(x)

/** @type {() => 0} */
const getZero = () => 0

// SECTION Tests

describe('isNone function', () => {
  it('should return true if None passed', () => {
    expect(O.isNone(O.none)).toBe(true)
  })

  it('should return false if Some data passed', () => {
    expect(O.isNone(O.some(0))).toBe(false)
  })
})

describe('isSome function', () => {
  it('should return true if Some data passed', () => {
    expect(O.isSome(O.some(0))).toBe(true)
  })

  it('should return false if None value passed', () => {
    expect(O.isSome(O.none)).toBe(false)
  })
})

describe('map function', () => {
  it('should return None if None value passed', () => {
    expect(O.map(add1)(O.none)).toBe(O.none)
  })

  it('should apply function if Some data passed', () => {
    expect(O.map(add1)(O.some(0))).toBe(O.some(1))
  })
})

describe('chain function', () => {
  it('should return None if None value passed', () => {
    expect(O.chain(checkNonZero)(O.none)).toBe(O.none)
  })

  it('should return None if function returned None', () => {
    expect(O.chain(checkNonZero)(O.some(0))).toBe(O.none)
  })

  it('should return Some data if function returned Some', () => {
    expect(O.chain(checkNonZero)(O.some(1))).toBe(O.some(1))
  })
})

describe('getOrElse function', () => {
  it('should return initial Some data', () => {
    expect(O.getOrElse(getZero)(O.some(1))).toBe(1)
  })

  it('should return alter data if None passed', () => {
    expect(O.getOrElse(getZero)(O.none)).toBe(0)
  })
})

describe('fold function', () => {
  it('should map value with first function on data is Some', () => {
    expect(O.fold(add1, 0)(O.some(0))).toBe(1)
  })

  it('should return default value on data is None', () => {
    expect(O.fold(add1, 0)(O.none)).toBe(0)
  })
})

describe('foldL function', () => {
  it('should map value with first function on data is Some', () => {
    expect(O.foldL(add1, getZero)(O.some(0))).toBe(1)
  })

  it('should return default value on data is None', () => {
    expect(O.foldL(add1, getZero)(O.none)).toBe(0)
  })
})
