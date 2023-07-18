// SECTION Types

// MODULE Declarations

/** @template T @typedef {Func<[], T>} Lazy */

/** @template T @typedef {Arrow<T, T>} Endo */

/** @template T @typedef {Func<[T, T], T>} Semi */

/** @template P, R @typedef {Func<[P], R>} Arrow */

/** @template {ReadonlyArray<any>} P, R @typedef {(...args: P) => R} Func */

// SECTION Library

/** @type {<A extends ReadonlyArray<any>, B, C>(func1: Func<A, B>, func2: Arrow<B, C>) => Func<A, C>} */
const flow = (func1, func2) => (...args) => func2(func1(...args))

/** @type {<A extends ReadonlyArray<any>, B>(func1: Func<A, B>) => <C>(func2: Arrow<B, C>) => Func<A, C>} */
const flowC = func1 => func2 => flow(func1, func2)

/** @type {<B, C>(func2: Arrow<B, C>) => <A extends ReadonlyArray<any>>(func1: Func<A, B>) => Func<A, C>} */
const flowCR = func2 => func1 => flow(func1, func2)

/** @type {<T>(data: T) => T} */
const id = data => data

/** @type {() => void} */
const noop = () => { }

/** @type {() => Promise<void>} */
const noopA = async () => { }

/** @type {() => never} */
const never = () => { throw new Error('This function shall be never called') }

/** @type {(_: never) => never} */
const absurd = _ => { throw new Error('Absurd function called') }

/** @type {<P extends ReadonlyArray<any>>(...params: P) => <R>(func: Func<P, R>) => R} */
const call = (...params) => func => func(...params)

/** @type {<R>(func: Lazy<R>) => R} */
const callL = func => func()

// SECTION Exports

module.exports = { flow, flowC, flowCR, id, noop, noopA, never, absurd, call, callL }
