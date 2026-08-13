import { type SchemaTypeDefinition } from 'sanity'
import {
  localeStringArrayType,
  localeStringType,
  localeTextType,
} from './locale'
import { templateType } from './template'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localeStringType,
    localeTextType,
    localeStringArrayType,
    templateType,
  ],
}
