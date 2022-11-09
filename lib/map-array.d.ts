// SECTION Library

export const clone: <K, V>(map: ReadonlyMap<K, ReadonlyArray<V>>) => Map<K, Array<V>>

export const get: <K, V>(map: ReadonlyMap<K, ReadonlyArray<V>>, key: K) => ReadonlyArray<V>

export const getC: <K>(key: K) => <V>(map: ReadonlyMap<K, ReadonlyArray<V>>) => ReadonlyArray<V>

export const getCR: <K, V>(map: ReadonlyMap<K, ReadonlyArray<V>>) => (key: K) => ReadonlyArray<V>

export const add: <K, V>(map: Map<K, Array<V>>, key: K, value: V) => void

export const addC: <K, V>(key: K, value: V) => (map: Map<K, Array<V>>) => void

export const addCR: <K, V>(map: Map<K, Array<V>>) => (key: K, value: V) => void
