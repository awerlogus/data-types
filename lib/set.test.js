const S = require('./set')

// SECTION Utils

/** @type {(number: number) => boolean} */
function geq3 (number) { return number >= 3 }

/** @type {(number: number) => number} */
function add1 (number) { return number + 1 }

/** @type {(number: number) => Set<number>} */
function getThisAndNext (number) { return new Set([number, number + 1]) }

// SECTION Tests

describe('union function', () => {
  it('should return empty set if empty sets passed', () => {
    expect(S.union(new Set(), new Set())).toMatchObject(new Set())
  })

  it('should return first set if the second is empty', () => {
    expect(S.union(new Set([1, 2]), new Set())).toMatchObject(new Set([1, 2]))
  })

  it('should return second set if the first is empty', () => {
    expect(S.union(new Set(), new Set([1, 2]))).toMatchObject(new Set([1, 2]))
  })

  it('should return set contains content of first and second', () => {
    expect(S.union(new Set([1, 2]), new Set([3, 4]))).toMatchObject(new Set([1, 2, 3, 4]))
  })
})

describe('unionC function', () => {
  it('should return empty set if empty sets passed', () => {
    expect(S.unionC(new Set())(new Set())).toMatchObject(new Set())
  })

  it('should return first set if the second is empty', () => {
    expect(S.unionC(new Set([1, 2]))(new Set())).toMatchObject(new Set([1, 2]))
  })

  it('should return second set if the first is empty', () => {
    expect(S.unionC(new Set())(new Set([1, 2]))).toMatchObject(new Set([1, 2]))
  })

  it('should return set contains content of first and second', () => {
    expect(S.unionC(new Set([1, 2]))(new Set([3, 4]))).toMatchObject(new Set([1, 2, 3, 4]))
  })
})

describe('separate function', () => {
  it('should return all elements as onTrue if all pass predicate', () => {
    expect(S.separate(new Set([3, 4, 5]), geq3)).toMatchObject([new Set([3, 4, 5]), new Set()])
  })

  it('should return all elements as onFalse, if no one pass predicate', () => {
    expect(S.separate(new Set([0, 1, 2]), geq3)).toMatchObject([new Set(), new Set([0, 1, 2])])
  })

  it('should return elements passing predicate as onTrue and others as onFalse', () => {
    expect(S.separate(new Set([2, 3, 4]), geq3)).toMatchObject([new Set([3, 4]), new Set([2])])
  })
})

describe('separateC function', () => {
  it('should return all elements as onTrue if all pass predicate', () => {
    expect(S.separateC(geq3)(new Set([3, 4, 5]))).toMatchObject([new Set([3, 4, 5]), new Set()])
  })

  it('should return all elements as onFalse, if no one pass predicate', () => {
    expect(S.separateC(geq3)(new Set([0, 1, 2]))).toMatchObject([new Set(), new Set([0, 1, 2])])
  })

  it('should return elements passing predicate as onTrue and others as onFalse', () => {
    expect(S.separateC(geq3)(new Set([2, 3, 4]))).toMatchObject([new Set([3, 4]), new Set([2])])
  })
})

describe('some function', () => {
  it('should return false if empty set passed', () => {
    expect(S.some(new Set(), geq3)).toBe(false)
  })

  it('should return true if at least one element passes predicate', () => {
    expect(S.some(new Set([1, 2, 3]), geq3)).toBe(true)
  })

  it('should return false if no one element passes predicate', () => {
    expect(S.some(new Set([0, 1, 2]), geq3)).toBe(false)
  })
})

describe('someC function', () => {
  it('should return false if empty set passed', () => {
    expect(S.someC(geq3)(new Set())).toBe(false)
  })

  it('should return true if at least one element passes predicate', () => {
    expect(S.someC(geq3)(new Set([1, 2, 3]))).toBe(true)
  })

  it('should return false if no one element passes predicate', () => {
    expect(S.someC(geq3)(new Set([0, 1, 2]))).toBe(false)
  })
})

describe('every function', () => {
  it('should return true if empty set passed', () => {
    expect(S.every(new Set(), geq3)).toBe(true)
  })

  it('should return true if every element passes predicate', () => {
    expect(S.every(new Set([3, 4, 5]), geq3)).toBe(true)
  })

  it('should return false if at least one element doesn\'t pass predicate', () => {
    expect(S.every(new Set([2, 3, 4]), geq3)).toBe(false)
  })
})

describe('everyC function', () => {
  it('should return true if empty set passed', () => {
    expect(S.everyC(geq3)(new Set())).toBe(true)
  })

  it('should return true if every element passes predicate', () => {
    expect(S.everyC(geq3)(new Set([3, 4, 5]))).toBe(true)
  })

  it('should return false if at least one element doesn\'t pass predicate', () => {
    expect(S.everyC(geq3)(new Set([2, 3, 4]))).toBe(false)
  })
})

describe('none function', () => {
  it('should return true if empty set passed', () => {
    expect(S.none(new Set(), geq3)).toBe(true)
  })

  it('should return true if no elements pass predicate', () => {
    expect(S.none(new Set([0, 1, 2]), geq3)).toBe(true)
  })

  it('should return false if some element passes predicate', () => {
    expect(S.none(new Set([1, 2, 3]), geq3)).toBe(false)
  })
})

describe('noneC function', () => {
  it('should return true if empty set passed', () => {
    expect(S.noneC(geq3)(new Set())).toBe(true)
  })

  it('should return true if no elements pass predicate', () => {
    expect(S.noneC(geq3)(new Set([0, 1, 2]))).toBe(true)
  })

  it('should return false if some element passes predicate', () => {
    expect(S.noneC(geq3)(new Set([1, 2, 3]))).toBe(false)
  })
})

describe('map function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.map(new Set(), add1)).toMatchObject(new Set())
  })

  it('should return set with elements mapped with function', () => {
    expect(S.map(new Set([0, 1, 2]), add1)).toMatchObject(new Set([1, 2, 3]))
  })
})

describe('mapC function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.mapC(add1)(new Set())).toMatchObject(new Set())
  })

  it('should return set with elements mapped with function', () => {
    expect(S.mapC(add1)(new Set([0, 1, 2]))).toMatchObject(new Set([1, 2, 3]))
  })
})

describe('chain function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.chain(new Set(), getThisAndNext)).toMatchObject(new Set())
  })

  it('should return union of sets returned by mapper', () => {
    expect(S.chain(new Set([0, 2]), getThisAndNext)).toMatchObject(new Set([0, 1, 2, 3]))
  })

  it('should remove duplicates from set', () => {
    expect(S.chain(new Set([0, 1]), getThisAndNext)).toMatchObject(new Set([0, 1, 2]))
  })
})

describe('chainC function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.chainC(getThisAndNext)(new Set())).toMatchObject(new Set())
  })

  it('should return union of sets returned by mapper', () => {
    expect(S.chainC(getThisAndNext)(new Set([0, 2]))).toMatchObject(new Set([0, 1, 2, 3]))
  })

  it('should remove duplicates from set', () => {
    expect(S.chainC(getThisAndNext)(new Set([0, 1]))).toMatchObject(new Set([0, 1, 2]))
  })
})

describe('filter function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.filter(new Set(), geq3)).toMatchObject(new Set())
  })

  it('should return empty set if no elements passing predicate', () => {
    expect(S.filter(new Set([0, 1, 2]), geq3)).toMatchObject(new Set())
  })

  it('should return set with elements passes predicate', () => {
    expect(S.filter(new Set([2, 3, 4]), geq3)).toMatchObject(new Set([3, 4]))
  })
})

describe('filterC function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.filterC(geq3)(new Set())).toMatchObject(new Set())
  })

  it('should return empty set if no elements passing predicate', () => {
    expect(S.filterC(geq3)(new Set([0, 1, 2]))).toMatchObject(new Set())
  })

  it('should return set with elements passes predicate', () => {
    expect(S.filterC(geq3)(new Set([2, 3, 4]))).toMatchObject(new Set([3, 4]))
  })
})

describe('empty function', () => {
  it('should return true if empty set passed', () => {
    expect(S.empty(new Set())).toBe(true)
  })

  it('should return false if non empty set passed', () => {
    expect(S.empty(new Set([1, 2, 3]))).toBe(false)
  })
})
