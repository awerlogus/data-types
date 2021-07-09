import { Arrow, Lazy } from './function'
import { Option } from './option'

// SECTION Types

export type Err = []

export type Ok<T> = [T]

export type Result<T> = Err | Ok<T>

// SECTION Constants

export const err: Result<never>

export const ok: <T>(data: T) => Result<T>

// SECTION Library

export const isErr: <T>(data: Result<T>) => data is Err

export const isOk: <T>(data: Result<T>) => data is Ok<T>

export const map: <P, R>(func: Arrow<P, R>) => Arrow<Result<P>, Result<R>>

export const chain: <P, R>(func: Arrow<P, Result<R>>) => Arrow<Result<P>, Result<R>>

export const getOrElse: <T1>(value: Lazy<T1>) => <T2>(data: Result<T2>) => T1 | T2

export const fromOption: <T>(value: Option<T>) => Result<T>
