const O = require('./option')
const M = require('./map')

// SECTION Tests

describe('clone function', () => {
  it('should clone map', () => {
    expect(M.clone(new Map())).toStrictEqual(new Map())
    expect(M.clone(new Map([[1, 2]]))).toStrictEqual(new Map([[1, 2]]))
  })

  it('should return new map object', () => {
    const map = new Map()

    expect(M.clone(map) === map).toBe(false)
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

    expect(map).toMatchObject(new Map([[1, 2], [3, 4]]))
  })

  it('should return false and not update value for key that already exists', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.set(map, 1, 3)).toBe(false)

    expect(map).toMatchObject(new Map([[1, 2], [3, 4]]))
  })
})

describe('setC function', () => {
  it('should return true if value didn\'t exist before', () => {
    const map = new Map([[1, 2]])

    expect(M.setC(3, 4)(map)).toBe(true)

    expect(map).toMatchObject(new Map([[1, 2], [3, 4]]))
  })

  it('should return false and not update value for key that already exists', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.setC(1, 3)(map)).toBe(false)

    expect(map).toMatchObject(new Map([[1, 2], [3, 4]]))
  })
})

describe('setCR function', () => {
  it('should return true if value didn\'t exist before', () => {
    const map = new Map([[1, 2]])

    expect(M.setCR(map)(3, 4)).toBe(true)

    expect(map).toMatchObject(new Map([[1, 2], [3, 4]]))
  })

  it('should return false and not update value for key that already exists', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.setCR(map)(1, 3)).toBe(false)

    expect(map).toMatchObject(new Map([[1, 2], [3, 4]]))
  })
})

describe('setU function', () => {
  it('should return true and update the value if key existed and the value changed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.setU(map, 1, 3)).toBe(true)

    expect(map).toMatchObject(new Map([[1, 3], [3, 4]]))
  })

  it('should return false and set value if key didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.setU(map, 3, 4)).toBe(false)

    expect(map).toMatchObject(new Map([[1, 2], [3, 4]]))
  })

  it('should return false if key existed but value didn\'t change', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.setU(map, 1, 2)).toBe(false)

    expect(map).toMatchObject(new Map([[1, 2], [3, 4]]))
  })
})

describe('setUC function', () => {
  it('should return true and update the value if key existed and the value changed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.setUC(1, 3)(map)).toBe(true)

    expect(map).toMatchObject(new Map([[1, 3], [3, 4]]))
  })

  it('should return false and set value if key didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.setUC(3, 4)(map)).toBe(false)

    expect(map).toMatchObject(new Map([[1, 2], [3, 4]]))
  })

  it('should return false if key existed but value didn\'t change', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.setUC(1, 2)(map)).toBe(false)

    expect(map).toMatchObject(new Map([[1, 2], [3, 4]]))
  })
})

describe('setUCR function', () => {
  it('should return true and update the value if key existed and the value changed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.setUCR(map)(1, 3)).toBe(true)

    expect(map).toMatchObject(new Map([[1, 3], [3, 4]]))
  })

  it('should return false and set value if key didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.setUCR(map)(3, 4)).toBe(false)

    expect(map).toMatchObject(new Map([[1, 2], [3, 4]]))
  })

  it('should return false if key existed but value didn\'t change', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.setUCR(map)(1, 2)).toBe(false)

    expect(map).toMatchObject(new Map([[1, 2], [3, 4]]))
  })
})

describe('remove function', () => {
  it('should return true if key-value pair was removed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.remove(map, 3)).toBe(true)

    expect(map).toMatchObject(new Map([[1, 2]]))
  })

  it('should return false if key was didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.remove(map, 3)).toBe(false)

    expect(map).toMatchObject(new Map([[1, 2]]))
  })
})

describe('removeC function', () => {
  it('should return true if key-value pair was removed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.removeC(3)(map)).toBe(true)

    expect(map).toMatchObject(new Map([[1, 2]]))
  })

  it('should return false if key was didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.removeC(3)(map)).toBe(false)

    expect(map).toMatchObject(new Map([[1, 2]]))
  })
})

describe('removeCR function', () => {
  it('should return true if key-value pair was removed', () => {
    const map = new Map([[1, 2], [3, 4]])

    expect(M.removeCR(map)(3)).toBe(true)

    expect(map).toMatchObject(new Map([[1, 2]]))
  })

  it('should return false if key was didn\'t exist', () => {
    const map = new Map([[1, 2]])

    expect(M.removeCR(map)(3)).toBe(false)

    expect(map).toMatchObject(new Map([[1, 2]]))
  })
})
