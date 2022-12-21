const O = require('./option')

// SECTION Types

// MODULE Declarations

/** @typedef {ReadonlyArray<Json>} JsonArray */

/** @typedef {{ readonly [key: string]: Json | undefined }} JsonRecord */

/** @typedef {boolean | number | string | null | JsonRecord | JsonArray | readonly []} Json */

// SECTION Library

/** @type {(data: Json) => string} */
const encode = JSON.stringify

/** @type {(data: string) => O.Option<Json>} */
const decode = data => { try { return JSON.parse(data) } catch { return O.none } }

// SECTION Exports

module.exports = { encode, decode }
