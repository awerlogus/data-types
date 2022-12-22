const N = require('./nullable')

// SECTION Utils

/** @type {(x: number) => number} */
const add1 = x => x + 1

/** @type {(x: number) => N.Nullable<number>} */
const checkNonZero = x => x === 0 ? null : x

/** @type {() => 0} */
const getZero = () => 0

// SECTION Tests

describe('isNull function', () => {
  it('should return true if Null passed', () => {
    expect(N.isNull(null)).toBe(true)
  })

  it('should return false if Some data passed', () => {
    expect(N.isNull(0)).toBe(false)
  })
})

describe('isSome function', () => {
  it('should return true if Some data passed', () => {
    expect(N.isSome(0)).toBe(true)
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
    expect(N.map(0, add1)).toBe(1)
  })
})

describe('mapC function', () => {
  it('should return Null if Null value passed', () => {
    expect(N.mapC(add1)(null)).toBeNull()
  })

  it('should apply function if Some data passed', () => {
    expect(N.mapC(add1)(0)).toBe(1)
  })
})

describe('mapCR function', () => {
  it('should return Null if Null value passed', () => {
    expect(N.mapCR(/** @type {N.Nullable<number>} */(null))(add1)).toBeNull()
  })

  it('should apply function if Some data passed', () => {
    expect(N.mapCR(0)(add1)).toBe(1)
  })
})

describe('chain function', () => {
  it('should return Null if Null value passed', () => {
    expect(N.chain(null, checkNonZero)).toBeNull()
  })

  it('should return Null if function returned Null', () => {
    expect(N.chain(0, checkNonZero)).toBeNull()
  })

  it('should return Some data if function returned Some', () => {
    expect(N.chain(1, checkNonZero)).toBe(1)
  })
})

describe('chainC function', () => {
  it('should return Null if Null value passed', () => {
    expect(N.chainC(checkNonZero)(null)).toBeNull()
  })

  it('should return Null if function returned Null', () => {
    expect(N.chainC(checkNonZero)(0)).toBeNull()
  })

  it('should return Some data if function returned Some', () => {
    expect(N.chainC(checkNonZero)(1)).toBe(1)
  })
})

describe('chainCR function', () => {
  it('should return Null if Null value passed', () => {
    expect(N.chainCR(/** @type {N.Nullable<number>} */(null))(checkNonZero)).toBeNull()
  })

  it('should return Null if function returned Null', () => {
    expect(N.chainCR(0)(checkNonZero)).toBeNull()
  })

  it('should return Some data if function returned Some', () => {
    expect(N.chainCR(1)(checkNonZero)).toBe(1)
  })
})

describe('getOrElse function', () => {
  it('should return initial Some data', () => {
    expect(N.getOrElse(1, 0)).toBe(1)
  })

  it('should return alter data if Null passed', () => {
    expect(N.getOrElse(null, 0)).toBe(0)
  })
})

describe('getOrElseL function', () => {
  it('should return initial Some data', () => {
    expect(N.getOrElseL(1, getZero)).toBe(1)
  })

  it('should return alter data if Null passed', () => {
    expect(N.getOrElseL(null, getZero)).toBe(0)
  })
})

describe('getOrElseC function', () => {
  it('should return initial Some data', () => {
    expect(N.getOrElseC(0)(1)).toBe(1)
  })

  it('should return alter data if Null passed', () => {
    expect(N.getOrElseC(0)(null)).toBe(0)
  })
})

describe('getOrElseLC function', () => {
  it('should return initial Some data', () => {
    expect(N.getOrElseLC(getZero)(1)).toBe(1)
  })

  it('should return alter data if Null passed', () => {
    expect(N.getOrElseLC(getZero)(null)).toBe(0)
  })
})

describe('getOrElseCR function', () => {
  it('should return initial Some data', () => {
    expect(N.getOrElseCR(1)(0)).toBe(1)
  })

  it('should return alter data if Null passed', () => {
    expect(N.getOrElseCR(null)(0)).toBe(0)
  })
})

describe('getOrElseLCR function', () => {
  it('should return initial Some data', () => {
    expect(N.getOrElseLCR(1)(getZero)).toBe(1)
  })

  it('should return alter data if Null passed', () => {
    expect(N.getOrElseLCR(null)(getZero)).toBe(0)
  })
})

describe('fold function', () => {
  it('should map value with first function on data is Some', () => {
    expect(N.fold(0, add1, 0)).toBe(1)
  })

  it('should return default value on data is Null', () => {
    expect(N.fold(null, add1, 0)).toBe(0)
  })
})

describe('foldL function', () => {
  it('should map value with first function on data is Some', () => {
    expect(N.foldL(0, add1, getZero)).toBe(1)
  })

  it('should return default value on data is Null', () => {
    expect(N.foldL(null, add1, getZero)).toBe(0)
  })
})

describe('foldC function', () => {
  it('should map value with first function on data is Some', () => {
    expect(N.foldC(add1, 0)(0)).toBe(1)
  })

  it('should return default value on data is Null', () => {
    expect(N.foldC(add1, 0)(null)).toBe(0)
  })
})

describe('foldLC function', () => {
  it('should map value with first function on data is Some', () => {
    expect(N.foldLC(add1, getZero)(0)).toBe(1)
  })

  it('should return default value on data is Null', () => {
    expect(N.foldLC(add1, getZero)(null)).toBe(0)
  })
})

describe('foldCR function', () => {
  it('should map value with first function on data is Some', () => {
    expect(N.foldCR(0)(add1, 0)).toBe(1)
  })

  it('should return default value on data is Null', () => {
    expect(N.foldCR(/** @type {N.Nullable<number>} */(null))(add1, 0)).toBe(0)
  })
})

describe('foldLCR function', () => {
  it('should map value with first function on data is Some', () => {
    expect(N.foldLCR(0)(add1, getZero)).toBe(1)
  })

  it('should return default value on data is Null', () => {
    expect(N.foldLCR(/** @type {N.Nullable<number>} */(null))(add1, getZero)).toBe(0)
  })
})
