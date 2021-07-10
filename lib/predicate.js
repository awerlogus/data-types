const F = require('./function')
const O = require('./option')

// SECTION Types

// MODULE Declarations

/** @template {ReadonlyArray<any>} P @typedef {(...args: P) => boolean} Predicate */

/** @typedef {<P extends ReadonlyArray<any>>(pred: Predicate<P>) => Predicate<P>} PredicateOperation */

/** @typedef {<P extends ReadonlyArray<any>>(pred1: Predicate<P>, pred2: Predicate<P>) => Predicate<P>} PredicateCombinator */

// SECTION Library

/** @type {PredicateOperation} */
const not = pred => (...args) => !pred(...args)

/** @type {PredicateCombinator} */
const and = (pred1, pred2) => (...args) => pred1(...args) && pred2(...args)

/** @type {PredicateCombinator} */
const or = (pred1, pred2) => (...args) => pred1(...args) || pred2(...args)

/** @type {PredicateCombinator} */
const eq = (pred1, pred2) => (...args) => pred1(...args) === pred2(...args)

/** @type {PredicateCombinator} */
const xor = F.flow(eq, not)

/** @type {PredicateCombinator} */
const nand = F.flow(and, not)

/** @type {PredicateCombinator} */
const nor = F.flow(or, not)

/** @type {<P extends ReadonlyArray<any>, R>(pred: Predicate<P>, func: F.Func<P, R>) => F.Func<P, O.Option<R>>} */
const then = (pred, func) => (...data) => pred(...data) ? O.some(func(...data)) : O.none

/** @type {<P extends ReadonlyArray<any>, R1, R2>(pred: Predicate<P>, onThen: F.Func<P, R1>, onElse: F.Func<P, R2>) => F.Func<P, R1 | R2>} */
const thenElse = (pred, onThen, onElse) => (...data) => pred(...data) ? onThen(...data) : onElse(...data)

// SECTION Exports

module.exports = { not, and, or, eq, xor, nand, nor, then, thenElse }
