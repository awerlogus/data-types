const O = require('./option')
const A = require('./array')

// SECTION Utils

/** @type {(x: number) => boolean} */
const odd = x => Boolean(x & 1)

/** @type {(x: number, y: number) => number} */
const sum = (x, y) => x + y

// SECTION Tests

describe('setAt function', () => {
  it('should return a new array with the element at the specified index replaced', () => {
    expect(A.setAt([1, 2, 3, 4, 5], 2, 0)).toStrictEqual([1, 2, 0, 4, 5])
  })

  it('should return array with holes if the index is out of bounds', () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(A.setAt([1, 2, 3], 5, 0)).toStrictEqual([1, 2, 3,,, 0])
  })

  it('should handle setting an element at index 0', () => {
    expect(A.setAt([1, 2, 3], 0, 0)).toStrictEqual([0, 2, 3])
  })

  it('should handle setting an element at the last index', () => {
    const original = [1, 2, 3]
    const indexToSet = original.length - 1

    expect(A.setAt(original, indexToSet, 0)).toStrictEqual([1, 2, 0])
  })

  it('should handle setting an element in an empty array', () => {
    expect(A.setAt([], 0, 0)).toStrictEqual([0])
  })
})

describe('map function', () => {
  it('should return empty array if empty array passed', () => {
    expect(A.map([], odd)).toStrictEqual([])
  })

  it('should return array with elements mapped with function', () => {
    expect(A.map([1, 2, 3], odd)).toStrictEqual([true, false, true])
  })
})

describe('mapC function', () => {
  it('should return empty array if empty array passed', () => {
    expect(A.mapC(odd)([])).toStrictEqual([])
  })

  it('should return array with elements mapped with function', () => {
    expect(A.mapC(odd)([1, 2, 3])).toStrictEqual([true, false, true])
  })
})

describe('mapCR function', () => {
  it('should return empty array if empty array passed', () => {
    expect(A.mapCR([])(odd)).toStrictEqual([])
  })

  it('should return array with elements mapped with function', () => {
    expect(A.mapCR([1, 2, 3])(odd)).toStrictEqual([true, false, true])
  })
})

describe('filter function', () => {
  it('should return empty array if empty array passed', () => {
    expect(A.filter([], odd)).toStrictEqual([])
  })

  it('should return array with elements filtered with function', () => {
    expect(A.filter([1, 2, 3], odd)).toStrictEqual([1, 3])
  })
})

describe('filterC function', () => {
  it('should return empty array if empty array passed', () => {
    expect(A.filterC(odd)([])).toStrictEqual([])
  })

  it('should return array with elements filtered with function', () => {
    expect(A.filterC(odd)([1, 2, 3])).toStrictEqual([1, 3])
  })
})

describe('filterCR function', () => {
  it('should return empty array if empty array passed', () => {
    expect(A.filterCR([])(odd)).toStrictEqual([])
  })

  it('should return array with elements filtered with function', () => {
    expect(A.filterCR([1, 2, 3])(odd)).toStrictEqual([1, 3])
  })
})

describe('separate function', () => {
  it('should return empty arrays if empty array passed', () => {
    expect(A.separate([], odd)).toStrictEqual([[], []])
  })

  it('should separate array with predicate', () => {
    expect(A.separate([1, 2, 3, 4, 5], odd)).toStrictEqual([[1, 3, 5], [2, 4]])
  })
})

describe('separateC function', () => {
  it('should return empty arrays if empty array passed', () => {
    expect(A.separateC(odd)([])).toStrictEqual([[], []])
  })

  it('should separate array with predicate', () => {
    expect(A.separateC(odd)([1, 2, 3, 4, 5])).toStrictEqual([[1, 3, 5], [2, 4]])
  })
})

describe('separateCR function', () => {
  it('should return empty arrays if empty array passed', () => {
    expect(A.separateCR([])(odd)).toStrictEqual([[], []])
  })

  it('should separate array with predicate', () => {
    expect(A.separateCR([1, 2, 3, 4, 5])(odd)).toStrictEqual([[1, 3, 5], [2, 4]])
  })
})

describe('first function', () => {
  it('should return none if empty array passed', () => {
    expect(A.first([])).toBe(O.none)
  })

  it('should return first array element if non empty array passed', () => {
    expect(A.first([1, 2, 3])).toBe(1)
  })
})

describe('zip function', () => {
  it('should return array with two arrays zipped', () => {
    expect(A.zip([1, 2, 3], [4, 5, 6], sum)).toStrictEqual([5, 7, 9])
  })

  it('should return array of minimal length if array lengths are not equal', () => {
    expect(A.zip([1, 2], [4, 5, 6], sum)).toStrictEqual([5, 7])
    expect(A.zip([1, 2, 3], [4, 5], sum)).toStrictEqual([5, 7])
  })
})

describe('zipC function', () => {
  it('should return array with two arrays zipped', () => {
    expect(A.zipC(sum)([1, 2, 3], [4, 5, 6])).toStrictEqual([5, 7, 9])
  })

  it('should return array of minimal length if array lengths are not equal', () => {
    expect(A.zipC(sum)([1, 2], [4, 5, 6])).toStrictEqual([5, 7])
    expect(A.zipC(sum)([1, 2, 3], [4, 5])).toStrictEqual([5, 7])
  })
})

describe('zipCR function', () => {
  it('should return array with two arrays zipped', () => {
    expect(A.zipCR([1, 2, 3], [4, 5, 6])(sum)).toStrictEqual([5, 7, 9])
  })

  it('should return array of minimal length if array lengths are not equal', () => {
    expect(A.zipCR([1, 2], [4, 5, 6])(sum)).toStrictEqual([5, 7])
    expect(A.zipCR([1, 2, 3], [4, 5])(sum)).toStrictEqual([5, 7])
  })
})
