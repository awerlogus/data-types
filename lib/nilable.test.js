const N = require('./nullable')
const NO = require('./nilable')
const O = require('./option')

// SECTION Utils

/** @type {(x: number) => number} */
const add1 = x => x + 1

/** @type {(x: number) => N.Nullable<number>} */
const checkNonZeroN = x => x === 0 ? null : N.some(x)

/** @type {(x: number) => O.Option<number>} */
const checkNonZeroO = x => x === 0 ? O.none : O.some(x)

/** @type {() => 0} */
const getZero = () => 0

// SECTION Tests

describe('isNil function', () => {
  it('should return true if Null passed', () => {
    expect(NO.isNil(null)).toBe(true)
  })

  it('should return true if None passed', () => {
    expect(NO.isNil(O.none)).toBe(true)
  })

  it('should return false if Some data passed', () => {
    expect(NO.isNil(N.some(0))).toBe(false)
    expect(NO.isNil(O.some(0))).toBe(false)
  })
})

describe('isSome function', () => {
  it('should return true if Some data passed', () => {
    expect(NO.isSome(N.some(0))).toBe(true)
    expect(NO.isSome(O.some(0))).toBe(true)
  })

  it('should return false if Nil value passed', () => {
    expect(NO.isSome(O.none)).toBe(false)
    expect(NO.isSome(null)).toBe(false)
  })
})

describe('map function', () => {
  it('should return Nil if Nil value passed', () => {
    expect(NO.map(O.none, add1)).toBe(O.none)
    expect(NO.map(null, add1)).toBeNull()
  })

  it('should apply function if Some data passed', () => {
    expect(NO.map(N.some(0), add1)).toBe(N.some(1))
    expect(NO.map(O.some(0), add1)).toBe(O.some(1))
  })
})

describe('mapC function', () => {
  it('should return Nil if Nil value passed', () => {
    expect(NO.mapC(add1)(O.none)).toBe(O.none)
    expect(NO.mapC(add1)(null)).toBeNull()
  })

  it('should apply function if Some data passed', () => {
    expect(NO.mapC(add1)(N.some(0))).toBe(N.some(1))
    expect(NO.mapC(add1)(O.some(0))).toBe(O.some(1))
  })
})

describe('chain function', () => {
  it('should return Nil if Nil value passed', () => {
    expect(NO.chain(O.none, checkNonZeroO)).toBe(O.none)
    expect(NO.chain(null, checkNonZeroN)).toBeNull()
  })

  it('should return Nil if function returned Nil', () => {
    expect(NO.chain(O.some(0), checkNonZeroO)).toBe(O.none)
    expect(NO.chain(N.some(0), checkNonZeroN)).toBeNull()
  })

  it('should return Some data if function returned Some', () => {
    expect(NO.chain(O.some(1), checkNonZeroO)).toBe(O.some(1))
    expect(NO.chain(N.some(1), checkNonZeroN)).toBe(N.some(1))
  })
})

describe('chainC function', () => {
  it('should return Nil if Nil value passed', () => {
    expect(NO.chainC(checkNonZeroO)(O.none)).toBe(O.none)
    expect(NO.chainC(checkNonZeroN)(null)).toBeNull()
  })

  it('should return Nil if function returned Nil', () => {
    expect(NO.chainC(checkNonZeroO)(O.some(0))).toBe(O.none)
    expect(NO.chainC(checkNonZeroN)(N.some(0))).toBeNull()
  })

  it('should return Some data if function returned Some', () => {
    expect(NO.chainC(checkNonZeroO)(O.some(1))).toBe(O.some(1))
    expect(NO.chainC(checkNonZeroN)(N.some(1))).toBe(N.some(1))
  })
})

describe('getOrElse function', () => {
  it('should return initial Some data', () => {
    expect(NO.getOrElse(O.some(1), 0)).toBe(1)
    expect(NO.getOrElse(N.some(1), 0)).toBe(1)
  })

  it('should return alter data if Nil passed', () => {
    expect(NO.getOrElse(O.none, 0)).toBe(0)
    expect(NO.getOrElse(null, 0)).toBe(0)
  })
})

describe('getOrElseL function', () => {
  it('should return initial Some data', () => {
    expect(NO.getOrElseL(O.some(1), getZero)).toBe(1)
    expect(NO.getOrElseL(N.some(1), getZero)).toBe(1)
  })

  it('should return alter data if Nil passed', () => {
    expect(NO.getOrElseL(O.none, getZero)).toBe(0)
    expect(NO.getOrElseL(null, getZero)).toBe(0)
  })
})

describe('getOrElseC function', () => {
  it('should return initial Some data', () => {
    expect(NO.getOrElseC(0)(O.some(1))).toBe(1)
    expect(NO.getOrElseC(0)(N.some(1))).toBe(1)
  })

  it('should return alter data if Nil passed', () => {
    expect(NO.getOrElseC(0)(O.none)).toBe(0)
    expect(NO.getOrElseC(0)(null)).toBe(0)
  })
})

describe('getOrElseLC function', () => {
  it('should return initial Some data', () => {
    expect(NO.getOrElseLC(getZero)(O.some(1))).toBe(1)
    expect(NO.getOrElseLC(getZero)(N.some(1))).toBe(1)
  })

  it('should return alter data if Nil passed', () => {
    expect(NO.getOrElseLC(getZero)(O.none)).toBe(0)
    expect(NO.getOrElseLC(getZero)(null)).toBe(0)
  })
})

describe('fold function', () => {
  it('should map value with first function on data is Some', () => {
    expect(NO.fold(O.some(0), add1, 0)).toBe(1)
    expect(NO.fold(N.some(0), add1, 0)).toBe(1)
  })

  it('should return default value on data is Nil', () => {
    expect(NO.fold(O.none, add1, 0)).toBe(0)
    expect(NO.fold(null, add1, 0)).toBe(0)
  })
})

describe('foldL function', () => {
  it('should map value with first function on data is Some', () => {
    expect(NO.foldL(O.some(0), add1, getZero)).toBe(1)
    expect(NO.foldL(N.some(0), add1, getZero)).toBe(1)
  })

  it('should return default value on data is Nil', () => {
    expect(NO.foldL(O.none, add1, getZero)).toBe(0)
    expect(NO.foldL(null, add1, getZero)).toBe(0)
  })
})

describe('foldC function', () => {
  it('should map value with first function on data is Some', () => {
    expect(NO.foldC(add1, 0)(O.some(0))).toBe(1)
    expect(NO.foldC(add1, 0)(N.some(0))).toBe(1)
  })

  it('should return default value on data is Nil', () => {
    expect(NO.foldC(add1, 0)(O.none)).toBe(0)
    expect(NO.foldC(add1, 0)(null)).toBe(0)
  })
})

describe('foldLC function', () => {
  it('should map value with first function on data is Some', () => {
    expect(NO.foldLC(add1, getZero)(O.some(0))).toBe(1)
    expect(NO.foldLC(add1, getZero)(N.some(0))).toBe(1)
  })

  it('should return default value on data is Nil', () => {
    expect(NO.foldLC(add1, getZero)(O.none)).toBe(0)
    expect(NO.foldLC(add1, getZero)(null)).toBe(0)
  })
})

describe('toNullable function', () => {
  it('should return Some value if Some data passed', () => {
    expect(NO.toNullable(O.some(0))).toBe(N.some(0))
    expect(NO.toNullable(N.some(0))).toBe(N.some(0))
  })

  it('should return Null value if None value passed', () => {
    expect(NO.toNullable(O.none)).toBeNull()
    expect(NO.toNullable(null)).toBeNull()
  })
})

describe('toOption function', () => {
  it('should return Some value if Some data passed', () => {
    expect(NO.toOption(O.some(0))).toBe(O.some(0))
    expect(NO.toOption(N.some(0))).toBe(O.some(0))
  })

  it('should return None value if Null value passed', () => {
    expect(NO.toOption(O.none)).toBe(O.none)
    expect(NO.toOption(null)).toBe(O.none)
  })
})
