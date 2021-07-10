const B = require('./predicate')
const F = require('./function')

// SECTION Library

/** @type {<T1, T2>(set1: Set<T1>, set2: Set<T2>) => Set<T1 | T2>} */
const union = (set1, set2) => new Set([...set1, ...set2])

/** @type {<T1>(set1: Set<T1>) => <T2>(set2: Set<T2>) => Set<T1 | T2>} */
const unionC = set1 => set2 => union(set1, set2)

/** @type {<T>(set: Set<T>, predicate: B.Predicate<[T]>) => [onTrue: Set<T>, onFalse: Set<T>]} */
const separate = (set, predicate) => {
  /** @type {typeof set} */
  const onTrue = new Set()
  /** @type {typeof set} */
  const onFalse = new Set()

  for (const elem of set) {
    (predicate(elem)
      ? onTrue
      : onFalse
    ).add(elem)
  }

  return [onTrue, onFalse]
}

/** @type {<T>(predicate: B.Predicate<[T]>) => (set: Set<T>) => [onTrue: Set<T>, onFalse: Set<T>]} */
const separateC = predicate => set => separate(set, predicate)

/** @type {<T>(set: Set<T>, predicate: B.Predicate<[T]>) => boolean} */
const some = (set, predicate) => {
  for (const elem of set) {
    if (predicate(elem)) {
      return true
    }
  }

  return false
}

/** @type {<T>(predicate: B.Predicate<[T]>) => B.Predicate<[Set<T>]>} */
const someC = predicate => set => some(set, predicate)

/** @type {<T>(set: Set<T>, predicate: B.Predicate<[T]>) => boolean} */
const none = B.not(some)

/** @type {<T>(predicate: B.Predicate<[T]>) => B.Predicate<[Set<T>]>} */
const noneC = F.flow(someC, B.not)

/** @type {<T>(set: Set<T>, predicate: B.Predicate<[T]>) => boolean} */
const every = (set, predicate) => {
  for (const elem of set) {
    if (!predicate(elem)) {
      return false
    }
  }

  return true
}

/** @type {<T>(predicate: B.Predicate<[T]>) => B.Predicate<[Set<T>]>} */
const everyC = predicate => set => every(set, predicate)

/** @type {<I, O>(set: Set<I>, func: F.Arrow<I, O>) => Set<O>} */
const map = (set, func) => {
  /** @type {Set<ReturnType<typeof func>>} */
  const result = new Set()

  for (const elem of set) {
    result.add(func(elem))
  }

  return result
}

/** @type {<I, O>(func: F.Arrow<I, O>) => F.Arrow<Set<I>, Set<O>>} */
const mapC = func => set => map(set, func)

/** @type {<I, O>(set: Set<I>, func: F.Arrow<I, Set<O>>) => Set<O>} */
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

/** @type {<I, O>(func: F.Arrow<I, Set<O>>) => F.Arrow<Set<I>, Set<O>>} */
const chainC = func => set => chain(set, func)

/** @type {<T>(set: Set<T>, predicate: B.Predicate<[T]>) => Set<T>} */
const filter = (set, predicate) => {
  /** @type {typeof set} */
  const result = new Set()

  for (const elem of set) {
    if (predicate(elem)) {
      result.add(elem)
    }
  }

  return result
}

/** @type {<T>(predicate: B.Predicate<[T]>) => F.Endo<Set<T>>} */
const filterC = predicate => set => filter(set, predicate)

/** @type {B.Predicate<[Set<any>]>} */
const empty = set => set.size === 0

// SECTION Exports

module.exports = { union, unionC, separate, separateC, some, someC, none, noneC, every, everyC, map, mapC, chain, chainC, filter, filterC, empty }
