const N = require('./nullable')
const NL = require('./nilable')
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
    expect(NL.isNil(null)).toBe(true)
  })

  it('should return true if None passed', () => {
    expect(NL.isNil(O.none)).toBe(true)
  })

  it('should return false if Some data passed', () => {
    expect(NL.isNil(N.some(0))).toBe(false)
    expect(NL.isNil(O.some(0))).toBe(false)
  })
})

describe('isSome function', () => {
  it('should return true if Some data passed', () => {
    expect(NL.isSome(N.some(0))).toBe(true)
    expect(NL.isSome(O.some(0))).toBe(true)
  })

  it('should return false if Nil value passed', () => {
    expect(NL.isSome(O.none)).toBe(false)
    expect(NL.isSome(null)).toBe(false)
  })
})

describe('map function', () => {
  it('should return Nil if Nil value passed', () => {
    expect(NL.map(O.none, add1)).toBe(O.none)
    expect(NL.map(null, add1)).toBeNull()
  })

  it('should apply function if Some data passed', () => {
    expect(NL.map(N.some(0), add1)).toBe(N.some(1))
    expect(NL.map(O.some(0), add1)).toBe(O.some(1))
  })
})

describe('mapC function', () => {
  it('should return Nil if Nil value passed', () => {
    expect(NL.mapC(add1)(O.none)).toBe(O.none)
    expect(NL.mapC(add1)(null)).toBeNull()
  })

  it('should apply function if Some data passed', () => {
    expect(NL.mapC(add1)(N.some(0))).toBe(N.some(1))
    expect(NL.mapC(add1)(O.some(0))).toBe(O.some(1))
  })
})

describe('chain function', () => {
  it('should return Nil if Nil value passed', () => {
    expect(NL.chain(O.none, checkNonZeroO)).toBe(O.none)
    expect(NL.chain(null, checkNonZeroN)).toBeNull()
  })

  it('should return Nil if function returned Nil', () => {
    expect(NL.chain(O.some(0), checkNonZeroO)).toBe(O.none)
    expect(NL.chain(N.some(0), checkNonZeroN)).toBeNull()
  })

  it('should return Some data if function returned Some', () => {
    expect(NL.chain(O.some(1), checkNonZeroO)).toBe(O.some(1))
    expect(NL.chain(N.some(1), checkNonZeroN)).toBe(N.some(1))
  })
})

describe('chainC function', () => {
  it('should return Nil if Nil value passed', () => {
    expect(NL.chainC(checkNonZeroO)(O.none)).toBe(O.none)
    expect(NL.chainC(checkNonZeroN)(null)).toBeNull()
  })

  it('should return Nil if function returned Nil', () => {
    expect(NL.chainC(checkNonZeroO)(O.some(0))).toBe(O.none)
    expect(NL.chainC(checkNonZeroN)(N.some(0))).toBeNull()
  })

  it('should return Some data if function returned Some', () => {
    expect(NL.chainC(checkNonZeroO)(O.some(1))).toBe(O.some(1))
    expect(NL.chainC(checkNonZeroN)(N.some(1))).toBe(N.some(1))
  })
})

describe('getOrElse function', () => {
  it('should return initial Some data', () => {
    expect(NL.getOrElse(O.some(1), 0)).toBe(1)
    expect(NL.getOrElse(N.some(1), 0)).toBe(1)
  })

  it('should return alter data if Nil passed', () => {
    expect(NL.getOrElse(O.none, 0)).toBe(0)
    expect(NL.getOrElse(null, 0)).toBe(0)
  })
})

describe('getOrElseL function', () => {
  it('should return initial Some data', () => {
    expect(NL.getOrElseL(O.some(1), getZero)).toBe(1)
    expect(NL.getOrElseL(N.some(1), getZero)).toBe(1)
  })

  it('should return alter data if Nil passed', () => {
    expect(NL.getOrElseL(O.none, getZero)).toBe(0)
    expect(NL.getOrElseL(null, getZero)).toBe(0)
  })
})

describe('getOrElseC function', () => {
  it('should return initial Some data', () => {
    expect(NL.getOrElseC(0)(O.some(1))).toBe(1)
    expect(NL.getOrElseC(0)(N.some(1))).toBe(1)
  })

  it('should return alter data if Nil passed', () => {
    expect(NL.getOrElseC(0)(O.none)).toBe(0)
    expect(NL.getOrElseC(0)(null)).toBe(0)
  })
})

describe('getOrElseLC function', () => {
  it('should return initial Some data', () => {
    expect(NL.getOrElseLC(getZero)(O.some(1))).toBe(1)
    expect(NL.getOrElseLC(getZero)(N.some(1))).toBe(1)
  })

  it('should return alter data if Nil passed', () => {
    expect(NL.getOrElseLC(getZero)(O.none)).toBe(0)
    expect(NL.getOrElseLC(getZero)(null)).toBe(0)
  })
})

describe('fold function', () => {
  it('should map value with first function on data is Some', () => {
    expect(NL.fold(O.some(0), add1, 0)).toBe(1)
    expect(NL.fold(N.some(0), add1, 0)).toBe(1)
  })

  it('should return default value on data is Nil', () => {
    expect(NL.fold(O.none, add1, 0)).toBe(0)
    expect(NL.fold(null, add1, 0)).toBe(0)
  })
})

describe('foldL function', () => {
  it('should map value with first function on data is Some', () => {
    expect(NL.foldL(O.some(0), add1, getZero)).toBe(1)
    expect(NL.foldL(N.some(0), add1, getZero)).toBe(1)
  })

  it('should return default value on data is Nil', () => {
    expect(NL.foldL(O.none, add1, getZero)).toBe(0)
    expect(NL.foldL(null, add1, getZero)).toBe(0)
  })
})

describe('foldC function', () => {
  it('should map value with first function on data is Some', () => {
    expect(NL.foldC(add1, 0)(O.some(0))).toBe(1)
    expect(NL.foldC(add1, 0)(N.some(0))).toBe(1)
  })

  it('should return default value on data is Nil', () => {
    expect(NL.foldC(add1, 0)(O.none)).toBe(0)
    expect(NL.foldC(add1, 0)(null)).toBe(0)
  })
})

describe('foldLC function', () => {
  it('should map value with first function on data is Some', () => {
    expect(NL.foldLC(add1, getZero)(O.some(0))).toBe(1)
    expect(NL.foldLC(add1, getZero)(N.some(0))).toBe(1)
  })

  it('should return default value on data is Nil', () => {
    expect(NL.foldLC(add1, getZero)(O.none)).toBe(0)
    expect(NL.foldLC(add1, getZero)(null)).toBe(0)
  })
})

describe('toNullable function', () => {
  it('should return Some value if Some data passed', () => {
    expect(NL.toNullable(O.some(0))).toBe(N.some(0))
    expect(NL.toNullable(N.some(0))).toBe(N.some(0))
  })

  it('should return Null value if None value passed', () => {
    expect(NL.toNullable(O.none)).toBeNull()
    expect(NL.toNullable(null)).toBeNull()
  })
})

describe('toOption function', () => {
  it('should return Some value if Some data passed', () => {
    expect(NL.toOption(O.some(0))).toBe(O.some(0))
    expect(NL.toOption(N.some(0))).toBe(O.some(0))
  })

  it('should return None value if Null value passed', () => {
    expect(NL.toOption(O.none)).toBe(O.none)
    expect(NL.toOption(null)).toBe(O.none)
  })
})
