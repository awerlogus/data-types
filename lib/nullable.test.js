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
    expect(N.map(null, add1)).toBeNull()
  })

  it('should apply function if Some data passed', () => {
    expect(N.map(N.some(0), add1)).toBe(N.some(1))
  })
})

describe('mapC function', () => {
  it('should return Null if Null value passed', () => {
    expect(N.mapC(add1)(null)).toBeNull()
  })

  it('should apply function if Some data passed', () => {
    expect(N.mapC(add1)(N.some(0))).toBe(N.some(1))
  })
})

describe('chain function', () => {
  it('should return Null if Null value passed', () => {
    expect(N.chain(null, checkNonZero)).toBeNull()
  })

  it('should return Null if function returned Null', () => {
    expect(N.chain(N.some(0), checkNonZero)).toBeNull()
  })

  it('should return Some data if function returned Some', () => {
    expect(N.chain(N.some(1), checkNonZero)).toBe(N.some(1))
  })
})

describe('chainC function', () => {
  it('should return Null if Null value passed', () => {
    expect(N.chainC(checkNonZero)(null)).toBeNull()
  })

  it('should return Null if function returned Null', () => {
    expect(N.chainC(checkNonZero)(N.some(0))).toBeNull()
  })

  it('should return Some data if function returned Some', () => {
    expect(N.chainC(checkNonZero)(N.some(1))).toBe(N.some(1))
  })
})

describe('getOrElse function', () => {
  it('should return initial Some data', () => {
    expect(N.getOrElse(N.some(1), 0)).toBe(1)
  })

  it('should return alter data if Null passed', () => {
    expect(N.getOrElse(null, 0)).toBe(0)
  })
})

describe('getOrElseL function', () => {
  it('should return initial Some data', () => {
    expect(N.getOrElseL(N.some(1), getZero)).toBe(1)
  })

  it('should return alter data if Null passed', () => {
    expect(N.getOrElseL(null, getZero)).toBe(0)
  })
})

describe('getOrElseC function', () => {
  it('should return initial Some data', () => {
    expect(N.getOrElseC(0)(N.some(1))).toBe(1)
  })

  it('should return alter data if Null passed', () => {
    expect(N.getOrElseC(0)(null)).toBe(0)
  })
})

describe('getOrElseLC function', () => {
  it('should return initial Some data', () => {
    expect(N.getOrElseLC(getZero)(N.some(1))).toBe(1)
  })

  it('should return alter data if Null passed', () => {
    expect(N.getOrElseLC(getZero)(null)).toBe(0)
  })
})

describe('fold function', () => {
  it('should map value with first function on data is Some', () => {
    expect(N.fold(N.some(0), add1, 0)).toBe(1)
  })

  it('should return default value on data is Null', () => {
    expect(N.fold(null, add1, 0)).toBe(0)
  })
})

describe('foldL function', () => {
  it('should map value with first function on data is Some', () => {
    expect(N.foldL(N.some(0), add1, getZero)).toBe(1)
  })

  it('should return default value on data is Null', () => {
    expect(N.foldL(null, add1, getZero)).toBe(0)
  })
})

describe('foldC function', () => {
  it('should map value with first function on data is Some', () => {
    expect(N.foldC(add1, 0)(N.some(0))).toBe(1)
  })

  it('should return default value on data is Null', () => {
    expect(N.foldC(add1, 0)(null)).toBe(0)
  })
})

describe('foldLC function', () => {
  it('should map value with first function on data is Some', () => {
    expect(N.foldLC(add1, getZero)(N.some(0))).toBe(1)
  })

  it('should return default value on data is Null', () => {
    expect(N.foldLC(add1, getZero)(null)).toBe(0)
  })
})
