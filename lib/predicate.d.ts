import * as F from './function'
import * as O from './option'

// SECTION Types

export type Predicate<P extends ReadonlyArray<any>> = (...args: P) => boolean

export type PredicateOperation = <P extends ReadonlyArray<any>>(pred: Predicate<P>) => Predicate<P>

export type PredicateCombinator = <P extends ReadonlyArray<any>>(pred1: Predicate<P>, pred2: Predicate<P>) => Predicate<P>

// SECTION Library

export const not: PredicateOperation

export const and: PredicateCombinator

export const or: PredicateCombinator

export const eq: PredicateCombinator

export const xor: PredicateCombinator

export const nand: PredicateCombinator

export const nor: PredicateCombinator

export const then: <P extends ReadonlyArray<any>, R>(pred: Predicate<P>, func: F.Func<P, R>) => F.Func<P, O.Option<R>>

export const thenElse: <P extends ReadonlyArray<any>, R1, R2>(pred: Predicate<P>, onThen: F.Func<P, R1>, onElse: F.Func<P, R2>) => F.Func<P, R1 | R2>
