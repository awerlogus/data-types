// SECTION Library

export const clone: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlyArray<V>>>) => Map<K1, Map<K2, Array<V>>>

export const get: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlyArray<V>>>, key1: K1, key2: K2) => ReadonlyArray<V>

export const getC: <K1, K2>(key1: K1, key2: K2) => <V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlyArray<V>>>) => ReadonlyArray<V>

export const getCR: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlyArray<V>>>) => (key1: K1, key2: K2) => ReadonlyArray<V>

export const add: <K1, K2, V>(map: Map<K1, Map<K2, Array<V>>>, key1: K1, key2: K2, value: V) => void

export const addC: <K1, K2, V>(key1: K1, key2: K2, value: V) => (map: Map<K1, Map<K2, Array<V>>>) => void

export const addCR: <K1, K2, V>(map: Map<K1, Map<K2, Array<V>>>) => (key1: K1, key2: K2, value: V) => void
