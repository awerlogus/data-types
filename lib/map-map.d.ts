import * as F from './function'
import * as O from './option'

// SECTION Types

export type Elem<MM extends ReadonlyMap<any, ReadonlyMap<any, any>>> = MM extends ReadonlyMap<any, ReadonlyMap<any, infer E>> ? E : never

// SECTION Library

export const clone: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => Map<K1, Map<K2, V>>

export const has: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>, key1: K1, key2: K2) => boolean

export const hasC: <K1, K2>(key1: K1, key2: K2) => <V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => boolean

export const hasCR: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => (key1: K1, key2: K2) => boolean

export const get: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>, key1: K1, key2: K2) => O.Option<V>

export const getC: <K1, K2>(key1: K1, key2: K2) => <V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => O.Option<V>

export const getCR: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => (key1: K1, key2: K2) => O.Option<V>

export const getUnsafe: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>, key1: K1, key2: K2) => V

export const getUnsafeC: <K1, K2>(key1: K1, key2: K2) => <V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => V

export const getUnsafeCR: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => (key1: K1, key2: K2) => V

export const keys: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>, key: K1) => Iterable<K2>

export const keysC: <K1>(key: K1) => <K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => Iterable<K2>

export const keysCR: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => (key: K1) => Iterable<K2>

export const values: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>, key: K1) => Iterable<V>

export const valuesC: <K1>(key: K1) => <K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => Iterable<V>

export const valuesCR: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => (key: K1) => Iterable<V>

export const entries: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>, key: K1) => Iterable<[K2, V]>

export const entriesC: <K1>(key: K1) => <K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => Iterable<[K2, V]>

export const entriesCR: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => (key: K1) => Iterable<[K2, V]>

/** @deprecated */
export const set: <K1, K2, V>(map: Map<K1, Map<K2, V>>, key1: K1, key2: K2, value: V) => boolean

/** @deprecated */
export const setC: <K1, K2, V>(key1: K1, key2: K2, value: V) => (map: Map<K1, Map<K2, V>>) => boolean

/** @deprecated */
export const setCR: <K1, K2, V>(map: Map<K1, Map<K2, V>>) => (key1: K1, key2: K2, value: V) => boolean

export const insert: <K1, K2, V>(map: Map<K1, Map<K2, V>>, key1: K1, key2: K2, value: V) => boolean

export const insertC: <K1, K2, V>(key1: K1, key2: K2, value: V) => (map: Map<K1, Map<K2, V>>) => boolean

export const insertCR: <K1, K2, V>(map: Map<K1, Map<K2, V>>) => (key1: K1, key2: K2, value: V) => boolean

/** @deprecated */
export const setU: <K1, K2, V>(map: Map<K1, Map<K2, V>>, key1: K1, key2: K2, value: V) => boolean

/** @deprecated */
export const setUC: <K1, K2, V>(key1: K1, key2: K2, value: V) => (map: Map<K1, Map<K2, V>>) => boolean

/** @deprecated */
export const setUCR: <K1, K2, V>(map: Map<K1, Map<K2, V>>) => (key1: K1, key2: K2, value: V) => boolean

export const update: <K1, K2, V>(map: Map<K1, Map<K2, V>>, key1: K1, key2: K2, value: V) => boolean

export const updateC: <K1, K2, V>(key1: K1, key2: K2, value: V) => (map: Map<K1, Map<K2, V>>) => boolean

export const updateCR: <K1, K2, V>(map: Map<K1, Map<K2, V>>) => (key1: K1, key2: K2, value: V) => boolean

export const upsert: <K1, K2, V>(map: Map<K1, Map<K2, V>>, key1: K1, key2: K2, value: V) => boolean

export const upsertC: <K1, K2, V>(key1: K1, key2: K2, value: V) => (map: Map<K1, Map<K2, V>>) => boolean

export const upsertCR: <K1, K2, V>(map: Map<K1, Map<K2, V>>) => (key1: K1, key2: K2, value: V) => boolean

export const remove: <K1, K2, V>(map: Map<K1, Map<K2, V>>, key1: K1, key2: K2) => boolean

export const removeC: <K1, K2>(key1: K1, key2: K2) => <V>(map: Map<K1, Map<K2, V>>) => boolean

export const removeCR: <K1, K2, V>(map: Map<K1, Map<K2, V>>) => (key1: K1, key2: K2) => boolean

export const mapValues: <K1, K2, VP, VR>(map: ReadonlyMap<K1, ReadonlyMap<K2, VP>>, func: F.Arrow<VP, VR>) => Map<K1, Map<K2, VR>>

export const mapValuesC: <VP, VR>(func: F.Arrow<VP, VR>) => <K1, K2>(map: ReadonlyMap<K1, ReadonlyMap<K2, VP>>) => Map<K1, Map<K2, VR>>

export const mapValuesCR: <K1, K2, VP>(map: ReadonlyMap<K1, ReadonlyMap<K2, VP>>) => <VR>(func: F.Arrow<VP, VR>) => Map<K1, Map<K2, VR>>

export const valuesDisjoint: <K1, K2, V>(map: ReadonlyMap<K1, ReadonlyMap<K2, V>>) => boolean
