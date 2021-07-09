const O = require('./option')

// SECTION Types

// MODULE Imports

/** @template T @typedef {import('./function').Lazy<T>} Lazy */

/** @template P, R @typedef {import('./function').Arrow<P, R>} Arrow */

// MODULE Declarations

/** @typedef {[]} Err */

/** @template T @typedef {[T]} Ok */

/** @template T @typedef {Err | Ok<T>} Result */

// SECTION Constants

/** @type {Err} */
const err = []

/** @type {<T>(data: T) => Ok<T>} */
const ok = data => [data]

// SECTION Library

/** @type {<T>(result: Result<T>) => result is Err} */
const isErr = result => result.length === 0

/** @type {<T>(result: Result<T>) => result is Ok<T>} */
const isOk = result => result.length !== 0

/** @type {<P, R>(func: Arrow<P, R>) => Arrow<Result<P>, Result<R>>} */
const map = func => result => isOk(result) ? ok(func(result[0])) : err

/** @type {<P, R>(func: Arrow<P, Result<R>>) => Arrow<Result<P>, Result<R>>} */
const chain = func => result => isOk(result) ? func(result[0]) : err

/** @type {<T1>(value: Lazy<T1>) => <T2>(data: Result<T2>) => T1 | T2} */
const getOrElse = value => data => isOk(data) ? data[0] : value()

/** @type {<T>(option: O.Option<T>) => Result<T>} */
const fromOption = option => O.isSome(option) ? ok(option) : err

// SECTION Exports

module.exports = { err, ok, isOk, isErr, map, chain, getOrElse, fromOption }
