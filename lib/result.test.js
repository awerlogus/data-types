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

describe('map function', () => {
  it('should return Err if Err value passed', () => {
    expect(R.map(add1)(R.err)).toMatchObject(R.err)
  })

  it('should apply function if Ok data passed', () => {
    expect(R.map(add1)(R.ok(0))).toMatchObject(R.ok(1))
  })
})

describe('chain function', () => {
  it('should return Err if Err value passed', () => {
    expect(R.chain(checkNonZero)(R.err)).toMatchObject(R.err)
  })

  it('should return Err if function returned Err', () => {
    expect(R.chain(checkNonZero)(R.ok(0))).toMatchObject(R.err)
  })

  it('should return Ok data if function returned Ok', () => {
    expect(R.chain(checkNonZero)(R.ok(1))).toMatchObject(R.ok(1))
  })
})

describe('getOrElse function', () => {
  it('should return initial Ok data', () => {
    expect(R.getOrElse(getZero)(R.ok(1))).toBe(1)
  })

  it('should return alter data if Err passed', () => {
    expect(R.getOrElse(getZero)(R.err)).toBe(0)
  })
})

describe('fromOption function', () => {
  it('should return Err if null passed', () => {
    expect(R.fromOption(O.none)).toMatchObject(R.err)
  })

  it('should return Ok data if non null passed', () => {
    expect(R.fromOption(O.some(0))).toMatchObject(R.ok(0))
  })
})
