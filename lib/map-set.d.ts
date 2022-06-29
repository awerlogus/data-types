// SECTION Library

export const clone: <K, V>(map: ReadonlyMap<K, ReadonlySet<V>>) => Map<K, Set<V>>

export const has: <K, V>(map: ReadonlyMap<K, ReadonlySet<V>>, key: K, value: V) => boolean

export const hasC: <K, V>(key: K, value: V) => (map: ReadonlyMap<K, ReadonlySet<V>>) => boolean

export const hasCR: <K, V>(map: ReadonlyMap<K, ReadonlySet<V>>) => (key: K, value: V) => boolean

export const get: <K, V>(map: ReadonlyMap<K, ReadonlySet<V>>, key: K) => ReadonlySet<V>

export const getC: <K>(key: K) => <V>(map: ReadonlyMap<K, ReadonlySet<V>>) => ReadonlySet<V>

export const getCR: <K, V>(map: ReadonlyMap<K, ReadonlySet<V>>) => (key: K) => ReadonlySet<V>

export const add: <K, V>(map: Map<K, Set<V>>, key: K, value: V) => boolean

export const addC: <K, V>(key: K, value: V) => (map: Map<K, Set<V>>) => boolean

export const addCR: <K, V>(map: Map<K, Set<V>>) => (key: K, value: V) => boolean

export const remove: <K, V>(map: Map<K, Set<V>>, key: K, value: V) => boolean

export const removeC: <K, V>(key: K, value: V) => (map: Map<K, Set<V>>) => boolean

export const removeCR: <K, V>(map: Map<K, Set<V>>) => (key: K, value: V) => boolean
