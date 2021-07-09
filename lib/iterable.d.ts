import { Endo, Arrow } from './function'
import { Predicate } from './predicate'
import { Option } from './option'

// SECTION Library

export const forEach: <T>(func: Arrow<T, void>) => Arrow<Iterable<T>, void>

export const map: <T, R>(func: Arrow<T, R>) => Arrow<Iterable<T>, Iterable<R>>

export const filter: <T>(predicate: Predicate<[T]>) => Endo<Iterable<T>>

export const merge: <T1, T2>(iter1: Iterable<T1>, iter2: Iterable<T2>) => Iterable<T1 | T2>

export const reduce: <A, B>(func: (acc: A, elem: B) => A, init: A) => (iter: Iterable<B>) => A

export const fold: <A>(func: (acc: A, elem: A) => A) => (iter: Iterable<A>) => O.Option<A>

export const countMatches: <T>(predicate: Predicate<[T]>) => (iter: Iterable<T>) => number
