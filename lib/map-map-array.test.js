const MMA = require('./map-map-array')

// SECTION Tests

describe('clone function', () => {
  it('should clone map map array', () => {
    expect(MMA.clone(new Map())).toStrictEqual(new Map())
    expect(MMA.clone(new Map([[1, new Map([[1, [1, 2, 3]]])]]))).toStrictEqual(new Map([[1, new Map([[1, [1, 2, 3]]])]]))
  })

  it('should return new map map array object', () => {
    const mapArray = new Map([[1, new Map([[1, [1, 2, 3]]])]])

    expect(MMA.clone(mapArray)).not.toBe(mapArray)
    expect(MMA.clone(mapArray).get(1)).not.toBe(mapArray.get(1))
    expect(MMA.clone(mapArray).get(1)?.get(1)).not.toBe(mapArray.get(1)?.get(1))
  })
})

describe('get function', () => {
  it('should return array if it exists', () => {
    expect(MMA.get(new Map([[1, new Map([[1, [1, 2]]])]]), 1, 1)).toStrictEqual([1, 2])
  })

  it('should return an empty array if inner map doesn\'t exist', () => {
    expect(MMA.get(new Map([[1, new Map([[1, [1, 2]]])]]), 2, 1)).toStrictEqual([])
  })

  it('should return an empty array if array doesn\'t exist', () => {
    expect(MMA.get(new Map([[1, new Map([[1, [1, 2]]])]]), 1, 2)).toStrictEqual([])
  })
})

describe('getC function', () => {
  it('should return array if it exists', () => {
    expect(MMA.getC(1, 1)(new Map([[1, new Map([[1, [1, 2]]])]]))).toStrictEqual([1, 2])
  })

  it('should return an empty array if inner map doesn\'t exist', () => {
    expect(MMA.getC(2, 1)(new Map([[1, new Map([[1, [1, 2]]])]]))).toStrictEqual([])
  })

  it('should return an empty array if array doesn\'t exist', () => {
    expect(MMA.getC(1, 2)(new Map([[1, new Map([[1, [1, 2]]])]]))).toStrictEqual([])
  })
})

describe('getCR function', () => {
  it('should return array if it exists', () => {
    expect(MMA.getCR(new Map([[1, new Map([[1, [1, 2]]])]]))(1, 1)).toStrictEqual([1, 2])
  })

  it('should return an empty array if inner map doesn\'t exist', () => {
    expect(MMA.getCR(new Map([[1, new Map([[1, [1, 2]]])]]))(2, 1)).toStrictEqual([])
  })

  it('should return an empty array if array doesn\'t exist', () => {
    expect(MMA.getCR(new Map([[1, new Map([[1, [1, 2]]])]]))(1, 2)).toStrictEqual([])
  })
})

describe('add function', () => {
  it('should add new value to map if inner map array didn\'t exist', () => {
    const mapArray = new Map()

    MMA.add(mapArray, 1, 1, 2)

    expect(mapArray).toStrictEqual(new Map([[1, new Map([[1, [2]]])]]))
  })

  it('should add new value if inner array didn\'t exist', () => {
    const mapArray = new Map([[1, new Map()]])

    MMA.add(mapArray, 1, 1, 2)

    expect(mapArray).toStrictEqual(new Map([[1, new Map([[1, [2]]])]]))
  })

  it('should add new value to map array if inner array already exists', () => {
    const mapArray = new Map([[1, new Map([[1, [1]]])]])

    MMA.add(mapArray, 1, 1, 2)

    expect(mapArray).toStrictEqual(new Map([[1, new Map([[1, [1, 2]]])]]))
  })
})

describe('addC function', () => {
  it('should add new value to map if inner map array didn\'t exist', () => {
    const mapArray = new Map()

    MMA.addC(1, 1, 2)(mapArray)

    expect(mapArray).toStrictEqual(new Map([[1, new Map([[1, [2]]])]]))
  })

  it('should add new value if inner array didn\'t exist', () => {
    const mapArray = new Map([[1, new Map()]])

    MMA.addC(1, 1, 2)(mapArray)

    expect(mapArray).toStrictEqual(new Map([[1, new Map([[1, [2]]])]]))
  })

  it('should add new value to map array if inner array already exists', () => {
    const mapArray = new Map([[1, new Map([[1, [1]]])]])

    MMA.addC(1, 1, 2)(mapArray)

    expect(mapArray).toStrictEqual(new Map([[1, new Map([[1, [1, 2]]])]]))
  })
})

describe('addCR function', () => {
  it('should add new value to map if inner map array didn\'t exist', () => {
    const mapArray = new Map()

    MMA.addCR(mapArray)(1, 1, 2)

    expect(mapArray).toStrictEqual(new Map([[1, new Map([[1, [2]]])]]))
  })

  it('should add new value if inner array didn\'t exist', () => {
    const mapArray = new Map([[1, new Map()]])

    MMA.addCR(mapArray)(1, 1, 2)

    expect(mapArray).toStrictEqual(new Map([[1, new Map([[1, [2]]])]]))
  })

  it('should add new value to map array if inner array already exists', () => {
    const mapArray = new Map([[1, new Map([[1, [1]]])]])

    MMA.addCR(mapArray)(1, 1, 2)

    expect(mapArray).toStrictEqual(new Map([[1, new Map([[1, [1, 2]]])]]))
  })
})
