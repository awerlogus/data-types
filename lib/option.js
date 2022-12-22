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

/** @type {<T>(option: Option<T>) => option is None} */
const isNone = option => option === none

/** @type {<T>(option: Option<T>) => option is Some<T>} */
const isSome = option => option !== none

/** @type {<P, R>(option: Option<P>, func: Arrow<P, R>) => Option<R>} */
const map = (option, func) => isSome(option) ? func(option) : option

/** @type {<P, R>(func: Arrow<P, R>) => (option: Option<P>) => Option<R>} */
const mapC = func => option => map(option, func)

/** @type {<P>(option: Option<P>) => <R>(func: Arrow<P, R>) => Option<R>} */
const mapCR = option => func => map(option, func)

/** @type {<P, R>(option: Option<P>, func: Arrow<P, Option<R>>) => Option<R>} */
const chain = (option, func) => isSome(option) ? func(option) : option

/** @type {<P, R>(func: Arrow<P, Option<R>>) => (option: Option<P>) => Option<R>} */
const chainC = func => option => chain(option, func)

/** @type {<P>(option: Option<P>) => <R>(func: Arrow<P, Option<R>>) => Option<R>} */
const chainCR = option => func => chain(option, func)

/** @type {<T1, T2>(option: Option<T1>, value: T2) => T1 | T2} */
const getOrElse = (option, value) => isSome(option) ? option : value

/** @type {<T1, T2>(option: Option<T1>, value: Lazy<T2>) => T1 | T2} */
const getOrElseL = (option, value) => isSome(option) ? option : value()

/** @type {<T1>(value: T1) => <T2>(option: Option<T2>) => T1 | T2} */
const getOrElseC = value => option => getOrElse(option, value)

/** @type {<T1>(value: Lazy<T1>) => <T2>(option: Option<T2>) => T1 | T2} */
const getOrElseLC = value => option => getOrElseL(option, value)

/** @type {<T2>(option: Option<T2>) => <T1>(value: T1) => T1 | T2} */
const getOrElseCR = option => value => getOrElse(option, value)

/** @type {<T2>(option: Option<T2>) => <T1>(value: Lazy<T1>) => T1 | T2} */
const getOrElseLCR = option => value => getOrElseL(option, value)

/** @type {<P, R, N>(option: Option<P>, onSome: Arrow<P, R>, onNone: N) => R | N} */
const fold = (option, onSome, onNone) => isSome(option) ? onSome(option) : onNone

/** @type {<P, R, N>(option: Option<P>, onSome: Arrow<P, R>, onNone: Lazy<N>) => R | N} */
const foldL = (option, onSome, onNone) => isSome(option) ? onSome(option) : onNone()

/** @type {<P, R, N>(onSome: Arrow<P, R>, onNone: N) => (option: Option<P>) => R | N} */
const foldC = (onSome, onNone) => option => fold(option, onSome, onNone)

/** @type {<P, R, N>(onSome: Arrow<P, R>, onNone: Lazy<N>) => (option: Option<P>) => R | N} */
const foldLC = (onSome, onNone) => option => foldL(option, onSome, onNone)

/** @type {<P>(option: Option<P>) => <R, N>(onSome: Arrow<P, R>, onNone: N) => R | N} */
const foldCR = option => (onSome, onNone) => fold(option, onSome, onNone)

/** @type {<P>(option: Option<P>) => <R, N>(onSome: Arrow<P, R>, onNone: Lazy<N>) => R | N} */
const foldLCR = option => (onSome, onNone) => foldL(option, onSome, onNone)

// SECTION Exports

module.exports = { none, isNone, isSome, map, mapC, mapCR, chain, chainC, chainCR, getOrElse, getOrElseL, getOrElseC, getOrElseLC, getOrElseCR, getOrElseLCR, fold, foldL, foldC, foldLC, foldCR, foldLCR }
