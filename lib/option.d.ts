import { Arrow, Lazy } from './function'

// SECTION Types

export type None = undefined

export type Some<T> = T

export type Option<T> = Some<T> | None

// SECTION Library

export const none: Option<never>

export const some: <T>(data: T) => Option<T>

export const isNone: <T>(data: Option<T>) => data is None

export const isSome: <T>(data: Option<T>) => data is Some<T>

export const map: <P, R>(func: Arrow<P, R>) => Arrow<Option<P>, Option<R>>

export const chain: <P, R>(func: Arrow<P, Option<R>>) => Arrow<Option<P>, Option<R>>

export const getOrElse: <T1>(value: Lazy<T1>) => <T2>(data: Option<T2>) => T1 | T2

export const fold: <P, R, N>(onSome: Arrow<P, R>, onNone: N) => Arrow<Option<P>, R | N>

export const foldL: <P, R, N>(onSome: Arrow<P, R>, onNone: Lazy<N>) => Arrow<Option<P>, R | N>
