import * as B from './predicate'
import * as F from './function'

// SECTION Types

export type Mutable<S extends ReadonlySet<any>> = Set<Elem<S>>

export type Elem<S extends ReadonlySet<any>> = S extends ReadonlySet<infer E> ? E : never

// SECTION Library

export const clone: <T>(set: ReadonlySet<T>) => Set<T>

export const has: <T>(set: ReadonlySet<T>, value: T) => boolean

export const hasC: <T>(value: T) => (set: ReadonlySet<T>) => boolean

export const hasCR: <T>(set: ReadonlySet<T>) => (value: T) => boolean

export const add: <T>(set: Set<T>, value: T) => boolean

export const addC: <T>(value: T) => (set: Set<T>) => boolean

export const addCR: <T>(set: Set<T>) => (value: T) => boolean

export const remove: <T>(set: Set<T>, value: T) => boolean

export const removeC: <T>(value: T) => (set: Set<T>) => boolean

export const removeCR: <T>(set: Set<T>) => (value: T) => boolean

export const union: <T1, T2>(set1: ReadonlySet<T1>, set2: ReadonlySet<T2>) => Set<T1 | T2>

export const unionC: <T1>(set1: ReadonlySet<T1>) => <T2>(set2: ReadonlySet<T2>) => Set<T1 | T2>

export const separate: <T>(set: ReadonlySet<T>, predicate: B.Predicate<[T]>) => [onTrue: Set<T>, onFalse: Set<T>]

export const separateC: <T>(predicate: B.Predicate<[T]>) => (set: ReadonlySet<T>) => [onTrue: Set<T>, onFalse: Set<T>]

export const some: <T>(set: ReadonlySet<T>, predicate: B.Predicate<[T]>) => boolean

export const someC: <T>(predicate: B.Predicate<[T]>) => B.Predicate<[ReadonlySet<T>]>

export const none: <T>(set: ReadonlySet<T>, predicate: B.Predicate<[T]>) => boolean

export const noneC: <T>(predicate: B.Predicate<[T]>) => B.Predicate<[ReadonlySet<T>]>

export const every: <T>(set: ReadonlySet<T>, predicate: B.Predicate<[T]>) => boolean

export const everyC: <T>(predicate: B.Predicate<[T]>) => B.Predicate<[ReadonlySet<T>]>

export const map: <I, O>(set: ReadonlySet<I>, func: F.Arrow<I, O>) => Set<O>

export const mapC: <I, O>(func: F.Arrow<I, O>) => F.Arrow<ReadonlySet<I>, Set<O>>

export const chain: <I, O>(set: ReadonlySet<I>, func: F.Arrow<I, Set<O>>) => Set<O>

export const chainC: <I, O>(func: F.Arrow<I, Set<O>>) => F.Arrow<ReadonlySet<I>, Set<O>>

export const filter: <T>(set: ReadonlySet<T>, predicate: B.Predicate<[T]>) => Set<T>

export const filterC: <T>(predicate: B.Predicate<[T]>) => F.Arrow<ReadonlySet<T>, Set<T>>

export const equal: <T>(set1: ReadonlySet<T>, set2: ReadonlySet<T>) => boolean

export const equalC: <T>(set1: ReadonlySet<T>) => (set2: ReadonlySet<T>) => boolean

export const empty: B.Predicate<[ReadonlySet<any>]>

export const nonEmpty: B.Predicate<[ReadonlySet<any>]>

export const intersects: <T>(set1: ReadonlySet<T>, set2: ReadonlySet<T>) => boolean

export const intersectsC: <T>(set1: ReadonlySet<T>) => (set2: ReadonlySet<T>) => boolean

export const disjoint: <T>(set1: ReadonlySet<T>, set2: ReadonlySet<T>) => boolean

export const disjointC: <T>(set1: ReadonlySet<T>) => (set2: ReadonlySet<T>) => boolean
