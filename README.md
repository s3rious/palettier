# palettier

`palettier` is a tool to generate `.css` file with css variables, plain `.json` file or anything you asked for from js.

For example, it can convert this:
```javascript
// index.js
const color = require('./color/')

module.exports = {
  color,
}

// color/index.js
const tinycolor = require('tinycolor2')

const base = 'rgb(0, 0, 0)'

const color = {
  100: tinycolor(base).toRgbString(),
  50: tinycolor(base).setAlpha(0.5).toRgbString(),
  25: tinycolor(base).setAlpha(0.25).toRgbString()
}

module.exports = color
```

Into this:
```css
/* Palette.css */

:root {
  --color-25: rgba(0, 0, 0, 0.25);
  --color-50: rgba(0, 0, 0, 0.5);
  --color-100: rgb(0, 0, 0);
}
```
```json5
// palette.json

{
  "color": {
    "25": "rgba(0, 0, 0, 0.25)",
    "50": "rgba(0, 0, 0, 0.5)",
    "100": "rgb(0, 0, 0)"
  }
}
```

For more elaborate example you can look into [`example`](https://github.com/s3rious/palettier/tree/main/example) folder

Includes [`tinycolor2`](https://github.com/bgrins/TinyColor) package for ease of color manipulation.

## Quick start

Install `palettier` as a dev dependency:
```bash
npm i palettier --save-dev
```

Add it as an npm script to you `package.json`:
```json
{
  <...>
  "scripts": {
    <...>
      "palettier:generate": "palettier --config palettier.config.json"
    },
  <...>
}
```

Run it:
```bash
npm run palettier:generate
```

## Configuration

You can configure `palettier` two ways.

Via command line arguments:
```bash
palettier --src example/tokens/index.js --dist example/out/ --transform json:palette.json --transform cssVariables:palette.module.css:Palette --verbose
```

Or via config file (must be `.json` or `.js`):
```bash
palettier --config example/palettier.config.json
```

```json5
// palettier.config.json

{
  "src": "example/tokens/index.js",
  "dist": "example/out/",
  "transform": [
    ["json", "palette.json"],
    ["cssVariables", "palette.module.css", "Palette"]
  ],
  "verbose": true
}
```

Regardless of configuration method the arguments are:
* `src` path relative to launch folder aimed to palette source file
* `dist` path relative to launch folder aimed to destination folder
* `transform` array of builtInTransformers
* `verbose` boolean, when `true` `palettier` will verbosely write to terminal what it's doing step-by-step

## Transformers

The transformer is the array of options to transform to.

* First parameter is a `string`, the name of transformer included to the `palletier`, or the custom transformer function.
* Second parameter is the filename to write to.
* The rest of parameters is a transformer options, the arguments to be passed to transformer function

### `json` transformer

Generates a `.json` of the result. Has no arguments

### `cssVariables` transformer

Generates a `.css` file with css variables. Has one argument, a `className` if empty will be `:root`

### Custom builtInTransformers

You can write custom transformer function.

Function should take `tokens` object as their first argument, the rest of the arguments is a transformer options.

For an example you can look into [`example/palettier.config.js`](https://github.com/s3rious/palettier/blob/main/example/palettier.config.js)
