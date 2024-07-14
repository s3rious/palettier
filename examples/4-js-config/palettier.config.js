function customJsonTransformer(tokens, rootObjectKey, childObjectKey) {
  return JSON.stringify(
    {
      [rootObjectKey]: {
        [childObjectKey]: tokens,
      },
    },
    null,
    4,
  );
}

export default {
  src: "./tokens/index.js",
  dist: "./out/",
  transform: [[customJsonTransformer, "palette-custom.json", "root", "child"]],
  verbose: true,
};
