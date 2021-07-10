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
    expect(O.map(O.none, add1)).toBe(O.none)
  })

  it('should apply function if Some data passed', () => {
    expect(O.map(O.some(0), add1)).toBe(O.some(1))
  })
})

describe('mapC function', () => {
  it('should return None if None value passed', () => {
    expect(O.mapC(add1)(O.none)).toBe(O.none)
  })

  it('should apply function if Some data passed', () => {
    expect(O.mapC(add1)(O.some(0))).toBe(O.some(1))
  })
})

describe('chain function', () => {
  it('should return None if None value passed', () => {
    expect(O.chain(O.none, checkNonZero)).toBe(O.none)
  })

  it('should return None if function returned None', () => {
    expect(O.chain(O.some(0), checkNonZero)).toBe(O.none)
  })

  it('should return Some data if function returned Some', () => {
    expect(O.chain(O.some(1), checkNonZero)).toBe(O.some(1))
  })
})

describe('chainC function', () => {
  it('should return None if None value passed', () => {
    expect(O.chainC(checkNonZero)(O.none)).toBe(O.none)
  })

  it('should return None if function returned None', () => {
    expect(O.chainC(checkNonZero)(O.some(0))).toBe(O.none)
  })

  it('should return Some data if function returned Some', () => {
    expect(O.chainC(checkNonZero)(O.some(1))).toBe(O.some(1))
  })
})

describe('getOrElse function', () => {
  it('should return initial Some data', () => {
    expect(O.getOrElse(O.some(1), 0)).toBe(1)
  })

  it('should return alter data if None passed', () => {
    expect(O.getOrElse(O.none, 0)).toBe(0)
  })
})

describe('getOrElseL function', () => {
  it('should return initial Some data', () => {
    expect(O.getOrElseL(O.some(1), getZero)).toBe(1)
  })

  it('should return alter data if None passed', () => {
    expect(O.getOrElseL(O.none, getZero)).toBe(0)
  })
})

describe('getOrElseC function', () => {
  it('should return initial Some data', () => {
    expect(O.getOrElseC(0)(O.some(1))).toBe(1)
  })

  it('should return alter data if None passed', () => {
    expect(O.getOrElseC(0)(O.none)).toBe(0)
  })
})

describe('getOrElseLC function', () => {
  it('should return initial Some data', () => {
    expect(O.getOrElseLC(getZero)(O.some(1))).toBe(1)
  })

  it('should return alter data if None passed', () => {
    expect(O.getOrElseLC(getZero)(O.none)).toBe(0)
  })
})

describe('fold function', () => {
  it('should map value with first function on data is Some', () => {
    expect(O.fold(O.some(0), add1, 0)).toBe(1)
  })

  it('should return default value on data is None', () => {
    expect(O.fold(O.none, add1, 0)).toBe(0)
  })
})

describe('foldL function', () => {
  it('should map value with first function on data is Some', () => {
    expect(O.foldL(O.some(0), add1, getZero)).toBe(1)
  })

  it('should return default value on data is None', () => {
    expect(O.foldL(O.none, add1, getZero)).toBe(0)
  })
})

describe('foldC function', () => {
  it('should map value with first function on data is Some', () => {
    expect(O.foldC(add1, 0)(O.some(0))).toBe(1)
  })

  it('should return default value on data is None', () => {
    expect(O.foldC(add1, 0)(O.none)).toBe(0)
  })
})

describe('foldLC function', () => {
  it('should map value with first function on data is Some', () => {
    expect(O.foldLC(add1, getZero)(O.some(0))).toBe(1)
  })

  it('should return default value on data is None', () => {
    expect(O.foldLC(add1, getZero)(O.none)).toBe(0)
  })
})
