// SECTION Types

// MODULE Imports

/** @template T @typedef {import('./option').Option<T>} Option */

// SECTION Library

/** @type {<K, V>(map: ReadonlyMap<K, V>) => Map<K, V>} */
const clone = map => new Map(map)

/** @type {<K, V>(map: ReadonlyMap<K, V>, key: K) => boolean} */
const has = (map, key) => map.has(key)

/** @type {<K>(key: K) => <V>(map: ReadonlyMap<K, V>) => boolean} */
const hasC = key => map => has(map, key)

/** @type {<K, V>(map: ReadonlyMap<K, V>) => (key: K) => boolean} */
const hasCR = map => key => has(map, key)

/** @type {<K, V>(map: ReadonlyMap<K, V>, key: K) => Option<V>} */
const get = (map, key) => map.get(key)

/** @type {<K>(key: K) => <V>(map: ReadonlyMap<K, V>) => Option<V>} */
const getC = key => map => get(map, key)

/** @type {<K, V>(map: ReadonlyMap<K, V>) => (key: K) => Option<V>} */
const getCR = map => key => get(map, key)

/** @type {<K, V>(map: ReadonlyMap<K, V>) => Iterable<K>} */
const keys = map => map.keys()

/** @type {<K, V>(map: ReadonlyMap<K, V>) => Iterable<V>} */
const values = map => map.values()

/** @type {<K, V>(map: ReadonlyMap<K, V>) => Iterable<[K, V]>} */
const entries = map => map.entries()

/** @type {<K, V>(map: Map<K, V>, key: K, value: V) => boolean} */
const set = (map, key, value) => {
  if (map.has(key)) {
    return false
  }

  map.set(key, value)

  return true
}

/** @type {<K, V>(key: K, value: V) => (map: Map<K, V>) => boolean} */
const setC = (key, value) => map => set(map, key, value)

/** @type {<K, V>(map: Map<K, V>) => (key: K, value: V) => boolean} */
const setCR = map => (key, value) => set(map, key, value)

/** @type {<K, V>(map: Map<K, V>, key: K, value: V) => boolean} */
const setU = (map, key, value) => {
  const updated = map.has(key)
    && map.get(key) !== value

  map.set(key, value)

  return updated
}

/** @type {<K, V>(key: K, value: V) => (map: Map<K, V>) => boolean} */
const setUC = (key, value) => map => setU(map, key, value)

/** @type {<K, V>(map: Map<K, V>) => (key: K, value: V) => boolean} */
const setUCR = map => (key, value) => setU(map, key, value)

/** @type {<K, V>(map: Map<K, V>, key: K) => boolean} */
const remove = (map, key) => map.delete(key)

/** @type {<K>(key: K) => <V>(map: Map<K, V>) => boolean} */
const removeC = key => map => remove(map, key)

/** @type {<K, V>(map: Map<K, V>) => (key: K) => boolean} */
const removeCR = map => key => remove(map, key)

// SECTION Exports

module.exports = { clone, has, hasC, hasCR, get, getC, getCR, keys, values, entries, set, setC, setCR, setU, setUC, setUCR, remove, removeC, removeCR }
