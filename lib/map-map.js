const O = require('./option')
const M = require('./map')

// SECTION Library

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => Map<K1, Map<K2, V>>} */
const clone = map => {
  /** @type {Map<any, Map<any, any>>} */
  const result = new Map()

  for (const [k1, v1] of map) {
    result.set(k1, new Map(v1))
  }

  return result
}

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>, key1: K1, key2: K2) => boolean} */
const has = (map, key1, key2) => O.getOrElse(O.map(map.get(key1), M.hasC(key2)), false)

/** @type {<K1, K2>(key1: K1, key2: K2) => <V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => boolean} */
const hasC = (key1, key2) => map => has(map, key1, key2)

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => (key1: K1, key2: K2) => boolean} */
const hasCR = map => (key1, key2) => has(map, key1, key2)

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>, key1: K1, key2: K2) => O.Option<V>} */
const get = (map, key1, key2) => O.chain(map.get(key1), M.getC(key2))

/** @type {<K1, K2>(key1: K1, key2: K2) => <V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => O.Option<V>} */
const getC = (key1, key2) => map => get(map, key1, key2)

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => (key1: K1, key2: K2) => O.Option<V>} */
const getCR = map => (key1, key2) => get(map, key1, key2)

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>, key: K1) => Iterable<K2>} */
const keys = (map, key) => O.getOrElse(O.map(map.get(key), M.keys), [])

/** @type {<K1>(key: K1) => <K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => Iterable<K2>} */
const keysC = key => map => keys(map, key)

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => (key: K1) => Iterable<K2>} */
const keysCR = map => key => keys(map, key)

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>, key: K1) => Iterable<V>} */
const values = (map, key) => O.getOrElse(O.map(map.get(key), M.values), [])

/** @type {<K1>(key: K1) => <K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => Iterable<V>} */
const valuesC = key => map => values(map, key)

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => (key: K1) => Iterable<V>} */
const valuesCR = map => key => values(map, key)

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>, key: K1) => Iterable<[K2, V]>} */
const entries = (map, key) => O.getOrElse(O.map(map.get(key), M.entries), [])

/** @type {<K1>(key: K1) => <K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => Iterable<[K2, V]>} */
const entriesC = key => map => entries(map, key)

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => (key: K1) => Iterable<[K2, V]>} */
const entriesCR = map => key => entries(map, key)

/** @type {<K1, K2, V>(map: Map<K1, Map<K2, V>>, key1: K1, key2: K2, value: V) => boolean} */
const set = (map, key1, key2, value) => {
  const inner = map.get(key1)

  if (O.isSome(inner)) {
    if (inner.has(key2)) {
      return false
    }

    inner.set(key2, value)

    return true
  }

  map.set(key1, new Map([[key2, value]]))

  return true
}

/** @type {<K1, K2, V>(key1: K1, key2: K2, value: V) => (map: Map<K1, Map<K2, V>>) => boolean} */
const setC = (key1, key2, value) => map => set(map, key1, key2, value)

/** @type {<K1, K2, V>(map: Map<K1, Map<K2, V>>) => (key1: K1, key2: K2, value: V) => boolean} */
const setCR = map => (key1, key2, value) => set(map, key1, key2, value)

/** @type {<K1, K2, V>(map: Map<K1, Map<K2, V>>, key1: K1, key2: K2, value: V) => boolean} */
const setU = (map, key1, key2, value) => {
  const inner = map.get(key1)

  if (O.isSome(inner)) {
    const updated = inner.has(key2)
      && inner.get(key2) !== value

    inner.set(key2, value)

    return updated
  }

  map.set(key1, new Map([[key2, value]]))

  return false
}

/** @type {<K1, K2, V>(key1: K1, key2: K2, value: V) => (map: Map<K1, Map<K2, V>>) => boolean} */
const setUC = (key1, key2, value) => map => setU(map, key1, key2, value)

/** @type {<K1, K2, V>(map: Map<K1, Map<K2, V>>) => (key1: K1, key2: K2, value: V) => boolean} */
const setUCR = map => (key1, key2, value) => setU(map, key1, key2, value)

/** @type {<K1, K2, V>(map: Map<K1, Map<K2, V>>, key1: K1, key2: K2) => boolean} */
const remove = (map, key1, key2) => {
  const inner = map.get(key1)

  if (O.isNone(inner)) {
    return false
  }

  const deleted = inner.delete(key2)

  if (inner.size === 0) {
    map.delete(key1)
  }

  return deleted
}

/** @type {<K1, K2>(key1: K1, key2: K2) => <V>(map: Map<K1, Map<K2, V>>) => boolean} */
const removeC = (key1, key2) => map => remove(map, key1, key2)

/** @type {<K1, K2, V>(map: Map<K1, Map<K2, V>>) => (key1: K1, key2: K2) => boolean} */
const removeCR = map => (key1, key2) => remove(map, key1, key2)

// SECTION Exports

module.exports = { clone, has, hasC, hasCR, get, getC, getCR, keys, keysC, keysCR, values, valuesC, valuesCR, entries, entriesC, entriesCR, set, setC, setCR, setU, setUC, setUCR, remove, removeC, removeCR }
