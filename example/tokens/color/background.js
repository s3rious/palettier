const tinycolor = require('tinycolor2')

const color = 'rgb(255, 255, 255)'

const background = {
  100: tinycolor(color).toRgbString(),
  50: tinycolor(color).setAlpha(0.5).toRgbString(),
  25: tinycolor(color).setAlpha(0.25).toRgbString()
}

module.exports = background
