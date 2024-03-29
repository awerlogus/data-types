// SECTION Types

// MODULE Imports

/** @template P, R @typedef {import('./function').Arrow<P, R>} Arrow */

// SECTION Library

/** @type {<T>(value: T) => Promise<T>} */
const of = value => Promise.resolve(value)

/** @type {<P, R>(promise: Promise<P>, func: Arrow<P, R>) => Promise<R>} */
const map = (promise, func) => promise.then(func)

/** @type {<P, R>(func: Arrow<P, R>) => (promise: Promise<P>) => Promise<R>} */
const mapC = func => promise => map(promise, func)

/** @type {<P>(promise: Promise<P>) => <R>(func: Arrow<P, R>) => Promise<R>} */
const mapCR = promise => func => map(promise, func)

/** @type {<P, R>(promise: Promise<P>, func: Arrow<P, Promise<R>>) => Promise<R>} */
const chain = (promise, func) => promise.then(func)

/** @type {<P, R>(func: Arrow<P, Promise<R>>) => (promise: Promise<P>) => Promise<R>} */
const chainC = func => promise => chain(promise, func)

/** @type {<P>(promise: Promise<P>) => <R>(func: Arrow<P, Promise<R>>) => Promise<R>} */
const chainCR = promise => func => chain(promise, func)

// SECTION Exports

module.exports = { of, map, mapC, mapCR, chain, chainC, chainCR }
