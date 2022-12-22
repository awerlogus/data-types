const O = require('./option')

// SECTION Utils

/** @type {(x: number) => number} */
const add1 = x => x + 1

/** @type {(x: number) => O.Option<number>} */
const checkNonZero = x => x === 0 ? O.none : x

/** @type {() => 0} */
const getZero = () => 0

// SECTION Tests

describe('isNone function', () => {
  it('should return true if None passed', () => {
    expect(O.isNone(O.none)).toBe(true)
  })

  it('should return false if Some data passed', () => {
    expect(O.isNone(0)).toBe(false)
  })
})

describe('isSome function', () => {
  it('should return true if Some data passed', () => {
    expect(O.isSome(0)).toBe(true)
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
    expect(O.map(0, add1)).toBe(1)
  })
})

describe('mapC function', () => {
  it('should return None if None value passed', () => {
    expect(O.mapC(add1)(O.none)).toBe(O.none)
  })

  it('should apply function if Some data passed', () => {
    expect(O.mapC(add1)(0)).toBe(1)
  })
})

describe('mapCR function', () => {
  it('should return None if None value passed', () => {
    expect(O.mapCR(/** @type {O.Option<number>} */(O.none))(add1)).toBe(O.none)
  })

  it('should apply function if Some data passed', () => {
    expect(O.mapCR(0)(add1)).toBe(1)
  })
})

describe('chain function', () => {
  it('should return None if None value passed', () => {
    expect(O.chain(O.none, checkNonZero)).toBe(O.none)
  })

  it('should return None if function returned None', () => {
    expect(O.chain(0, checkNonZero)).toBe(O.none)
  })

  it('should return Some data if function returned Some', () => {
    expect(O.chain(1, checkNonZero)).toBe(1)
  })
})

describe('chainC function', () => {
  it('should return None if None value passed', () => {
    expect(O.chainC(checkNonZero)(O.none)).toBe(O.none)
  })

  it('should return None if function returned None', () => {
    expect(O.chainC(checkNonZero)(0)).toBe(O.none)
  })

  it('should return Some data if function returned Some', () => {
    expect(O.chainC(checkNonZero)(1)).toBe(1)
  })
})

describe('chainCR function', () => {
  it('should return None if None value passed', () => {
    expect(O.chainCR(/** @type {O.Option<number>} */(O.none))(checkNonZero)).toBe(O.none)
  })

  it('should return None if function returned None', () => {
    expect(O.chainCR(0)(checkNonZero)).toBe(O.none)
  })

  it('should return Some data if function returned Some', () => {
    expect(O.chainCR(1)(checkNonZero)).toBe(1)
  })
})

describe('getOrElse function', () => {
  it('should return initial Some data', () => {
    expect(O.getOrElse(1, 0)).toBe(1)
  })

  it('should return alter data if None passed', () => {
    expect(O.getOrElse(O.none, 0)).toBe(0)
  })
})

describe('getOrElseL function', () => {
  it('should return initial Some data', () => {
    expect(O.getOrElseL(1, getZero)).toBe(1)
  })

  it('should return alter data if None passed', () => {
    expect(O.getOrElseL(O.none, getZero)).toBe(0)
  })
})

describe('getOrElseC function', () => {
  it('should return initial Some data', () => {
    expect(O.getOrElseC(0)(1)).toBe(1)
  })

  it('should return alter data if None passed', () => {
    expect(O.getOrElseC(0)(O.none)).toBe(0)
  })
})

describe('getOrElseLC function', () => {
  it('should return initial Some data', () => {
    expect(O.getOrElseLC(getZero)(1)).toBe(1)
  })

  it('should return alter data if None passed', () => {
    expect(O.getOrElseLC(getZero)(O.none)).toBe(0)
  })
})

describe('getOrElseCR function', () => {
  it('should return initial Some data', () => {
    expect(O.getOrElseCR(1)(0)).toBe(1)
  })

  it('should return alter data if None passed', () => {
    expect(O.getOrElseCR(O.none)(0)).toBe(0)
  })
})

describe('getOrElseLCR function', () => {
  it('should return initial Some data', () => {
    expect(O.getOrElseLCR(1)(getZero)).toBe(1)
  })

  it('should return alter data if None passed', () => {
    expect(O.getOrElseLCR(O.none)(getZero)).toBe(0)
  })
})

describe('fold function', () => {
  it('should map value with first function on data is Some', () => {
    expect(O.fold(0, add1, 0)).toBe(1)
  })

  it('should return default value on data is None', () => {
    expect(O.fold(O.none, add1, 0)).toBe(0)
  })
})

describe('foldL function', () => {
  it('should map value with first function on data is Some', () => {
    expect(O.foldL(0, add1, getZero)).toBe(1)
  })

  it('should return default value on data is None', () => {
    expect(O.foldL(O.none, add1, getZero)).toBe(0)
  })
})

describe('foldC function', () => {
  it('should map value with first function on data is Some', () => {
    expect(O.foldC(add1, 0)(0)).toBe(1)
  })

  it('should return default value on data is None', () => {
    expect(O.foldC(add1, 0)(O.none)).toBe(0)
  })
})

describe('foldLC function', () => {
  it('should map value with first function on data is Some', () => {
    expect(O.foldLC(add1, getZero)(0)).toBe(1)
  })

  it('should return default value on data is None', () => {
    expect(O.foldLC(add1, getZero)(O.none)).toBe(0)
  })
})

describe('foldCR function', () => {
  it('should map value with first function on data is Some', () => {
    expect(O.foldCR(0)(add1, 0)).toBe(1)
  })

  it('should return default value on data is None', () => {
    expect(O.foldCR(/** @type {O.Option<number>} */(O.none))(add1, 0)).toBe(0)
  })
})

describe('foldLCR function', () => {
  it('should map value with first function on data is Some', () => {
    expect(O.foldLCR(0)(add1, getZero)).toBe(1)
  })

  it('should return default value on data is None', () => {
    expect(O.foldLCR(/** @type {O.Option<number>} */(O.none))(add1, getZero)).toBe(0)
  })
})
