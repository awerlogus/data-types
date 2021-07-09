const F = require('./function')

// SECTION Types

// MODULE Imports

/** @template T @typedef {import('./function').Lazy<T>} Lazy */

/** @template P, R @typedef {import('./function').Arrow<P, R>} Arrow */

// MODULE Imports

/** @typedef {null} Null */

/** @template T @typedef {T} Some */

/** @template T @typedef {Some<T> | Null} Nullable */

// SECTION Library

/** @type {<T>(data: T) => Nullable<T>} */
const some = F.id

/** @type {<T>(data: Nullable<T>) => data is Null} */
const isNull = data => data === null

/** @type {<T>(data: Nullable<T>) => data is Some<T>} */
const isSome = data => data !== null

/** @type {<P, R>(func: Arrow<P, R>) => Arrow<Nullable<P>, Nullable<R>>} */
const map = func => data => isSome(data) ? some(func(data)) : data

/** @type {<P, R>(func: Arrow<P, Nullable<R>>) => Arrow<Nullable<P>, Nullable<R>>} */
const chain = func => data => isSome(data) ? func(data) : data

/** @type {<T1>(value: Lazy<T1>) => <T2>(data: Nullable<T2>) => T1 | T2} */
const getOrElse = value => data => isSome(data) ? data : value()

/** @type {<P, R, N>(onSome: Arrow<P, R>, onNull: N) => Arrow<Nullable<P>, R | N>} */
const fold = (onSome, onNull) => data => isSome(data) ? onSome(data) : onNull

/** @type {<P, R, N>(onSome: Arrow<P, R>, onNull: Lazy<N>) => Arrow<Nullable<P>, R | N>} */
const foldL = (onSome, onNull) => data => isSome(data) ? onSome(data) : onNull()

// SECTION Exports

module.exports = { some, isNull, isSome, map, chain, getOrElse, fold, foldL }
