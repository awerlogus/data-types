const B = require('./predicate')
const F = require('./function')

// SECTION Types

// MODULE Imports

/** @template T @typedef {import('./function').Endo<T>} Endo */

/** @template P, R @typedef {import('./function').Arrow<P, R>} Arrow */

/** @template T @typedef {import('./predicate').Predicate<T>} Predicate */

// SECTION Library

/** @type {<T = never>(elements?: Iterable<T>) => Set<T>} */
const create = elements => new Set(elements)

/** @type {<T1, T2>(set1: Set<T1>, set2: Set<T2>) => Set<T1 | T2>} */
const union = (set1, set2) => create([...set1, ...set2])

/** @type {<T>(predicate: Predicate<[T]>) => (set: Set<T>) => [onTrue: Set<T>, onFalse: Set<T>]} */
const separate = predicate => set => {
  /** @type {typeof set} */
  const onTrue = create()
  /** @type {typeof set} */
  const onFalse = create()

  for (const elem of set) {
    (predicate(elem)
      ? onTrue
      : onFalse
    ).add(elem)
  }

  return [onTrue, onFalse]
}

/** @type {<T>(predicate: Predicate<[T]>) => Predicate<[Set<T>]>} */
const some = predicate => set => {
  for (const elem of set) {
    if (predicate(elem)) {
      return true
    }
  }

  return false
}

/** @type {<T>(predicate: Predicate<[T]>) => Predicate<[Set<T>]>} */
const none = F.flow(some, B.not)

/** @type {<T>(predicate: Predicate<[T]>) => Predicate<[Set<T>]>} */
const every = predicate => set => {
  for (const elem of set) {
    if (!predicate(elem)) {
      return false
    }
  }

  return true
}

/** @type {<I, O>(func: Arrow<I, O>) => Arrow<Set<I>, Set<O>>} */
const map = func => set => {
  /** @type {Set<ReturnType<typeof func>>} */
  const result = create()

  for (const elem of set) {
    result.add(func(elem))
  }

  return result
}

/** @type {<I, O>(func: Arrow<I, Set<O>>) => Arrow<Set<I>, Set<O>>} */
const chain = func => set => {
  /** @type {ReturnType<typeof func>} */
  const result = create()

  for (const elem of set) {
    const res = func(elem)

    for (const e of res) {
      result.add(e)
    }
  }

  return result
}

/** @type {<T>(predicate: Predicate<[T]>) => Endo<Set<T>>} */
const filter = predicate => set => {
  /** @type {typeof set} */
  const result = create()

  for (const elem of set) {
    if (predicate(elem)) {
      result.add(elem)
    }
  }

  return result
}

/** @type {Predicate<[Set<any>]>} */
const empty = set => set.size === 0

// SECTION Exports

module.exports = { create, union, separate, some, every, none, map, chain, filter, empty }
