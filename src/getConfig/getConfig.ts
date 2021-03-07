import { Path } from './type'
import { getArguments, isConfigArguments, isInlineArguments } from './getArguments'

const defaultConfig = {
  verbose: false,
  dist: Path('.'),
  transform: [
    ['json', 'palette.json']
  ]
}

async function getConfig (): Promise<Config | Error> {
  const args = getArguments()

  if (isInlineArguments(args)) {
    return Object.assign({}, defaultConfig, args)
  }

  if (isConfigArguments(args)) {
    const config: Config = await import(args.config)

    config.src = Path(config.src)
    config.dist = Path(config.dist)

    return Object.assign({}, defaultConfig, config)
  }

  return new Error('No config passed')
}

export { getConfig }
