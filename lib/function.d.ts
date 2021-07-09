// SECTION Types

export type Lazy<T> = Func<[], T>

export type Endo<T> = Arrow<T, T>

export type Arrow<P, R> = Func<[P], R>

export type Func<P extends ReadonlyArray<any>, R> = (...args: P) => R

// SECTION Library

export const flow: <A extends ReadonlyArray<any>, B, C>(func1: Func<A, B>, func2: Arrow<B, C>) => Func<A, C>

export const id: <T>(data: T) => T
