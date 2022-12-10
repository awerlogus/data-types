const MM = require('./map-map')
const O = require('./option')

// SECTION Utils

/** @type {(number: number) => number} */
function add1 (number) { return number + 1 }

// SECTION Tests

describe('clone function', () => {
  it('should clone map map', () => {
    expect(MM.clone(new Map())).toStrictEqual(new Map())
    expect(MM.clone(new Map([[1, new Map([[1, 2]])]]))).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return new map map object', () => {
    const mapMap = new Map([[1, new Map([[1, 2]])]])

    expect(MM.clone(mapMap) === mapMap).toBe(false)
    expect(MM.clone(mapMap).get(1) === mapMap.get(1)).toBe(false)
  })
})

describe('has function', () => {
  it('should return false if inner map doesn\'t exist', () => {
    expect(MM.has(new Map(), 1, 2)).toBe(false)
  })

  it('should return false if key of inner map doesn\'t exist', () => {
    expect(MM.has(new Map([[1, new Map([[1, 2]])]]), 1, 2)).toBe(false)
  })

  it('should return true if key of inner map exists', () => {
    expect(MM.has(new Map([[1, new Map([[1, 2]])]]), 1, 1)).toBe(true)
  })
})

describe('hasC function', () => {
  it('should return false if inner map doesn\'t exist', () => {
    expect(MM.hasC(1, 2)(new Map())).toBe(false)
  })

  it('should return false if key of inner map doesn\'t exist', () => {
    expect(MM.hasC(1, 2)(new Map([[1, new Map([[1, 2]])]]))).toBe(false)
  })

  it('should return true if key of inner map exists', () => {
    expect(MM.hasC(1, 1)(new Map([[1, new Map([[1, 2]])]]))).toBe(true)
  })
})

describe('hasCR function', () => {
  it('should return false if inner map doesn\'t exist', () => {
    expect(MM.hasCR(new Map())(1, 2)).toBe(false)
  })

  it('should return false if key of inner map doesn\'t exist', () => {
    expect(MM.hasCR(new Map([[1, new Map([[1, 2]])]]))(1, 2)).toBe(false)
  })

  it('should return true if key of inner map exists', () => {
    expect(MM.hasCR(new Map([[1, new Map([[1, 2]])]]))(1, 1)).toBe(true)
  })
})

describe('get function', () => {
  it('should return none if inner map doesn\'t exist', () => {
    expect(MM.get(new Map(), 1, 2)).toBe(O.none)
  })

  it('should return none if inner map doesn\'t have a key', () => {
    expect(MM.get(new Map([[1, new Map([[1, 2]])]]), 1, 2)).toBe(O.none)
  })

  it('should return value if inner map has a key', () => {
    expect(MM.get(new Map([[1, new Map([[1, 2]])]]), 1, 1)).toBe(2)
  })
})

describe('getC function', () => {
  it('should return none if inner map doesn\'t exist', () => {
    expect(MM.getC(1, 2)(new Map())).toBe(O.none)
  })

  it('should return none if inner map doesn\'t have a key', () => {
    expect(MM.getC(1, 2)(new Map([[1, new Map([[1, 2]])]]))).toBe(O.none)
  })

  it('should return value if inner map has a key', () => {
    expect(MM.getC(1, 1)(new Map([[1, new Map([[1, 2]])]]))).toBe(2)
  })
})

describe('getCR function', () => {
  it('should return none if inner map doesn\'t exist', () => {
    expect(MM.getCR(new Map())(1, 2)).toBe(O.none)
  })

  it('should return none if inner map doesn\'t have a key', () => {
    expect(MM.getCR(new Map([[1, new Map([[1, 2]])]]))(1, 2)).toBe(O.none)
  })

  it('should return value if inner map has a key', () => {
    expect(MM.getCR(new Map([[1, new Map([[1, 2]])]]))(1, 1)).toBe(2)
  })
})

describe('keys function', () => {
  it('should return iterable of inner map keys', () => {
    expect(Array.from(MM.keys(new Map([[1, new Map([[1, 2], [3, 4]])]]), 1))).toStrictEqual([1, 3])
  })

  it('should return empty iterable if inner map doesn\'t exist', () => {
    expect(Array.from(MM.keys(new Map([[1, new Map()]]), 2))).toStrictEqual([])
  })
})

describe('keysC function', () => {
  it('should return iterable of inner map keys', () => {
    expect(Array.from(MM.keysC(1)(new Map([[1, new Map([[1, 2], [3, 4]])]])))).toStrictEqual([1, 3])
  })

  it('should return empty iterable if inner map doesn\'t exist', () => {
    expect(Array.from(MM.keysC(2)(new Map([[1, new Map()]])))).toStrictEqual([])
  })
})

describe('keysCR function', () => {
  it('should return iterable of inner map keys', () => {
    expect(Array.from(MM.keysCR(new Map([[1, new Map([[1, 2], [3, 4]])]]))(1))).toStrictEqual([1, 3])
  })

  it('should return empty iterable if inner map doesn\'t exist', () => {
    expect(Array.from(MM.keysCR(new Map([[1, new Map()]]))(2))).toStrictEqual([])
  })
})

describe('values function', () => {
  it('should return iterable of inner map values', () => {
    expect(Array.from(MM.values(new Map([[1, new Map([[1, 2], [3, 4]])]]), 1))).toStrictEqual([2, 4])
  })

  it('should return empty iterable if inner map doesn\'t exist', () => {
    expect(Array.from(MM.values(new Map([[1, new Map()]]), 2))).toStrictEqual([])
  })
})

describe('valuesC function', () => {
  it('should return iterable of inner map values', () => {
    expect(Array.from(MM.valuesC(1)(new Map([[1, new Map([[1, 2], [3, 4]])]])))).toStrictEqual([2, 4])
  })

  it('should return empty iterable if inner map doesn\'t exist', () => {
    expect(Array.from(MM.valuesC(2)(new Map([[1, new Map()]])))).toStrictEqual([])
  })
})

describe('valuesCR function', () => {
  it('should return iterable of inner map values', () => {
    expect(Array.from(MM.valuesCR(new Map([[1, new Map([[1, 2], [3, 4]])]]))(1))).toStrictEqual([2, 4])
  })

  it('should return empty iterable if inner map doesn\'t exist', () => {
    expect(Array.from(MM.valuesCR(new Map([[1, new Map()]]))(2))).toStrictEqual([])
  })
})

describe('entries function', () => {
  it('should return iterable of inner map entries', () => {
    expect(Array.from(MM.entries(new Map([[1, new Map([[1, 2], [3, 4]])]]), 1))).toStrictEqual([[1, 2], [3, 4]])
  })

  it('should return empty iterable if inner map doesn\'t exist', () => {
    expect(Array.from(MM.entries(new Map([[1, new Map()]]), 2))).toStrictEqual([])
  })
})

describe('entriesC function', () => {
  it('should return iterable of inner map entries', () => {
    expect(Array.from(MM.entriesC(1)(new Map([[1, new Map([[1, 2], [3, 4]])]])))).toStrictEqual([[1, 2], [3, 4]])
  })

  it('should return empty iterable if inner map doesn\'t exist', () => {
    expect(Array.from(MM.entriesC(2)(new Map([[1, new Map()]])))).toStrictEqual([])
  })
})

describe('entriesCR function', () => {
  it('should return iterable of inner map entries', () => {
    expect(Array.from(MM.entriesCR(new Map([[1, new Map([[1, 2], [3, 4]])]]))(1))).toStrictEqual([[1, 2], [3, 4]])
  })

  it('should return empty iterable if inner map doesn\'t exist', () => {
    expect(Array.from(MM.entriesCR(new Map([[1, new Map()]]))(2))).toStrictEqual([])
  })
})

describe('set function', () => {
  it('should return true if inner map didn\'t exist', () => {
    const map = new Map()

    expect(MM.set(map, 1, 1, 2)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return true if key didn\'t exist in inner map', () => {
    const map = new Map([[1, new Map()]])

    expect(MM.set(map, 1, 1, 2)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return false and not update map if key existed in inner map', () => {
    const map = new Map([[1, new Map([[1, 2]])]])

    expect(MM.set(map, 1, 1, 3)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })
})

describe('setC function', () => {
  it('should return true if inner map didn\'t exist', () => {
    const map = new Map()

    expect(MM.setC(1, 1, 2)(map)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return true if key didn\'t exist in inner map', () => {
    const map = new Map([[1, new Map()]])

    expect(MM.setC(1, 1, 2)(map)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return false and not update map if key existed in inner map', () => {
    const map = new Map([[1, new Map([[1, 2]])]])

    expect(MM.setC(1, 1, 3)(map)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })
})

describe('setCR function', () => {
  it('should return true if inner map didn\'t exist', () => {
    const map = new Map()

    expect(MM.setCR(map)(1, 1, 2)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return true if key didn\'t exist in inner map', () => {
    const map = new Map([[1, new Map()]])

    expect(MM.setCR(map)(1, 1, 2)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return false and not update map if key existed in inner map', () => {
    const map = new Map([[1, new Map([[1, 2]])]])

    expect(MM.setCR(map)(1, 1, 3)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })
})

describe('setU function', () => {
  it('should return false if inner map didn\'t exist', () => {
    const map = new Map()

    expect(MM.setU(map, 1, 1, 2)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return false if key didn\'t exist in inner map', () => {
    const map = new Map([[1, new Map()]])

    expect(MM.setU(map, 1, 1, 2)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return false if key existed but the value didn\'t change', () => {
    const map = new Map([[1, new Map([[1, 2]])]])

    expect(MM.setU(map, 1, 1, 2)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return true and update value if key existed and value changed', () => {
    const map = new Map([[1, new Map([[1, 2]])]])

    expect(MM.setU(map, 1, 1, 3)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 3]])]]))
  })
})

describe('setUC function', () => {
  it('should return false if inner map didn\'t exist', () => {
    const map = new Map()

    expect(MM.setUC(1, 1, 2)(map)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return false if key didn\'t exist in inner map', () => {
    const map = new Map([[1, new Map()]])

    expect(MM.setUC(1, 1, 2)(map)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return false if key existed but the value didn\'t change', () => {
    const map = new Map([[1, new Map([[1, 2]])]])

    expect(MM.setUC(1, 1, 2)(map)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return true and update value if key existed and value changed', () => {
    const map = new Map([[1, new Map([[1, 2]])]])

    expect(MM.setUC(1, 1, 3)(map)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 3]])]]))
  })
})

describe('setUCR function', () => {
  it('should return false if inner map didn\'t exist', () => {
    const map = new Map()

    expect(MM.setUCR(map)(1, 1, 2)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return false if key didn\'t exist in inner map', () => {
    const map = new Map([[1, new Map()]])

    expect(MM.setUCR(map)(1, 1, 2)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return false if key existed but the value didn\'t change', () => {
    const map = new Map([[1, new Map([[1, 2]])]])

    expect(MM.setUCR(map)(1, 1, 2)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return true and update value if key existed and value changed', () => {
    const map = new Map([[1, new Map([[1, 2]])]])

    expect(MM.setUCR(map)(1, 1, 3)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 3]])]]))
  })
})

describe('remove function', () => {
  it('should return false if inner set didn\'t exist', () => {
    const map = new Map()

    expect(MM.remove(map, 1, 2)).toBe(false)
    expect(map).toStrictEqual(new Map())
  })

  it('should return false if key didn\'t exist in inner map', () => {
    const map = new Map([[1, new Map([[1, 2]])]])

    expect(MM.remove(map, 1, 2)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return true if key existed in inner map and remove it if it became empty', () => {
    const map = new Map([[1, new Map([[1, 2]])]])

    expect(MM.remove(map, 1, 1)).toBe(true)
    expect(map).toStrictEqual(new Map())
  })
})

describe('removeC function', () => {
  it('should return false if inner set didn\'t exist', () => {
    const map = new Map()

    expect(MM.removeC(1, 2)(map)).toBe(false)
    expect(map).toStrictEqual(new Map())
  })

  it('should return false if key didn\'t exist in inner map', () => {
    const map = new Map([[1, new Map([[1, 2]])]])

    expect(MM.removeC(1, 2)(map)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return true if key existed in inner map and remove it if it became empty', () => {
    const map = new Map([[1, new Map([[1, 2]])]])

    expect(MM.removeC(1, 1)(map)).toBe(true)
    expect(map).toStrictEqual(new Map())
  })
})

describe('removeCR function', () => {
  it('should return false if inner set didn\'t exist', () => {
    const map = new Map()

    expect(MM.removeCR(map)(1, 2)).toBe(false)
    expect(map).toStrictEqual(new Map())
  })

  it('should return false if key didn\'t exist in inner map', () => {
    const map = new Map([[1, new Map([[1, 2]])]])

    expect(MM.removeCR(map)(1, 2)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, new Map([[1, 2]])]]))
  })

  it('should return true if key existed in inner map and remove it if it became empty', () => {
    const map = new Map([[1, new Map([[1, 2]])]])

    expect(MM.removeCR(map)(1, 1)).toBe(true)
    expect(map).toStrictEqual(new Map())
  })
})

describe('mapValues function', () => {
  it('should return empty map for empty map passed', () => {
    expect(MM.mapValues(new Map(), add1)).toStrictEqual(new Map())
  })

  it('should map all values with function', () => {
    const map = new Map([[1, new Map([[1, 2], [3, 4]])], [3, new Map([[5, 6]])]])
    const result = new Map([[1, new Map([[1, 3], [3, 5]])], [3, new Map([[5, 7]])]])

    expect(MM.mapValues(map, add1)).toStrictEqual(result)
  })
})

describe('mapValuesС function', () => {
  it('should return empty map for empty map passed', () => {
    expect(MM.mapValuesC(add1)(new Map())).toStrictEqual(new Map())
  })

  it('should map all values with function', () => {
    const map = new Map([[1, new Map([[1, 2], [3, 4]])], [3, new Map([[5, 6]])]])
    const result = new Map([[1, new Map([[1, 3], [3, 5]])], [3, new Map([[5, 7]])]])

    expect(MM.mapValuesC(add1)(map)).toStrictEqual(result)
  })
})

describe('mapValuesСR function', () => {
  it('should return empty map for empty map passed', () => {
    expect(MM.mapValuesCR(new Map())(add1)).toStrictEqual(new Map())
  })

  it('should map all values with function', () => {
    const map = new Map([[1, new Map([[1, 2], [3, 4]])], [3, new Map([[5, 6]])]])
    const result = new Map([[1, new Map([[1, 3], [3, 5]])], [3, new Map([[5, 7]])]])

    expect(MM.mapValuesCR(map)(add1)).toStrictEqual(result)
  })
})

describe('valuesDisjoint function', () => {
  it('should return true for empty map', () => {
    expect(MM.valuesDisjoint(new Map())).toBe(true)
  })

  it('should return true if inner values are disjoint', () => {
    expect(MM.valuesDisjoint(new Map([[1, new Map([[1, 2], [2, 3]])], [2, new Map([[3, 4]])]]))).toBe(true)
  })

  it('should return false if inner values are not disjoint', () => {
    expect(MM.valuesDisjoint(new Map([[1, new Map([[1, 2], [2, 3]])], [2, new Map([[3, 3]])]]))).toBe(false)
    expect(MM.valuesDisjoint(new Map([[1, new Map([[1, 2], [2, 2]])], [2, new Map([[2, 3]])]]))).toBe(false)
  })
})
