const B = require('./predicate')
const F = require('./function')

// SECTION Types

// MODULE Declarations

/** @template {ReadonlySet<any>} S @typedef {Set<Elem<S>>} Mutable */

/** @template {ReadonlySet<any>} S @typedef {S extends ReadonlySet<infer E> ? E : never} Elem */

// SECTION Library

/** @type {<T>(set: ReadonlySet<T>) => Set<T>} */
const clone = set => new Set(set)

/** @type {<T>(set: ReadonlySet<T>, value: T) => boolean} */
const has = (set, value) => set.has(value)

/** @type {<T>(value: T) => (set: ReadonlySet<T>) => boolean} */
const hasC = value => set => has(set, value)

/** @type {<T>(set: ReadonlySet<T>) => (value: T) => boolean} */
const hasCR = set => value => has(set, value)

/** @type {<T>(set: Set<T>, value: T) => boolean} */
const add = (set, value) => {
  const { size } = set

  set.add(value)

  return set.size > size
}

/** @type {<T>(value: T) => (set: Set<T>) => boolean} */
const addC = value => set => add(set, value)

/** @type {<T>(set: Set<T>) => (value: T) => boolean} */
const addCR = set => value => add(set, value)

/** @type {<T>(set: Set<T>, value: T) => boolean} */
const remove = (set, value) => set.delete(value)

/** @type {<T>(value: T) => (set: Set<T>) => boolean} */
const removeC = value => set => remove(set, value)

/** @type {<T>(set: Set<T>) => (value: T) => boolean} */
const removeCR = set => value => remove(set, value)

/** @type {<T1, T2>(set1: ReadonlySet<T1>, set2: ReadonlySet<T2>) => Set<T1 | T2>} */
const union = (set1, set2) => new Set([...set1, ...set2])

/** @type {<T1>(set1: ReadonlySet<T1>) => <T2>(set2: ReadonlySet<T2>) => Set<T1 | T2>} */
const unionC = set1 => set2 => union(set1, set2)

/** @type {<T>(set: ReadonlySet<T>, predicate: B.Predicate<[T]>) => [onTrue: Set<T>, onFalse: Set<T>]} */
const separate = (set, predicate) => {
  /** @type {Mutable<typeof set>} */
  const onTrue = new Set()
  /** @type {Mutable<typeof set>} */
  const onFalse = new Set()

  for (const elem of set) {
    (predicate(elem)
      ? onTrue
      : onFalse
    ).add(elem)
  }

  return [onTrue, onFalse]
}

/** @type {<T>(predicate: B.Predicate<[T]>) => (set: ReadonlySet<T>) => [onTrue: Set<T>, onFalse: Set<T>]} */
const separateC = predicate => set => separate(set, predicate)

/** @type {<T>(set: ReadonlySet<T>, predicate: B.Predicate<[T]>) => boolean} */
const some = (set, predicate) => {
  for (const elem of set) {
    if (predicate(elem)) {
      return true
    }
  }

  return false
}

/** @type {<T>(predicate: B.Predicate<[T]>) => B.Predicate<[ReadonlySet<T>]>} */
const someC = predicate => set => some(set, predicate)

/** @type {<T>(set: ReadonlySet<T>, predicate: B.Predicate<[T]>) => boolean} */
const none = B.not(some)

/** @type {<T>(predicate: B.Predicate<[T]>) => B.Predicate<[ReadonlySet<T>]>} */
const noneC = F.flow(someC, B.not)

/** @type {<T>(set: ReadonlySet<T>, predicate: B.Predicate<[T]>) => boolean} */
const every = (set, predicate) => none(set, B.not(predicate))

/** @type {<T>(predicate: B.Predicate<[T]>) => B.Predicate<[ReadonlySet<T>]>} */
const everyC = predicate => set => every(set, predicate)

/** @type {<I, O>(set: ReadonlySet<I>, func: F.Arrow<I, O>) => Set<O>} */
const map = (set, func) => {
  /** @type {Set<ReturnType<typeof func>>} */
  const result = new Set()

  for (const elem of set) {
    result.add(func(elem))
  }

  return result
}

/** @type {<I, O>(func: F.Arrow<I, O>) => F.Arrow<ReadonlySet<I>, Set<O>>} */
const mapC = func => set => map(set, func)

/** @type {<I, O>(set: ReadonlySet<I>, func: F.Arrow<I, Set<O>>) => Set<O>} */
const chain = (set, func) => {
  /** @type {ReturnType<typeof func>} */
  const result = new Set()

  for (const elem of set) {
    const res = func(elem)

    for (const e of res) {
      result.add(e)
    }
  }

  return result
}

/** @type {<I, O>(func: F.Arrow<I, Set<O>>) => F.Arrow<ReadonlySet<I>, Set<O>>} */
const chainC = func => set => chain(set, func)

/** @type {<T>(set: ReadonlySet<T>, predicate: B.Predicate<[T]>) => Set<T>} */
const filter = (set, predicate) => {
  /** @type {Mutable<typeof set>} */
  const result = new Set()

  for (const elem of set) {
    if (predicate(elem)) {
      result.add(elem)
    }
  }

  return result
}

/** @type {<T>(predicate: B.Predicate<[T]>) => F.Arrow<ReadonlySet<T>, Set<T>>} */
const filterC = predicate => set => filter(set, predicate)

/** @type {<T>(set1: ReadonlySet<T>, set2: ReadonlySet<T>) => boolean} */
const equal = (set1, set2) => {
  if (set1.size !== set2.size) {
    return false
  }

  return every(set1, hasCR(set2))
}

/** @type {<T>(set1: ReadonlySet<T>) => (set2: ReadonlySet<T>) => boolean} */
const equalC = set1 => set2 => equal(set1, set2)

/** @type {B.Predicate<[ReadonlySet<any>]>} */
const empty = set => set.size === 0

/** @type {B.Predicate<[ReadonlySet<any>]>} */
const nonEmpty = B.not(empty)

/** @type {<T>(set1: ReadonlySet<T>, set2: ReadonlySet<T>) => boolean} */
const intersects = (set1, set2) => nonEmpty(set1) && nonEmpty(set2) && some(set1, hasCR(set2))

/** @type {<T>(set1: ReadonlySet<T>) => (set2: ReadonlySet<T>) => boolean} */
const intersectsC = set1 => set2 => intersects(set1, set2)

/** @type {<T>(set1: ReadonlySet<T>, set2: ReadonlySet<T>) => boolean} */
const disjoint = B.not(intersects)

/** @type {<T>(set1: ReadonlySet<T>) => (set2: ReadonlySet<T>) => boolean} */
const disjointC = set1 => set2 => disjoint(set1, set2)

// SECTION Exports

module.exports = { clone, has, hasC, hasCR, add, addC, addCR, remove, removeC, removeCR, union, unionC, separate, separateC, some, someC, none, noneC, every, everyC, map, mapC, chain, chainC, filter, filterC, equal, equalC, empty, nonEmpty, intersects, intersectsC, disjoint, disjointC }
