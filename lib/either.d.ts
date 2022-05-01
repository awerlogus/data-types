import * as F from './function'

// SECTION Types

export type Left<E> = readonly [false, E]

export type Right<T> = readonly [true, T]

export type Either<E, T> = Left<E> | Right<T>

// SECTION Library

export const left: <E>(data: E) => Either<E, never>

export const right: <T>(data: T) => Either<never, T>

export const isLeft: <E, T>(either: Either<E, T>) => either is Left<E>

export const isRight: <E, T>(either: Either<E, T>) => either is Right<T>

export const map: <E, T, R>(either: Either<E, T>, func: F.Arrow<T, R>) => Either<E, R>

export const mapC: <T, R>(func: F.Arrow<T, R>) => <E>(either: Either<E, T>) => Either<E, R>

export const mapLeft: <E1, E2, T>(either: Either<E1, T>, func: F.Arrow<E1, E2>) => Either<E2, T>

export const mapLeftC: <E1, E2>(func: F.Arrow<E1, E2>) => <T>(either: Either<E1, T>) => Either<E2, T>

export const chain: <E1, T, E2, R>(either: Either<E1, T>, func: F.Arrow<T, Either<E2, R>>) => Either<E1 | E2, R>

export const chainC: <T, E2, R>(func: F.Arrow<T, Either<E2, R>>) => <E1>(either: Either<E1, T>) => Either<E1 | E2, R>

export const get: <E, T>(either: Either<E, T>) => E | T

export const extractUnsafe: <E, T>(either: Either<E, T>) => T
