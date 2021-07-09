import { Arrow, Lazy } from './function'
import * as N from './nullable'
import * as O from './option'

// SECTION Types

export type Some<T> = T

export type Nil = O.None | N.Null

export type Nilable<T> = Some<T> | Nil

// SECTION Library

export const some: <T>(data: T) => Nilable<T>

export const isNil: <T>(data: Nilable<T>) => data is Nil

export const isSome: <T>(data: Nilable<T>) => data is Some<T>

export const map: <P, R>(func: Arrow<P, R>) => Arrow<Nilable<P>, Nilable<R>>

export const chain: <P, R>(func: Arrow<P, Nilable<R>>) => Arrow<Nilable<P>, Nilable<R>>

export const getOrElse: <T1>(value: Lazy<T1>) => <T2>(data: Nilable<T2>) => T1 | T2

export const fold: <P, R, N>(onSome: Arrow<P, R>, onNull: N) => Arrow<Nilable<P>, R | N>

export const foldL: <P, R, N>(onSome: Arrow<P, R>, onNull: Lazy<N>) => Arrow<Nilable<P>, R | N>

export const toNullable: <T>(value: O.Option<T>) => N.Nullable<T>

export const toOption: <T>(value: N.Nullable<T>) => O.Option<T>
