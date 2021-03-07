import { curry, pipe } from 'rambda'
import { recursivelyGenerateEntries } from './recursivelyGenerateEntries'
import { prefixWithDashes } from './prefixWithDashes'
import { generateCssFile } from './generateCssFile'

function convertTokensToCssVariables (tokens: Tokens, className?: ClassName): CssFile {
  return pipe<Tokens, Entries, Entries, CssFile>(
    recursivelyGenerateEntries,
    prefixWithDashes,
    curry(generateCssFile)(className)
  )(tokens)
}

export { convertTokensToCssVariables }
