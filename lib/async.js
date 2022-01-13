// SECTION Types

// MODULE Imports

/** @template P, R @typedef {import('./function').Arrow<P, R>} Arrow */

// SECTION Library

/** @type {<P, R>(promise: Promise<P>, func: Arrow<P, R>) => Promise<R>} */
const map = (promise, func) => promise.then(func)

/** @type {<P, R>(func: Arrow<P, R>) => (promise: Promise<P>) => Promise<R>} */
const mapC = func => promise => map(promise, func)

/** @type {<P, R>(promise: Promise<P>, func: Arrow<P, Promise<R>>) => Promise<R>} */
const chain = (promise, func) => promise.then(func)

/** @type {<P, R>(func: Arrow<P, Promise<R>>) => (promise: Promise<P>) => Promise<R>} */
const chainC = func => promise => chain(promise, func)

// SECTION Exports

module.exports = { map, mapC, chain, chainC }
