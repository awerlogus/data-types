const F = require('./function')

// SECTION Types

// MODULE Declarations

/** @typedef {undefined} None */

/** @template T @typedef {T} Some */

/** @template T @typedef {Some<T> | None} Option */

// SECTION Library

/** @type {Option<never>} */
const none = undefined

/** @type {<T>(option: T) => Option<T>} */
const some = F.id

/** @type {<T>(option: Option<T>) => option is None} */
const isNone = option => option === none

/** @type {<T>(option: Option<T>) => option is Some<T>} */
const isSome = option => option !== none

/** @type {<P, R>(option: Option<P>, func: F.Arrow<P, R>) => Option<R>} */
const map = (option, func) => isSome(option) ? some(func(option)) : option

/** @type {<P, R>(func: F.Arrow<P, R>) => F.Arrow<Option<P>, Option<R>>} */
const mapC = func => option => map(option, func)

/** @type {<P, R>(option: Option<P>, func: F.Arrow<P, Option<R>>) => Option<R>} */
const chain = (option, func) => isSome(option) ? func(option) : option

/** @type {<P, R>(func: F.Arrow<P, Option<R>>) => F.Arrow<Option<P>, Option<R>>} */
const chainC = func => option => chain(option, func)

/** @type {<T1, T2>(option: Option<T1>, value: T2) => T1 | T2} */
const getOrElse = (option, value) => isSome(option) ? option : value

/** @type {<T1, T2>(option: Option<T1>, value: F.Lazy<T2>) => T1 | T2} */
const getOrElseL = (option, value) => isSome(option) ? option : value()

/** @type {<T1>(value: T1) => <T2>(option: Option<T2>) => T1 | T2} */
const getOrElseC = value => option => getOrElse(option, value)

/** @type {<T1>(value: F.Lazy<T1>) => <T2>(option: Option<T2>) => T1 | T2} */
const getOrElseLC = value => option => getOrElseL(option, value)

/** @type {<P, R, N>(option: Option<P>, onSome: F.Arrow<P, R>, onNone: N) => R | N} */
const fold = (option, onSome, onNone) => isSome(option) ? onSome(option) : onNone

/** @type {<P, R, N>(option: Option<P>, onSome: F.Arrow<P, R>, onNone: F.Lazy<N>) => R | N} */
const foldL = (option, onSome, onNone) => isSome(option) ? onSome(option) : onNone()

/** @type {<P, R, N>(onSome: F.Arrow<P, R>, onNone: N) => F.Arrow<Option<P>, R | N>} */
const foldC = (onSome, onNone) => option => fold(option, onSome, onNone)

/** @type {<P, R, N>(onSome: F.Arrow<P, R>, onNone: F.Lazy<N>) => F.Arrow<Option<P>, R | N>} */
const foldLC = (onSome, onNone) => option => foldL(option, onSome, onNone)

// SECTION Exports

module.exports = { none, some, isNone, isSome, map, mapC, chain, chainC, getOrElse, getOrElseL, getOrElseC, getOrElseLC, fold, foldL, foldC, foldLC }
