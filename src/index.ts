import * as path from 'path'
import * as mkdirp from 'mkdirp'
import * as fs from 'fs/promises'

import { getConfig } from './getConfig'
import { getTokens } from './getTokens'
import { transformers } from './transformers'
import { isTransformersKey } from './helpers/isTransformerKey'

const main = async (): Promise<void> => {
  const config = await getConfig()

  if (config instanceof Error) {
    return console.error(config)
  }

  if (config.verbose) {
    console.log('Config is:', config, '\n')
  }

  if (config.verbose) {
    console.log('Getting tokens...')
  }
  const tokens = await getTokens(config.src)
  if (config.verbose) {
    console.log('Tokens is:', tokens, '\n')
  }

  if (config.transform.length > 0) {
    if (config.verbose) {
      console.log(`Creating dist directory: ${config.dist}...`)
      await mkdirp(config.dist)
      console.log('... created!', '\n')
    }
  }

  for (const transform of config.transform) {
    const [type, fileName, ...options] = transform

    const transformerFunction = (() => {
      if (typeof type === 'function') {
        return type
      }

      if (isTransformersKey(type)) {
        return transformers[type]
      }

      console.error(`Type "${type}" did not match any of transformers: "${Object.keys(transformers).join(', ')}"`)
    })()

    if (transformerFunction == null) {
      return
    }

    if (config.verbose) {
      console.log(`Transforming ${type.toString()}...`)
    }

    const content = transformerFunction(tokens, ...options)

    if (config.verbose) {
      console.log('... content is:', content)
    }

    const filePath = path.resolve(config.dist, fileName)

    if (config.verbose) {
      console.log(`... writing file: ${filePath}...`)
    }

    await fs.writeFile(filePath, content, 'utf-8')

    if (config.verbose) {
      console.log('... written!', '\n')
    }
  }

  if (config.verbose) {
    console.log('Done!')
  }
}

main()
  .then(
    () => {},
    (error) => console.error(error)
  )
