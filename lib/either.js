// SECTION Types

// MODULE Imports

/** @template P, R @typedef {import('./function').Arrow<P, R>} Arrow */

// MODULE Declarations

/** @template E @typedef {[false, E]} Left */

/** @template T @typedef {[true, T]} Right */

/** @template E, T @typedef {Left<E> | Right<T>} Either */

// SECTION Library

/** @type {<E>(data: E) => Either<E, never>} */
const left = data => [false, data]

/** @type {<T>(data: T) => Either<never, T>} */
const right = data => [true, data]

/** @type {<E, T>(either: Either<E, T>) => either is Left<E>} */
const isLeft = either => either[0] === false

/** @type {<E, T>(either: Either<E, T>) => either is Right<T>} */
const isRight = either => either[0] === true

/** @type {<E, T, R>(either: Either<E, T>, func: Arrow<T, R>) => Either<E, R>} */
const map = (either, func) => isLeft(either) ? either : right(func(either[1]))

/** @type {<T, R>(func: Arrow<T, R>) => <E>(either: Either<E, T>) => Either<E, R>} */
const mapC = func => either => map(either, func)

/** @type {<E1, E2, T>(either: Either<E1, T>, func: Arrow<E1, E2>) => Either<E2, T>} */
const mapLeft = (either, func) => isLeft(either) ? left(func(either[1])) : either

/** @type {<E1, E2>(func: Arrow<E1, E2>) => <T>(either: Either<E1, T>) => Either<E2, T>} */
const mapLeftC = func => either => mapLeft(either, func)

/** @type {<E1, T, E2, R>(either: Either<E1, T>, func: Arrow<T, Either<E2, R>>) => Either<E1 | E2, R>} */
const chain = (either, func) => isLeft(either) ? either : func(either[1])

/** @type {<T, E2, R>(func: Arrow<T, Either<E2, R>>) => <E1>(either: Either<E1, T>) => Either<E1 | E2, R>} */
const chainC = func => either => chain(either, func)

/** @type {<E, T>(either: Either<E, T>) => E | T} */
const get = either => either[1]

/** @type {<E, T>(either: Either<E, T>) => T} */
const extractUnsafe = either => { if (isLeft(either)) { throw either[1] } return either[1] }

// SECTION Exports

module.exports = { left, right, isLeft, isRight, map, mapC, mapLeft, mapLeftC, chain, chainC, get, extractUnsafe }
