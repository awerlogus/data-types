const O = require('./option')

// SECTION Types

// MODULE Imports

/** @template T @typedef {import('./function').Endo<T>} Endo */

/** @template P, R @typedef {import('./function').Arrow<P, R>} Arrow */

/** @template T @typedef {import('./predicate').Predicate<T>} Predicate */

// SECTION Library

/** @type {<T>(func: Arrow<T, void>) => Arrow<Iterable<T>, void>} */
const forEach = func => iter => { for (const i of iter) { func(i) } }

/** @type {<T, R>(func: Arrow<T, R>) => Arrow<Iterable<T>, Iterable<R>>} */
const map = func => function* (iter) { for (const i of iter) { yield func(i) } }

/** @type {<T>(predicate: Predicate<[T]>) => Endo<Iterable<T>>} */
const filter = predicate => function* (iter) {
  for (const i of iter) {
    if (predicate(i)) {
      yield i
    }
  }
}

/** @type {<T1, T2>(iter1: Iterable<T1>, iter2: Iterable<T2>) => Iterable<T1 | T2>} */
function* merge (iter1, iter2) { yield* iter1; yield* iter2 }

/** @type {<A, B>(func: (acc: A, elem: B) => A, init: A) => (iter: Iterable<B>) => A} */
const reduce = (func, init) => iter => {
  let accumulator = init

  for (const elem of iter) {
    accumulator = func(accumulator, elem)
  }

  return accumulator
}

/** @type {<A>(func: (acc: A, elem: A) => A) => (iter: Iterable<A>) => O.Option<A>} */
const fold = func => iter => {
  let
    initElement = true,
    accumulator

  for (const elem of iter) {
    if (initElement) {
      accumulator = elem

      initElement = false
    } else {
      // @ts-ignore necessary
      accumulator = func(accumulator, elem)
    }
  }

  return !initElement
    ? O.some(accumulator)
    : O.none
}

/** @type {<T>(predicate: Predicate<[T]>) => (iter: Iterable<T>) => number} */
const countMatches = predicate => iter => {
  let count = 0

  for (const elem of iter) {
    if (predicate(elem)) {
      count += 1
    }
  }

  return count
}

// SECTION Exports

module.exports = { forEach, map, filter, merge, reduce, fold, countMatches }
