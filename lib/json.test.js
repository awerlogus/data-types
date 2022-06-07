const O = require('./option')
const J = require('./json')

// SECTION Tests

describe('encode function', () => {
  it('should encode json value to string', () => {
    expect(J.encode({ foo: 'bar' })).toBe('{"foo":"bar"}')
  })
})

describe('decode function', () => {
  it('should return some value if valid json passed', () => {
    expect(O.isSome(J.decode('{"foo":"bar"}'))).toBe(true)
    expect(J.decode('{"foo":"bar"}')).toStrictEqual({ foo: 'bar' })
  })

  it('should return none if invalid json passed', () => {
    expect(J.decode('qwerty')).toBe(O.none)
  })
})
