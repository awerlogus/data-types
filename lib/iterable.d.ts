import * as B from './predicate'
import * as F from './function'
import * as O from './option'

// SECTION Library

export const forEach: <T>(iter: Iterable<T>, func: F.Arrow<T, void>) => void

export const forEachC: <T>(func: F.Arrow<T, void>) => F.Arrow<Iterable<T>, void>

export const map: <T, R>(iter: Iterable<T>, func: F.Arrow<T, R>) => Iterable<R>

export const mapC: <T, R>(func: F.Arrow<T, R>) => F.Arrow<Iterable<T>, Iterable<R>>

export const filter: <T>(iter: Iterable<T>, predicate: B.Predicate<[T]>) => Iterable<T>

export const filterC: <T>(predicate: B.Predicate<[T]>) => F.Endo<Iterable<T>>

export const merge: <T1, T2>(iter1: Iterable<T1>, iter2: Iterable<T2>) => Iterable<T1 | T2>

export const mergeC: <T1>(iter1: Iterable<T1>) => <T2>(iter2: Iterable<T2>) => Iterable<T1 | T2>

export const reduce: <A, B>(iter: Iterable<B>, func: F.Func<[A, B], A>, init: A) => A

export const reduceC: <A, B>(func: F.Func<[A, B], A>, init: A) => F.Arrow<Iterable<B>, A>

export const fold: <A>(iter: Iterable<A>, func: F.Semi<A>) => O.Option<A>

export const foldC: <A>(func: F.Semi<A>) => F.Arrow<Iterable<A>, O.Option<A>>

export const countMatches: <T>(iter: Iterable<T>, predicate: B.Predicate<[T]>) => number

export const countMatchesC: <T>(predicate: B.Predicate<[T]>) => F.Arrow<Iterable<T>, number>
