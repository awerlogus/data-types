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

/** @type {<T>(iter: Iterable<T>) => (func: Arrow<T, void>) => void} */
const forEachCR = iter => func => forEach(iter, func)

/** @type {<P, R>(iter: Iterable<P>, func: Arrow<P, R>) => Iterable<R>} */
function* map (iter, func) { for (const i of iter) { yield func(i) } }

/** @type {<P, R>(func: Arrow<P, R>) => (iter: Iterable<P>) => Iterable<R>} */
const mapC = func => iter => map(iter, func)

/** @type {<P>(iter: Iterable<P>) => <R>(func: Arrow<P, R>) => Iterable<R>} */
const mapCR = iter => func => map(iter, func)

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

/** @type {<T>(iter: Iterable<T>) => (predicate: Predicate<[T]>) => Iterable<T>} */
const filterCR = iter => predicate => filter(iter, predicate)

/** @type {<T1, T2>(iter1: Iterable<T1>, iter2: Iterable<T2>) => Iterable<T1 | T2>} */
function* merge (iter1, iter2) { yield* iter1; yield* iter2 }

/** @type {<T1>(iter1: Iterable<T1>) => <T2>(iter2: Iterable<T2>) => Iterable<T1 | T2>} */
const mergeC = iter1 => iter2 => merge(iter1, iter2)

/** @type {<T2>(iter2: Iterable<T2>) => <T1>(iter1: Iterable<T1>) => Iterable<T1 | T2>} */
const mergeCR = iter2 => iter1 => merge(iter1, iter2)

/** @type {<P, R>(iter: Iterable<R>, func: Func<[P, R], P>, init: P) => P} */
const reduce = (iter, func, init) => {
  let accumulator = init

  for (const elem of iter) {
    accumulator = func(accumulator, elem)
  }

  return accumulator
}

/** @type {<P, R>(func: Func<[P, R], P>, init: P) => (iter: Iterable<R>) => P} */
const reduceC = (func, init) => iter => reduce(iter, func, init)

/** @type {<R>(iter: Iterable<R>) => <P>(func: Func<[P, R], P>, init: P) => P} */
const reduceCR = iter => (func, init) => reduce(iter, func, init)

/** @type {<T>(iter: Iterable<T>, func: Semi<T>) => O.Option<T>} */
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

/** @type {<T>(func: Semi<T>) => (iter: Iterable<T>) => O.Option<T>} */
const foldC = func => iter => fold(iter, func)

/** @type {<T>(iter: Iterable<T>) => (func: Semi<T>) => O.Option<T>} */
const foldCR = iter => func => fold(iter, func)

/** @type {<T>(iter: Iterable<T>, predicate: Predicate<[T]>) => number} */
const countMatches = (iter, predicate) => reduce(iter, (acc, next) => predicate(next) ? acc + 1 : acc, 0)

/** @type {<T>(predicate: Predicate<[T]>) => (iter: Iterable<T>) => number} */
const countMatchesC = predicate => iter => countMatches(iter, predicate)

/** @type {<T>(iter: Iterable<T>) => (predicate: Predicate<[T]>) => number} */
const countMatchesCR = iter => predicate => countMatches(iter, predicate)

// SECTION Exports

module.exports = { forEach, forEachC, forEachCR, map, mapC, mapCR, filter, filterC, filterCR, merge, mergeC, mergeCR, reduce, reduceC, reduceCR, fold, foldC, foldCR, countMatches, countMatchesC, countMatchesCR }
