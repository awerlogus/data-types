const O = require('./option')

// SECTION Library

/** @type {<K, V>(map: ReadonlyMap<K, ReadonlyArray<V>>) => Map<K, Array<V>>} */
const clone = map => {
  /** @type {Map<any, Array<any>>} */
  const result = new Map()

  for (const [k, v] of map) {
    result.set(k, Array.from(v))
  }

  return result
}

/** @type {<K, V>(map: ReadonlyMap<K, ReadonlyArray<V>>, key: K) => ReadonlyArray<V>} */
const get = (map, key) => O.getOrElse(map.get(key), [])

/** @type {<K>(key: K) => <V>(map: ReadonlyMap<K, ReadonlyArray<V>>) => ReadonlyArray<V>} */
const getC = key => map => get(map, key)

/** @type {<K, V>(map: ReadonlyMap<K, ReadonlyArray<V>>) => (key: K) => ReadonlyArray<V>} */
const getCR = map => key => get(map, key)

/** @type {<K, V>(map: Map<K, Array<V>>, key: K, value: V) => void} */
const add = (map, key, value) => {
  const array = map.get(key)

  if (O.isNone(array)) {
    map.set(key, [value])
  } else {
    array.push(value)
  }
}

/** @type {<K, V>(key: K, value: V) => (map: Map<K, Array<V>>) => void} */
const addC = (key, value) => map => add(map, key, value)

/** @type {<K, V>(map: Map<K, Array<V>>) => (key: K, value: V) => void} */
const addCR = map => (key, value) => add(map, key, value)

// SECTION Exports

module.exports = { clone, get, getC, getCR, add, addC, addCR }
