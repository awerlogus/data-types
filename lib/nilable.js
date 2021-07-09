const F = require('./function')
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

/** @type {<T>(data: T) => Nilable<T>} */
const some = F.id

/** @type {<T>(data: Nilable<T>) => data is Nil} */
const isNil = data => O.isNone(data) || N.isNull(data)

/** @type {<T>(data: Nilable<T>) => data is Some<T>} */
const isSome = data => O.isSome(data) && N.isSome(data)

/** @type {<P, R>(func: Arrow<P, R>) => Arrow<Nilable<P>, Nilable<R>>} */
const map = func => data => isSome(data) ? some(func(data)) : data

/** @type {<P, R>(func: Arrow<P, Nilable<R>>) => Arrow<Nilable<P>, Nilable<R>>} */
const chain = func => data => isSome(data) ? func(data) : data

/** @type {<T1>(value: Lazy<T1>) => <T2>(data: Nilable<T2>) => T1 | T2} */
const getOrElse = value => data => isSome(data) ? data : value()

/** @type {<P, R, N>(onSome: Arrow<P, R>, onNil: N) => Arrow<Nilable<P>, R | N>} */
const fold = (onSome, onNil) => data => isSome(data) ? onSome(data) : onNil

/** @type {<P, R, N>(onSome: Arrow<P, R>, onNil: Lazy<N>) => Arrow<Nilable<P>, R | N>} */
const foldL = (onSome, onNil) => data => isSome(data) ? onSome(data) : onNil()

/** @type {<T>(value: O.Option<T>) => N.Nullable<T>} */
const toNullable = value => isSome(value) ? N.some(value) : null

/** @type {<T>(value: N.Nullable<T>) => O.Option<T>} */
const toOption = value => isSome(value) ? O.some(value) : O.none

// SECTION Exports

module.exports = { some, isNil, isSome, map, chain, getOrElse, fold, foldL, toOption, toNullable }
