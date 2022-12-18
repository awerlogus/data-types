// SECTION Types

export type Elem<MMS extends ReadonlyMap<any, ReadonlyMap<any, ReadonlySet<any>>>> = MMS extends ReadonlyMap<any, ReadonlyMap<any, ReadonlySet<infer E>>> ? E : never

// SECTION Library

export const clone: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlySet<V>>>) => Map<K1, Map<K2, Set<V>>>

export const has: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlySet<V>>>, key1: K1, key2: K2, value: V) => boolean

export const hasC: <K1, K2, V>(key1: K1, key2: K2, value: V) => (map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlySet<V>>>) => boolean

export const hasCR: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlySet<V>>>) => (key1: K1, key2: K2, value: V) => boolean

export const get: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlySet<V>>>, key1: K1, key2: K2) => ReadonlySet<V>

export const getC: <K1, K2>(key1: K1, key2: K2) => <V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlySet<V>>>) => ReadonlySet<V>

export const getCR: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlySet<V>>>) => (key1: K1, key2: K2) => ReadonlySet<V>

export const add: <K1, K2, V>(map: Map<K1, Map<K2, Set<V>>>, key1: K1, key2: K2, value: V) => boolean

export const addC: <K1, K2, V>(key1: K1, key2: K2, value: V) => (map: Map<K1, Map<K2, Set<V>>>) => boolean

export const addCR: <K1, K2, V>(map: Map<K1, Map<K2, Set<V>>>) => (key1: K1, key2: K2, value: V) => boolean

export const remove: <K1, K2, V>(map: Map<K1, Map<K2, Set<V>>>, key1: K1, key2: K2, value: V) => boolean

export const removeC: <K1, K2, V>(key1: K1, key2: K2, value: V) => (map: Map<K1, Map<K2, Set<V>>>) => boolean

export const removeCR: <K1, K2, V>(map: Map<K1, Map<K2, Set<V>>>) => (key1: K1, key2: K2, value: V) => boolean

export const valuesDisjoint: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, ReadonlySet<V>>>) => boolean
