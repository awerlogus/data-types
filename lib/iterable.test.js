const I = require('./iterable')
const O = require('./option')

// SECTION Utils

/** @type {(number: number) => number} */
function add1 (number) { return number + 1 }

/** @type {(number: number) => boolean} */
function gt3 (number) { return number > 3 }

/** @type {<T>(array: ReadonlyArray<T>, elem: T) => ReadonlyArray<T>} */
function prepend (array, elem) { return [elem, ...array] }

/** @type {(x: number, y: number) => number} */
function add (x, y) { return x + y }

// SECTION Tests

describe('forEach function', () => {
  it('should do nothing if iterable is empty', () => {
    /** @type {Array<number>} */
    const result = []

    /** @type {Set<number>} */
    const data = new Set()

    I.forEach(data, result.push.bind(result))

    expect(result).toMatchObject([])
  })

  it('should run function for every iterable element', () => {
    /** @type {Array<number>} */
    const result = []

    const data = new Set([1, 2, 3, 4, 5])

    I.forEach(data, result.push.bind(result))

    expect(result).toMatchObject([1, 2, 3, 4, 5])
  })
})

describe('forEachC function', () => {
  it('should do nothing if iterable is empty', () => {
    /** @type {Array<number>} */
    const result = []

    /** @type {Set<number>} */
    const data = new Set()

    I.forEachC(result.push.bind(result))(data)

    expect(result).toMatchObject([])
  })

  it('should run function for every iterable element', () => {
    /** @type {Array<number>} */
    const result = []

    const data = new Set([1, 2, 3, 4, 5])

    I.forEachC(result.push.bind(result))(data)

    expect(result).toMatchObject([1, 2, 3, 4, 5])
  })
})

describe('map function', () => {
  it('should return new empty iterable if iterable is empty', () => {
    /** @type {Set<number>} */
    const data = new Set()

    expect(Array.from(I.map(data, add1))).toMatchObject([])
  })

  it('should return new iterable with mapped elements', () => {
    const data = new Set([1, 2, 3, 4, 5])

    expect(Array.from(I.map(data, add1))).toMatchObject([2, 3, 4, 5, 6])
  })
})

describe('mapC function', () => {
  it('should return new empty iterable if iterable is empty', () => {
    /** @type {Set<number>} */
    const data = new Set()

    expect(Array.from(I.mapC(add1)(data))).toMatchObject([])
  })

  it('should return new iterable with mapped elements', () => {
    const data = new Set([1, 2, 3, 4, 5])

    expect(Array.from(I.mapC(add1)(data))).toMatchObject([2, 3, 4, 5, 6])
  })
})

describe('filter function', () => {
  it('should return new empty iterable if iterable is empty', () => {
    /** @type {Set<number>} */
    const data = new Set()

    expect(Array.from(I.filter(data, gt3))).toMatchObject([])
  })

  it('should return new empty iterable if iterable contains no elements matches predicate', () => {
    const data = new Set([1, 2, 3])

    expect(Array.from(I.filter(data, gt3))).toMatchObject([])
  })

  it('should return iterable with elements matches predicate', () => {
    const data = new Set([1, 2, 3, 4, 5])

    expect(Array.from(I.filter(data, gt3))).toMatchObject([4, 5])
  })
})

describe('filterC function', () => {
  it('should return new empty iterable if iterable is empty', () => {
    /** @type {Set<number>} */
    const data = new Set()

    expect(Array.from(I.filterC(gt3)(data))).toMatchObject([])
  })

  it('should return new empty iterable if iterable contains no elements matches predicate', () => {
    const data = new Set([1, 2, 3])

    expect(Array.from(I.filterC(gt3)(data))).toMatchObject([])
  })

  it('should return iterable with elements matches predicate', () => {
    const data = new Set([1, 2, 3, 4, 5])

    expect(Array.from(I.filterC(gt3)(data))).toMatchObject([4, 5])
  })
})

describe('merge function', () => {
  it('should return empty iterable if both iterables are empty', () => {
    /** @type {Set<number>} */
    const data1 = new Set()
    /** @type {Set<number>} */
    const data2 = new Set()

    expect(Array.from(I.merge(data1, data2))).toMatchObject([])
  })

  it('should return iterable with first iterable content if the second is empty', () => {
    const data1 = new Set([1, 2])
    /** @type {Set<number>} */
    const data2 = new Set()

    expect(Array.from(I.merge(data1, data2))).toMatchObject([1, 2])
  })

  it('should return iterable with second iterable content if the first is empty', () => {
    /** @type {Set<number>} */
    const data1 = new Set()
    const data2 = new Set([3, 4])

    expect(Array.from(I.merge(data1, data2))).toMatchObject([3, 4])
  })

  it('should return iterable contains elements of both iterables', () => {
    const data1 = new Set([1, 2])
    const data2 = new Set([3, 4])

    expect(Array.from(I.merge(data1, data2))).toMatchObject([1, 2, 3, 4])
  })
})

describe('mergeC function', () => {
  it('should return empty iterable if both iterables are empty', () => {
    /** @type {Set<number>} */
    const data1 = new Set()
    /** @type {Set<number>} */
    const data2 = new Set()

    expect(Array.from(I.mergeC(data1)(data2))).toMatchObject([])
  })

  it('should return iterable with first iterable content if the second is empty', () => {
    const data1 = new Set([1, 2])
    /** @type {Set<number>} */
    const data2 = new Set()

    expect(Array.from(I.mergeC(data1)(data2))).toMatchObject([1, 2])
  })

  it('should return iterable with second iterable content if the first is empty', () => {
    /** @type {Set<number>} */
    const data1 = new Set()
    const data2 = new Set([3, 4])

    expect(Array.from(I.mergeC(data1)(data2))).toMatchObject([3, 4])
  })

  it('should return iterable contains elements of both iterables', () => {
    const data1 = new Set([1, 2])
    const data2 = new Set([3, 4])

    expect(Array.from(I.mergeC(data1)(data2))).toMatchObject([1, 2, 3, 4])
  })
})

describe('reduce function', () => {
  it('should return default value if iterable is empty', () => {
    /** @type {Set<number>} */
    const data = new Set()

    /** @type {ReadonlyArray<number>} */
    const def = []

    expect(I.reduce(data, prepend, def)).toMatchObject([])
  })

  it('should reduce iterable with function', () => {
    const data = new Set([1, 2, 3])

    /** @type {ReadonlyArray<number>} */
    const def = []

    expect(I.reduce(data, prepend, def)).toMatchObject([3, 2, 1])
  })
})

describe('reduceC function', () => {
  it('should return default value if iterable is empty', () => {
    /** @type {Set<number>} */
    const data = new Set()

    /** @type {ReadonlyArray<number>} */
    const def = []

    expect(I.reduceC(prepend, def)(data)).toMatchObject([])
  })

  it('should reduce iterable with function', () => {
    const data = new Set([1, 2, 3])

    /** @type {ReadonlyArray<number>} */
    const def = []

    expect(I.reduceC(prepend, def)(data)).toMatchObject([3, 2, 1])
  })
})

describe('fold function', () => {
  it('should return none if iterable is empty', () => {
    /** @type {Set<number>} */
    const data = new Set()

    expect(I.fold(data, add)).toBe(O.none)
  })

  it('should return fold iterable with function', () => {
    const data = new Set([1, 2, 3])

    expect(I.fold(data, add)).toBe(O.some(6))
  })
})

describe('foldC function', () => {
  it('should return none if iterable is empty', () => {
    /** @type {Set<number>} */
    const data = new Set()

    expect(I.foldC(add)(data)).toBe(O.none)
  })

  it('should return fold iterable with function', () => {
    const data = new Set([1, 2, 3])

    expect(I.foldC(add)(data)).toBe(O.some(6))
  })
})

describe('countMatches function', () => {
  it('should return 0 if iterable is empty', () => {
    /** @type {Set<number>} */
    const data = new Set()

    expect(I.countMatches(data, gt3)).toBe(0)
  })

  it('should return count of iterable elements matches predicate', () => {
    const data = new Set([1, 2, 3, 4, 5])

    expect(I.countMatches(data, gt3)).toBe(2)
  })
})

describe('countMatchesC function', () => {
  it('should return 0 if iterable is empty', () => {
    /** @type {Set<number>} */
    const data = new Set()

    expect(I.countMatchesC(gt3)(data)).toBe(0)
  })

  it('should return count of iterable elements matches predicate', () => {
    const data = new Set([1, 2, 3, 4, 5])

    expect(I.countMatchesC(gt3)(data)).toBe(2)
  })
})
