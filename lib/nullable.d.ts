import * as F from './function'

// SECTION Types

export type Null = null

export type Some<T> = T

export type Nullable<T> = Some<T> | Null

// SECTION Library

export const isNull: <T>(nullable: Nullable<T>) => nullable is Null

export const isSome: <T>(nullable: Nullable<T>) => nullable is Some<T>

export const map: <P, R>(nullable: Nullable<P>, func: F.Arrow<P, R>) => Nullable<R>

export const mapC: <P, R>(func: F.Arrow<P, R>) => (nullable: Nullable<P>) => Nullable<R>

export const mapCR: <P>(nullable: Nullable<P>) => <R>(func: F.Arrow<P, R>) => Nullable<R>

export const chain: <P, R>(nullable: Nullable<P>, func: F.Arrow<P, Nullable<R>>) => Nullable<R>

export const chainC: <P, R>(func: F.Arrow<P, Nullable<R>>) => (nullable: Nullable<P>) => Nullable<R>

export const chainCR: <P>(nullable: Nullable<P>) => <R>(func: F.Arrow<P, Nullable<R>>) => Nullable<R>

export const getOrElse: <T1, T2>(nullable: Nullable<T1>, value: T2) => T1 | T2

export const getOrElseL: <T1, T2>(nullable: Nullable<T1>, value: F.Lazy<T2>) => T1 | T2

export const getOrElseC: <T1>(value: T1) => <T2>(nullable: Nullable<T2>) => T1 | T2

export const getOrElseLC: <T1>(value: F.Lazy<T1>) => <T2>(nullable: Nullable<T2>) => T1 | T2

export const getOrElseCR: <T2>(nullable: Nullable<T2>) => <T1>(value: T1) => T1 | T2

export const getOrElseLCR: <T2>(nullable: Nullable<T2>) => <T1>(value: F.Lazy<T1>) => T1 | T2

export const fold: <P, R, N>(nullable: Nullable<P>, onSome: F.Arrow<P, R>, onNull: N) => R | N

export const foldL: <P, R, N>(nullable: Nullable<P>, onSome: F.Arrow<P, R>, onNull: F.Lazy<N>) => R | N

export const foldC: <P, R, N>(onSome: F.Arrow<P, R>, onNull: N) => (nullable: Nullable<P>) => R | N

export const foldLC: <P, R, N>(onSome: F.Arrow<P, R>, onNull: F.Lazy<N>) => (nullable: Nullable<P>) => R | N

export const foldCR: <P>(nullable: Nullable<P>) => <R, N>(onSome: F.Arrow<P, R>, onNull: N) => R | N

export const foldLCR: <P>(nullable: Nullable<P>) => <R, N>(onSome: F.Arrow<P, R>, onNull: F.Lazy<N>) => R | N
