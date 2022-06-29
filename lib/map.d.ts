import * as O from './option'

// SECTION Library

export const clone: <K, V>(map: ReadonlyMap<K, V>) => Map<K, V>

export const has: <K, V>(map: ReadonlyMap<K, V>, key: K) => boolean

export const hasC: <K>(key: K) => <V>(map: ReadonlyMap<K, V>) => boolean

export const hasCR: <K, V>(map: ReadonlyMap<K, V>) => (key: K) => boolean

export const get: <K, V>(map: ReadonlyMap<K, V>, key: K) => O.Option<V>

export const getC: <K>(key: K) => <V>(map: ReadonlyMap<K, V>) => O.Option<V>

export const getCR: <K, V>(map: ReadonlyMap<K, V>) => (key: K) => O.Option<V>

export const keys: <K, V>(map: ReadonlyMap<K, V>) => Iterable<K>

export const values: <K, V>(map: ReadonlyMap<K, V>) => Iterable<V>

export const entries: <K, V>(map: ReadonlyMap<K, V>) => Iterable<[K, V]>

export const set: <K, V>(map: Map<K, V>, key: K, value: V) => boolean

export const setC: <K, V>(key: K, value: V) => (map: Map<K, V>) => boolean

export const setCR: <K, V>(map: Map<K, V>) => (key: K, value: V) => boolean

export const setU: <K, V>(map: Map<K, V>, key: K, value: V) => boolean

export const setUC: <K, V>(key: K, value: V) => (map: Map<K, V>) => boolean

export const setUCR: <K, V>(map: Map<K, V>) => (key: K, value: V) => boolean

export const remove: <K, V>(map: Map<K, V>, key: K) => boolean

export const removeC: <K>(key: K) => <V>(map: Map<K, V>) => boolean

export const removeCR: <K, V>(map: Map<K, V>) => (key: K) => boolean