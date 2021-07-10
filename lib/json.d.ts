import * as O from './option'

// SECTION Types

export type JsonArray = ReadonlyArray<Json>

export type JsonRecord = { readonly [key: string]: Json | undefined }

export type Json = boolean | number | string | null | JsonRecord | JsonArray | readonly []

// SECTION Library

export const encode: (data: Json) => string

export const decode: (data: string) => O.Option<Json>
