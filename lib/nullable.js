// SECTION Types

// MODULE Imports

/** @template T @typedef {import('./function').Lazy<T>} Lazy */

/** @template P, R @typedef {import('./function').Arrow<P, R>} Arrow */

// MODULE Declarations

/** @typedef {null} Null */

/** @template T @typedef {T} Some */

/** @template T @typedef {Some<T> | Null} Nullable */

// SECTION Library

/** @type {<T>(nullable: Nullable<T>) => nullable is Null} */
const isNull = nullable => nullable === null

/** @type {<T>(nullable: Nullable<T>) => nullable is Some<T>} */
const isSome = nullable => nullable !== null

/** @type {<P, R>(nullable: Nullable<P>, func: Arrow<P, R>) => Nullable<R>} */
const map = (nullable, func) => isSome(nullable) ? func(nullable) : nullable

/** @type {<P, R>(func: Arrow<P, R>) => (nullable: Nullable<P>) => Nullable<R>} */
const mapC = func => nullable => map(nullable, func)

/** @type {<P, R>(nullable: Nullable<P>, func: Arrow<P, Nullable<R>>) => Nullable<R>} */
const chain = (nullable, func) => isSome(nullable) ? func(nullable) : nullable

/** @type {<P, R>(func: Arrow<P, Nullable<R>>) => (nullable: Nullable<P>) => Nullable<R>} */
const chainC = func => nullable => chain(nullable, func)

/** @type {<T1, T2>(nullable: Nullable<T1>, value: T2) => T1 | T2} */
const getOrElse = (nullable, value) => isSome(nullable) ? nullable : value

/** @type {<T1, T2>(nullable: Nullable<T1>, value: Lazy<T2>) => T1 | T2} */
const getOrElseL = (nullable, value) => isSome(nullable) ? nullable : value()

/** @type {<T1>(value: T1) => <T2>(nullable: Nullable<T2>) => T1 | T2} */
const getOrElseC = value => nullable => getOrElse(nullable, value)

/** @type {<T1>(value: Lazy<T1>) => <T2>(nullable: Nullable<T2>) => T1 | T2} */
const getOrElseLC = value => nullable => getOrElseL(nullable, value)

/** @type {<P, R, N>(nullable: Nullable<P>, onSome: Arrow<P, R>, onNull: N) => R | N} */
const fold = (nullable, onSome, onNull) => isSome(nullable) ? onSome(nullable) : onNull

/** @type {<P, R, N>(nullable: Nullable<P>, onSome: Arrow<P, R>, onNull: Lazy<N>) => R | N} */
const foldL = (nullable, onSome, onNull) => isSome(nullable) ? onSome(nullable) : onNull()

/** @type {<P, R, N>(onSome: Arrow<P, R>, onNull: N) => (nullable: Nullable<P>) => R | N} */
const foldC = (onSome, onNull) => nullable => fold(nullable, onSome, onNull)

/** @type {<P, R, N>(onSome: Arrow<P, R>, onNull: Lazy<N>) => (nullable: Nullable<P>) => R | N} */
const foldLC = (onSome, onNull) => nullable => foldL(nullable, onSome, onNull)

// SECTION Exports

module.exports = { isNull, isSome, map, mapC, chain, chainC, getOrElse, getOrElseL, getOrElseC, getOrElseLC, fold, foldL, foldC, foldLC }
