import { Arrow, Lazy } from './function'

// SECTION Types

export type Null = null

export type Some<T> = T

export type Nullable<T> = Some<T> | Null

// SECTION Library

export const some: <T>(data: T) => Nullable<T>

export const isNull: <T>(data: Nullable<T>) => data is Null

export const isSome: <T>(data: Nullable<T>) => data is Some<T>

export const map: <P, R>(func: Arrow<P, R>) => Arrow<Nullable<P>, Nullable<R>>

export const chain: <P, R>(func: Arrow<P, Nullable<R>>) => Arrow<Nullable<P>, Nullable<R>>

export const getOrElse: <T1>(value: Lazy<T1>) => <T2>(data: Nullable<T2>) => T1 | T2

export const fold: <P, R, N>(onSome: Arrow<P, R>, onNull: N) => Arrow<Nullable<P>, R | N>

export const foldL: <P, R, N>(onSome: Arrow<P, R>, onNull: Lazy<N>) => Arrow<Nullable<P>, R | N>
