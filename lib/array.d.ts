import * as B from './predicate'
import * as F from './function'
import * as O from './option'

// SECTION Types

export type Mutable<T extends ReadonlyArray<any>> = Array<Elem<T>>

export type Elem<T extends ReadonlyArray<any>> = T extends ReadonlyArray<infer E> ? E : never

// SECTION Library

export const map: <P, R>(array: ReadonlyArray<P>, func: F.Arrow<P, R>) => Array<R>

export const setAt: <T>(array: ReadonlyArray<T>, index: number, data: T) => Array<T>

export const mapC: <P, R>(func: F.Arrow<P, R>) => (array: ReadonlyArray<P>) => Array<R>

export const mapCR: <P>(array: ReadonlyArray<P>) => <R>(func: F.Arrow<P, R>) => Array<R>

export const filter: <T>(array: ReadonlyArray<T>, predicate: B.Predicate<[T]>) => Array<T>

export const filterC: <T>(predicate: B.Predicate<[T]>) => (array: ReadonlyArray<T>) => Array<T>

export const filterCR: <T>(array: ReadonlyArray<T>) => (predicate: B.Predicate<[T]>) => Array<T>

export const separate: <T>(array: ReadonlyArray<T>, predicate: B.Predicate<[T]>) => [Array<T>, Array<T>]

export const separateC: <T>(predicate: B.Predicate<[T]>) => (array: ReadonlyArray<T>) => [Array<T>, Array<T>]

export const separateCR: <T>(array: ReadonlyArray<T>) => (predicate: B.Predicate<[T]>) => [Array<T>, Array<T>]

export const first: <T extends ReadonlyArray<any>>(array: T) => T extends { readonly 0: any } ? T[0] : O.Option<T[0]>

export const zip: <T1, T2, R>(array1: ReadonlyArray<T1>, array2: ReadonlyArray<T2>, zipper: F.Func<[T1, T2], R>) => Array<R>

export const zipC: <T1, T2, R>(zipper: F.Func<[T1, T2], R>) => (array1: ReadonlyArray<T1>, array2: ReadonlyArray<T2>) => Array<R>

export const zipCR: <T1, T2>(array1: ReadonlyArray<T1>, array2: ReadonlyArray<T2>) => <R>(zipper: F.Func<[T1, T2], R>) => Array<R>
