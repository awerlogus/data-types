const MS = require('./map-set')

// SECTION Tests

describe('clone function', () => {
  it('should clone map set', () => {
    expect(MS.clone(new Map())).toStrictEqual(new Map())
    expect(MS.clone(new Map([[1, new Set([1, 2, 3])]]))).toStrictEqual(new Map([[1, new Set([1, 2, 3])]]))
  })

  it('should return new map set object', () => {
    const mapSet = new Map([[1, new Set([1, 2, 3])]])

    expect(MS.clone(mapSet) === mapSet).toBe(false)
    expect(MS.clone(mapSet).get(1) === mapSet.get(1)).toBe(false)
  })
})

describe('has function', () => {
  it('should return false if set doesn\'t exist', () => {
    expect(MS.has(new Map([[1, new Set([1, 2])]]), 2, 3)).toBe(false)
  })
  it('should return false if set doesn\'t contain item', () => {
    expect(MS.has(new Map([[1, new Set([1, 2])]]), 1, 3)).toBe(false)
  })

  it('should return true if set exists and contains item', () => {
    expect(MS.has(new Map([[1, new Set([1, 2])]]), 1, 2)).toBe(true)
  })
})

describe('hasC function', () => {
  it('should return false if set doesn\'t exist', () => {
    expect(MS.hasC(2, 3)(new Map([[1, new Set([1, 2])]]))).toBe(false)
  })
  it('should return false if set doesn\'t contain item', () => {
    expect(MS.hasC(1, 3)(new Map([[1, new Set([1, 2])]]))).toBe(false)
  })

  it('should return true if set exists and contains item', () => {
    expect(MS.hasC(1, 2)(new Map([[1, new Set([1, 2])]]))).toBe(true)
  })
})

describe('hasCR function', () => {
  it('should return false if set doesn\'t exist', () => {
    expect(MS.hasCR(new Map([[1, new Set([1, 2])]]))(2, 3)).toBe(false)
  })
  it('should return false if set doesn\'t contain item', () => {
    expect(MS.hasCR(new Map([[1, new Set([1, 2])]]))(1, 3)).toBe(false)
  })

  it('should return true if set exists and contains item', () => {
    expect(MS.hasCR(new Map([[1, new Set([1, 2])]]))(1, 2)).toBe(true)
  })
})

describe('get function', () => {
  it('should return set if it exists', () => {
    expect(MS.get(new Map([[1, new Set([1, 2])]]), 1)).toStrictEqual(new Set([1, 2]))
  })

  it('should return an empty set if set doesn\'t exist', () => {
    expect(MS.get(new Map([[1, new Set([1, 2])]]), 2)).toStrictEqual(new Set())
  })
})

describe('getC function', () => {
  it('should return set if it exists', () => {
    expect(MS.getC(1)(new Map([[1, new Set([1, 2])]]))).toStrictEqual(new Set([1, 2]))
  })

  it('should return an empty set if set doesn\'t exist', () => {
    expect(MS.getC(2)(new Map([[1, new Set([1, 2])]]))).toStrictEqual(new Set())
  })
})

describe('getCR function', () => {
  it('should return set if it exists', () => {
    expect(MS.getCR(new Map([[1, new Set([1, 2])]]))(1)).toStrictEqual(new Set([1, 2]))
  })

  it('should return an empty set if set doesn\'t exist', () => {
    expect(MS.getCR(new Map([[1, new Set([1, 2])]]))(2)).toStrictEqual(new Set())
  })
})

describe('add function', () => {
  it('should return true if set didn\'t exist', () => {
    const mapSet = new Map()

    expect(MS.add(mapSet, 1, 2)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Set([2])]]))
  })

  it('should return true if set exists but item didn\'t exist', () => {
    const mapSet = new Map([[1, new Set([1])]])

    expect(MS.add(mapSet, 1, 2)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Set([1, 2])]]))
  })

  it('should return false if set and item existed', () => {
    const mapSet = new Map([[1, new Set([1, 2])]])

    expect(MS.add(mapSet, 1, 2)).toBe(false)
    expect(mapSet).toStrictEqual(new Map([[1, new Set([1, 2])]]))
  })
})

describe('addC function', () => {
  it('should return true if set didn\'t exist', () => {
    const mapSet = new Map()

    expect(MS.addC(1, 2)(mapSet)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Set([2])]]))
  })

  it('should return true if set exists but item didn\'t exist', () => {
    const mapSet = new Map([[1, new Set([1])]])

    expect(MS.addC(1, 2)(mapSet)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Set([1, 2])]]))
  })

  it('should return false if set and item existed', () => {
    const mapSet = new Map([[1, new Set([1, 2])]])

    expect(MS.addC(1, 2)(mapSet)).toBe(false)
    expect(mapSet).toStrictEqual(new Map([[1, new Set([1, 2])]]))
  })
})

describe('addCR function', () => {
  it('should return true if set didn\'t exist', () => {
    const mapSet = new Map()

    expect(MS.addCR(mapSet)(1, 2)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Set([2])]]))
  })

  it('should return true if set exists but item didn\'t exist', () => {
    const mapSet = new Map([[1, new Set([1])]])

    expect(MS.addCR(mapSet)(1, 2)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Set([1, 2])]]))
  })

  it('should return false if set and item existed', () => {
    const mapSet = new Map([[1, new Set([1, 2])]])

    expect(MS.addCR(mapSet)(1, 2)).toBe(false)
    expect(mapSet).toStrictEqual(new Map([[1, new Set([1, 2])]]))
  })
})

describe('remove function', () => {
  it('should return false if set didn\'t exist', () => {
    const mapSet = new Map()

    expect(MS.remove(mapSet, 1, 2)).toBe(false)
    expect(mapSet).toStrictEqual(new Map())
  })

  it('should return false if set item didn\'t exist', () => {
    const mapSet = new Map([[1, new Set([1])]])

    expect(MS.remove(mapSet, 1, 2)).toBe(false)
    expect(mapSet).toStrictEqual(new Map([[1, new Set([1])]]))
  })

  it('should return true if set item existed', () => {
    const mapSet = new Map([[1, new Set([1, 2])]])

    expect(MS.remove(mapSet, 1, 2)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Set([1])]]))
  })

  it('must return map if set became empty', () => {
    const mapSet = new Map([[1, new Set([1])]])

    expect(MS.remove(mapSet, 1, 1)).toBe(true)
    expect(mapSet).toStrictEqual(new Map())
  })
})

describe('removeC function', () => {
  it('should return false if set didn\'t exist', () => {
    const mapSet = new Map()

    expect(MS.removeC(1, 2)(mapSet)).toBe(false)
    expect(mapSet).toStrictEqual(new Map())
  })

  it('should return false if set item didn\'t exist', () => {
    const mapSet = new Map([[1, new Set([1])]])

    expect(MS.removeC(1, 2)(mapSet)).toBe(false)
    expect(mapSet).toStrictEqual(new Map([[1, new Set([1])]]))
  })

  it('should return true if set item existed', () => {
    const mapSet = new Map([[1, new Set([1, 2])]])

    expect(MS.removeC(1, 2)(mapSet)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Set([1])]]))
  })

  it('must empty map if set became empty', () => {
    const mapSet = new Map([[1, new Set([1])]])

    expect(MS.removeC(1, 1)(mapSet)).toBe(true)
    expect(mapSet).toStrictEqual(new Map())
  })
})

describe('removeCR function', () => {
  it('should return false if set didn\'t exist', () => {
    const mapSet = new Map()

    expect(MS.removeCR(mapSet)(1, 2)).toBe(false)
    expect(mapSet).toStrictEqual(new Map())
  })

  it('should return false if set item didn\'t exist', () => {
    const mapSet = new Map([[1, new Set([1])]])

    expect(MS.removeCR(mapSet)(1, 2)).toBe(false)
    expect(mapSet).toStrictEqual(new Map([[1, new Set([1])]]))
  })

  it('should return true if set item existed', () => {
    const mapSet = new Map([[1, new Set([1, 2])]])

    expect(MS.removeCR(mapSet)(1, 2)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Set([1])]]))
  })

  it('must empty map if set became empty', () => {
    const mapSet = new Map([[1, new Set([1])]])

    expect(MS.removeCR(mapSet)(1, 1)).toBe(true)
    expect(mapSet).toStrictEqual(new Map())
  })
})

describe('values function', () => {
  it('should return empty set for empty map', () => {
    expect(MS.values(new Map())).toStrictEqual(new Set())
  })

  it('should return all union of all inner sets', () => {
    expect(MS.values(new Map([[1, new Set([1, 2])], [2, new Set([2, 3])]]))).toStrictEqual(new Set([1, 2, 3]))
  })
})

describe('valuesDisjoint function', () => {
  it('should return true if inner set values disjoint', () => {
    expect(MS.valuesDisjoint(new Map([[1, new Set([1, 2])], [2, new Set([3, 4])]]))).toBe(true)
  })

  it('should return false if inner set values are not disjoint', () => {
    expect(MS.valuesDisjoint(new Map([[1, new Set([1, 2])], [2, new Set([2, 3])]]))).toBe(false)
  })
})
