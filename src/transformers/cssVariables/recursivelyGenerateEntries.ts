import { pipe } from 'rambda'

import { isTokens } from '../../helpers'

import { camelToKebab } from './camelToKebab'

const recursivelyGenerateEntries = (tokens: Tokens, parentKey?: string): Entries => {
  return pipe<Tokens, Array<[string, (string | Tokens)]>, Entries>(
    Object.entries,
  (tokenEntries) => tokenEntries.reduce((accumulator: Entries, [key, value]: [string, string | Tokens]): Entries => {
    const flatKey = camelToKebab((parentKey != null) ? `${parentKey}-${key}` : key)

    if (isTokens(value)) {
      return [
        ...accumulator,
        ...recursivelyGenerateEntries(value, flatKey)
      ]
    }

    return [...accumulator, [flatKey, value]]
  }, [])
  )(tokens)
}

export { recursivelyGenerateEntries }
