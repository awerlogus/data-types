// SECTION Types

// MODULE Imports

/** @template T @typedef {import('./option').Option<T>} Option */

/** @template P, R @typedef {import('./function').Arrow<P, R>} Arrow */

/** @template {ReadonlyArray<any>} P, R @typedef {import('./function').Func<P, R>} Func */

/** @template {ReadonlyArray<any>} T @typedef {import('./predicate').Predicate<T>} Predicate */

// MODULE Declarations

/** @template {ReadonlyArray<any>} T @typedef {Array<Elem<T>>} Mutable */

/** @template {ReadonlyArray<any>} T @typedef {T extends ReadonlyArray<infer E> ? E : never} Elem */

// SECTION Library

/** @type {<T>(array: ReadonlyArray<T>, func: Arrow<Array<T>, void>) => Array<T>} */
const withCopy = (array, func) => {
  const clone = Array.from(array)

  func(clone)

  return clone
}

/** @type {<T>(func: Arrow<Array<T>, void>) => <R extends T>(array: ReadonlyArray<R>) => Array<R>} */
const withCopyC = func => array => withCopy(array, func)

/** @type {<T>(array: ReadonlyArray<T>) => (func: Arrow<Array<T>, void>) => Array<T>} */
const withCopyCR = array => func => withCopy(array, func)

/** @type {<T>(array: Array<T>, index: number, data: T) => void} */
const setAt = (array, index, data) => { array[index] = data }

/** @type {<T>(index: number, data: T) => (array: Array<T>) => void} */
const setAtC = (index, data) => array => setAt(array, index, data)

/** @type {<T>(array: Array<T>) => (index: number, data: T) => void} */
const setAtCR = array => (index, data) => setAt(array, index, data)

/** @type {<P, R>(array: ReadonlyArray<P>, func: Arrow<P, R>) => Array<R>} */
const map = (array, func) => array.map(func)

/** @type {<P, R>(func: Arrow<P, R>) => (array: ReadonlyArray<P>) => Array<R>} */
const mapC = func => array => map(array, func)

/** @type {<P>(array: ReadonlyArray<P>) => <R>(func: Arrow<P, R>) => Array<R>} */
const mapCR = array => func => map(array, func)

/** @type {<T>(array: ReadonlyArray<T>, predicate: Predicate<[T]>) => Array<T>} */
const filter = (array, predicate) => array.filter(predicate)

/** @type {<T>(predicate: Predicate<[T]>) => (array: ReadonlyArray<T>) => Array<T>} */
const filterC = predicate => array => filter(array, predicate)

/** @type {<T>(array: ReadonlyArray<T>) => (predicate: Predicate<[T]>) => Array<T>} */
const filterCR = array => predicate => filter(array, predicate)

/** @type {<T>(array: ReadonlyArray<T>, predicate: Predicate<[T]>) => [Array<T>, Array<T>]} */
const separate = (array, predicate) => {
  /** @type {Mutable<typeof array>} */
  const onTrue = []
  /** @type {Mutable<typeof array>} */
  const onFalse = []

  for (const elem of array) {
    (predicate(elem) ? onTrue : onFalse).push(elem)
  }

  return [onTrue, onFalse]
}

/** @type {<T>(predicate: Predicate<[T]>) => (array: ReadonlyArray<T>) => [Array<T>, Array<T>]} */
const separateC = predicate => array => separate(array, predicate)

/** @type {<T>(array: ReadonlyArray<T>) => (predicate: Predicate<[T]>) => [Array<T>, Array<T>]} */
const separateCR = array => predicate => separate(array, predicate)

/** @type {<T extends ReadonlyArray<any>>(array: T) => T extends { readonly 0: any } ? T[0] : Option<T[0]>} */
const first = array => array[0]

/** @type {<T1, T2, R>(array1: ReadonlyArray<T1>, array2: ReadonlyArray<T2>, zipper: Func<[T1, T2], R>) => Array<R>} */
// @ts-ignore necessary
const zip = (array1, array2, zipper) => Array.from({ length: Math.min(array1.length, array2.length) }, (_, i) => zipper(array1[i], array2[i]))

/** @type {<T1, T2, R>(zipper: Func<[T1, T2], R>) => (array1: ReadonlyArray<T1>, array2: ReadonlyArray<T2>) => Array<R>} */
const zipC = zipper => (array1, array2) => zip(array1, array2, zipper)

/** @type {<T1, T2>(array1: ReadonlyArray<T1>, array2: ReadonlyArray<T2>) => <R>(zipper: Func<[T1, T2], R>) => Array<R>} */
const zipCR = (array1, array2) => zipper => zip(array1, array2, zipper)

// SECTION Exports

module.exports = { withCopy, withCopyC, withCopyCR, setAt, setAtC, setAtCR, map, mapC, mapCR, filter, filterC, filterCR, separate, separateC, separateCR, first, zip, zipC, zipCR }
