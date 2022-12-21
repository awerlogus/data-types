const assert = require('assert')
const R = require('./result')
const O = require('./option')

// SECTION Utils

/** @type {(x: number) => number} */
const add1 = x => x + 1

/** @type {(x: number) => R.Result<number>} */
const checkNonZero = x => x === 0 ? R.err : R.ok(x)

/** @type {() => 0} */
const getZero = () => 0

// SECTION Tests

describe('isErr function', () => {
  it('should return true if Err passed', () => {
    expect(R.isErr(R.err)).toBe(true)
  })

  it('should return false if Ok data passed', () => {
    expect(R.isErr(R.ok(0))).toBe(false)
  })
})

describe('isOk function', () => {
  it('should return true if Ok data passed', () => {
    expect(R.isOk(R.ok(0))).toBe(true)
  })

  it('should return false if Ok data passed', () => {
    expect(R.isOk(R.err)).toBe(false)
  })
})

describe('get function', () => {
  it('should return content of Ok data', () => {
    const ok = R.ok(0)

    assert(R.isOk(ok))

    expect(R.get(ok)).toBe(0)
  })
})

describe('map function', () => {
  it('should return Err if Err value passed', () => {
    expect(R.map(R.err, add1)).toStrictEqual(R.err)
  })

  it('should apply function if Ok data passed', () => {
    expect(R.map(R.ok(0), add1)).toStrictEqual(R.ok(1))
  })
})

describe('mapC function', () => {
  it('should return Err if Err value passed', () => {
    expect(R.mapC(add1)(R.err)).toStrictEqual(R.err)
  })

  it('should apply function if Ok data passed', () => {
    expect(R.mapC(add1)(R.ok(0))).toStrictEqual(R.ok(1))
  })
})

describe('chain function', () => {
  it('should return Err if Err value passed', () => {
    expect(R.chain(R.err, checkNonZero)).toStrictEqual(R.err)
  })

  it('should return Err if function returned Err', () => {
    expect(R.chain(R.ok(0), checkNonZero)).toStrictEqual(R.err)
  })

  it('should return Ok data if function returned Ok', () => {
    expect(R.chain(R.ok(1), checkNonZero)).toStrictEqual(R.ok(1))
  })
})

describe('chainC function', () => {
  it('should return Err if Err value passed', () => {
    expect(R.chainC(checkNonZero)(R.err)).toStrictEqual(R.err)
  })

  it('should return Err if function returned Err', () => {
    expect(R.chainC(checkNonZero)(R.ok(0))).toStrictEqual(R.err)
  })

  it('should return Ok data if function returned Ok', () => {
    expect(R.chainC(checkNonZero)(R.ok(1))).toStrictEqual(R.ok(1))
  })
})

describe('getOrElse function', () => {
  it('should return initial Ok data', () => {
    expect(R.getOrElse(R.ok(1), 0)).toBe(1)
  })

  it('should return alter data if Err passed', () => {
    expect(R.getOrElse(R.err, 0)).toBe(0)
  })
})

describe('getOrElseL function', () => {
  it('should return initial Ok data', () => {
    expect(R.getOrElseL(R.ok(1), getZero)).toBe(1)
  })

  it('should return alter data if Err passed', () => {
    expect(R.getOrElseL(R.err, getZero)).toBe(0)
  })
})

describe('getOrElseC function', () => {
  it('should return initial Ok data', () => {
    expect(R.getOrElseC(0)(R.ok(1))).toBe(1)
  })

  it('should return alter data if Err passed', () => {
    expect(R.getOrElseC(0)(R.err)).toBe(0)
  })
})

describe('getOrElseLC function', () => {
  it('should return initial Ok data', () => {
    expect(R.getOrElseLC(getZero)(R.ok(1))).toBe(1)
  })

  it('should return alter data if Err passed', () => {
    expect(R.getOrElseLC(getZero)(R.err)).toBe(0)
  })
})

describe('fromOption function', () => {
  it('should return Err if None passed', () => {
    expect(R.fromOption(O.none)).toStrictEqual(R.err)
  })

  it('should return Ok data if Some data passed', () => {
    expect(R.fromOption(0)).toStrictEqual(R.ok(0))
  })
})

describe('fromNullable function', () => {
  it('should return Err if Null passed', () => {
    expect(R.fromNullable(null)).toStrictEqual(R.err)
  })

  it('should return Ok data if Some data passed', () => {
    expect(R.fromNullable(0)).toStrictEqual(R.ok(0))
  })
})

describe('fromNilable function', () => {
  it('should return Err if Nil passed', () => {
    expect(R.fromNilable(O.none)).toStrictEqual(R.err)
    expect(R.fromNilable(null)).toStrictEqual(R.err)
  })

  it('should return Ok data if Some data passed', () => {
    expect(R.fromNilable(0)).toStrictEqual(R.ok(0))
  })
})
