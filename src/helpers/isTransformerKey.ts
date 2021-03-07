import { transformers } from '../transformers'

type TransformersKey = keyof typeof transformers

function isTransformersKey (argument: any): argument is TransformersKey {
  return Object.keys(transformers).includes(argument)
}

export { isTransformersKey }
