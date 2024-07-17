# Palettier

[![CI](https://github.com/s3rious/palettier/actions/workflows/run-tests-on-push.yml/badge.svg)](https://github.com/s3rious/palettier/actions/workflows/run-tests-on-push.yml)
[![npm version](https://badge.fury.io/js/palettier.svg)](https://badge.fury.io/js/palettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Palettier is a tool designed to generate various output formats from a single source of design tokens.

Basically it transforms this:
```js
/* tokens.js */
const color = "rgb(255, 255, 255)";

const background = {
  100: tinycolor(color).toRgbString(),
  50: tinycolor(color).setAlpha(0.5).toRgbString(),
  25: tinycolor(color).setAlpha(0.25).toRgbString(),
};

const color = {
  background,
};

const tokens = {
  color,
};

export default tokens;
```

Into this:
```json
/* palette.json */
{
  "color": {
    "background": {
      "25": "rgba(255, 255, 255, 0.25)",
      "50": "rgba(255, 255, 255, 0.5)",
      "100": "rgb(255, 255, 255)"
    }
  }
}
```
```css
/* palette.css */
:root {
  --color-background-25: rgba(255, 255, 255, 0.25);
  --color-background-50: rgba(255, 255, 255, 0.5);
  --color-background-100: rgb(255, 255, 255);
}
```

And more!

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Transforms](#transforms)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Usage

## Installation

Run Palettier without installation via npx:

```sh
npx palettier
```

Install Palettier globally using npm:

```sh
npm install -g palettier
```

Or add it to your project as a dev dependency:

```sh
npm install --save-dev palettier
```

## Configuration

There is two ways to pass the config.

Using a Config file:
- `--config`: Path to a JSON or JavaScript configuration file.

```sh
palettier --config path/to/config.json
```

Example configuration file:
```json
{
  "src": "path/to/tokens.js",
  "dist": "path/to/output",
  "transform": [
    ["json", "palette.json"],
    ["cssVariables", "palette.module.css"]
  ],
  "verbose": true
}
```

Or using command-line arguments:
- `--src`: Source file containing the token definitions.
- `--dist`: Output directory for the generated files.
- `--transform`: Transformation definitions in the format `type:filename:options`.
- `--verbose`: Enable verbose logging.
- 
```sh
palettier --src path/to/tokens.js --dist path/to/output --transform json:palette.json --transform cssVariables:palette.module.css --verbose
```

Also, if you run Palettier without or with minimal arguments, it uses and extends the default configuration:

```json
{
  "src": "./index.js",
  "dist": "./",
  "transform": [
    ["json", "palette.json"],
    ["cssVariables", "palette.module.css"]
  ],
  "verbose": false
}
```

## Transforms

Palettier supports several built-in transforms:

- `json`: Converts tokens to a JSON file.
- `cssVariables`: Converts tokens to CSS variables.
  - Option `className`
    - Wraps variables with a specified class (default is `:root`).
- `scss`: Converts tokens to SCSS variables.
  - Option `className`
    - Wraps variables with a specified class (default is no class, prints without a wrap).
- `jsObject`: Converts tokens to a JavaScript object.
  - Option `jsExportType`:
    - `default`: Exports as `export default`.
    - `named`: Exports as `export { palette }` (default, preferred and recommended way).
    - `commonjs`: Exports as `module.exports`.

You can also implement custom transforms by creating a function that accepts tokens and returns transformed content:
```js
// config.js
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
```

## Examples

### Example token file

```js
const tokens = {
  colorPrimary: "#3498db",
  fontSizeBase: "16px",
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px"
  }
};

export default tokens;
```

### Example configuration file

```json
{
  "src": "tokens.js",
  "dist": "dist",
  "transform": [
    ["json", "palette.json"],
    ["cssVariables", "palette.module.css"],
    ["scss", "palette.scss"],
    ["jsObject", "palette.js:commonjs"]
  ],
  "verbose": true
}
```

### More examples

For more examples, please see the [`examples/` folder of the repo](examples).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/my-new-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/my-new-feature`).
5. Create a new pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
