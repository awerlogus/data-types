import * as F from './function'
import * as N from './nullable'
import * as NO from './nilable'
import * as O from './option'

// SECTION Types

export type Err = readonly []

export type Ok<T> = readonly [T]

export type Result<T> = Err | Ok<T>

// SECTION Library

export const err: Result<never>

export const ok: <T>(data: T) => Result<T>

export const isErr: <T>(result: Result<T>) => result is Err

export const isOk: <T>(result: Result<T>) => result is Ok<T>

export const get: <T>(result: Ok<T>) => T

export const map: <P, R>(result: Result<P>, func: F.Arrow<P, R>) => Result<R>

export const mapC: <P, R>(func: F.Arrow<P, R>) => (result: Result<P>) => Result<R>

export const mapCR: <P>(result: Result<P>) => <R>(func: F.Arrow<P, R>) => Result<R>

export const chain: <P, R>(result: Result<P>, func: F.Arrow<P, Result<R>>) => Result<R>

export const chainC: <P, R>(func: F.Arrow<P, Result<R>>) => (result: Result<P>) => Result<R>

export const chainCR: <P>(result: Result<P>) => <R>(func: F.Arrow<P, Result<R>>) => Result<R>

export const getOrElse: <T1, T2>(result: Result<T1>, value: T2) => T1 | T2

export const getOrElseL: <T1, T2>(result: Result<T1>, value: F.Lazy<T2>) => T1 | T2

export const getOrElseC: <T1>(value: T1) => <T2>(result: Result<T2>) => T1 | T2

export const getOrElseLC: <T1>(value: F.Lazy<T1>) => <T2>(result: Result<T2>) => T1 | T2

export const getOrElseCR: <T2>(result: Result<T2>) => <T1>(value: T1) => T1 | T2

export const getOrElseLCR: <T2>(result: Result<T2>) => <T1>(value: F.Lazy<T1>) => T1 | T2

export const fromOption: <T>(option: O.Option<T>) => Result<T>

export const fromNullable: <T>(option: N.Nullable<T>) => Result<T>

export const fromNilable: <T>(option: NO.Nilable<T>) => Result<T>
