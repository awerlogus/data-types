import * as F from './function'
import * as N from './nullable'
import * as O from './option'

// SECTION Types

export type Some<T> = T

export type Nil = O.None | N.Null

export type Nilable<T> = Some<T> | Nil

// SECTION Library

export const some: <T>(data: T) => Nilable<T>

export const isNil: <T>(nilable: Nilable<T>) => nilable is Nil

export const isSome: <T>(nilable: Nilable<T>) => nilable is Some<T>

export const map: <P, R>(nilable: Nilable<P>, func: F.Arrow<P, R>) => Nilable<R>

export const mapC: <P, R>(func: F.Arrow<P, R>) => F.Arrow<Nilable<P>, Nilable<R>>

export const chain: <P, R>(nilable: Nilable<P>, func: F.Arrow<P, Nilable<R>>) => Nilable<R>

export const chainC: <P, R>(func: F.Arrow<P, Nilable<R>>) => F.Arrow<Nilable<P>, Nilable<R>>

export const getOrElse: <T1, T2>(nilable: Nilable<T1>, value: T2) => T1 | T2

export const getOrElseL: <T1, T2>(nilable: Nilable<T1>, value: F.Lazy<T2>) => T1 | T2

export const getOrElseC: <T1>(value: T1) => <T2>(nilable: Nilable<T2>) => T1 | T2

export const getOrElseLC: <T1>(value: F.Lazy<T1>) => <T2>(nilable: Nilable<T2>) => T1 | T2

export const fold: <P, R, N>(nilable: Nilable<P>, onSome: F.Arrow<P, R>, onNil: N) => R | N

export const foldL: <P, R, N>(nilable: Nilable<P>, onSome: F.Arrow<P, R>, onNil: F.Lazy<N>) => R | N

export const foldC: <P, R, N>(onSome: F.Arrow<P, R>, onNull: N) => F.Arrow<Nilable<P>, R | N>

export const foldLC: <P, R, N>(onSome: F.Arrow<P, R>, onNull: F.Lazy<N>) => F.Arrow<Nilable<P>, R | N>

export const toNullable: <T>(value: O.Option<T>) => N.Nullable<T>

export const toOption: <T>(value: N.Nullable<T>) => O.Option<T>
