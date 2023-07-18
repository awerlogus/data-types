// SECTION Types

export type Lazy<T> = Func<[], T>

export type Endo<T> = Arrow<T, T>

export type Semi<T> = Func<[T, T], T>

export type Arrow<P, R> = Func<[P], R>

export type Func<P extends ReadonlyArray<any>, R> = (...args: P) => R

// SECTION Library

export const flow: <A extends ReadonlyArray<any>, B, C>(func1: Func<A, B>, func2: Arrow<B, C>) => Func<A, C>

export const flowC: <A extends ReadonlyArray<any>, B>(func1: Func<A, B>) => <C>(func2: Arrow<B, C>) => Func<A, C>

export const flowCR: <B, C>(func2: Arrow<B, C>) => <A extends ReadonlyArray<any>>(func1: Func<A, B>) => Func<A, C>

export const id: <T>(data: T) => T

export const noop: () => void

export const noopA: () => Promise<void>

export const never: () => never

export const absurd: (_: never) => never

export const call: <P extends ReadonlyArray<any>>(...params: P) => <R>(func: Func<P, R>) => R

export const callL: <R>(func: Lazy<R>) => R
