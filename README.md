# Useful data types for javascript

## Installation

Run from command line

```
npm i @awerlogus/data-types
```

## Usage example

```js
const N = require('@awerlogus/data-types/lib/nullable')
const O = require('@awerlogus/data-types/lib/option')
const E = require('@awerlogus/data-types/lib/either')
const J = require('@awerlogus/data-types/lib/json')

/** @type {(data: J.Json) => data is ReadonlyArray<J.Json>} */
const isArray = Array.isArray

/** @type {(data: unknown) => data is Object} */
const isObject = data => typeof data === 'object'

/** @type {(data: unknown) => data is string} */
const isString = data => typeof data === 'string'

/** @type {(data: J.Json) => data is Record<string, J.Json>} */
const isExactObject = data => isObject(data) && !isArray(data) && N.isSome(data)

/** @type {(data: string) => E.Either<string, string>} */
const handleInput = rawData => {
  const data = J.decode(rawData)

  if (O.isNone(data)) {
    return E.left('Data is not a valid json')
  }

  if (!isExactObject(data)) {
    return E.left('Data is not an object')
  }

  const value = data.key

  if (O.isNone(value)) {
    return E.left('Property \'key\' not found in the object')
  }

  if (!isString(value)) {
    return E.left('Property \'key\' must be a string')
  }

  return E.right(value)
}

const input = '{ "key": "value" }'

const result = handleInput(input)

// If result is a Left value, throws an error
// If result is a Right value, logs it
console.log(E.extractUnsafe(result))
```
