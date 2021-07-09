const E = require('./either')

// SECTION Utils

/** @type {(x: number) => number} */
const add1 = x => x + 1

/** @type {(x: number) => E.Either<string, number>} */
const checkNonZero = x => x === 0 ? E.left('zero') : E.right(x)

// SECTION Tests

describe('constructor of Left type', () => {
  it('should not change data', () => {
    expect(E.left(0)[1]).toBe(0)
  })
})

describe('constructor of Right type', () => {
  it('should not change data', () => {
    expect(E.right(0)[1]).toBe(0)
  })
})

describe('isLeft function', () => {
  it('should return true if Left value passed', () => {
    expect(E.isLeft(E.left(0))).toBe(true)
  })

  it('should return false if Right value passed', () => {
    expect(E.isLeft(E.right(0))).toBe(false)
  })
})

describe('isRight function', () => {
  it('should return true if Right value passed', () => {
    expect(E.isRight(E.right(0))).toBe(true)
  })

  it('should return false if Left value passed', () => {
    expect(E.isRight(E.left(0))).toBe(false)
  })
})

describe('map function', () => {
  it('should return Left value if Left passed', () => {
    expect(E.map(E.left(0), add1)).toMatchObject(E.left(0))
  })

  it('should apply function to Right value if Right passed', () => {
    expect(E.map(E.right(0), add1)).toMatchObject(E.right(1))
  })
})

describe('mapLeft function', () => {
  it('should return Right value if Right passed', () => {
    expect(E.mapLeft(E.right(0), add1)).toMatchObject(E.right(0))
  })

  it('should apply function to Left value if Left passed', () => {
    expect(E.mapLeft(E.left(0), add1)).toMatchObject(E.left(1))
  })
})

describe('chain function', () => {
  it('should return Left if Left value passed', () => {
    expect(E.chain(E.left(0), checkNonZero)).toMatchObject(E.left(0))
  })

  it('should return Left value if function returned Left', () => {
    expect(E.chain(E.right(0), checkNonZero)).toMatchObject(E.left('zero'))
  })

  it('should return Right value if function returned Right', () => {
    expect(E.chain(E.right(1), checkNonZero)).toMatchObject(E.right(1))
  })
})

describe('extractUnsafe function', () => {
  it('should throw exception if Left passed', () => {
    expect(() => E.extractUnsafe(E.left('error'))).toThrow('error')
  })

  it('should return value if Right passed', () => {
    expect(E.extractUnsafe(E.right(0))).toBe(0)
  })
})
