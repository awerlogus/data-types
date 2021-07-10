const F = require('./function')
const N = require('./nullable')
const O = require('./option')

// SECTION Types

// MODULE Declarations

/** @template T @typedef {T} Some */

/** @typedef {O.None | N.Null} Nil */

/** @template T @typedef {Some<T> | Nil} Nilable */

// SECTION Library

/** @type {<T>(nilable: T) => Nilable<T>} */
const some = F.id

/** @type {<T>(nilable: Nilable<T>) => nilable is Nil} */
const isNil = nilable => O.isNone(nilable) || N.isNull(nilable)

/** @type {<T>(nilable: Nilable<T>) => nilable is Some<T>} */
const isSome = nilable => O.isSome(nilable) && N.isSome(nilable)

/** @type {<P, R>(nilable: Nilable<P>, func: F.Arrow<P, R>) => Nilable<R>} */
const map = (nilable, func) => isSome(nilable) ? some(func(nilable)) : nilable

/** @type {<P, R>(func: F.Arrow<P, R>) => F.Arrow<Nilable<P>, Nilable<R>>} */
const mapC = func => nilable => map(nilable, func)

/** @type {<P, R>(nilable: Nilable<P>, func: F.Arrow<P, Nilable<R>>) => Nilable<R>} */
const chain = (nilable, func) => isSome(nilable) ? func(nilable) : nilable

/** @type {<P, R>(func: F.Arrow<P, Nilable<R>>) => F.Arrow<Nilable<P>, Nilable<R>>} */
const chainC = func => nilable => chain(nilable, func)

/** @type {<T1, T2>(nilable: Nilable<T1>, value: T2) => T1 | T2} */
const getOrElse = (nilable, value) => isSome(nilable) ? nilable : value

/** @type {<T1, T2>(nilable: Nilable<T1>, value: F.Lazy<T2>) => T1 | T2} */
const getOrElseL = (nilable, value) => isSome(nilable) ? nilable : value()

/** @type {<T1>(value: T1) => <T2>(nilable: Nilable<T2>) => T1 | T2} */
const getOrElseC = value => nilable => getOrElse(nilable, value)

/** @type {<T1>(value: F.Lazy<T1>) => <T2>(nilable: Nilable<T2>) => T1 | T2} */
const getOrElseLC = value => nilable => getOrElseL(nilable, value)

/** @type {<P, R, N>(nilable: Nilable<P>, onSome: F.Arrow<P, R>, onNil: N) => R | N} */
const fold = (nilable, onSome, onNil) => isSome(nilable) ? onSome(nilable) : onNil

/** @type {<P, R, N>(nilable: Nilable<P>, onSome: F.Arrow<P, R>, onNil: F.Lazy<N>) => R | N} */
const foldL = (nilable, onSome, onNil) => isSome(nilable) ? onSome(nilable) : onNil()

/** @type {<P, R, N>(onSome: F.Arrow<P, R>, onNil: N) => F.Arrow<Nilable<P>, R | N>} */
const foldC = (onSome, onNil) => nilable => fold(nilable, onSome, onNil)

/** @type {<P, R, N>(onSome: F.Arrow<P, R>, onNil: F.Lazy<N>) => F.Arrow<Nilable<P>, R | N>} */
const foldLC = (onSome, onNil) => nilable => foldL(nilable, onSome, onNil)

/** @type {<T>(value: O.Option<T>) => N.Nullable<T>} */
const toNullable = nilable => isSome(nilable) ? N.some(nilable) : null

/** @type {<T>(nilable: N.Nullable<T>) => O.Option<T>} */
const toOption = nilable => isSome(nilable) ? O.some(nilable) : O.none

// SECTION Exports

module.exports = { some, isNil, isSome, map, mapC, chain, chainC, getOrElse, getOrElseL, getOrElseC, getOrElseLC, fold, foldL, foldC, foldLC, toOption, toNullable }
