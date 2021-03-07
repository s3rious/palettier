function customJsonTransformer (tokens, rootObjectKey, childObjectKey) {
  return JSON.stringify(
    {
      [rootObjectKey]: {
        [childObjectKey]: tokens
      }
    },
    null,
    4
  )
}

module.exports = {
  src: 'example/tokens/index.js',
  dist: 'example/out/',
  transform: [[customJsonTransformer, 'palette-custom.json', 'root', 'child']],
  verbose: true
}
