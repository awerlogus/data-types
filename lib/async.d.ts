import * as F from './function'

// SECTION Library

export const of: <T>(value: T) => Promise<T>

export const map: <P, R>(promise: Promise<P>, func: F.Arrow<P, R>) => Promise<R>

export const mapC: <P, R>(func: F.Arrow<P, R>) => (promise: Promise<P>) => Promise<R>

export const mapCR: <P>(promise: Promise<P>) => <R>(func: F.Arrow<P, R>) => Promise<R>

export const chain: <P, R>(promise: Promise<P>, func: F.Arrow<P, Promise<R>>) => Promise<R>

export const chainC: <P, R>(func: F.Arrow<P, Promise<R>>) => (promise: Promise<P>) => Promise<R>

export const chainCR: <P>(promise: Promise<P>) => <R>(func: F.Arrow<P, Promise<R>>) => Promise<R>
