import * as F from './function'

// SECTION Types

export type None = undefined

export type Some<T> = T

export type Option<T> = Some<T> | None

// SECTION Library

export const none: Option<never>

export const isNone: <T>(option: Option<T>) => option is None

export const isSome: <T>(option: Option<T>) => option is Some<T>

export const map: <P, R>(option: Option<P>, func: F.Arrow<P, R>) => Option<R>

export const mapC: <P, R>(func: F.Arrow<P, R>) => (option: Option<P>) => Option<R>

export const mapCR: <P>(option: Option<P>) => <R>(func: F.Arrow<P, R>) => Option<R>

export const chain: <P, R>(option: Option<P>, func: F.Arrow<P, Option<R>>) => Option<R>

export const chainC: <P, R>(func: F.Arrow<P, Option<R>>) => (option: Option<P>) => Option<R>

export const chainCR: <P>(option: Option<P>) => <R>(func: F.Arrow<P, Option<R>>) => Option<R>

export const getOrElse: <T1, T2>(option: Option<T1>, value: T2) => T1 | T2

export const getOrElseL: <T1, T2>(option: Option<T1>, value: F.Lazy<T2>) => T1 | T2

export const getOrElseC: <T1>(value: T1) => <T2>(option: Option<T2>) => T1 | T2

export const getOrElseLC: <T1>(value: F.Lazy<T1>) => <T2>(option: Option<T2>) => T1 | T2

export const getOrElseCR: <T2>(option: Option<T2>) => <T1>(value: T1) => T1 | T2

export const getOrElseLCR: <T2>(option: Option<T2>) => <T1>(value: F.Lazy<T1>) => T1 | T2

export const fold: <P, R, N>(option: Option<P>, onSome: F.Arrow<P, R>, onNone: N) => R | N

export const foldL: <P, R, N>(option: Option<P>, onSome: F.Arrow<P, R>, onNone: F.Lazy<N>) => R | N

export const foldC: <P, R, N>(onSome: F.Arrow<P, R>, onNone: N) => (option: Option<P>) => R | N

export const foldLC: <P, R, N>(onSome: F.Arrow<P, R>, onNone: F.Lazy<N>) => (option: Option<P>) => R | N

export const foldCR: <P>(option: Option<P>) => <R, N>(onSome: F.Arrow<P, R>, onNone: N) => R | N

export const foldLCR: <P>(option: Option<P>) => <R, N>(onSome: F.Arrow<P, R>, onNone: F.Lazy<N>) => R | N
