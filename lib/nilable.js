const N = require('./nullable')
const O = require('./option')

// SECTION Types

// MODULE Imports

/** @template T @typedef {import('./function').Lazy<T>} Lazy */

/** @template P, R @typedef {import('./function').Arrow<P, R>} Arrow */

// MODULE Declarations

/** @template T @typedef {T} Some */

/** @typedef {O.None | N.Null} Nil */

/** @template T @typedef {Some<T> | Nil} Nilable */

// SECTION Library

/** @type {<T>(nilable: Nilable<T>) => nilable is Nil} */
const isNil = nilable => O.isNone(nilable) || N.isNull(nilable)

/** @type {<T>(nilable: Nilable<T>) => nilable is Some<T>} */
const isSome = nilable => O.isSome(nilable) && N.isSome(nilable)

/** @type {<P, R>(nilable: Nilable<P>, func: Arrow<P, R>) => Nilable<R>} */
const map = (nilable, func) => isSome(nilable) ? func(nilable) : nilable

/** @type {<P, R>(func: Arrow<P, R>) => (nilable: Nilable<P>) => Nilable<R>} */
const mapC = func => nilable => map(nilable, func)

/** @type {<P>(nilable: Nilable<P>) => <R>(func: Arrow<P, R>) => Nilable<R>} */
const mapCR = nilable => func => map(nilable, func)

/** @type {<P, R>(nilable: Nilable<P>, func: Arrow<P, Nilable<R>>) => Nilable<R>} */
const chain = (nilable, func) => isSome(nilable) ? func(nilable) : nilable

/** @type {<P, R>(func: Arrow<P, Nilable<R>>) => (nilable: Nilable<P>) => Nilable<R>} */
const chainC = func => nilable => chain(nilable, func)

/** @type {<P>(nilable: Nilable<P>) => <R>(func: Arrow<P, Nilable<R>>) => Nilable<R>} */
const chainCR = nilable => func => chain(nilable, func)

/** @type {<T1, T2>(nilable: Nilable<T1>, value: T2) => T1 | T2} */
const getOrElse = (nilable, value) => isSome(nilable) ? nilable : value

/** @type {<T1, T2>(nilable: Nilable<T1>, value: Lazy<T2>) => T1 | T2} */
const getOrElseL = (nilable, value) => isSome(nilable) ? nilable : value()

/** @type {<T1>(value: T1) => <T2>(nilable: Nilable<T2>) => T1 | T2} */
const getOrElseC = value => nilable => getOrElse(nilable, value)

/** @type {<T1>(value: Lazy<T1>) => <T2>(nilable: Nilable<T2>) => T1 | T2} */
const getOrElseLC = value => nilable => getOrElseL(nilable, value)

/** @type {<T2>(nilable: Nilable<T2>) => <T1>(value: T1) => T1 | T2} */
const getOrElseCR = nilable => value => getOrElse(nilable, value)

/** @type {<T2>(nilable: Nilable<T2>) => <T1>(value: Lazy<T1>) => T1 | T2} */
const getOrElseLCR = nilable => value => getOrElseL(nilable, value)

/** @type {<P, R, N>(nilable: Nilable<P>, onSome: Arrow<P, R>, onNil: N) => R | N} */
const fold = (nilable, onSome, onNil) => isSome(nilable) ? onSome(nilable) : onNil

/** @type {<P, R, N>(nilable: Nilable<P>, onSome: Arrow<P, R>, onNil: Lazy<N>) => R | N} */
const foldL = (nilable, onSome, onNil) => isSome(nilable) ? onSome(nilable) : onNil()

/** @type {<P, R, N>(onSome: Arrow<P, R>, onNil: N) => (nilable: Nilable<P>) => R | N} */
const foldC = (onSome, onNil) => nilable => fold(nilable, onSome, onNil)

/** @type {<P, R, N>(onSome: Arrow<P, R>, onNil: Lazy<N>) => (nilable: Nilable<P>) => R | N} */
const foldLC = (onSome, onNil) => nilable => foldL(nilable, onSome, onNil)

/** @type {<P>(nilable: Nilable<P>) => <R, N>(onSome: Arrow<P, R>, onNil: N) => R | N} */
const foldCR = nilable => (onSome, onNil) => fold(nilable, onSome, onNil)

/** @type {<P>(nilable: Nilable<P>) => <R, N>(onSome: Arrow<P, R>, onNil: Lazy<N>) => R | N} */
const foldLCR = nilable => (onSome, onNil) => foldL(nilable, onSome, onNil)

/** @type {<T>(nilable: Nilable<T>) => N.Nullable<T>} */
const toNullable = nilable => isSome(nilable) ? nilable : null

/** @type {<T>(nilable: Nilable<T>) => O.Option<T>} */
const toOption = nilable => isSome(nilable) ? nilable : O.none

// SECTION Exports

module.exports = { isNil, isSome, map, mapC, mapCR, chain, chainC, chainCR, getOrElse, getOrElseL, getOrElseC, getOrElseLC, getOrElseCR, getOrElseLCR, fold, foldL, foldC, foldLC, foldCR, foldLCR, toOption, toNullable }
