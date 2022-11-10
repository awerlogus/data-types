const MA = require('./map-array')

// SECTION Tests

describe('clone function', () => {
  it('should clone map array', () => {
    expect(MA.clone(new Map())).toStrictEqual(new Map())
    expect(MA.clone(new Map([[1, [1, 2, 3]]]))).toStrictEqual(new Map([[1, [1, 2, 3]]]))
  })

  it('should return new map array object', () => {
    const mapArray = new Map([[1, [1, 2, 3]]])

    expect(MA.clone(mapArray) === mapArray).toBe(false)
    expect(MA.clone(mapArray).get(1) === mapArray.get(1)).toBe(false)
  })
})

describe('get function', () => {
  it('should return array if it exists', () => {
    expect(MA.get(new Map([[1, [1, 2]]]), 1)).toStrictEqual([1, 2])
  })

  it('should return an empty array if array doesn\'t exist', () => {
    expect(MA.get(new Map([[1, [1, 2]]]), 2)).toStrictEqual([])
  })
})

describe('getC function', () => {
  it('should return array if it exists', () => {
    expect(MA.getC(1)(new Map([[1, [1, 2]]]))).toStrictEqual([1, 2])
  })

  it('should return an empty array if array doesn\'t exist', () => {
    expect(MA.getC(2)(new Map([[1, [1, 2]]]))).toStrictEqual([])
  })
})

describe('getCR function', () => {
  it('should return array if it exists', () => {
    expect(MA.getCR(new Map([[1, [1, 2]]]))(1)).toStrictEqual([1, 2])
  })

  it('should return an empty array if array doesn\'t exist', () => {
    expect(MA.getCR(new Map([[1, [1, 2]]]))(2)).toStrictEqual([])
  })
})

describe('add function', () => {
  it('should add new value to map if inner array didn\'t exist', () => {
    const mapArray = new Map()

    MA.add(mapArray, 1, 2)

    expect(mapArray).toStrictEqual(new Map([[1, [2]]]))
  })

  it('should add new value to map array if inner array already exists', () => {
    const mapArray = new Map([[1, [1]]])

    MA.add(mapArray, 1, 2)

    expect(mapArray).toStrictEqual(new Map([[1, [1, 2]]]))
  })
})

describe('addC function', () => {
  it('should add new value to map if inner array didn\'t exist', () => {
    const mapArray = new Map()

    MA.addC(1, 2)(mapArray)

    expect(mapArray).toStrictEqual(new Map([[1, [2]]]))
  })

  it('should add new value to map array if inner array already exists', () => {
    const mapArray = new Map([[1, [1]]])

    MA.addC(1, 2)(mapArray)

    expect(mapArray).toStrictEqual(new Map([[1, [1, 2]]]))
  })
})

describe('addCR function', () => {
  it('should add new value to map if inner array didn\'t exist', () => {
    const mapArray = new Map()

    MA.addCR(mapArray)(1, 2)

    expect(mapArray).toStrictEqual(new Map([[1, [2]]]))
  })

  it('should add new value to map array if inner array already exists', () => {
    const mapArray = new Map([[1, [1]]])

    MA.addCR(mapArray)(1, 2)

    expect(mapArray).toStrictEqual(new Map([[1, [1, 2]]]))
  })
})
