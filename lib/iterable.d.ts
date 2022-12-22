import * as B from './predicate'
import * as F from './function'
import * as O from './option'

// SECTION Library

export const forEach: <T>(iter: Iterable<T>, func: F.Arrow<T, void>) => void

export const forEachC: <T>(func: F.Arrow<T, void>) => (iter: Iterable<T>) => void

export const forEachCR: <T>(iter: Iterable<T>) => (func: F.Arrow<T, void>) => void

export const map: <P, R>(iter: Iterable<P>, func: F.Arrow<P, R>) => Iterable<R>

export const mapC: <P, R>(func: F.Arrow<P, R>) => F.Arrow<Iterable<P>, Iterable<R>>

export const mapCR: <P>(iter: Iterable<P>) => <R>(func: F.Arrow<P, R>) =>  Iterable<R>

export const filter: <T>(iter: Iterable<T>, predicate: B.Predicate<[T]>) => Iterable<T>

export const filterC: <T>(predicate: B.Predicate<[T]>) => (iter: Iterable<T>) => Iterable<T>

export const filterCR: <T>(iter: Iterable<T>) => (predicate: B.Predicate<[T]>) => Iterable<T>

export const merge: <T1, T2>(iter1: Iterable<T1>, iter2: Iterable<T2>) => Iterable<T1 | T2>

export const mergeC: <T1>(iter1: Iterable<T1>) => <T2>(iter2: Iterable<T2>) => Iterable<T1 | T2>

export const mergeCR: <T2>(iter2: Iterable<T2>) => <T1>(iter1: Iterable<T1>) => Iterable<T1 | T2>

export const reduce: <P, R>(iter: Iterable<R>, func: F.Func<[P, R], P>, init: P) => P

export const reduceC: <P, R>(func: F.Func<[P, R], P>, init: P) => (iter: Iterable<R>) => P

export const reduceCR: <R>(iter: Iterable<R>) => <P>(func: F.Func<[P, R], P>, init: P) => P

export const fold: <T>(iter: Iterable<T>, func: F.Semi<T>) => O.Option<T>

export const foldC: <T>(func: F.Semi<T>) => (iter: Iterable<T>) => O.Option<T>

export const foldCR: <T>(iter: Iterable<T>) => (func: F.Semi<T>) => O.Option<T>

export const countMatches: <T>(iter: Iterable<T>, predicate: B.Predicate<[T]>) => number

export const countMatchesC: <T>(predicate: B.Predicate<[T]>) => (iter: Iterable<T>) => number

export const countMatchesCR: <T>(iter: Iterable<T>) => (predicate: B.Predicate<[T]>) => number
