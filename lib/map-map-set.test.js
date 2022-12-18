const MMS = require('./map-map-set')

// SECTION Tests

describe('clone function', () => {
  it('should clone map set', () => {
    expect(MMS.clone(new Map())).toStrictEqual(new Map())
    expect(MMS.clone(new Map([[1, new Map([[2, new Set([1, 2, 3])]])]]))).toStrictEqual(new Map([[1, new Map([[2, new Set([1, 2, 3])]])]]))
  })

  it('should return new map set object', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1, 2, 3])]])]])

    expect(MMS.clone(mapSet) === mapSet).toBe(false)
    expect(MMS.clone(mapSet).get(1) === mapSet.get(1)).toBe(false)
    expect(MMS.clone(mapSet).get(1)?.get(2) === mapSet.get(1)?.get(2)).toBe(false)
  })
})

describe('has function', () => {
  it('should return false if set doesn\'t exist', () => {
    expect(MMS.has(new Map([[1, new Map([[2, new Set([1, 2])]])]]), 1, 3, 4)).toBe(false)
  })

  it('should return false if set doesn\'t contain item', () => {
    expect(MMS.has(new Map([[1, new Map([[2, new Set([1, 2])]])]]), 1, 2, 4)).toBe(false)
  })

  it('should return false if inner map doesn\'t exist', () => {
    expect(MMS.has(new Map([[1, new Map([[2, new Set([1, 2])]])]]), 2, 3, 4)).toBe(false)
  })

  it('should return true if set exists and contains item', () => {
    expect(MMS.has(new Map([[1, new Map([[2, new Set([1, 2])]])]]), 1, 2, 1)).toBe(true)
    expect(MMS.has(new Map([[1, new Map([[2, new Set([1, 2])]])]]), 1, 2, 2)).toBe(true)
  })
})

describe('hasC function', () => {
  it('should return false if set doesn\'t exist', () => {
    expect(MMS.hasC(1, 3, 4)(new Map([[1, new Map([[2, new Set([1, 2])]])]]))).toBe(false)
  })

  it('should return false if set doesn\'t contain item', () => {
    expect(MMS.hasC(1, 2, 4)(new Map([[1, new Map([[2, new Set([1, 2])]])]]))).toBe(false)
  })

  it('should return false if inner map doesn\'t exist', () => {
    expect(MMS.hasC(2, 3, 4)(new Map([[1, new Map([[2, new Set([1, 2])]])]]))).toBe(false)
  })

  it('should return true if set exists and contains item', () => {
    expect(MMS.hasC(1, 2, 1)(new Map([[1, new Map([[2, new Set([1, 2])]])]]))).toBe(true)
    expect(MMS.hasC(1, 2, 2)(new Map([[1, new Map([[2, new Set([1, 2])]])]]))).toBe(true)
  })
})

describe('hasCR function', () => {
  it('should return false if set doesn\'t exist', () => {
    expect(MMS.hasCR(new Map([[1, new Map([[2, new Set([1, 2])]])]]))(1, 3, 4)).toBe(false)
  })

  it('should return false if set doesn\'t contain item', () => {
    expect(MMS.hasCR(new Map([[1, new Map([[2, new Set([1, 2])]])]]))(1, 2, 4)).toBe(false)
  })

  it('should return false if inner map doesn\'t exist', () => {
    expect(MMS.hasCR(new Map([[1, new Map([[2, new Set([1, 2])]])]]))(2, 3, 4)).toBe(false)
  })

  it('should return true if set exists and contains item', () => {
    expect(MMS.hasCR(new Map([[1, new Map([[2, new Set([1, 2])]])]]))(1, 2, 1)).toBe(true)
    expect(MMS.hasCR(new Map([[1, new Map([[2, new Set([1, 2])]])]]))(1, 2, 2)).toBe(true)
  })
})

describe('get function', () => {
  it('should return set if it exists', () => {
    expect(MMS.get(new Map([[1, new Map([[2, new Set([1, 2])]])]]), 1, 2)).toStrictEqual(new Set([1, 2]))
  })

  it('should return an empty set if inner map doesn\'t exist', () => {
    expect(MMS.get(new Map([[1, new Map([[2, new Set([1, 2])]])]]), 2, 2)).toStrictEqual(new Set())
  })

  it('should return an empty set if set doesn\'t exist', () => {
    expect(MMS.get(new Map([[1, new Map([[2, new Set([1, 2])]])]]), 1, 3)).toStrictEqual(new Set())
  })
})

describe('getC function', () => {
  it('should return set if it exists', () => {
    expect(MMS.getC(1, 2)(new Map([[1, new Map([[2, new Set([1, 2])]])]]))).toStrictEqual(new Set([1, 2]))
  })

  it('should return an empty set if inner map doesn\'t exist', () => {
    expect(MMS.getC(2, 2)(new Map([[1, new Map([[2, new Set([1, 2])]])]]))).toStrictEqual(new Set())
  })

  it('should return an empty set if set doesn\'t exist', () => {
    expect(MMS.getC(1, 3)(new Map([[1, new Map([[2, new Set([1, 2])]])]]))).toStrictEqual(new Set())
  })
})

describe('getCR function', () => {
  it('should return set if it exists', () => {
    expect(MMS.getCR(new Map([[1, new Map([[2, new Set([1, 2])]])]]))(1, 2)).toStrictEqual(new Set([1, 2]))
  })

  it('should return an empty set if inner map doesn\'t exist', () => {
    expect(MMS.getCR(new Map([[1, new Map([[2, new Set([1, 2])]])]]))(2, 2)).toStrictEqual(new Set())
  })

  it('should return an empty set if set doesn\'t exist', () => {
    expect(MMS.getCR(new Map([[1, new Map([[2, new Set([1, 2])]])]]))(1, 3)).toStrictEqual(new Set())
  })
})

describe('add function', () => {
  it('should return true if set didn\'t exist', () => {
    const mapSet = new Map()

    expect(MMS.add(mapSet, 1, 2, 3)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([3])]])]]))
  })

  it('should return true if set exists but item didn\'t exist', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1])]])]])

    expect(MMS.add(mapSet, 1, 2, 2)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([1, 2])]])]]))
  })

  it('should return false if set and item existed', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1, 2])]])]])

    expect(MMS.add(mapSet, 1, 2, 2)).toBe(false)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([1, 2])]])]]))
  })
})

describe('addC function', () => {
  it('should return true if set didn\'t exist', () => {
    const mapSet = new Map()

    expect(MMS.addC(1, 2, 3)(mapSet)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([3])]])]]))
  })

  it('should return true if set exists but item didn\'t exist', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1])]])]])

    expect(MMS.addC(1, 2, 2)(mapSet)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([1, 2])]])]]))
  })

  it('should return false if set and item existed', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1, 2])]])]])

    expect(MMS.addC(1, 2, 2)(mapSet)).toBe(false)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([1, 2])]])]]))
  })
})

describe('addCR function', () => {
  it('should return true if set didn\'t exist', () => {
    const mapSet = new Map()

    expect(MMS.addCR(mapSet)(1, 2, 3)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([3])]])]]))
  })

  it('should return true if set exists but item didn\'t exist', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1])]])]])

    expect(MMS.addCR(mapSet)(1, 2, 2)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([1, 2])]])]]))
  })

  it('should return false if set and item existed', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1, 2])]])]])

    expect(MMS.addCR(mapSet)(1, 2, 2)).toBe(false)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([1, 2])]])]]))
  })
})

describe('remove function', () => {
  it('should return false if inner map didn\'t exist', () => {
    const mapSet = new Map()

    expect(MMS.remove(mapSet, 1, 2, 3)).toBe(false)
    expect(mapSet).toStrictEqual(new Map())
  })

  it('should return false if set didn\'t exist', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1])]])]])

    expect(MMS.remove(mapSet, 1, 3, 3)).toBe(false)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([1])]])]]))
  })

  it('should return false if set item didn\'t exist', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1])]])]])

    expect(MMS.remove(mapSet, 1, 2, 2)).toBe(false)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([1])]])]]))
  })

  it('should return true if set item existed', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1, 2])]])]])

    expect(MMS.remove(mapSet, 1, 2, 1)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([2])]])]]))
  })

  it('must empty map if set became empty', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1])]])]])

    expect(MMS.remove(mapSet, 1, 2, 1)).toBe(true)
    expect(mapSet).toStrictEqual(new Map())
  })
})

describe('removeC function', () => {
  it('should return false if inner map didn\'t exist', () => {
    const mapSet = new Map()

    expect(MMS.removeC(1, 2, 3)(mapSet)).toBe(false)
    expect(mapSet).toStrictEqual(new Map())
  })

  it('should return false if set didn\'t exist', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1])]])]])

    expect(MMS.removeC(1, 3, 3)(mapSet)).toBe(false)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([1])]])]]))
  })

  it('should return false if set item didn\'t exist', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1])]])]])

    expect(MMS.removeC(1, 2, 2)(mapSet)).toBe(false)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([1])]])]]))
  })

  it('should return true if set item existed', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1, 2])]])]])

    expect(MMS.removeC(1, 2, 1)(mapSet)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([2])]])]]))
  })

  it('must empty map if set became empty', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1])]])]])

    expect(MMS.removeC(1, 2, 1)(mapSet)).toBe(true)
    expect(mapSet).toStrictEqual(new Map())
  })
})

describe('removeCR function', () => {
  it('should return false if inner map didn\'t exist', () => {
    const mapSet = new Map()

    expect(MMS.removeCR(mapSet)(1, 2, 3)).toBe(false)
    expect(mapSet).toStrictEqual(new Map())
  })

  it('should return false if set didn\'t exist', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1])]])]])

    expect(MMS.removeCR(mapSet)(1, 3, 3)).toBe(false)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([1])]])]]))
  })

  it('should return false if set item didn\'t exist', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1])]])]])

    expect(MMS.removeCR(mapSet)(1, 2, 2)).toBe(false)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([1])]])]]))
  })

  it('should return true if set item existed', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1, 2])]])]])

    expect(MMS.removeCR(mapSet)(1, 2, 1)).toBe(true)
    expect(mapSet).toStrictEqual(new Map([[1, new Map([[2, new Set([2])]])]]))
  })

  it('must empty map if set became empty', () => {
    const mapSet = new Map([[1, new Map([[2, new Set([1])]])]])

    expect(MMS.removeCR(mapSet)(1, 2, 1)).toBe(true)
    expect(mapSet).toStrictEqual(new Map())
  })
})

describe('valuesDisjoint function', () => {
  it('should return true if inner set values disjoint', () => {
    expect(MMS.valuesDisjoint(new Map([[1, new Map([[2, new Set([1, 2])]])], [2, new Map([[2, new Set([3, 4])]])]]))).toBe(true)
  })

  it('should return false if inner set values are not disjoint', () => {
    expect(MMS.valuesDisjoint(new Map([[1, new Map([[2, new Set([1, 2])]])], [2, new Map([[2, new Set([2, 3])]])]]))).toBe(false)
  })
})
