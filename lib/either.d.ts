import { Arrow } from './function'

// SECTION Types

export type Left<E> = [false, E]

export type Right<T> = [true, T]

export type Either<E, T> = Left<E> | Right<T>

// SECTION Library

export const left: <E>(data: E) => Either<E, never>

export const right: <T>(data: T) => Either<never, T>

export const isLeft: <E, T>(either: Either<E, T>) => either is Left<E>

export const isRight: <E, T>(either: Either<E, T>) => either is Right<T>

export const map: <E, T, R>(either: Either<E, T>, func: Arrow<T, R>) => Either<E, R>

export const mapLeft: <E1, E2, T>(either: Either<E1, T>, func: Arrow<E1, E2>) => Either<E2, T>

export const chain: <E1, T, E2, R>(either: Either<E1, T>, func: Arrow<T, Either<E2, R>>) => Either<E1 | E2, R>

export const extractUnsafe: <E, T>(either: Either<E, T>) => T
