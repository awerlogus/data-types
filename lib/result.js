const NL = require('./nilable')
const N = require('./nullable')
const O = require('./option')

// SECTION Types

// MODULE Imports

/** @template T @typedef {import('./function').Lazy<T>} Lazy */

/** @template P, R @typedef {import('./function').Arrow<P, R>} Arrow */

// MODULE Declarations

/** @typedef {[]} Err */

/** @template T @typedef {[T]} Ok */

/** @template T @typedef {Err | Ok<T>} Result */

// SECTION Library

/** @type {Err} */
const err = []

/** @type {<T>(data: T) => Ok<T>} */
const ok = data => [data]

/** @type {<T>(result: Result<T>) => result is Err} */
const isErr = result => result.length === 0

/** @type {<T>(result: Result<T>) => result is Ok<T>} */
const isOk = result => result.length !== 0

/** @type {<P, R>(result: Result<P>, func: Arrow<P, R>) => Result<R>} */
const map = (result, func) => isOk(result) ? ok(func(result[0])) : err

/** @type {<P, R>(func: Arrow<P, R>) => Arrow<Result<P>, Result<R>>} */
const mapC = func => result => map(result, func)

/** @type {<P, R>(result: Result<P>, func: Arrow<P, Result<R>>) => Result<R>} */
const chain = (result, func) => isOk(result) ? func(result[0]) : err

/** @type {<P, R>(func: Arrow<P, Result<R>>) => Arrow<Result<P>, Result<R>>} */
const chainC = func => result => chain(result, func)

/** @type {<T1, T2>(result: Result<T1>, value: T2) => T1 | T2} */
const getOrElse = (result, value) => isOk(result) ? result[0] : value

/** @type {<T1, T2>(result: Result<T1>, value: Lazy<T2>) => T1 | T2} */
const getOrElseL = (result, value) => isOk(result) ? result[0] : value()

/** @type {<T1>(value: T1) => <T2>(result: Result<T2>) => T1 | T2} */
const getOrElseC = value => result => getOrElse(result, value)

/** @type {<T1>(value: Lazy<T1>) => <T2>(result: Result<T2>) => T1 | T2} */
const getOrElseLC = value => result => getOrElseL(result, value)

/** @type {<T>(option: O.Option<T>) => Result<T>} */
const fromOption = option => O.isSome(option) ? ok(option) : err

/** @type {<T>(option: N.Nullable<T>) => Result<T>} */
const fromNullable = nullable => N.isSome(nullable) ? ok(nullable) : err

/** @type {<T>(option: NL.Nilable<T>) => Result<T>} */
const fromNilable = nilable => NL.isSome(nilable) ? ok(nilable) : err

// SECTION Exports

module.exports = { err, ok, isOk, isErr, map, mapC, chain, chainC, getOrElse, getOrElseL, getOrElseC, getOrElseLC, fromOption, fromNullable, fromNilable }
