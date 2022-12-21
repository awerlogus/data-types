const O = require('./option')

// SECTION Types

// MODULE Imports

/** @template T @typedef {import('./function').Semi<T>} Semi */

/** @template T @typedef {import('./function').Endo<T>} Endo */

/** @template P, R @typedef {import('./function').Arrow<P, R>} Arrow */

/** @template {ReadonlyArray<any>} P, R @typedef {import('./function').Func<P, R>} Func */

/** @template {ReadonlyArray<any>} T @typedef {import('./predicate').Predicate<T>} Predicate */

// SECTION Library

/** @type {<T>(iter: Iterable<T>, func: Arrow<T, void>) => void} */
const forEach = (iter, func) => { for (const i of iter) { func(i) } }

/** @type {<T>(func: Arrow<T, void>) => (iter: Iterable<T>) => void} */
const forEachC = func => iter => forEach(iter, func)

/** @type {<T, R>(iter: Iterable<T>, func: Arrow<T, R>) => Iterable<R>} */
function* map (iter, func) { for (const i of iter) { yield func(i) } }

/** @type {<T, R>(func: Arrow<T, R>) => Arrow<Iterable<T>, Iterable<R>>} */
const mapC = func => iter => map(iter, func)

/** @type {<T>(iter: Iterable<T>, predicate: Predicate<[T]>) => Iterable<T>} */
function* filter (iter, predicate) {
  for (const i of iter) {
    if (predicate(i)) {
      yield i
    }
  }
}

/** @type {<T>(predicate: Predicate<[T]>) => (iter: Iterable<T>) => Iterable<T>} */
const filterC = predicate => iter => filter(iter, predicate)

/** @type {<T1, T2>(iter1: Iterable<T1>, iter2: Iterable<T2>) => Iterable<T1 | T2>} */
function* merge (iter1, iter2) { yield* iter1; yield* iter2 }

/** @type {<T1>(iter1: Iterable<T1>) => <T2>(iter2: Iterable<T2>) => Iterable<T1 | T2>} */
const mergeC = iter1 => iter2 => merge(iter1, iter2)

/** @type {<A, B>(iter: Iterable<B>, func: Func<[A, B], A>, init: A) => A} */
const reduce = (iter, func, init) => {
  let accumulator = init

  for (const elem of iter) {
    accumulator = func(accumulator, elem)
  }

  return accumulator
}

/** @type {<A, B>(func: Func<[A, B], A>, init: A) => (iter: Iterable<B>) => A} */
const reduceC = (func, init) => iter => reduce(iter, func, init)

/** @type {<A>(iter: Iterable<A>, func: Semi<A>) => O.Option<A>} */
const fold = (iter, func) => {
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
    ? accumulator
    : O.none
}

/** @type {<A>(func: Semi<A>) => Arrow<Iterable<A>, O.Option<A>>} */
const foldC = func => iter => fold(iter, func)

/** @type {<T>(iter: Iterable<T>, predicate: Predicate<[T]>) => number} */
const countMatches = (iter, predicate) => {
  let count = 0

  for (const elem of iter) {
    if (predicate(elem)) {
      count += 1
    }
  }

  return count
}

/** @type {<T>(predicate: Predicate<[T]>) => Arrow<Iterable<T>, number>} */
const countMatchesC = predicate => iter => countMatches(iter, predicate)

// SECTION Exports

module.exports = { forEach, forEachC, map, mapC, filter, filterC, merge, mergeC, reduce, reduceC, fold, foldC, countMatches, countMatchesC }
