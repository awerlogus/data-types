const MA = require('./map-array')
const O = require('./option')

// SECTION Library

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlyArray<V>>>) => Map<K1, Map<K2, Array<V>>>} */
const clone = map => {
  /** @type {Map<any, Map<any, any>>} */
  const result = new Map()

  for (const [k, v] of map) {
    result.set(k, MA.clone(v))
  }

  return result
}

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlyArray<V>>>, key1: K1, key2: K2) => ReadonlyArray<V>} */
const get = (map, key1, key2) => O.getOrElse(O.map(map.get(key1), MA.getC(key2)), [])

/** @type {<K1, K2>(key1: K1, key2: K2) => <V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlyArray<V>>>) => ReadonlyArray<V>} */
const getC = (key1, key2) => map => get(map, key1, key2)

/** @type {<K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlyArray<V>>>) => (key1: K1, key2: K2) => ReadonlyArray<V>} */
const getCR = map => (key1, key2) => get(map, key1, key2)

/** @type {<K1, K2, V>(map: Map<K1, Map<K2, Array<V>>>, key1: K1, key2: K2, value: V) => void} */
const add = (map, key1, key2, value) => {
  const inner = map.get(key1)

  if (O.isNone(inner)) {
    map.set(key1, new Map([[key2, [value]]]))
  } else {
    MA.add(inner, key2, value)
  }
}

/** @type {<K1, K2, V>(key1: K1, key2: K2, value: V) => (map: Map<K1, Map<K2, Array<V>>>) => void} */
const addC = (key1, key2, value) => map => add(map, key1, key2, value)

/** @type {<K1, K2, V>(map: Map<K1, Map<K2, Array<V>>>) => (key1: K1, key2: K2, value: V) => void} */
const addCR = map => (key1, key2, value) => add(map, key1, key2, value)

// SECTION Exports

module.exports = { clone, get, getC, getCR, add, addC, addCR }
