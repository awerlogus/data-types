import { Arrow, Endo } from './function'
import { Predicate } from './predicate'

// SECTION Library

export const create: <T = never>(elements?: Iterable<T>) => Set<T>

export const union: <T1, T2>(set1: Set<T1>, set2: Set<T2>) => Set<T1 | T2>

export const separate: <T>(predicate: Predicate<[T]>) => (set: Set<T>) => [onTrue: Set<T>, onFalse: Set<T>]

export const some: <T>(predicate: Predicate<[T]>) => Predicate<[Set<T>]>

export const every: <T>(predicate: Predicate<[T]>) => Predicate<[Set<T>]>

export const none: <T>(predicate: Predicate<[T]>) => Predicate<[Set<T>]>

export const map: <I, O>(func: Arrow<I, O>) => Arrow<Set<I>, Set<O>>

export const chain: <I, O>(func: Arrow<I, Set<O>>) => Arrow<Set<I>, Set<O>>

export const filter: <T>(predicate: Predicate<[T]>) => Endo<Set<T>>

export const empty: Predicate<[Set<any>]>
