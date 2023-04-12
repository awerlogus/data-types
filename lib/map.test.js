const O = require('./option')
const M = require('./map')

// SECTION Utils

/** @type {(number: number) => number} */
function add1 (number) { return number + 1 }

// SECTION Tests

describe('clone function', () => {
  it('should clone map', () => {
    expect(M.clone(new Map())).toStrictEqual(new Map())
    expect(M.clone(new Map([[1, 2]]))).toStrictEqual(new Map([[1, 2]]))
  })

  it('should return new map object', () => {
    const map = new Map()

    expect(M.clone(map)).not.toBe(map)
  })
})

describe('has function', () => {
  it('should return true if map has a key', () => {
    expect(M.has(new Map([[1, 2], [3, 4]]), 1)).toBe(true)
  })

  it('should return false if map doesn\'t have a key', () => {
    expect(M.has(new Map([[1, 2], [3, 4]]), 2)).toBe(false)
  })
})

describe('hasC function', () => {
  it('should return true if map has a key', () => {
    expect(M.hasC(1)(new Map([[1, 2], [3, 4]]))).toBe(true)
  })

  it('should return false if map doesn\'t have a key', () => {
    expect(M.hasC(2)(new Map([[1, 2], [3, 4]]))).toBe(false)
  })
})

describe('hasCR function', () => {
  it('should return true if map has a key', () => {
    expect(M.hasCR(new Map([[1, 2], [3, 4]]))(1)).toBe(true)
  })

  it('should return false if map doesn\'t have a key', () => {
    expect(M.hasCR(new Map([[1, 2], [3, 4]]))(2)).toBe(false)
  })
})

describe('get function', () => {
  it('should return value if key exists in map', () => {
    expect(M.get(new Map([[1, 2], [3, 4]]), 1)).toBe(2)
  })

  it('should return none if key doesn\'t exist in map', () => {
    expect(M.get(new Map([[1, 2], [3, 4]]), 2)).toBe(O.none)
  })
})

describe('getC function', () => {
  it('should return value if key exists in map', () => {
    expect(M.getC(1)(new Map([[1, 2], [3, 4]]))).toBe(2)
  })

  it('should return none if key doesn\'t exist in map', () => {
    expect(M.getC(2)(new Map([[1, 2], [3, 4]]))).toBe(O.none)
  })
})

describe('getCR function', () => {
  it('should return value if key exists in map', () => {
    expect(M.getCR(new Map([[1, 2], [3, 4]]))(1)).toBe(2)
  })

  it('should return none if key doesn\'t exist in map', () => {
    expect(M.getCR(new Map([[1, 2], [3, 4]]))(2)).toBe(O.none)
  })
})

describe('getUnsafe function', () => {
  it('should return value if key exists in map', () => {
    expect(M.getUnsafe(new Map([[1, 2], [3, 4]]), 1)).toBe(2)
  })

  it('should return none if key doesn\'t exist in map', () => {
    expect(() => M.getUnsafe(new Map([[1, 2], [3, 4]]), 2)).toThrow('')
  })
})

describe('getUnsafeC function', () => {
  it('should return value if key exists in map', () => {
    expect(M.getUnsafeC(1)(new Map([[1, 2], [3, 4]]))).toBe(2)
  })

  it('should return none if key doesn\'t exist in map', () => {
    expect(() => M.getUnsafeC(2)(new Map([[1, 2], [3, 4]]))).toThrow('')
  })
})

describe('getUnsafeCR function', () => {
  it('should return value if key exists in map', () => {
    expect(M.getUnsafeCR(new Map([[1, 2], [3, 4]]))(1)).toBe(2)
  })

  it('should return none if key doesn\'t exist in map', () => {
    expect(() => M.getUnsafeCR(new Map([[1, 2], [3, 4]]))(2)).toThrow('')
  })
})

describe('keys function', () => {
  it('should return keys iterable if map has keys', () => {
    expect(Array.from(M.keys(new Map([[1, 2], [3, 4]])))).toStrictEqual([1, 3])
  })

  it('should return empty iterable for empty map', () => {
    expect(Array.from(M.keys(new Map()))).toStrictEqual([])
  })
})

describe('values function', () => {
  it('should return values iterable if map has keys', () => {
    expect(Array.from(M.values(new Map([[1, 2], [3, 4]])))).toStrictEqual([2, 4])
  })

  it('should return empty iterable for empty map', () => {
    expect(Array.from(M.values(new Map()))).toStrictEqual([])
  })
})

describe('entries function', () => {
  it('should return entries iterable if map has keys', () => {
    expect(Array.from(M.entries(new Map([[1, 2], [3, 4]])))).toStrictEqual([[1, 2], [3, 4]])
  })

  it('should return empty iterable for empty map', () => {
    expect(Array.from(M.entries(new Map()))).toStrictEqual([])
  })
})

describe('set function', () => {
  it('should return true if value didn\'t exist before', () => {
    const map = new Map([[1, 2]])

    expect(M.set(map, 3, 4)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })

  it('should return false and not update value for key that already exists', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.set(map, 1, 3)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })
})

describe('setC function', () => {
  it('should return true if value didn\'t exist before', () => {
    const map = new Map([[1, 2]])

    expect(M.setC(3, 4)(map)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })

  it('should return false and not update value for key that already exists', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.setC(1, 3)(map)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })
})

describe('setCR function', () => {
  it('should return true if value didn\'t exist before', () => {
    const map = new Map([[1, 2]])

    expect(M.setCR(map)(3, 4)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })

  it('should return false and not update value for key that already exists', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.setCR(map)(1, 3)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })
})

describe('insert function', () => {
  it('should return true if value didn\'t exist before', () => {
    const map = new Map([[1, 2]])

    expect(M.insert(map, 3, 4)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })

  it('should return false and not update value for key that already exists', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.insert(map, 1, 3)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })
})

describe('insertC function', () => {
  it('should return true if value didn\'t exist before', () => {
    const map = new Map([[1, 2]])

    expect(M.insertC(3, 4)(map)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })

  it('should return false and not update value for key that already exists', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.insertC(1, 3)(map)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })
})

describe('insertCR function', () => {
  it('should return true if value didn\'t exist before', () => {
    const map = new Map([[1, 2]])

    expect(M.insertCR(map)(3, 4)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })

  it('should return false and not update value for key that already exists', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.insertCR(map)(1, 3)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })
})

describe('setU function', () => {
  it('should return true and update the value if key existed and the value changed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.setU(map, 1, 3)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 3], [3, 4]]))
  })

  it('should return false and set value if key didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.setU(map, 3, 4)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })

  it('should return false if key existed but value didn\'t change', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.setU(map, 1, 2)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })
})

describe('setUC function', () => {
  it('should return true and update the value if key existed and the value changed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.setUC(1, 3)(map)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 3], [3, 4]]))
  })

  it('should return false and set value if key didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.setUC(3, 4)(map)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })

  it('should return false if key existed but value didn\'t change', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.setUC(1, 2)(map)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })
})

describe('setUCR function', () => {
  it('should return true and update the value if key existed and the value changed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.setUCR(map)(1, 3)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 3], [3, 4]]))
  })

  it('should return false and set value if key didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.setUCR(map)(3, 4)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })

  it('should return false if key existed but value didn\'t change', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.setUCR(map)(1, 2)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })
})

describe('update function', () => {
  it('should return true and update the value if key existed and the value changed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.update(map, 1, 3)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 3], [3, 4]]))
  })

  it('should return false and set value if key didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.update(map, 3, 4)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2]]))
  })

  it('should return false if key existed but value didn\'t change', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.update(map, 1, 2)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })
})

describe('updateC function', () => {
  it('should return true and update the value if key existed and the value changed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.updateC(1, 3)(map)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 3], [3, 4]]))
  })

  it('should return false and set value if key didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.updateC(3, 4)(map)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2]]))
  })

  it('should return false if key existed but value didn\'t change', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.updateC(1, 2)(map)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })
})

describe('updateCR function', () => {
  it('should return true and update the value if key existed and the value changed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.updateCR(map)(1, 3)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 3], [3, 4]]))
  })

  it('should return false and set value if key didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.updateCR(map)(3, 4)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2]]))
  })

  it('should return false if key existed but value didn\'t change', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.updateCR(map)(1, 2)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })
})

describe('upsert function', () => {
  it('should return true and update the value if key existed and the value changed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.upsert(map, 1, 3)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 3], [3, 4]]))
  })

  it('should return false and set value if key didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.upsert(map, 3, 4)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })

  it('should return false if key existed but value didn\'t change', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.upsert(map, 1, 2)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })
})

describe('upsertC function', () => {
  it('should return true and update the value if key existed and the value changed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.upsertC(1, 3)(map)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 3], [3, 4]]))
  })

  it('should return false and set value if key didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.upsertC(3, 4)(map)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })

  it('should return false if key existed but value didn\'t change', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.upsertC(1, 2)(map)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })
})

describe('upsertCR function', () => {
  it('should return true and update the value if key existed and the value changed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.upsertCR(map)(1, 3)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 3], [3, 4]]))
  })

  it('should return false and set value if key didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.upsertCR(map)(3, 4)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })

  it('should return false if key existed but value didn\'t change', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.upsertCR(map)(1, 2)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2], [3, 4]]))
  })
})

describe('remove function', () => {
  it('should return true if key-value pair was removed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.remove(map, 3)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 2]]))
  })

  it('should return false if key was didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.remove(map, 3)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2]]))
  })
})

describe('removeC function', () => {
  it('should return true if key-value pair was removed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.removeC(3)(map)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 2]]))
  })

  it('should return false if key was didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.removeC(3)(map)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2]]))
  })
})

describe('removeCR function', () => {
  it('should return true if key-value pair was removed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.removeCR(map)(3)).toBe(true)
    expect(map).toStrictEqual(new Map([[1, 2]]))
  })

  it('should return false if key was didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.removeCR(map)(3)).toBe(false)
    expect(map).toStrictEqual(new Map([[1, 2]]))
  })
})

describe('mapValues function', () => {
  it('should return empty map for empty map passed', () => {
    expect(M.mapValues(new Map(), add1)).toStrictEqual(new Map())
  })

  it('should map all values with function', () => {
    expect(M.mapValues(new Map([[1, 2], [3, 4]]), add1)).toStrictEqual(new Map([[1, 3], [3, 5]]))
  })
})

describe('mapValuesC function', () => {
  it('should return empty map for empty map passed', () => {
    expect(M.mapValuesC(add1)(new Map())).toStrictEqual(new Map())
  })

  it('should map all values with function', () => {
    expect(M.mapValuesC(add1)(new Map([[1, 2], [3, 4]]))).toStrictEqual(new Map([[1, 3], [3, 5]]))
  })
})

describe('mapValuesCR function', () => {
  it('should return empty map for empty map passed', () => {
    expect(M.mapValuesCR(new Map())(add1)).toStrictEqual(new Map())
  })

  it('should map all values with function', () => {
    expect(M.mapValuesCR(new Map([[1, 2], [3, 4]]))(add1)).toStrictEqual(new Map([[1, 3], [3, 5]]))
  })
})

describe('valuesDisjoint function', () => {
  it('should return true for empty map', () => {
    expect(M.valuesDisjoint(new Map())).toBe(true)
  })

  it('should return true if map values are disjoint', () => {
    expect(M.valuesDisjoint(new Map([[1, 2], [2, 3]]))).toBe(true)
  })

  it('should return false if map values are not disjoint', () => {
    expect(M.valuesDisjoint(new Map([[1, 2], [2, 2]]))).toBe(false)
    expect(M.valuesDisjoint(new Map([[1, 2], [3, 2]]))).toBe(false)
  })
})
