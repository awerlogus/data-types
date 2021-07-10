import * as B from './predicate'
import * as F from './function'

// SECTION Library

export const union: <T1, T2>(set1: Set<T1>, set2: Set<T2>) => Set<T1 | T2>

export const unionC: <T1>(set1: Set<T1>) => <T2>(set2: Set<T2>) => Set<T1 | T2>

export const separate: <T>(set: Set<T>, predicate: B.Predicate<[T]>) => [onTrue: Set<T>, onFalse: Set<T>]

export const separateC: <T>(predicate: B.Predicate<[T]>) => (set: Set<T>) => [onTrue: Set<T>, onFalse: Set<T>]

export const some: <T>(set: Set<T>, predicate: B.Predicate<[T]>) => boolean

export const someC: <T>(predicate: B.Predicate<[T]>) => B.Predicate<[Set<T>]>

export const none: <T>(set: Set<T>, predicate: B.Predicate<[T]>) => boolean

export const noneC: <T>(predicate: B.Predicate<[T]>) => B.Predicate<[Set<T>]>

export const every: <T>(set: Set<T>, predicate: B.Predicate<[T]>) => boolean

export const everyC: <T>(predicate: B.Predicate<[T]>) => B.Predicate<[Set<T>]>

export const map: <I, O>(set: Set<I>, func: F.F.Arrow<I, O>) => Set<O>

export const mapC: <I, O>(func: F.Arrow<I, O>) => F.Arrow<Set<I>, Set<O>>

export const chain: <I, O>(set: Set<I>, func: F.F.Arrow<I, Set<O>>) => Set<O>

export const chainC: <I, O>(func: F.Arrow<I, Set<O>>) => F.Arrow<Set<I>, Set<O>>

export const filter: <T>(set: Set<T>, predicate: B.Predicate<[T]>) => Set<T>

export const filterC: <T>(predicate: B.Predicate<[T]>) => F.Endo<Set<T>>

export const empty: B.Predicate<[Set<any>]>
