const S = require('./set')

// SECTION Utils

/** @type {(number: number) => boolean} */
function geq3 (number) { return number >= 3 }

/** @type {(number: number) => number} */
function add1 (number) { return number + 1 }

/** @type {(number: number) => Set<number>} */
function getThisAndNext (number) { return new Set([number, number + 1]) }

// SECTION Tests

describe('clone function', () => {
  it('should clone set', () => {
    expect(S.clone(new Set())).toStrictEqual(new Set())
    expect(S.clone(new Set([1, 2, 3]))).toStrictEqual(new Set([1, 2, 3]))
  })

  it('should return new set object', () => {
    const set = new Set()

    expect(S.clone(set)).not.toBe(set)
  })
})

describe('has function', () => {
  it('should return true if value does exist in set', () => {
    expect(S.has(new Set([1, 2, 3]), 1)).toBe(true)
  })

  it('should return false if value doesn\'t exist in set', () => {
    expect(S.has(new Set([1, 2, 3]), 0)).toBe(false)
  })
})

describe('hasC function', () => {
  it('should return true if value does exist in set', () => {
    expect(S.hasC(1)(new Set([1, 2, 3]))).toBe(true)
  })

  it('should return false if value doesn\'t exist in set', () => {
    expect(S.hasC(0)(new Set([1, 2, 3]))).toBe(false)
  })
})

describe('hasCR function', () => {
  it('should return true if value does exist in set', () => {
    expect(S.hasCR(new Set([1, 2, 3]))(1)).toBe(true)
  })

  it('should return false if value doesn\'t exist in set', () => {
    expect(S.hasCR(new Set([1, 2, 3]))(0)).toBe(false)
  })
})

describe('add function', () => {
  it('should add a value to set', () => {
    const set = new Set([1, 2])

    S.add(set, 3)

    expect(set).toStrictEqual(new Set([1, 2, 3]))
  })

  it('should return true if value added', () => {
    expect(S.add(new Set([1, 2]), 3)).toBe(true)
  })

  it('should return false if value not added', () => {
    expect(S.add(new Set([1, 2]), 2)).toBe(false)
  })
})

describe('addC function', () => {
  it('should add a value to set', () => {
    const set = new Set([1, 2])

    S.addC(3)(set)

    expect(set).toStrictEqual(new Set([1, 2, 3]))
  })

  it('should return true if value added', () => {
    expect(S.addC(3)(new Set([1, 2]))).toBe(true)
  })

  it('should return false if value not added', () => {
    expect(S.addC(2)(new Set([1, 2]))).toBe(false)
  })
})

describe('addCR function', () => {
  it('should add a value to set', () => {
    const set = new Set([1, 2])

    S.addCR(set)(3)

    expect(set).toStrictEqual(new Set([1, 2, 3]))
  })

  it('should return true if value added', () => {
    expect(S.addCR(new Set([1, 2]))(3)).toBe(true)
  })

  it('should return false if value not added', () => {
    expect(S.addCR(new Set([1, 2]))(2)).toBe(false)
  })
})

describe('remove function', () => {
  it('should remove value from set', () => {
    const set = new Set([1, 2, 3])

    S.remove(set, 3)

    expect(set).toStrictEqual(new Set([1, 2]))
  })

  it('should return true if value was removed', () => {
    expect(S.remove(new Set([1, 2, 3]), 3)).toBe(true)
  })

  it('should should return false if value was not removed', () => {
    expect(S.remove(new Set([1, 2]), 3)).toBe(false)
  })
})

describe('removeC function', () => {
  it('should remove value from set', () => {
    const set = new Set([1, 2, 3])

    S.removeC(3)(set)

    expect(set).toStrictEqual(new Set([1, 2]))
  })

  it('should return true if value was removed', () => {
    expect(S.removeC(3)(new Set([1, 2, 3]))).toBe(true)
  })

  it('should should return false if value was not removed', () => {
    expect(S.removeC(3)(new Set([1, 2]))).toBe(false)
  })
})

describe('removeCR function', () => {
  it('should remove value from set', () => {
    const set = new Set([1, 2, 3])

    S.removeCR(set)(3)

    expect(set).toStrictEqual(new Set([1, 2]))
  })

  it('should return true if value was removed', () => {
    expect(S.removeCR(new Set([1, 2, 3]))(3)).toBe(true)
  })

  it('should should return false if value was not removed', () => {
    expect(S.removeCR(new Set([1, 2]))(3)).toBe(false)
  })
})

describe('union function', () => {
  it('should return empty set if empty sets passed', () => {
    expect(S.union(new Set(), new Set())).toStrictEqual(new Set())
  })

  it('should return first set if the second is empty', () => {
    expect(S.union(new Set([1, 2]), new Set())).toStrictEqual(new Set([1, 2]))
  })

  it('should return second set if the first is empty', () => {
    expect(S.union(new Set(), new Set([1, 2]))).toStrictEqual(new Set([1, 2]))
  })

  it('should return set contains content of first and second', () => {
    expect(S.union(new Set([1, 2]), new Set([3, 4]))).toStrictEqual(new Set([1, 2, 3, 4]))
  })
})

describe('unionC function', () => {
  it('should return empty set if empty sets passed', () => {
    expect(S.unionC(new Set())(new Set())).toStrictEqual(new Set())
  })

  it('should return first set if the second is empty', () => {
    expect(S.unionC(new Set([1, 2]))(new Set())).toStrictEqual(new Set([1, 2]))
  })

  it('should return second set if the first is empty', () => {
    expect(S.unionC(new Set())(new Set([1, 2]))).toStrictEqual(new Set([1, 2]))
  })

  it('should return set contains content of first and second', () => {
    expect(S.unionC(new Set([1, 2]))(new Set([3, 4]))).toStrictEqual(new Set([1, 2, 3, 4]))
  })
})

describe('separate function', () => {
  it('should return all elements as onTrue if all pass predicate', () => {
    expect(S.separate(new Set([3, 4, 5]), geq3)).toStrictEqual([new Set([3, 4, 5]), new Set()])
  })

  it('should return all elements as onFalse, if no one pass predicate', () => {
    expect(S.separate(new Set([0, 1, 2]), geq3)).toStrictEqual([new Set(), new Set([0, 1, 2])])
  })

  it('should return elements passing predicate as onTrue and others as onFalse', () => {
    expect(S.separate(new Set([2, 3, 4]), geq3)).toStrictEqual([new Set([3, 4]), new Set([2])])
  })
})

describe('separateC function', () => {
  it('should return all elements as onTrue if all pass predicate', () => {
    expect(S.separateC(geq3)(new Set([3, 4, 5]))).toStrictEqual([new Set([3, 4, 5]), new Set()])
  })

  it('should return all elements as onFalse, if no one pass predicate', () => {
    expect(S.separateC(geq3)(new Set([0, 1, 2]))).toStrictEqual([new Set(), new Set([0, 1, 2])])
  })

  it('should return elements passing predicate as onTrue and others as onFalse', () => {
    expect(S.separateC(geq3)(new Set([2, 3, 4]))).toStrictEqual([new Set([3, 4]), new Set([2])])
  })
})

describe('separateCR function', () => {
  it('should return all elements as onTrue if all pass predicate', () => {
    expect(S.separateCR(new Set([3, 4, 5]))(geq3)).toStrictEqual([new Set([3, 4, 5]), new Set()])
  })

  it('should return all elements as onFalse, if no one pass predicate', () => {
    expect(S.separateCR(new Set([0, 1, 2]))(geq3)).toStrictEqual([new Set(), new Set([0, 1, 2])])
  })

  it('should return elements passing predicate as onTrue and others as onFalse', () => {
    expect(S.separateCR(new Set([2, 3, 4]))(geq3)).toStrictEqual([new Set([3, 4]), new Set([2])])
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

describe('someCR function', () => {
  it('should return false if empty set passed', () => {
    expect(S.someCR(new Set())(geq3)).toBe(false)
  })

  it('should return true if at least one element passes predicate', () => {
    expect(S.someCR(new Set([1, 2, 3]))(geq3)).toBe(true)
  })

  it('should return false if no one element passes predicate', () => {
    expect(S.someCR(new Set([0, 1, 2]))(geq3)).toBe(false)
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

describe('everyCR function', () => {
  it('should return true if empty set passed', () => {
    expect(S.everyCR(new Set())(geq3)).toBe(true)
  })

  it('should return true if every element passes predicate', () => {
    expect(S.everyCR(new Set([3, 4, 5]))(geq3)).toBe(true)
  })

  it('should return false if at least one element doesn\'t pass predicate', () => {
    expect(S.everyCR(new Set([2, 3, 4]))(geq3)).toBe(false)
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

describe('noneCR function', () => {
  it('should return true if empty set passed', () => {
    expect(S.noneCR(new Set())(geq3)).toBe(true)
  })

  it('should return true if no elements pass predicate', () => {
    expect(S.noneCR(new Set([0, 1, 2]))(geq3)).toBe(true)
  })

  it('should return false if some element passes predicate', () => {
    expect(S.noneCR(new Set([1, 2, 3]))(geq3)).toBe(false)
  })
})

describe('map function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.map(new Set(), add1)).toStrictEqual(new Set())
  })

  it('should return set with elements mapped with function', () => {
    expect(S.map(new Set([0, 1, 2]), add1)).toStrictEqual(new Set([1, 2, 3]))
  })
})

describe('mapC function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.mapC(add1)(new Set())).toStrictEqual(new Set())
  })

  it('should return set with elements mapped with function', () => {
    expect(S.mapC(add1)(new Set([0, 1, 2]))).toStrictEqual(new Set([1, 2, 3]))
  })
})

describe('mapCR function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.mapCR(new Set())(add1)).toStrictEqual(new Set())
  })

  it('should return set with elements mapped with function', () => {
    expect(S.mapCR(new Set([0, 1, 2]))(add1)).toStrictEqual(new Set([1, 2, 3]))
  })
})

describe('chain function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.chain(new Set(), getThisAndNext)).toStrictEqual(new Set())
  })

  it('should return union of sets returned by mapper', () => {
    expect(S.chain(new Set([0, 2]), getThisAndNext)).toStrictEqual(new Set([0, 1, 2, 3]))
  })

  it('should remove duplicates from set', () => {
    expect(S.chain(new Set([0, 1]), getThisAndNext)).toStrictEqual(new Set([0, 1, 2]))
  })
})

describe('chainC function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.chainC(getThisAndNext)(new Set())).toStrictEqual(new Set())
  })

  it('should return union of sets returned by mapper', () => {
    expect(S.chainC(getThisAndNext)(new Set([0, 2]))).toStrictEqual(new Set([0, 1, 2, 3]))
  })

  it('should remove duplicates from set', () => {
    expect(S.chainC(getThisAndNext)(new Set([0, 1]))).toStrictEqual(new Set([0, 1, 2]))
  })
})

describe('chainCR function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.chainCR(new Set())(getThisAndNext)).toStrictEqual(new Set())
  })

  it('should return union of sets returned by mapper', () => {
    expect(S.chainCR(new Set([0, 2]))(getThisAndNext)).toStrictEqual(new Set([0, 1, 2, 3]))
  })

  it('should remove duplicates from set', () => {
    expect(S.chainCR(new Set([0, 1]))(getThisAndNext)).toStrictEqual(new Set([0, 1, 2]))
  })
})

describe('filter function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.filter(new Set(), geq3)).toStrictEqual(new Set())
  })

  it('should return empty set if no elements passing predicate', () => {
    expect(S.filter(new Set([0, 1, 2]), geq3)).toStrictEqual(new Set())
  })

  it('should return set with elements passes predicate', () => {
    expect(S.filter(new Set([2, 3, 4]), geq3)).toStrictEqual(new Set([3, 4]))
  })
})

describe('filterC function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.filterC(geq3)(new Set())).toStrictEqual(new Set())
  })

  it('should return empty set if no elements passing predicate', () => {
    expect(S.filterC(geq3)(new Set([0, 1, 2]))).toStrictEqual(new Set())
  })

  it('should return set with elements passes predicate', () => {
    expect(S.filterC(geq3)(new Set([2, 3, 4]))).toStrictEqual(new Set([3, 4]))
  })
})

describe('filterCR function', () => {
  it('should return empty set if empty set passed', () => {
    expect(S.filterCR(new Set())(geq3)).toStrictEqual(new Set())
  })

  it('should return empty set if no elements passing predicate', () => {
    expect(S.filterCR(new Set([0, 1, 2]))(geq3)).toStrictEqual(new Set())
  })

  it('should return set with elements passes predicate', () => {
    expect(S.filterCR(new Set([2, 3, 4]))(geq3)).toStrictEqual(new Set([3, 4]))
  })
})

describe('equal function', () => {
  it('should return true if both sets empty', () => {
    expect(S.equal(new Set(), new Set())).toBe(true)
  })

  it('should return false if only first set empty', () => {
    expect(S.equal(new Set(), new Set([1]))).toBe(false)
  })

  it('should return false if only second set empty', () => {
    expect(S.equal(new Set([1]), new Set())).toBe(false)
  })

  it('should return false if set sizes are not equal', () => {
    expect(S.equal(new Set([1, 2, 3]), new Set([1, 2]))).toBe(false)
    expect(S.equal(new Set([1, 2]), new Set([1, 2, 3]))).toBe(false)
  })

  it('should return false if set elements are not equal', () => {
    expect(S.equal(new Set([1, 2]), new Set([3, 4]))).toBe(false)
  })

  it('should return true if sets are equal', () => {
    expect(S.equal(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(true)
  })
})

describe('equalC function', () => {
  it('should return true if both sets empty', () => {
    expect(S.equalC(new Set())(new Set())).toBe(true)
  })

  it('should return false if only first set empty', () => {
    expect(S.equalC(new Set())(new Set([1]))).toBe(false)
  })

  it('should return false if only second set empty', () => {
    expect(S.equalC(new Set([1]))(new Set())).toBe(false)
  })

  it('should return false if set sizes are not equal', () => {
    expect(S.equalC(new Set([1, 2, 3]))(new Set([1, 2]))).toBe(false)
    expect(S.equalC(new Set([1, 2]))(new Set([1, 2, 3]))).toBe(false)
  })

  it('should return false if set elements are not equal', () => {
    expect(S.equalC(new Set([1, 2]))(new Set([3, 4]))).toBe(false)
  })

  it('should return true if sets are equal', () => {
    expect(S.equalC(new Set([1, 2, 3]))(new Set([1, 2, 3]))).toBe(true)
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

describe('nonEmpty function', () => {
  it('should return false if empty set passed', () => {
    expect(S.nonEmpty(new Set())).toBe(false)
  })

  it('should return true if non empty set passed', () => {
    expect(S.nonEmpty(new Set([1, 2, 3]))).toBe(true)
  })
})

describe('intersects function', () => {
  it('should return false if both sets are empty', () => {
    expect(S.intersects(new Set(), new Set())).toBe(false)
  })

  it('should return false if the first set is empty', () => {
    expect(S.intersects(new Set(), new Set([1, 2, 3]))).toBe(false)
  })

  it('should return false if the second set is empty', () => {
    expect(S.intersects(new Set([1, 2, 3]), new Set())).toBe(false)
  })

  it('should return false is sets have no same elements', () => {
    expect(S.intersects(new Set([1, 2, 3]), new Set([4, 5, 6]))).toBe(false)
  })

  it('should return true if sets have at least one same element', () => {
    expect(S.intersects(new Set([1, 2, 3]), new Set([3, 4, 5]))).toBe(true)
  })
})

describe('intersectsC function', () => {
  it('should return false if both sets are empty', () => {
    expect(S.intersectsC(new Set())(new Set())).toBe(false)
  })

  it('should return false if the first set is empty', () => {
    expect(S.intersectsC(new Set())(new Set([1, 2, 3]))).toBe(false)
  })

  it('should return false if the second set is empty', () => {
    expect(S.intersectsC(new Set([1, 2, 3]))(new Set())).toBe(false)
  })

  it('should return false is sets have no same elements', () => {
    expect(S.intersectsC(new Set([1, 2, 3]))(new Set([4, 5, 6]))).toBe(false)
  })

  it('should return true if sets have at least one same element', () => {
    expect(S.intersectsC(new Set([1, 2, 3]))(new Set([3, 4, 5]))).toBe(true)
  })
})

describe('disjoint function', () => {
  it('should return true if the first set is empty', () => {
    expect(S.disjoint(new Set(), new Set([1, 2, 3]))).toBe(true)
  })

  it('should return true if the second set is empty', () => {
    expect(S.disjoint(new Set([1, 2, 3]), new Set())).toBe(true)
  })

  it('should return true is sets have no same elements', () => {
    expect(S.disjoint(new Set([1, 2, 3]), new Set([4, 5, 6]))).toBe(true)
  })

  it('should return false if sets have at least one same element', () => {
    expect(S.disjoint(new Set([1, 2, 3]), new Set([3, 4, 5]))).toBe(false)
  })
})

describe('disjointC function', () => {
  it('should return true if the first set is empty', () => {
    expect(S.disjointC(new Set())(new Set([1, 2, 3]))).toBe(true)
  })

  it('should return true if the second set is empty', () => {
    expect(S.disjointC(new Set([1, 2, 3]))(new Set())).toBe(true)
  })

  it('should return true is sets have no same elements', () => {
    expect(S.disjointC(new Set([1, 2, 3]))(new Set([4, 5, 6]))).toBe(true)
  })

  it('should return false if sets have at least one same element', () => {
    expect(S.disjointC(new Set([1, 2, 3]))(new Set([3, 4, 5]))).toBe(false)
  })
})
