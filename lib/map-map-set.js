const MS = require('./map-set')
const O = require('./option')
const S = require('./set')

// SECTION Types

// MODULE Declarations

/** @template {ReadonlyMap<any, ReadonlyMap<any, ReadonlySet<any>>>} MMS @typedef {MMS extends ReadonlyMap<any, ReadonlyMap<any, ReadonlySet<infer E>>> ? E : never} Elem */

// SECTION Library

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlySet<V>>>) => Map<K1, Map<K2, Set<V>>>} */
const clone = map => {
  /** @type {Map<any, Map<any, Set<any>>>} */
  const result = new Map()

  for (const [k, v] of map) {
    result.set(k, MS.clone(v))
  }

  return result
}

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlySet<V>>>, key1: K1, key2: K2, value: V) => boolean} */
const has = (map, key1, key2, value) => O.getOrElse(O.map(map.get(key1), MS.hasC(key2, value)), false)

/** @type {<K1, K2, V>(key1: K1, key2: K2, value: V) => (map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlySet<V>>>) => boolean} */
const hasC = (key1, key2, value) => map => has(map, key1, key2, value)

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlySet<V>>>) => (key1: K1, key2: K2, value: V) => boolean} */
const hasCR = map => (key1, key2, value) => has(map, key1, key2, value)

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlySet<V>>>, key1: K1, key2: K2) => ReadonlySet<V>} */
const get = (map, key1, key2) => O.getOrElse(O.map(map.get(key1), MS.getC(key2)), new Set())

/** @type {<K1, K2>(key1: K1, key2: K2) => <V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlySet<V>>>) => ReadonlySet<V>} */
const getC = (key1, key2) => map => get(map, key1, key2)

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlySet<V>>>) => (key1: K1, key2: K2) => ReadonlySet<V>} */
const getCR = map => (key1, key2) => get(map, key1, key2)

/** @type {<K1, K2, V>(map: Map<K1, Map<K2, Set<V>>>, key1: K1, key2: K2, value: V) => boolean} */
const add = (map, key1, key2, value) => {
  const inner = map.get(key1)

  if (O.isNone(inner)) {
    map.set(key1, new Map([[key2, new Set([value])]]))

    return true
  }

  return MS.add(inner, key2, value)
}

/** @type {<K1, K2, V>(key1: K1, key2: K2, value: V) => (map: Map<K1, Map<K2, Set<V>>>) => boolean} */
const addC = (key1, key2, value) => map => add(map, key1, key2, value)

/** @type {<K1, K2, V>(map: Map<K1, Map<K2, Set<V>>>) => (key1: K1, key2: K2, value: V) => boolean} */
const addCR = map => (key1, key2, value) => add(map, key1, key2, value)

/** @type {<K1, K2, V>(map: Map<K1, Map<K2, Set<V>>>, key1: K1, key2: K2, value: V) => boolean} */
const remove = (map, key1, key2, value) => {
  const inner = map.get(key1)

  if (O.isNone(inner)) {
    return false
  }

  if (!MS.remove(inner, key2, value)) {
    return false
  }

  if (inner.size === 0) {
    map.delete(key1)
  }

  return true
}

/** @type {<K1, K2, V>(key1: K1, key2: K2, value: V) => (map: Map<K1, Map<K2, Set<V>>>) => boolean} */
const removeC = (key1, key2, value) => map => remove(map, key1, key2, value)

/** @type {<K1, K2, V>(map: Map<K1, Map<K2, Set<V>>>) => (key1: K1, key2: K2, value: V) => boolean} */
const removeCR = map => (key1, key2, value) => remove(map, key1, key2, value)

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlySet<V>>>) => boolean} */
const valuesDisjoint = map => {
  /** @type {ReadonlySet<Elem<typeof map>>} */
  let result = new Set()

  /** @type {number} */
  let size = 0

  for (const [, inner] of map) {
    for (const [, v] of inner) {
      result = S.union(result, v)

      size += v.size

      if (result.size !== size) {
        return false
      }
    }
  }

  return true
}

// SECTION Exports

module.exports = { clone, has, hasC, hasCR, get, getC, getCR, add, addC, addCR, remove, removeC, removeCR, valuesDisjoint }
