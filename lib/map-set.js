const I = require('./iterable')
const O = require('./option')
const S = require('./set')

// SECTION Types

// MODULE Imports

/** @template {ReadonlyMap<any, ReadonlySet<any>>} MS @typedef {MS extends ReadonlyMap<any, ReadonlySet<infer E>> ? E : never} Elem */

// SECTION Library

/** @type {<K, V>(map: ReadonlyMap<K, ReadonlySet<V>>) => Map<K, Set<V>>} */
const clone = map => {
  /** @type {Map<any, Set<any>>} */
  const result = new Map()

  for (const [k, v] of map) {
    result.set(k, new Set(v))
  }

  return result
}

/** @type {<K, V>(map: ReadonlyMap<K, ReadonlySet<V>>, key: K, value: V) => boolean} */
const has = (map, key, value) => O.getOrElse(O.map(map.get(key), S.hasC(value)), false)

/** @type {<K, V>(key: K, value: V) => (map: ReadonlyMap<K, ReadonlySet<V>>) => boolean} */
const hasC = (key, value) => map => has(map, key, value)

/** @type {<K, V>(map: ReadonlyMap<K, ReadonlySet<V>>) => (key: K, value: V) => boolean} */
const hasCR = map => (key, value) => has(map, key, value)

/** @type {<K, V>(map: ReadonlyMap<K, ReadonlySet<V>>, key: K) => ReadonlySet<V>} */
const get = (map, key) => O.getOrElse(map.get(key), new Set())

/** @type {<K>(key: K) => <V>(map: ReadonlyMap<K, ReadonlySet<V>>) => ReadonlySet<V>} */
const getC = key => map => get(map, key)

/** @type {<K, V>(map: ReadonlyMap<K, ReadonlySet<V>>) => (key: K) => ReadonlySet<V>} */
const getCR = map => key => get(map, key)

/** @type {<K, V>(map: Map<K, Set<V>>, key: K, value: V) => boolean} */
const add = (map, key, value) => {
  const set = map.get(key)

  if (O.isNone(set)) {
    map.set(key, new Set([value]))

    return true
  }

  const { size } = set

  set.add(value)

  return set.size > size
}

/** @type {<K, V>(key: K, value: V) => (map: Map<K, Set<V>>) => boolean} */
const addC = (key, value) => map => add(map, key, value)

/** @type {<K, V>(map: Map<K, Set<V>>) => (key: K, value: V) => boolean} */
const addCR = map => (key, value) => add(map, key, value)

/** @type {<K, V>(map: Map<K, Set<V>>, key: K, value: V) => boolean} */
const remove = (map, key, value) => {
  const set = map.get(key)

  if (O.isNone(set)) {
    return false
  }

  const deleted = set.delete(value)

  if (set.size === 0) {
    map.delete(key)
  }

  return deleted
}

/** @type {<K, V>(key: K, value: V) => (map: Map<K, Set<V>>) => boolean} */
const removeC = (key, value) => map => remove(map, key, value)

/** @type {<K, V>(map: Map<K, Set<V>>) => (key: K, value: V) => boolean} */
const removeCR = map => (key, value) => remove(map, key, value)

/** @type {<K, V>(map: ReadonlyMap<K, ReadonlySet<V>>) => Set<V>} */
const values = map => I.reduce(map.values(), S.union, new Set())

/** @type {<K, V>(map: ReadonlyMap<K, ReadonlySet<V>>) => boolean} */
const valuesDisjoint = map => {
  /** @type {ReadonlySet<Elem<typeof map>>} */
  let result = new Set()

  /** @type {number} */
  let size = 0

  for (const [, v] of map) {
    result = S.union(result, v)

    size += v.size

    if (result.size !== size) {
      return false
    }
  }

  return true
}

// SECTION Exports

module.exports = { clone, has, hasC, hasCR, get, getC, getCR, add, addC, addCR, remove, removeC, removeCR, values, valuesDisjoint }
