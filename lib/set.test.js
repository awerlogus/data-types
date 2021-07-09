const S = require('./set')

// SECTION Utils

/** @type {(number: number) => boolean} */
function geq3 (number) { return number >= 3 }

/** @type {(number: number) => number} */
function add1 (number) { return number + 1 }

/** @type {(number: number) => Set<number>} */
function getThisAndNext (number) { return new Set([number, number + 1]) }

// SECTION Tests

describe('create function', () => {
  it('should return empty set if no parameters passed', () => {
    expect(S.create()).toMatchObject(new Set())
  })

  it('should create set with content of iterable passed', () => {
    expect(S.create([1, 2, 3])).toMatchObject(new Set([1, 2, 3]))
  })
})

describe('union function', () => {
  it('should return empty set if empty sets passed', () => {
    expect(S.union(S.create(), S.create())).toMatchObject(S.create())
  })

  it('should return first set if the second is empty', () => {
    expect(S.union(S.create([1, 2]), S.create())).toMatchObject(S.create([1, 2]))
  })

  it('should return second set if the first is empty', () => {
    expect(S.union(S.create(), S.create([1, 2]))).toMatchObject(S.create([1, 2]))
  })

  it('should return set contains content of first and second', () => {
    expect(S.union(S.create([1, 2]), S.create([3, 4]))).toMatchObject(S.create([1, 2, 3, 4]))
  })
})

describe('separate function', () => {
  it('should return all elements as onTrue if all pass predicate', () => {
    expect(S.separate(geq3)(S.create([3, 4, 5]))).toMatchObject([S.create([3, 4, 5]), S.create()])
  })

  it('should return all elements as onFalse, if no one pass predicate', () => {
    expect(S.separate(geq3)(S.create([0, 1, 2]))).toMatchObject([S.create(), S.create([0, 1, 2])])
  })

  it('should return elements passing predicate as onTrue and others as onFalse', () => {
    expect(S.separate(geq3)(S.create([2, 3, 4]))).toMatchObject([S.create([3, 4]), S.create([2])])
  })
})

describe('some function', () => {
  it('should return false if empty set passed', () => {
    expect(S.some(geq3)(S.create())).toBe(false)
  })

  it('should return true if at least one element passes predicate', () => {
    expect(S.some(geq3)(S.create([1, 2, 3]))).toBe(true)
  })

  it('should return false if no one element passes predicate', () => {
    expect(S.some(geq3)(S.create([0, 1, 2]))).toBe(false)
  })
})

describe('every function', () => {
  it('should return true if empty set passed', () => {
    expect(S.every(geq3)(S.create())).toBe(true)
  })

  it('should return true if every element passes predicate', () => {
    expect(S.every(geq3)(S.create([3, 4, 5]))).toBe(true)
  })

  it('should return false if at least one element doesn\'t pass predicate', () => {
    expect(S.every(geq3)(S.create([2, 3, 4]))).toBe(false)
  })
})

describe('none function', () => {
  it('should return true if empty set passed', () => {
    expect(S.none(geq3)(S.create())).toBe(true)
  })

  it('should return true if no elements pass predicate', () => {
    expect(S.none(geq3)(S.create([0, 1, 2]))).toBe(true)
  })

  it('should return false if some element passes predicate', () => {
    expect(S.none(geq3)(S.create([1, 2, 3]))).toBe(false)
  })
})

describe('map function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.map(add1)(S.create())).toMatchObject(S.create())
  })

  it('should return set with elements mapped with function', () => {
    expect(S.map(add1)(S.create([0, 1, 2]))).toMatchObject(S.create([1, 2, 3]))
  })
})

describe('chain function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.chain(getThisAndNext)(S.create())).toMatchObject(S.create())
  })

  it('should return union of sets returned by mapper', () => {
    expect(S.chain(getThisAndNext)(S.create([0, 2]))).toMatchObject(S.create([0, 1, 2, 3]))
  })

  it('should remove duplicates from set', () => {
    expect(S.chain(getThisAndNext)(S.create([0, 1]))).toMatchObject(S.create([0, 1, 2]))
  })
})

describe('filter function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.filter(geq3)(S.create())).toMatchObject(S.create())
  })

  it('should return empty set if no elements passing predicate', () => {
    expect(S.filter(geq3)(S.create([0, 1, 2]))).toMatchObject(S.create())
  })

  it('should return set with elements passes predicate', () => {
    expect(S.filter(geq3)(S.create([2, 3, 4]))).toMatchObject(S.create([3, 4]))
  })
})

describe('empty function', () => {
  it('should return true if empty set passed', () => {
    expect(S.empty(S.create())).toBe(true)
  })

  it('should return false if non empty set passed', () => {
    expect(S.empty(S.create([1, 2, 3]))).toBe(false)
  })
})
