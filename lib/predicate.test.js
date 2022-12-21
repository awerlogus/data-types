const B = require('./predicate')
const O = require('./option')

// SECTION Utils

/** @type {(number: number) => boolean} */
function positive (number) { return number > 0 }

/** @type {(number: number) => boolean} */
function nonNegative (number) { return number >= 0 }

/** @type {(number: number) => number} */
function add1 (number) { return number + 1 }

/** @type {(number: number) => number} */
function add2 (number) { return number + 2 }

// SECTION Tests

describe('function not', () => {
  it('should return predicate that returns true if predicate returns false', () => {
    expect(B.not(positive)(0)).toBe(true)
  })

  it('should return predicate that returns false if predicate returns true', () => {
    expect(B.not(positive)(1)).toBe(false)
  })
})

describe('function and', () => {
  it('should return predicate that returns true if predicates return (true, true)', () => {
    expect(B.and(positive, nonNegative)(1)).toBe(true)
  })

  it('should return predicate that returns false if predicates return (false, true)', () => {
    expect(B.and(positive, nonNegative)(0)).toBe(false)
  })

  it('should return predicate that returns false if predicates return (true, false)', () => {
    expect(B.and(nonNegative, positive)(0)).toBe(false)
  })

  it('should return predicate that returns false if predicates return (false, false)', () => {
    expect(B.and(positive, nonNegative)(-1)).toBe(false)
  })
})

describe('function or', () => {
  it('should return predicate that returns true if predicates return (true, true)', () => {
    expect(B.or(positive, nonNegative)(1)).toBe(true)
  })

  it('should return predicate that returns true if predicates return (false, true)', () => {
    expect(B.or(positive, nonNegative)(0)).toBe(true)
  })

  it('should return predicate that returns true if predicates return (true, false)', () => {
    expect(B.or(nonNegative, positive)(0)).toBe(true)
  })

  it('should return predicate that returns false if predicates return (false, false)', () => {
    expect(B.or(positive, nonNegative)(-1)).toBe(false)
  })
})

describe('function eq', () => {
  it('should return predicate that returns true if predicates return (true, true)', () => {
    expect(B.eq(positive, nonNegative)(1)).toBe(true)
  })

  it('should return predicate that returns true if predicates return (false, true)', () => {
    expect(B.eq(positive, nonNegative)(0)).toBe(false)
  })

  it('should return predicate that returns true if predicates return (true, false)', () => {
    expect(B.eq(nonNegative, positive)(0)).toBe(false)
  })

  it('should return predicate that returns false if predicates return (false, false)', () => {
    expect(B.eq(positive, nonNegative)(-1)).toBe(true)
  })
})

describe('function xor', () => {
  it('should return predicate that returns false if predicates return (true, true)', () => {
    expect(B.xor(positive, nonNegative)(1)).toBe(false)
  })

  it('should return predicate that returns true if predicates return (false, true)', () => {
    expect(B.xor(positive, nonNegative)(0)).toBe(true)
  })

  it('should return predicate that returns true if predicates return (true, false)', () => {
    expect(B.xor(nonNegative, positive)(0)).toBe(true)
  })

  it('should return predicate that returns false if predicates return (false, false)', () => {
    expect(B.xor(positive, nonNegative)(-1)).toBe(false)
  })
})

describe('function nand', () => {
  it('should return predicate that returns false if predicates return (true, true)', () => {
    expect(B.nand(positive, nonNegative)(1)).toBe(false)
  })

  it('should return predicate that returns true if predicates return (false, true)', () => {
    expect(B.nand(positive, nonNegative)(0)).toBe(true)
  })

  it('should return predicate that returns true if predicates return (true, false)', () => {
    expect(B.nand(nonNegative, positive)(0)).toBe(true)
  })

  it('should return predicate that returns true if predicates return (false, false)', () => {
    expect(B.nand(positive, nonNegative)(-1)).toBe(true)
  })
})

describe('function nor', () => {
  it('should return predicate that returns false if predicates return (true, true)', () => {
    expect(B.nor(positive, nonNegative)(1)).toBe(false)
  })

  it('should return predicate that returns false if predicates return (false, true)', () => {
    expect(B.nor(positive, nonNegative)(0)).toBe(false)
  })

  it('should return predicate that returns false if predicates return (true, false)', () => {
    expect(B.nor(nonNegative, positive)(0)).toBe(false)
  })

  it('should return predicate that returns true if predicates return (false, false)', () => {
    expect(B.nor(positive, nonNegative)(-1)).toBe(true)
  })
})

describe('function then', () => {
  it('should return some function result if predicate returns true', () => {
    expect(B.then(nonNegative, add1)(0)).toBe(1)
  })

  it('should return none if predicate returns false', () => {
    expect(B.then(positive, add1)(0)).toBe(O.none)
  })
})

describe('function thenElse', () => {
  it('should return first function result if predicate returns true', () => {
    expect(B.thenElse(nonNegative, add1, add2)(0)).toBe(1)
  })

  it('should return second function result if predicate returns false', () => {
    expect(B.thenElse(positive, add1, add2)(0)).toBe(2)
  })
})
