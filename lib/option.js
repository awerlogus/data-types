const F = require('./function')

// SECTION Types

// MODULE Imports

/** @template T @typedef {import('./function').Lazy<T>} Lazy */

/** @template P, R @typedef {import('./function').Arrow<P, R>} Arrow */

// MODULE Declarations

/** @typedef {undefined} None */

/** @template T @typedef {T} Some */

/** @template T @typedef {Some<T> | None} Option */

// SECTION Library

/** @type {Option<never>} */
const none = undefined

/** @type {<T>(data: T) => Option<T>} */
const some = F.id

/** @type {<T>(data: Option<T>) => data is None} */
const isNone = data => data === none

/** @type {<T>(data: Option<T>) => data is Some<T>} */
const isSome = data => data !== none

/** @type {<P, R>(func: Arrow<P, R>) => Arrow<Option<P>, Option<R>>} */
const map = func => data => isSome(data) ? some(func(data)) : data

/** @type {<P, R>(func: Arrow<P, Option<R>>) => Arrow<Option<P>, Option<R>>} */
const chain = func => data => isSome(data) ? func(data) : data

/** @type {<T1>(value: Lazy<T1>) => <T2>(data: Option<T2>) => T1 | T2} */
const getOrElse = value => data => isSome(data) ? data : value()

/** @type {<P, R, N>(onSome: Arrow<P, R>, onNone: N) => Arrow<Option<P>, R | N>} */
const fold = (onSome, onNone) => data => isSome(data) ? onSome(data) : onNone

/** @type {<P, R, N>(onSome: Arrow<P, R>, onNone: Lazy<N>) => Arrow<Option<P>, R | N>} */
const foldL = (onSome, onNone) => data => isSome(data) ? onSome(data) : onNone()

// SECTION Exports

module.exports = { none, some, isNone, isSome, map, chain, getOrElse, fold, foldL }
